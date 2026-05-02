# GA4 + GSC Integration — Status

**Brief:** `Imp_DATA/Google Analytics/Corner_House_GA4_GSC_Integration_Brief.md`
**Branch:** `feature/ga4-gsc-integration` (branched from `origin/staging`)
**Property:** Corner House (cornerhouse.co.in)
**Measurement ID:** G-6M5C83YEJB (GA4 Property 535572288, Stream 14781134701)
**GSC verification token:** googlebedb12b1684ba52e

## Phase 1: Pre-flight — DONE

- Repo: `/Users/saurabhiim/Documents/Antigravity/corner-home-project`
- Pulled latest. `origin/staging` at `e73de31`. `origin/main` at `3f522f9` (merge of staging into main, no source commits ahead).
- Searched `src/` and `index.html` for existing analytics — none found. Safe to add.
- Project layout: Vite SSG (`vite-react-ssg`), single `index.html` at repo root, `src/main.tsx` entry, `src/App.tsx` defines routes with `Layout` already inside Router.
- Project CLAUDE.md mandates feature → staging → main flow. Following that: created `feature/ga4-gsc-integration` from staging, will open PR to staging (NOT main).
- Existing utility convention: `src/lib/`. Brief explicitly prescribes `src/utils/analytics.ts` and `src/hooks/usePageTracking.ts` to mirror Soul Infinity. Following the brief literally.

## Phase 2: GSC verification file — DONE (took two iterations)

**First attempt:** dropped a static `public/googlebedb12b1684ba52e.html`. Vite copied it to `dist/`, Cloudflare Pages served it — but with a 308 redirect to the extension-less URL. Cloudflare Pages auto-strips the `.html` extension and that redirect cannot be overridden via `_redirects` (the auto-redirect runs first). Google Search Console's HTML file verification method explicitly fails on 3xx responses, so this was a real blocker, not theoretical.

**Final pattern:** Pages Function at `functions/googlebedb12b1684ba52e.html.ts`. Pages Functions bypass the `.html` auto-redirect, so requests to `/googlebedb12b1684ba52e.html` are routed straight to the Function which returns HTTP 200 with the exact verification body. Same pattern as the existing `functions/robots.txt.ts`.

Verified on Cloudflare preview deployment of commit `ead21b1`:
```
$ curl -sS -X GET --max-redirs 0 -o /dev/null -w "%{http_code} %{num_redirects}\n" \
    https://dc666d96.corner-house-website.pages.dev/googlebedb12b1684ba52e.html
200 0
```
Body: `google-site-verification: googlebedb12b1684ba52e.html` (54 bytes including trailing newline).

## Phase 3: GA4 gtag.js — DONE

- Inline snippet added to `index.html` `<head>`, hostname-guarded so it only fires on `cornerhouse.co.in` (honors brief's hard rule "Production-only tracking — do not fire GA4 events in development or preview builds"). Staging at `staging.cornerhouse.co.in` does NOT load gtag.
- Created `src/utils/analytics.ts` — `trackPageView`, `trackEvent` helpers. Guards on hostname + DNT.
- Created `src/hooks/usePageTracking.ts` — `useEffect` on `useLocation` change, calls `trackPageView`.
- Wired `usePageTracking()` inside `Layout` in `src/App.tsx` (Layout is already a child of the Router).

## Phase 4: Build verify — DONE

- `npm run build` clean. `dist/googlebedb12b1684ba52e.html` present (later replaced by Pages Function — see Phase 2 update).
- `tsc --noEmit` (npm run lint) clean for new files. Pre-existing `functions/robots.txt.ts(83,25): Cannot find name 'PagesFunction'` flag is unrelated and was on staging before this branch — left for a follow-up to add `@cloudflare/workers-types` to devDependencies.

## Phase 5: PR — DONE

- PR #6 (`feature/ga4-gsc-integration` → `staging`), merged 2026-05-02 06:28:55 UTC, merge commit `621d0b1`.
- PR #7 (`staging` → `main`), merged 2026-05-02 06:29:35 UTC, merge commit `3cbdc32`.
- Cloudflare Pages production deploy completed by 2026-05-02 06:30:41 UTC.

## Phase 6: Production verification — DONE

```
$ curl -sS -X GET --max-redirs 0 https://cornerhouse.co.in/googlebedb12b1684ba52e.html
HTTP 200  num_redirects=0  size=54 bytes
google-site-verification: googlebedb12b1684ba52e.html

$ curl -sS https://cornerhouse.co.in | grep G-6M5C83YEJB
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-6M5C83YEJB';
        gtag('config', 'G-6M5C83YEJB');
```

**Production HEAD:** `3cbdc32842d6c34c4398cae472187fe1f27e1ffa` on `main`.

## Cleanup — DONE

- Local branch `feature/ga4-gsc-integration` deleted.
- Remote branch `feature/ga4-gsc-integration` deleted.

## Next — Saurabh's manual steps

1. Open https://search.google.com/search-console for the `https://cornerhouse.co.in/` property.
2. Click **Verify** on the HTML file method — should now succeed.
3. Sidebar → **Sitemaps** → submit `sitemap.xml`.
4. Sidebar → **URL Inspection** → request indexing for the homepage and each property listing.
5. Next day: open GA4 → **Reports → Realtime** while browsing the live site to confirm events are flowing.
