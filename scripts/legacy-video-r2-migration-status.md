# Legacy Video R2 Migration, Build Status

**Branch:** fix/legacy-video-r2-migration (off main at c21e00a)
**Phase:** 5 (build verify) — STOPPED before push at browser-verification gate
**Scope:** Forest Reserve + Sobha Aranya video URL migration to R2. Downtown 66 explicitly excluded (dead Vimeo, separate ticket).

---

## Phase 1, pre-flight, done

- On main at c21e00a (Waterside production release).
- Branch `fix/legacy-video-r2-migration` created.
- Status file initialized.

## Phase 2, capture source URLs, done

| Listing | Old URL | label | description (sanitization needed?) |
|---|---|---|---|
| Forest Reserve | `https://krisumi.com/wp-content/themes/krisumi/assets/images/plp/krisumi-video.mp4` | "Krisumi walkthrough" | YES, contained audit-note bleed and an em-dash: "Generic Krisumi walkthrough hosted on krisumi.com — not a Forest Reserve specific film." Same bug class as the Waterside fix earlier today. |
| Sobha Aranya | `https://www.sobha.com/wp-content/uploads/2025/07/Immersive-Project-Showcase-Aranya.mp4` | "Immersive Project Showcase" | NO, "A cinematic walkthrough of Sobha Aranya at Karma Lakelands." is public-facing copy already. |

## Phase 3, asset pipeline, done

### 3.1 Download

| Listing | HTTP | Size | file output |
|---|---|---|---|
| Forest Reserve | 200 | 31.55 MB | ISO Media, MP4 v2 [ISO 14496-14] |
| Sobha Aranya | 200 | 84.54 MB | ISO Media, MP4 v2 [ISO 14496-14] |

Both well over 100 KB threshold and confirmed MP4 containers. Both pass STOP-on-fail conditions.

### 3.2 Optimize, SKIPPED (with rationale)

ffmpeg on this machine is broken: `dyld: Library not loaded: libx265.215.dylib` (homebrew shipped libx265.216 but ffmpeg was built against .215; ABI symbols differ, attempted symlink failed with `Symbol not found: _x265_api_get_215`). System left unmodified (any temp symlink removed).

Brief framing: optimization is "optional but recommended", not a STOP-on-fail condition. R2 egress is free, so the cost impact of uploading originals is storage-only, ~0.001 USD/month for both files combined. Latency impact for first-time playback on Sobha (84.5 MB) is the only real downside; HTML5 video Range requests mean first-byte-to-play is fast, and full buffering happens in the background. Saurabh can run an offline optimization pass later if bandwidth becomes a concern; tracked as a low-priority follow-up here.

### 3.3 Upload to R2

| Listing | R2 path | Plain GET | Range bytes=0-1023 | R2 reports |
|---|---|---|---|---|
| Forest Reserve | `krisumi-forest-reserve/video/walkthrough.mp4` | 200 OK | 206 Partial Content | 33,078,681 bytes, video/mp4 |
| Sobha Aranya | `sobha-aranya/video/walkthrough.mp4` | 200 OK | 206 Partial Content | 88,646,367 bytes, video/mp4 |

Public URLs:
- `https://pub-f00f91c779cf4225a9881062b14b46d3.r2.dev/krisumi-forest-reserve/video/walkthrough.mp4`
- `https://pub-f00f91c779cf4225a9881062b14b46d3.r2.dev/sobha-aranya/video/walkthrough.mp4`

Both pass STOP-on-fail conditions.

## Phase 4, source.json updates + re-scaffold, done

### Forest Reserve
- `videoMp4s[0].url` updated to R2 URL
- `videoMp4s[0].description` sanitized: was "Generic Krisumi walkthrough hosted on krisumi.com — not a Forest Reserve specific film.", now "Take a virtual walk through the Forest Reserve." (removes audit-note bleed and the em-dash)
- `label` and `posterImageKey` preserved unchanged
- `npx tsx scripts/scaffold-property.ts krisumi-forest-reserve` ran clean (one non-blocking softWarn about neighbourhood word count, pre-existing)

### Sobha Aranya
- `videoMp4s[0].url` updated to R2 URL
- All other `videoMp4s[0]` fields preserved unchanged (description was already public-facing)
- `npx tsx scripts/scaffold-property.ts sobha-aranya` ran clean

Merged JSONs verified: both `videoMp4s[0].url` now contain R2 URLs.

## Phase 5, build verify, done at CLI level

`npm run build` succeeded clean. SSG rendered 18 pages.

### CLI checks on rendered HTML

| Listing | R2 URL in HTML | Old hotlink URL in HTML | `<video><source>` rendered |
|---|---|---|---|
| Forest Reserve | ✅ 1 occurrence | ✅ 0 occurrences | ✅ src=R2 walkthrough.mp4 |
| Sobha Aranya | ✅ 1 occurrence | ✅ 0 occurrences | ✅ src=R2 walkthrough.mp4 |

Em-dash count per page: 2 each (1 from site-wide Footer "Saurabh Jain — website creator", 1 from pre-existing listing copy outside the videoMp4s field). Forest Reserve em-dash count actually decreased by 1 from before my edit (the audit-note bleed had a per-listing em-dash that's now gone). Pre-existing copy em-dashes are out of scope per brief's "Do not edit listing copy or facts" rule.

### Browser-side checks, NOT performed

The brief's 5-check Phase 5 verification protocol requires browser interaction:

1. Page loads without errors
2. Walkthrough video element renders
3. Click play, video plays past 0:00
4. DevTools Console shows ZERO CSP violation errors
5. DevTools Network tab .mp4 returns 200 or 206

I can perform check 1 and 2 at HTML level (both pass). Checks 3, 4, 5 require an actual browser. I cannot do them.

### Why the gap matters

The brief is explicit: "DO NOT proceed to push without all 5 checks passing for both listings. This is the verification protocol that was missed earlier today."

I am stopping here before push to honor that rule, even though all CLI-side conditions are green.

---

## STOP, awaiting Saurabh decision

### What I have ready

- Branch `fix/legacy-video-r2-migration` exists locally with 0 commits (working tree clean except for the to-be-staged source.json + merged JSON + this status file).
- R2 has both videos uploaded and verified at HTTP level.
- Build is clean, rendered HTML is clean.

### What you need to decide

Two paths:

**A. You complete the local browser verification yourself.**
- Run `npm run build && npm run preview` (or `npm run dev`) here.
- Open the two listing URLs in a browser, F12 Console open, click play on each video, verify the 5-check protocol.
- If all 5 checks pass for both listings, tell me to push.

**B. You authorize push to feature branch immediately.**
- I push, CF Pages auto-deploys a preview, you do the 5-check protocol on the CF Pages preview URL.
- This is the same flow the Waterside fix took earlier today (which you greenlit).
- Same outcome, just shifts browser verification from local-preview to CF-Pages-preview. CF Pages preview is closer to production anyway (real CSP headers, real CF edge).

If A: nothing changes on disk; awaiting your local verification.
If B: I push, share the preview URL, you verify.

Files touched on disk so far (uncommitted):
- `data/properties/krisumi-forest-reserve-source.json` (videoMp4s[0].url + .description)
- `data/properties/krisumi-forest-reserve.json` (regenerated by scaffold)
- `data/properties/sobha-aranya-source.json` (videoMp4s[0].url)
- `data/properties/sobha-aranya.json` (regenerated by scaffold)
- `scripts/legacy-video-r2-migration-status.md` (this file)

No commits, no push, no R2 changes pending.
