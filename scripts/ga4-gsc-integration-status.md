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

## Phase 2: GSC verification file — DONE

- Created `public/googlebedb12b1684ba52e.html` with exact content `google-site-verification: googlebedb12b1684ba52e.html`.
- Vite copies `public/` to `dist/` at build time.

## Phase 3: GA4 gtag.js — DONE

- Inline snippet added to `index.html` `<head>`, hostname-guarded so it only fires on `cornerhouse.co.in` (honors brief's hard rule "Production-only tracking — do not fire GA4 events in development or preview builds"). Staging at `staging.cornerhouse.co.in` does NOT load gtag.
- Created `src/utils/analytics.ts` — `trackPageView`, `trackEvent` helpers. Guards on hostname + DNT.
- Created `src/hooks/usePageTracking.ts` — `useEffect` on `useLocation` change, calls `trackPageView`.
- Wired `usePageTracking()` inside `Layout` in `src/App.tsx` (Layout is already a child of the Router).

## Phase 4: Build verify — DONE

- `npm run build` clean. `dist/googlebedb12b1684ba52e.html` present.
- `tsc --noEmit` (npm run lint) clean.

## Phase 5: PR — pending Saurabh review

- Pushed `feature/ga4-gsc-integration`.
- Opened PR feature → staging.
- Saurabh: review staging deploy at `https://staging.cornerhouse.co.in`, confirm gtag is in HTML and GSC file is reachable, then promote to main via second PR.
- After production deploy: GSC verify, sitemap submit, Realtime check.
