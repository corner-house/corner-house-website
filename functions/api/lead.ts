// Cloudflare Pages Function — POST /api/lead
//
// Captures lead submissions from src/components/LeadCaptureModal.tsx (the
// property-page modal) and src/components/blog/BlogSidebar.tsx (the brochure
// request card). Both clients send the same payload shape.
//
// Side-effects:
//   1. Email a notification to LEAD_TO_EMAIL via Resend.                  REQUIRED
//   2. Append a row to a Google Sheet via an Apps Script Web App.         OPTIONAL
//
// Sheet integration is OPTIONAL — when LEAD_SHEET_WEBHOOK_URL or
// LEAD_SHEET_WEBHOOK_SECRET is unset, the function skips the sheet call
// entirely and the response is success-as-long-as-the-email-sent. This lets
// us ship leads-via-email today while we sort out a reliable Sheets path
// (Apps Script deployments have been unreliable; service account is the
// likely future direction).
//
// Both side-effects run in parallel (Promise.allSettled) so a transient
// failure on one channel doesn't drop the lead on the other. The HTTP
// response reports per-channel success so the client can decide whether
// to surface an error.
//
// In addition, every lead is logged to Cloudflare Functions logs with a
// `[LEAD]` prefix — Cloudflare retains ~7 days of logs, so leads are
// recoverable even if BOTH side-effects fail.
//
// Env vars (set in Cloudflare Pages dashboard → Settings → Environment
// variables, for both Production and Preview environments; values also
// mirrored in .env.local for `wrangler pages dev`):
//
//   RESEND_API_KEY            — Resend API key (re_...)                  REQUIRED
//   LEAD_TO_EMAIL             — Inbox to receive new-lead notifications  REQUIRED
//   LEAD_SHEET_WEBHOOK_URL    — Apps Script Web App URL (when set)       OPTIONAL
//   LEAD_SHEET_WEBHOOK_SECRET — Shared secret matching the SECRET        OPTIONAL
//                               constant in the Apps Script code
//
// The Apps Script source (for future re-enablement) is reproduced at the
// bottom of this file for reference; it lives in the Google Sheet
// (Extensions → Apps Script), not in this repo.

interface Env {
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_SHEET_WEBHOOK_URL?: string;
  LEAD_SHEET_WEBHOOK_SECRET?: string;
}

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  property?: string;
  source?: string;
  message?: string;
}

interface NormalisedLead {
  name: string;
  phone: string;
  email: string;
  property: string;
  source: string;
  message: string;
  timestamp: string;
}

const MAX_NAME = 200;
const MAX_PHONE = 50;
const MAX_EMAIL = 200;
const MAX_PROPERTY = 200;
const MAX_SOURCE = 500;
const MAX_MESSAGE = 2000;

// Local PagesFunction type alias. The full type ships with
// @cloudflare/workers-types which isn't installed in this repo; the other
// functions/*.ts files use the same pattern so the lint is consistent.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

function cors(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors() },
  });
}

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: cors() });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let raw: LeadPayload;
  try {
    raw = (await request.json()) as LeadPayload;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const name = (raw.name ?? '').trim().slice(0, MAX_NAME);
  const phone = (raw.phone ?? '').trim().slice(0, MAX_PHONE);
  const email = (raw.email ?? '').trim().slice(0, MAX_EMAIL);

  if (!name || !phone || !email) {
    return json({ ok: false, error: 'missing_required_fields' }, 400);
  }
  // Loose email shape check — server-side guard against obvious junk.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }

  const lead: NormalisedLead = {
    name,
    phone,
    email,
    property: (raw.property ?? '').toString().trim().slice(0, MAX_PROPERTY),
    source: (raw.source ?? '').toString().trim().slice(0, MAX_SOURCE),
    message: (raw.message ?? '').toString().trim().slice(0, MAX_MESSAGE),
    timestamp: new Date().toISOString(),
  };

  // Cloudflare Functions log fallback. Even if both side-effects fail, the
  // lead is recoverable from logs (~7 days retention) by grep'ing for [LEAD].
  console.log(`[LEAD] ${JSON.stringify({
    ...lead,
    userAgent: request.headers.get('user-agent') ?? null,
    referer: request.headers.get('referer') ?? null,
  })}`);

  // Sheet integration is opt-in via env vars. When unset, the appendToSheet
  // call is skipped entirely so partial-failure logic only fires for real
  // misconfiguration of the email side.
  const sheetEnabled = !!(env.LEAD_SHEET_WEBHOOK_URL && env.LEAD_SHEET_WEBHOOK_SECRET);

  const [emailRes, sheetRes] = await Promise.allSettled([
    sendNotificationEmail(env, lead),
    sheetEnabled
      ? appendToSheet(env, lead)
      : Promise.resolve<{ ok: true }>({ ok: true }),
  ]);

  const emailOk = emailRes.status === 'fulfilled' && emailRes.value.ok;
  const sheetOk = sheetRes.status === 'fulfilled' && sheetRes.value.ok;

  if (emailOk && sheetOk) {
    return json({ ok: true, sheetEnabled });
  }

  const emailError =
    emailRes.status === 'fulfilled' ? emailRes.value.error : `threw: ${String(emailRes.reason)}`;
  const sheetError =
    sheetRes.status === 'fulfilled' ? sheetRes.value.error : `threw: ${String(sheetRes.reason)}`;
  // Partial failure returned as 502; the client decides whether to treat
  // emailOk||sheetOk as enough (currently the modal does — the lead is on
  // the dashboard logs and in at least one of the two channels).
  console.warn(`[LEAD] partial failure emailOk=${emailOk} sheetOk=${sheetOk} sheetEnabled=${sheetEnabled} ${emailError} ${sheetError}`);
  return json(
    {
      ok: false,
      emailOk,
      sheetOk,
      sheetEnabled,
      emailError: emailOk ? null : emailError,
      sheetError: sheetOk ? null : sheetError,
    },
    502,
  );
};

// Any non-POST/OPTIONS verb gets a 405. Keeps the endpoint surface small.
export const onRequest: PagesFunction<Env> = ({ request }) =>
  new Response(JSON.stringify({ ok: false, error: `Method ${request.method} not allowed` }), {
    status: 405,
    headers: { Allow: 'POST, OPTIONS', 'Content-Type': 'application/json', ...cors() },
  });

// ─────────────────────────────────────────────────────────────────────────────
// Resend
// ─────────────────────────────────────────────────────────────────────────────

async function sendNotificationEmail(
  env: Env,
  lead: NormalisedLead,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL) {
    return { ok: false, error: 'resend_env_missing' };
  }

  // `onboarding@resend.dev` works without a verified sending domain but is
  // restricted to sending to the Resend account owner's verified email only.
  // Once cornerhouse.co.in is verified in Resend, switch this to e.g.
  // `Corner House Leads <noreply@cornerhouse.co.in>`.
  const from = 'Corner House Leads <onboarding@resend.dev>';
  const subject = `New lead: ${lead.name}${lead.property ? ` — ${lead.property}` : ''}`;
  const html = renderEmailHtml(lead);

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: env.LEAD_TO_EMAIL,
      reply_to: lead.email,
      subject,
      html,
    }),
  });

  if (!resp.ok) {
    let detail = '';
    try {
      detail = await resp.text();
    } catch {
      // ignore body-read failures
    }
    return { ok: false, error: `resend_${resp.status}: ${detail.slice(0, 200)}` };
  }
  return { ok: true };
}

function renderEmailHtml(lead: NormalisedLead): string {
  const rows: Array<[string, string]> = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email],
    ['Property', lead.property || '(none)'],
    ['Source', lead.source || '(none)'],
    ['Message', lead.message || '(none)'],
    ['Timestamp', lead.timestamp],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1a1a1a;">
<h2 style="margin:0 0 16px 0;">New lead from cornerhouse.co.in</h2>
<table style="border-collapse:collapse;">${tableRows}</table>
<p style="margin-top:24px;color:#666;font-size:12px;">Reply to this email to respond directly to the lead.</p>
</body></html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets via Apps Script webhook
// ─────────────────────────────────────────────────────────────────────────────

async function appendToSheet(
  env: Env,
  lead: NormalisedLead,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!env.LEAD_SHEET_WEBHOOK_URL || !env.LEAD_SHEET_WEBHOOK_SECRET) {
    return { ok: false, error: 'sheet_env_missing' };
  }

  // Apps Script Web Apps redirect from script.google.com to
  // script.googleusercontent.com on POST. Cloudflare Workers fetch follows
  // redirects by default (redirect: 'follow'), so no extra handling needed.
  const resp = await fetch(env.LEAD_SHEET_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: env.LEAD_SHEET_WEBHOOK_SECRET,
      timestamp: lead.timestamp,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      property: lead.property,
      message: lead.message,
      source: lead.source,
    }),
  });

  if (!resp.ok) {
    return { ok: false, error: `sheet_http_${resp.status}` };
  }
  // Apps Script always returns 200; success is the body's `ok` field.
  let body: { ok?: boolean; error?: string };
  try {
    body = (await resp.json()) as { ok?: boolean; error?: string };
  } catch {
    return { ok: false, error: 'sheet_invalid_response' };
  }
  if (!body.ok) {
    return { ok: false, error: `sheet_${body.error ?? 'unknown'}` };
  }
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─────────────────────────────────────────────────────────────────────────────
// Apps Script source (paste into Extensions → Apps Script on the Sheet)
// ─────────────────────────────────────────────────────────────────────────────
//
// const SECRET = 'PASTE_LONG_RANDOM_STRING_HERE';  // same value as LEAD_SHEET_WEBHOOK_SECRET
// const SHEET_NAME = 'Leads';                       // tab in the Sheet
//
// function doPost(e) {
//   try {
//     const body = JSON.parse(e.postData.contents);
//     if (body.token !== SECRET) {
//       return _json({ ok: false, error: 'unauthorized' });
//     }
//     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
//     if (!sheet) {
//       return _json({ ok: false, error: 'sheet_not_found' });
//     }
//     sheet.appendRow([
//       body.timestamp || new Date().toISOString(),
//       body.name || '',
//       body.phone || '',
//       body.email || '',
//       body.property || '',
//       body.message || '',
//       body.source || ''
//     ]);
//     return _json({ ok: true });
//   } catch (err) {
//     return _json({ ok: false, error: String(err) });
//   }
// }
//
// function _json(obj) {
//   return ContentService
//     .createTextOutput(JSON.stringify(obj))
//     .setMimeType(ContentService.MimeType.JSON);
// }
//
// Deploy: Deploy → New deployment → Type: Web app
//   Execute as: Me, Who has access: Anyone
//   Copy the Web App URL into LEAD_SHEET_WEBHOOK_URL
