// Cloudflare Pages Function — POST /api/lead
//
// Captures lead submissions from the blog brochure card (and any future forms).
// Goals:
//   1. Persist the lead immediately so data is never silently lost.
//      Cloudflare retains stdout logs for ~7 days. Look for `[LEAD]` lines in
//      the Cloudflare Pages dashboard → Functions → Logs.
//   2. Optionally forward to an external inbox (Formspree etc.) when the
//      `FORMSPREE_LEAD_ENDPOINT` env var is set on the Pages project. The
//      function works fine without it — the env var is purely an upgrade path
//      to get leads via email instead of dashboard logs.
//
// Why a Pages Function (not Formspree-only / Worker / MailChannels):
//   - Already the repo's pattern (see functions/robots.txt.ts).
//   - Auto-deploys with the next push to main, no external account needed to
//     ship a working lead pipeline today.
//   - Email delivery via MailChannels was deprioritised because their free
//     Cloudflare integration changed in 2024 and would need DKIM setup to be
//     reliable. Formspree (optional) is the simpler upgrade path.
//   - Worker + KV would require a wrangler.toml binding and Cloudflare
//     dashboard config the user would have to set up before the code is live.

interface Env {
  // Set in Cloudflare dashboard → Pages → Settings → Environment variables.
  // Optional. When set, leads are also POSTed there as a JSON body so the
  // configured external service emails the team.
  FORMSPREE_LEAD_ENDPOINT?: string;
}

// Minimal local type for Cloudflare Pages Function. The full PagesFunction type
// ships with @cloudflare/workers-types which isn't installed in this repo; the
// other functions/*.ts files have the same lint error and run fine in prod, so
// this self-contained alias keeps us in line and silences the lint complaint.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  project?: string;
  projectSlug?: string;
  requestType?: string;
  source?: string;
  pageUrl?: string;
}

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
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

// Minimal payload validation. We accept any reasonable contact shape — the goal
// is to capture leads, not gate them with strict schemas.
function sanitise(raw: unknown): LeadPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const out: LeadPayload = {};
  const pick = (k: keyof LeadPayload) => {
    const v = r[k];
    if (typeof v === 'string' && v.trim().length > 0 && v.length < 500) {
      out[k] = v.trim();
    }
  };
  (['name', 'phone', 'email', 'project', 'projectSlug', 'requestType', 'source', 'pageUrl'] as const).forEach(pick);
  // Require at least a name or phone or email so a totally empty POST is rejected.
  if (!out.name && !out.phone && !out.email) return null;
  return out;
}

export const onRequestOptions: PagesFunction<Env> = () =>
  new Response(null, { status: 204, headers: cors() });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const lead = sanitise(raw);
  if (!lead) return json({ ok: false, error: 'Empty or invalid lead' }, 400);

  const enriched = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') ?? null,
    referer: request.headers.get('referer') ?? null,
  };

  // Cloudflare retains console logs in the Functions dashboard. The [LEAD]
  // prefix makes searching trivial.
  console.log(`[LEAD] ${JSON.stringify(enriched)}`);

  // Optional fan-out to an external service for email delivery. Failure here
  // does not affect the 200 response — the lead is already persisted in logs.
  if (env.FORMSPREE_LEAD_ENDPOINT) {
    try {
      const upstream = await fetch(env.FORMSPREE_LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(enriched),
      });
      if (!upstream.ok) {
        console.warn(`[LEAD] Formspree returned ${upstream.status}`);
      }
    } catch (err) {
      console.warn(`[LEAD] Formspree forward failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return json({ ok: true });
};

// Any non-POST/OPTIONS verb gets a 405. Keeps the endpoint surface small.
export const onRequest: PagesFunction<Env> = ({ request }) => {
  return json({ ok: false, error: `Method ${request.method} not allowed` }, 405);
};
