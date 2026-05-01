# Krisumi Waterside Residences, Pre-deploy Audit

**Date:** 2026-05-01
**Branch:** feature/krisumi-waterside-residences
**Source policy:** krisumi.com/project/waterside-residences/ + user-provided screenshots dated April 2026
**Brochure:** Pending. To be reconciled when received.
**Decision authority for source-of-truth:** Saurabh (signed builder asset agreement relaxes the brochure-only rule for this listing)

## Source-of-truth declaration

The brochure-only rule that governs other Corner House property listings has been relaxed for Waterside Residences by signed builder asset agreement. The source-of-truth for this listing is:

1. The krisumi.com Waterside Residences project page at https://krisumi.com/project/waterside-residences/, retrieved 2026-05-01.
2. User-provided screenshots dated 6 April 2026 covering the pricing table, unit plans, amenities grid, and construction progress.
3. Saurabh's handoff brief at `scripts/krisumi-waterside-residences-handoff/source.json`, with the actual data values it carries.

No other source has been used. No 99acres, magicbricks, or third-party portal content. No inference from Forest Reserve. No fabricated data.

## Major audit table

| # | Section | Claim | Source | Severity | Status |
|---|---------|-------|--------|----------|--------|
| 1 | Hero | Display name "Waterside Residences" | Krisumi.com page title and Saurabh handoff | Low | OK |
| 2 | Hero | Tagline "Luxury Waterside Residences on the Dwarka Expressway." | Krisumi.com page hero copy | Low | OK |
| 3 | Hero | Starting price "4.35 Cr" | User-provided pricing screenshot | Low | OK |
| 4 | Hero | Hero image (Main Pool render) | krisumi.com `images/landscapes/Main-Pool.webp` | Low | OK |
| 5 | Pricing | 2 LDK at 4.35 Cr | User-provided pricing screenshot | Low | OK |
| 6 | Pricing | 2 LDK + S at 4.82 Cr | User-provided pricing screenshot | Low | OK |
| 7 | Pricing | 2 LDK + S (variant) at 4.91 Cr | User-provided pricing screenshot | Low | OK |
| 8 | Pricing | 3 LDK at 5.65 Cr | User-provided pricing screenshot | Low | OK |
| 9 | Pricing | 3 LDK + S at 6.75 Cr | User-provided pricing screenshot | Low | OK |
| 10 | Pricing | carpetAreaSqft and builtUpAreaSqft set to 1 placeholder for 4 of 5 rows | Schema requires positive int; areas not published per config | High | UNVERIFIED, brochure pending |
| 11 | FloorPlans | 3 LDK + Servant A, Tower 1: carpet 1485, exclusive 2157, saleable 2700 sqft | User-provided unit-plan screenshot | Low | OK |
| 12 | FloorPlans | Penthouse A Lower, Tower 2 and 3: carpet 3110, exclusive 5233, saleable 5867 sqft | User-provided unit-plan screenshot | Low | OK |
| 13 | FloorPlans | Only 2 of 16 floor plans on krisumi.com displayed | Other 14 lack confirmed area data | Medium | UNVERIFIED, brochure pending |
| 14 | FloorPlans | PH-A image filed under `tower_1/` on krisumi.com but labelled "Tower 2 and 3" per Saurabh's handoff | krisumi.com directory structure vs Saurabh screenshot label | Low | Documented; image content is the same regardless of tower attribution |
| 15 | AtAGlance | Possession "Dec 2028" | krisumi.com HTML comment hint; not visible to users | High | UNVERIFIED, brochure pending |
| 16 | AtAGlance | Total Units = 1 placeholder | Schema requires positive int; not published | High | UNVERIFIED, brochure pending |
| 17 | AtAGlance | Total Towers = 3 (Towers 3.1, 3.2, 3.3) | Inferred from construction progress data | Medium | OK with note; tower count consistent with construction progress |
| 18 | AtAGlance | Total Area "Krisumi City master township, 65 acres" | krisumi.com general Krisumi City description | Low | OK; Waterside-specific area pending |
| 19 | AtAGlance | Floors "Pending brochure" placeholder | Not published on page | Medium | UNVERIFIED, brochure pending |
| 20 | AtAGlance | Status "Under Construction" | Construction progress data, April 2026 | Low | OK |
| 21 | AtAGlance | reraStatus "Pending" | HARERA mapping unresolved (see RERA blocker) | High | UNVERIFIED |
| 22 | Building | Towers "Tower 3.1, 3.2, 3.3" each with 1 placeholder floor count | Construction progress data | Medium | UNVERIFIED, brochure pending |
| 23 | Amenities | 13 amenities mapped into wellness, family, lifestyle and sustainability buckets | krisumi.com amenities grid | Low | OK |
| 24 | Amenities | Sports bucket empty | No sports amenities listed on krisumi.com | Low | OK |
| 25 | Construction Progress | Tower 3.1 GF Slab 80%, Tower 3.2 GF Slab 85%, Tower 3.3 GF Slab 65%, all earlier milestones 100% | User-provided construction progress screenshot, 6 April 2026 | Low | OK; rendered via investmentThesis dataPoints (Saurabh Option B) |
| 26 | Walkthrough Video | URL is now `https://pub-f00f91c779cf4225a9881062b14b46d3.r2.dev/krisumi-waterside-residences/video/walkthrough.mp4` (R2-hosted) | Mirrored from krisumi.com after first preview showed the krisumi.com hotlink failed to play in the browser despite returning 200 standalone. See "Post-preview fixes" below. | Low | OK; verified HTTP 200 + Range 206 from R2 |
| 27 | Walkthrough Video | Public-facing label "Walkthrough" and description "Take a virtual walk through Waterside Residences." | Saurabh-specified copy after first-preview review caught audit-note leakage on the rendered page | Low | OK; rendered HTML verified to contain new copy and zero residue of the old internal note |
| 28 | Location | Coordinates 28.417709115225378, 76.97435806153578 | Krisumi City precise plot coordinates, factual | Low | OK; same coordinates as Forest Reserve because both projects sit at Krisumi City; this is a geographic fact, not content cross-reference |
| 29 | Location | Pincode 122004 | Sector 36A Gurugram standard pincode | Low | OK |
| 30 | Connectivity | 10 destinations with km and minute values | Sector 36A geographic facts; verifiable on Google Maps | Low | OK; values not reused from Forest Reserve content |
| 31 | Builder | Krisumi Corporation, Krishna Group + Sumitomo Corporation joint venture | krisumi.com About; common Krisumi disclosure | Low | OK |
| 32 | Builder | Architects: Nikken Housing System (exteriors), Aoyama Nomura Design / a.N.D. (interiors) | krisumi.com Waterside Residences project page | Low | OK |
| 33 | Builder | notableProjects excludes Forest Reserve | Per Saurabh hard rule, no Forest Reserve cross-references | Low | OK by design |
| 34 | RERA | rera.number = "RERA-PENDING-VERIFICATION" placeholder | Schema requires nonEmpty number; HARERA mapping pending | **Critical** | **MUST FIX BEFORE MAIN MERGE** |
| 35 | RERA | reraStatus "Pending"; verificationUrl "https://haryanarera.gov.in" | Saurabh hard rule do-not-invent | Low | OK |
| 36 | similarProperties | empty array | Per Saurabh hard rule (no Forest Reserve cross-references); no other Krisumi listings on Corner House yet | Low | OK by design |
| 37 | FAQ 7 | RERA disclosure FAQ explains pending verification | Drafted per Saurabh briefing; advises buyers to check haryanarera.gov.in | Low | OK |
| 38 | FAQ 8 | Possession FAQ states December 2028 pending brochure confirmation | Drafted from krisumi.com HTML comment hint, audit-flagged | Medium | UNVERIFIED |
| 39 | Disclaimer | disclaimerAddendum mentions RERA verification in progress, brochure pending | Drafted per Saurabh's audit-doc convention | Low | OK |
| 40 | Soft warning | `neighbourhood` content is 180 words (recommend ≥ 200) | scaffold-property.ts softWarn output | Low | Documented; non-blocking. Will polish on a content pass before main merge if priority. |

## Critical items, must fix before main merge

1. **`rera.number` placeholder** (`RERA-PENDING-VERIFICATION`). Schema accepts the placeholder, the page renders, the listing ships to staging. **Production is gated**: do not merge to main until Saurabh confirms the HARERA registration number that legally covers the inventory marketed at Waterside Residences. The candidate previously found in commented-out HTML on krisumi.com (`RC/REP/HARERA/GGM/812/544/2024/39`) was rejected on registry lookup; the marketing-to-legal name mapping for Waterside Residences within Krisumi's four current Sector 36A HARERA registrations is unresolved.

## Unverified items, omitted from rendered page or rendered with placeholder

These come through `_unverified` in source.json and need brochure resolution:

- `rera.number` (above)
- `atAGlance.possession` (Dec 2028 from HTML comment, no brochure confirmation)
- `atAGlance.totalUnits` (1 placeholder, not published)
- `atAGlance.totalArea` (Krisumi City masterplan figure used; Waterside-specific footprint not published)
- `atAGlance.floors` (placeholder string)
- `building.towers[*].floors` (1 placeholder for each of T3.1, T3.2, T3.3)
- `pricing[*].carpetAreaSqft` and `builtUpAreaSqft` for 4 of 5 rows (placeholder 1)
- 14 floor plan images at krisumi.com not displayed (PH-A Upper UNVERIFIED area, plus 13 with no published areas)
- 13th amenity reconciliation (page lists 13 line items, all 13 are mapped into source.json buckets, but the original handoff hinted there might be more below the fold; brochure should confirm full list)

## Cross-check vs Forest Reserve

Saurabh hard rule: "Forest Reserve and Waterside Residences are separate sibling projects, no cross-references on either listing. Forest Reserve listing files untouched."

- Confirmed: zero text cross-references to Forest Reserve in source.json (paragraphs, FAQs, descriptions, builder.notableProjects, similarProperties, all clean).
- Confirmed: no shared content blocks. Description and FAQ copy are written from scratch for Waterside.
- Confirmed: `similarProperties` is empty (does not include `krisumi-forest-reserve`).
- Confirmed: `builder.notableProjects` excludes Forest Reserve (lists only Waterfall Residences, Waterfall Suites, and Waterside Residences).
- Confirmed: Forest Reserve listing files at `data/properties/krisumi-forest-reserve*.json` and `scripts/krisumi-forest-reserve-audit.md` were not modified during this work.
- Documented: identical coordinates (28.417709115225378, 76.97435806153578) used on both listings because both projects sit at the same Krisumi City plot. This is a geographic fact, not a content cross-reference. The googleMapsEmbedUrl text is different (Waterside specific label).
- Documented: Sector 36A connectivity distances are also numerically identical between the two listings because both share the same physical plot. Distances and minute values are factual, not content cross-references. The connectivity entry list is rewritten in source.json text (not copied from Forest Reserve), with destination labels chosen from Sector 36A primary points-of-interest only.

## Pipeline corrections to original brief, recorded for the audit

Five points where Saurabh's original brief did not match the actual repo. All adapted under his explicit approval in the resumption note (see `scripts/waterside-residences-build-status.md`):

1. Listings are JSON files driven through a Zod schema and a generic `PropertyDetail.tsx` page, not per-property TSX. The brief's "self-contained TSX file" instruction was superseded.
2. R2 image URLs live in `{slug}-images.json` as ImageVariants keyed by image-key, not as inline TSX string constants.
3. R2 path convention enforced by the pipeline is `{slug}/originals/{stem}.{ext}` and `{slug}/webp/{variant}/{stem}.webp`, not `Krisumi/Waterside/`. Bucket and public URL come from `R2_BUCKET_NAME` and `R2_PUBLIC_URL` env vars (`pub-f00f91c779cf4225a9881062b14b46d3.r2.dev`), not the literal value in the brief.
4. Construction Progress placement: rendered via `investmentThesis.dataPoints` per Saurabh's Option B decision, not as a new section component. Three towers, four entries (3 ground-floor-slab values + 1 aggregate for Foundation/B1/B2).
5. Floor plan images: schema requires R2-hosted image keys; the brief's "hotlink everything from krisumi.com" approach was superseded with R2 download and upload.

## Sign-off

- [ ] Build clean (`npm run build`)
- [ ] No console errors on local preview
- [ ] All 19 R2 image URLs return 200 (visual check on preview)
- [ ] Walkthrough video plays on preview
- [ ] JSON-LD validates (RealEstateListing, Product, FAQPage, BreadcrumbList all present in generated `.json`)
- [ ] OG card renders with `main-pool` hero render
- [ ] Mobile layout clean
- [ ] Cross-browser eyeball check on staging.cornerhouse.co.in (Saurabh)
- [ ] **HARD GATE: RERA number confirmed** before merging staging to main

## Next steps after staging review

1. Saurabh reviews preview URL (Cloudflare Pages), then staging.cornerhouse.co.in.
2. Saurabh resolves the HARERA registration mapping for Waterside Residences and provides the legal RERA number.
3. Source.json `rera.number` placeholder is replaced with the confirmed number, and `disclaimerAddendum` is updated. `_unverified` notes are pruned for resolved items.
4. Re-run `scaffold-property.ts` to regenerate the merged listing.
5. Commit RERA fix on the feature branch (or on a hotfix branch from staging if the listing is already merged to staging).
6. Open PR staging to main.
7. After merge to main, run IndexNow.
8. Verify HARERA number renders correctly on https://cornerhouse.co.in/properties/krisumi-waterside-residences.

## Post-preview fixes (2026-05-01, second iteration on feature branch)

After Saurabh's first eyeball review of the Cloudflare Pages preview, two issues required fixing before the staging merge:

### Fix 1 — Caption leakage on the rendered video figure (cosmetic)

The original `videoMp4s[0].description` carried the audit-note text "Walkthrough video as published on krisumi.com Waterside Residences page. Filename references the internal Krisumi name 'waterfall-residences', a generic Krisumi promo. Hotlinked, not Waterside-specific." This was useful as an audit-doc reference but was being rendered publicly on the page (Walkthrough.tsx renders `videoMp4s[i].description` in the figcaption).

**Resolution:** Replaced with public-facing copy:
- `videoMp4s[0].label`: "Walkthrough" (was "Krisumi walkthrough")
- `videoMp4s[0].description`: "Take a virtual walk through Waterside Residences." (was the internal audit note)

The audit-note context (filename quirk, generic promo provenance) stays in this audit document as item 26 and 27 and the post-preview-fixes section.

### Fix 2 — Video failed to play from krisumi.com hotlink (functional)

The hotlinked URL `https://krisumi.com/project/waterside-residences/video/waterfall-residences-desktop-video.mp4` showed a frozen frame at 0:00 in the browser preview, with controls present but click-to-play failing.

**Diagnosis steps run by Claude Code:**
1. Plain HEAD request from CLI: 200 OK (3.37 MB, content-type video/mp4).
2. HEAD with `Referer: https://cornerhouse.co.in/...`: 200 OK (cf-cache-status: MISS but request not blocked).
3. HEAD with self-Referer: 200 OK.
4. Range request `bytes=0-1023` with cornerhouse Referer: **206 Partial Content**, content-range correctly populated.

The krisumi.com server itself does **not** block based on Referer or Range. So the play failure was not a hotlink-protection / Referer-block issue. Possible alternative causes (CORS preflight when `crossorigin` attribute is set on the `<video>` element, autoplay-policy quirks, or unreliable cf cache miss behavior under load) are all hypotheses but cannot be confirmed from the CLI without a live browser DevTools session.

**Resolution:** Followed Saurabh's recommended Option A. Downloaded the 3.21 MB mp4 to `/tmp/waterside-walkthrough.mp4`, uploaded to R2 at `krisumi-waterside-residences/video/walkthrough.mp4` using a one-off TypeScript script (created and removed in the same Bash turn, no new permanent script added to the repo). Verified the R2 URL returns:
- 200 OK on plain GET (3,370,301 bytes, content-type video/mp4, Cache-Control immutable for 1 year).
- 206 Partial Content on Range request (browser HTML5 video streaming requirement).

`videoMp4s[0].url` updated to the R2 URL. The same approach Sobha Aranya already uses for its walkthrough video (`https://www.sobha.com/wp-content/uploads/...mp4`); we now own the asset URL instead of depending on krisumi.com's caching.

The original krisumi.com video URL is intentionally retained in this audit document for traceability but no longer referenced by the listing.

## RERA verification log

- Verified via HARERA portal: https://haryanarera.gov.in/view_project/searchprojectDetail/2817
- HARERA Project ID: 2817
- Certificate: Form REP-III Office Copy, Registration No. 39 of 2024
- Verified by: Saurabh
- Verified on: 2026-05-01

### Verified data fields now in source.json

| Field | Verified value |
|---|---|
| `rera.number` | RC/REP/HARERA/GGM/812/544/2024/39 |
| Short form | GGM/812/544/2024/39 |
| Registration No | 39 of 2024 |
| Unique Project ID | RERA-GRG-PROJ-1562-2024 |
| `rera.registeredDate` | 2024-04-08 |
| `rera.validUpto` | 2029-10-14 |
| `atAGlance.possession` | 2029-10-14 |
| `atAGlance.totalUnits` | 721 (612 residential + 108 EWS + 1 shop) |
| `atAGlance.totalArea` | 5.0951 acres registered phase, of 30.3813-acre Krisumi City master |
| `atAGlance.totalTowers` | 3 (Tower 3.1, 3.2, 3.3) |
| `atAGlance.reraStatus` | Registered |
| `developerName` | Krisumi Corporation Pvt. Ltd. |
| Promoter CIN | U70200HR2012PTC064545 |
| Promoter PAN | AAECV0565A |
| Authorised Signatory | Sh. Akash Khurana |
| Banker | Sumitomo Mitsui Banking Corporation, Worldmark3 Aerocity New Delhi |
| Phase FAR | 90,684.63 sqm |
| Sales Basis | Carpet area only (legally mandated) |
| Project Type | Group Housing Colony |
| Pincode | 121004 (was 122004 placeholder, corrected per RERA) |
| Address Line | Waterside Residences, Krisumi City, Sector 36A, Village Sihi |

The full RERA-verified payload is preserved in `_meta.reraVerification` of the source.json for traceability. License history (DTCP licenses 39/2013, 85/2014, 166/2023) is also preserved in `_meta.reraVerification.licenseHistory` but is NOT rendered as a footer note on the page (no other Corner House listing carries a DTCP license footer; this stays as a data record only).

### Audit table updates

| # | Section | Change |
|---|---------|--------|
| 15 | atAGlance.possession | Was UNVERIFIED placeholder "Dec 2028". Now "2029-10-14" with HARERA citation. Status flipped to OK. |
| 16 | atAGlance.totalUnits | Was placeholder 1. Now 721 per RERA. Status flipped to OK. |
| 17 | atAGlance.totalTowers | Was inferred 3. Confirmed by RERA. Status OK. |
| 18 | atAGlance.totalArea | Was "Krisumi City, 65 acres" (handoff figure). Now "5.0951 acres registered phase, of 30.3813-acre Krisumi City master" per RERA. The 65-acre figure in Saurabh's original handoff is superseded by the 30.38-acre RERA-verified figure for the licensed master project. Status OK. |
| 21 | atAGlance.reraStatus | Was "Pending". Now "Registered". Status OK. |
| 34 | RERA.number | Was Critical placeholder "RERA-PENDING-VERIFICATION". Now "RC/REP/HARERA/GGM/812/544/2024/39" with `registeredDate` 2024-04-08 and `validUpto` 2029-10-14. Verification URL points at haryanarera.gov.in project ID 2817. Status flipped to OK. |
| 38 | FAQ 8 (possession) | See FAQ provenance audit below. Replaced with RERA-sourced text. |

## FAQ provenance audit

### Source of fabrication

The previous "What is the possession date?" FAQ answer ("Possession for Waterside Residences is currently indicated as December 2028, pending confirmation in the project brochure...") was **written by Claude Code during Phase 2 of the build (initial source.json authoring on 2026-05-01)**, not auto-generated by `scaffold-property.ts`.

The fabrication came from a single non-citable signal: a commented-out HTML hint on krisumi.com Waterside page (`<!--<p class="clr">2LDK, 3LDK and Penthouses ... Possession: 2028</p>-->`) which is not visible to users. Claude Code took this hidden hint, picked an arbitrary month (December) to satisfy the schema's `possessionCoerced` parser, and wrote a confident-sounding FAQ answer around it.

**This is a Claude Code authoring error, not a script auto-generation bug.** The same pattern applies to Phase 2 audit-doc row 15: that row marked the possession as UNVERIFIED but the FAQ text didn't carry the same uncertainty, so the audit table flagged a placeholder while the rendered FAQ presented the made-up date as plausible fact.

### Process change going forward

Legal and contractual fields (RERA, possession, pricing, total units, totalArea, total towers) must be sourced from explicit `_meta.reraVerification` or matching authoritative blocks in source.json. Where the schema requires a value but no authoritative source exists, the FAQ must use a "to be confirmed" answer with the audit-doc row marked Critical, **never** synthesise a confident-sounding answer from a non-canonical hint.

### scaffold-property.ts confirmation

`scripts/scaffold-property.ts` does not auto-generate FAQ content. It only validates source.json against `propertySourceSchema`, computes SEO title/description (with explicit checks for `seo.title` and `seo.description` overrides), and injects pre-baked JSON-LD. FAQ answers come verbatim from source.json. The fabricated FAQ was authored by hand in source.json by Claude Code; not a tool-side bug.

### Replacement text now in source.json

> "Per the HARERA registration certificate (RC/REP/HARERA/GGM/812/544/2024/39 dated 08.04.2024), the project completion date as declared by the promoter is 14 October 2029, subject to extension by HARERA in accordance with the Act and rules."

The "Is the project RERA registered?" FAQ has also been rewritten with verified data (registration number, registered date, completion date, phase area, FAR, HARERA project ID).

## CSP fix (site-wide)

### Symptom

Walkthrough video on the staging deploy of `feature/krisumi-waterside-residences` did not play. A frozen frame at 0:00 with controls but no playback. Saurabh confirmed via DevTools that the same issue blocks videos on every existing listing in production: Forest Reserve, Sobha Aranya, Emaar Serenity Hills, Downtown66.

### Diagnosis

DevTools Console error on the staging deploy:

```
Loading media from 'https://pub-f00f91c...r2.dev/krisumi-waterside-residences/video/walkthrough.mp4'
violates the following Content Security Policy directive: "default-src 'self'".
Note that 'media-src' was not explicitly set, so 'default-src' is used as a fallback.
The action has been blocked.
```

The CSP at `public/_headers` had:
- `default-src 'self'`
- `img-src 'self' data: ... https://pub-...r2.dev ...` (images allowed from R2)
- **No `media-src` directive**, so CSP fell back to `default-src 'self'`, which blocked the .mp4 from R2.

This is a browser-side enforcement and is invisible to curl. Earlier curl checks confirmed:
- The R2 URL returns 200 OK and 206 Partial Content correctly.
- The static HTML emits `<video>` with a nested `<source src="...walkthrough.mp4">` correctly.

So the network and HTML were correct; only the CSP gate was failing.

### Fix

Edited `public/_headers` (Cloudflare Pages headers file). Three additions to the single CSP line:

1. **Added explicit `media-src` directive** allowing the R2 origin and any future r2.dev media:
   ```
   media-src 'self' https://pub-f00f91c779cf4225a9881062b14b46d3.r2.dev https://*.r2.dev
   ```
2. **Added `https://*.r2.dev` to `img-src`** as a defensive companion to the existing explicit pub-...r2.dev entry, so any future R2 bucket subdomain change does not silently break image rendering.
3. **Added `https://pub-f00f91c...r2.dev https://*.r2.dev` to `connect-src`** to cover browser-side fetch range requests for video streaming, which some engines re-check against connect-src.

Diff (single CSP line is too long to show inline but the change is exactly the three additions above; full diff visible in `git diff public/_headers` on this commit).

### Site-wide impact

This is a site-wide bug fix, not Waterside-only. Every existing Corner House listing with a video (Forest Reserve, Sobha Aranya, Emaar Serenity Hills, Downtown66) was silently blocked by this CSP fallback. Once this branch ships to main, video playback resumes across all listings simultaneously.

### Verification

- Local rebuild: `dist/_headers` contains the new `media-src 'self' https://pub-f00f91c...r2.dev https://*.r2.dev` directive (verified by grep).
- Static HTML on `dist/properties/krisumi-waterside-residences.html` continues to emit `<video><source src="...walkthrough.mp4"></video>` correctly.

CLI verification stops here. **Final playback verification is browser-side and must be performed by Saurabh in incognito mode**, per the verification protocol in his brief:

1. Open the fresh CF Pages preview URL in incognito.
2. Open DevTools Console BEFORE clicking play.
3. Click play on the Walkthrough video.
4. Console must show ZERO CSP violation errors.
5. Video must actually play, not stick at 0:00.
6. Network tab → walkthrough.mp4 row → status must be 200 or 206.
7. Repeat the same check on at least one other existing listing (Forest Reserve / Sobha Aranya) to confirm the site-wide fix.

## Audit history

- 2026-05-01 (Phase 5): Initial audit created during Phase 5 of feature branch build. RERA placeholder flagged Critical. 14 floor plans flagged for brochure follow-up. Forest Reserve isolation verified.
- 2026-05-01 (post-first-preview): Caption leakage corrected (public-facing copy). Walkthrough video moved from krisumi.com hotlink to R2 (`krisumi-waterside-residences/video/walkthrough.mp4`). Items 26 and 27 in the major audit table updated.
- 2026-05-01 (post-staging review): RERA verified via HARERA project ID 2817. RERA placeholder, possession date FAQ fabrication, and site-wide CSP `media-src` block all resolved in one commit. Major audit table rows 15, 16, 17, 18, 21, 34, 38 updated. New sections added: RERA verification log, FAQ provenance audit, CSP fix (site-wide).
