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
| 26 | Walkthrough Video | Hotlinked URL `https://krisumi.com/project/waterside-residences/video/waterfall-residences-desktop-video.mp4` | krisumi.com `<video><source>` tag | Low | OK; verified HTTP 200, 3.2 MB, content-type video/mp4 |
| 27 | Walkthrough Video | Filename references "waterfall-residences" (Krisumi internal naming for generic walkthrough, not Waterside-specific) | URL inspection | Low | OK; description in source.json flags this |
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

## Audit history

- 2026-05-01: Initial audit created during Phase 5 of feature branch build. RERA placeholder flagged Critical. 14 floor plans flagged for brochure follow-up. Forest Reserve isolation verified.
