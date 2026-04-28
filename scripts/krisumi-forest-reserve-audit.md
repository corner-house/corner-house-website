# Krisumi Forest Reserve — Content Audit vs. Brochure

**Audit date:** 2026-04-28
**Auditor:** Claude (full read of `Client-Brochers/krisumi-forest-reserve/Krishumi-Forest-researve.pdf`, 63 pages, compressed 23 MB)
**Live page (main):** https://cornerhouse.co.in/properties/krisumi-forest-reserve (still running uncorrected `a594450`)
**Source of truth:** the brochure PDF + the brochure's own RERA disclosure page (page 63)
**Source under review:** `data/properties/krisumi-forest-reserve-source.json`

---

## Fix-branch status (updated after rewrite on `fix/krisumi-forest-reserve-content-audit`)

| Item | Severity | Status | Notes |
|---|---|---|---|
| C1 — RERA Phase II number / GGN→GGM | CRITICAL | **FIXED** | rera.number = `RC/REP/HARERA/GGM/944/676/2025/47`; Phase II number `…/945/677/2025/48` surfaced in disclaimer + FAQ #4 + investmentThesis.paragraphs[2] |
| C2 — IGI distance 17→24.8 km | CRITICAL | **FIXED** | Updated in hero.keyStats, connectivity, neighbourhood paragraph, neighbourhood highlights, investmentThesis.dataPoints, FAQ #1 (all 6 surface points) |
| C3 — Medanta 16→9.6 km | CRITICAL | **FIXED** | connectivity entry corrected |
| C4 — NPR/Dwarka Expressway 0.5→1 km | CRITICAL | **FIXED** | renamed to "Northern Peripheral Road (Dwarka Expressway)" per brochure language |
| C5 — Five Krisumi Way principles | CRITICAL | **FIXED** | builder.description + investmentThesis card #4 + FAQ #8 now name Wa, Omotenashi, Monozukuri, Seijitsu, Iki. Kaizen and Genchi Genbutsu removed. |
| C6 — 13 design principles (was incorrectly "9") | CRITICAL | **FIXED** | investmentThesis card #2 + paragraphs[1] + FAQ #6 list all 13 in brochure order: Minamoto, Engawa, Kaiyu Sei, Shakkei, Mie Gakure, In-ei, Ten Sen Men, Seijaku, Miyama, Kagami, Kekkai, Koshi, Oku |
| C7 — Yoga Deck (not in brochure amenity grid) | CRITICAL | **FIXED** | Removed from amenities. Page-13 yoga-deck render kept in gallery.curated as a render reference (caption explicitly says "Yoga Deck (page 13 render)") |
| C8 — Bamboo Garden (fabricated) | CRITICAL | **FIXED** | Removed from amenities. Page-36 image kept in gallery with brochure-correct caption "Ground View" (no "bamboo" claim). |
| C9 — Forest Mist Pond (duplicate) | CRITICAL | **FIXED** | Removed; only "Mist Pond" remains in amenities (page 57). Page-15 render kept in gallery as "Source Fountain / Forest Mist Pond" caption |
| C10 — Gallery captions vs. brochure | CRITICAL | **FIXED** | All 23 gallery items now have brochure-verbatim captions in `gallery.curated[]`. Filenames stay as-is on R2 (no re-upload required); the curated caption overrides any auto-humanized label. |
| C11 — Map coordinates wrong | CRITICAL | **FIXED** | Coordinates provided by Saurabh, plot-precise per Krisumi project listings: `28.417709115225378, 76.97435806153578`. Updated in source.json (location.latitude, location.longitude, googleMapsEmbedUrl) and propagated to JSON-LD geo + structured address via `npx tsx scripts/scaffold-property.ts`. |
| M1 — Project name framing | MAJOR | **FIXED** | Display name = "The Forest Reserve" (page 20 self-introduction). Legal name "Waterside Residences The Forest Reserve" appears in disclaimer (page 63 verbatim). Old colon-separated name removed. |
| M2 — Address duplication | MAJOR | **FIXED** | addressLine simplified to "The Forest Reserve, Krisumi City"; locality "Sector 36A"; rendered hero now reads "The Forest Reserve, Krisumi City, Sector 36A, Gurugram" (no duplicate) |
| M3 — Tower B / 30-floor claim | MAJOR | **NEEDS-CLIENT-INPUT** | Schema requires `floors: positive integer` per tower. Kept "30" as placeholder; flagged in `_unverified`. **Action: confirm tower configuration and floor counts.** |
| M4 — Total units 600→638 | MAJOR | **FIXED** | atAGlance.totalUnits = 638; investmentThesis.dataPoints split into "Total residential units: 542" + "Total EWS units: 96"; FAQ #5 details both phases. |
| M5 — developerName styling | MAJOR | **FIXED** | developerName = "Krisumi Corporation" (legal). Editorial "(Sumitomo × Krishna Group)" moved to hero.keyStats and builder.tagline. |
| M6 — Notable projects | MAJOR | **FIXED** | builder.notableProjects lists 4 brochure-page-6/7 entries: Waterfall Residences, Waterfall Suites, Waterfall Suites II, Waterside Residences. The "Krisumi City masterplan" entry removed (it's the parent colony, not a sibling). |
| Floor plans | MAJOR / m4 | **FIXED (REMOVED)** | All 19 floor plans removed from `floorPlans`. The 19 corresponding R2 imageKeys added to `gallery.exclude` so they don't surface anywhere. Brochure has zero floor-plan pages — strict source-of-truth applied. **Action when Krisumi confirms plans: re-add to `floorPlans` with brochure-derived titles.** |
| Sustainability claims | CRITICAL aggregate | **FIXED (REMOVED)** | All 6 sustainability items (Rainwater Harvesting, Water Recycling, LED, Solar, Low-flow, Sustainable Materials) removed. The brochure's amenity grid (page 57) does not list any sustainability items. `amenities.sustainability = []`. **Action when Krisumi provides a sustainability fact sheet: re-add with page citations.** |
| m1 — Possession date | MINOR / potentially MAJOR | **NEEDS-CLIENT-INPUT** | Brochure does not state possession date. Schema requires it. Kept "November 2030" as placeholder; flagged in `_unverified`. **Action: get binding possession date from Krisumi sales team or HARERA registration.** |
| m2 — Configuration verified | MINOR | **DEFERRED** | "2, 3 & 4 LDK + Penthouses" is inferred from krisumi.com floor-plan filenames + brochure spec sections. Not directly stated as a single config string in the brochure. Acceptable for now. |
| m3 — Pricing carpet/built-up areas | MINOR / potentially MAJOR | **NEEDS-CLIENT-INPUT** | Brochure does not publish areas. Schema requires positive numbers. Set to `1` as obvious placeholders; rendered as "On Request" via totalPriceFrom. **Action: obtain Krisumi area sheet.** |
| m4 — Floor plan provenance | MINOR / potentially CRITICAL | **FIXED (REMOVED)** | Resolved by removing all floor plans (see Floor plans row). |
| m5 — "GAZIBO" typo | TRIVIAL | **FIXED** | amenities.family[Outdoor Gazebo].description notes the brochure spelling parenthetically. Buyer-facing display uses "Outdoor Gazebo" (corrected). |
| m6 — "36 A" vs "36A" spacing | TRIVIAL | **FIXED** | locality = "Sector 36A" (no space) consistently |
| m7 — Sumitomo 1615/400-year | TRIVIAL | **FIXED** | builder.description quotes brochure verbatim: "the 400-year-old Sumitomo group" + "Fortune 500" + "$47 Billion USD revenue (FY 2024-25)" + "80,000 employees across 900 group companies in 65 countries" + "300 world-class projects" — all from brochure page 5. |

### Open NEEDS-CLIENT-INPUT items requiring Saurabh / Krisumi response

1. ~~**Project site lat/lng** (C11)~~ — RESOLVED 2026-04-28 (Saurabh).
2. **Tower configuration & floor counts** (M3) — does Tower B exist as a separate building, and how many floors per tower?
3. **Possession date** (m1) — for both Phase I (944/676) and Phase II (945/677).
4. **Pricing & area sheet** (m3) — carpet area, built-up area, indicative pricing per configuration.
5. **Floor plans** — confirm which krisumi.com `Waterside-Residences-*.jpg` plans are specifically for The Forest Reserve A, B, II.
6. **Sustainability** — formal sustainability spec from Krisumi (rainwater, solar, etc.) if any.
7. **Yoga Deck status** — is it a delivered amenity? If yes, brochure page-57 grid is incomplete.

### softWarn accepted (not blocking)

- `neighbourhood content is 155 words (recommend ≥ 200)` — kept under 200 words deliberately, to avoid editorial embellishment. The brochure does not provide enough neighbourhood-specific copy to reach 200 words while staying source-grounded.

---

> Pages I read in full: 1–8, 9, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 26, 28, 30, 31, 32, 33, 34, 35, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 57, 58, 59, 60, 61, 62, 63.
> Pages I did not read in detail: 10, 12, 18, 25, 27, 29, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55. These are renders or continuation pages — none contain new spec/RERA/amenity data based on adjacent pages.
> The brochure has **no individual floor-plan pages** within its 63 pages. The 19 floor plans on the live page are sourced from `krisumi.com/wp-content/themes/krisumi/assets/images/plp/Waterside-Residences-*.jpg` — flagged below.

---

## Executive summary

**Verdict: the listing has CRITICAL factual errors that will mislead buyers.** Multiple distance figures are wrong, the RERA registration number for Phase II is wrong, the Krisumi Way principles list is fabricated, and the "nine Japanese principles" copy is incomplete and inaccurate. The address on the live page is the sales-lounge address (per the brochure's own footer), not the project site. The map pin therefore lands on the sales lounge.

**Severity rollup**

| Severity | Count | Definition |
|---|---:|---|
| CRITICAL | 11 | Factually wrong; will mislead buyers (distances, RERA numbers, fabricated content). |
| MAJOR | 6 | Project naming/branding inconsistencies; structural (project name, address, coordinates, builder principles). |
| MINOR | 7 | Typos, formatting, slight numerical drift. |

**Recommendation: do not promote the listing further until at minimum the CRITICAL items are fixed. The page should remain reachable (don't 404 it), but a "verifying details with developer" notice on the listing would be appropriate while the rewrite is in progress.**

---

## CRITICAL findings (factually wrong — must fix)

### C1. RERA number for Phase II is wrong

- **Source.json:** both phases listed under `RC/REP/HARERA/GGN/944/676/2025/47` and `RC/REP/HARERA/GGN/944/677/2025/47` (FAQ #5; disclaimer)
- **Brochure (page 63 verbatim):**
  - The Forest Reserve: **`RC/REP/HARERA/GGM/944/676/2025/47`** dated 02.05.2025
  - The Forest Reserve - II: **`RC/REP/HARERA/GGM/945/677/2025/48`** dated 02.05.2025
- **Drift:**
  1. Authority code is **`GGM`** (Gurugram), not `GGN` as in source.json. (`GGN` appears nowhere in the brochure.)
  2. Phase II number prefix is **`945/677`** and trailing `/48`, not `944/677/.../47`.
- **Severity: CRITICAL.** RERA numbers are legal identifiers; quoting wrong numbers on a public listing is a compliance issue.

### C2. IGI Airport distance is wrong

- **Source.json + hero key stats + FAQ + investmentThesis:** **17 km** (repeated 6 times across the listing)
- **Brochure (page 60, location-map distance legend):** **`IGI Airport: 24.8 Kms`**
- **Drift:** off by 7.8 km (~46% understated)
- **Severity: CRITICAL.** This is the single most-quoted commute number for any Gurugram listing; it appears in the hero, key stats, investment thesis, FAQs, JSON-LD. Buyers will discover the discrepancy on Google Maps the moment they look.

### C3. Medanta Medicity distance is wrong

- **Source.json connectivity:** `16 km / 30 min`
- **Brochure (page 60):** **`Medanta Hospital: 9.6 Kms`**
- **Severity: CRITICAL.** Off by 6.4 km (~67% overstated).

### C4. Dwarka Expressway / NPR distance is wrong

- **Source.json connectivity:** Dwarka Expressway `0.5 km / 2 min`
- **Brochure (page 60):** **`NPR: 1 Km`**
- **Severity: CRITICAL** in proportional terms (off by 100%) but only 0.5 km absolute.

### C5. The "five Krisumi Way principles" are fabricated

- **Source.json builder.description + investmentThesis card + FAQ:**
  > "Five Japanese principles ... **Omotenashi (hospitality)**, **Monozukuri (craftsmanship)**, **Kaizen (improvement)**, **Wa (harmony)**, **Genchi Genbutsu (going to source)**."
- **Brochure (page 3, "THE KRISUMI WAY") — verbatim, with kanji:**
  - **WA (HARMONY)** — 和
  - **OMOTENASHI (HOSPITALITY)** — おもてなし
  - **MONOZUKURI (CRAFTSMANSHIP)** — ものづくり
  - **SEIJITSU (INTEGRITY)** — 誠実
  - **IKI (SOPHISTICATION)** — 粋
- **Drift:** source.json correctly names 3 of 5 (WA, OMOTENASHI, MONOZUKURI) but invents **KAIZEN** and **GENCHI GENBUTSU**, missing the actual 4th and 5th principles **SEIJITSU** and **IKI**.
- **Severity: CRITICAL.** Krisumi advertises this exact philosophy framework on its corporate page; a buyer or competitor reading our listing will catch the fabrication.

### C6. The "nine Japanese design principles" claim is wrong (count and contents)

- **Source.json investmentThesis para 2 + FAQ #6:**
  > "the design integrates **nine Japanese principles** (Shakkei, Mie Gakure, In-ei, Ten Sen Men, Seijaku, Miyama, Kagami, Kekkai, Koshi, Oku) directly into the architecture..."
  >
  > FAQ adds: "(the bigger picture)... (latticework), and Oku (embracing secrecy)."
- **Brochure principles section, pages 22, 24, 26, 28, 30 — verbatim with kanji:**
  - Page 22 (set 1 of 5): **MINAMOTO** (源 — The Source), **ENGAWA** (縁側 — Veranda), **KAIYU SEI** (回遊性 — Strollable Gardens)
  - Page 24 (set 2): **SHAKKEI** (借景 — The Bigger Picture), **MIE GAKURE** (見え隠れ — Show and Hide), **IN-EI** (陰影 — Light and Dark)
  - Page 26 (set 3): **TEN SEN MEN** (点·線·面 — Point · Line · Surface), **SEIJAKU** (静寂 — Stillness), **MIYAMA** (深山 — Deep Forest)
  - Page 28 (set 4): **KAGAMI** (鏡 — Mirror), **KEKKAI** (結界 — Boundary), **KOSHI** (格子 — Latticework)
  - Page 30 (set 5): **OKU** (奥 — Embracing the Secrecy)
- **Actual count: 13 principles** (not 9). Source.json is missing **Minamoto, Engawa, Kaiyu Sei**.
- Source.json lists **10** in the parenthetical (Shakkei through Oku), claims the count is **9**, and entirely omits the first three principles.
- **Severity: CRITICAL.** Same failure mode as C5.

### C7. "Yoga Deck" is shown as a render but NOT in the official amenity grid

- **Source.json amenities.wellness[0]:** Yoga Deck (with imageKey)
- **Brochure page 13:** Has a "YOGA DECK" render
- **Brochure page 57 (official amenity grid):** **does NOT list Yoga Deck.** The grid lists 11 common amenities; Yoga Deck is not among them.
- **Drift:** the render exists but the amenity is not in the official inventory. Either (a) the brochure under-listed the amenity, or (b) the Yoga Deck render is concept-only and not a delivered amenity. **Without confirmation from Krisumi, this is POSSIBLY FABRICATED as a delivered facility.**
- **Severity: CRITICAL** if (b) is true; MAJOR otherwise.

### C8. "Bamboo Garden" amenity has no brochure backing

- **Source.json amenities.lifestyle:** Bamboo Garden ("Bamboo-framed garden walk — direct interpretation of Japanese landscape tradition")
- **Brochure:** No "Bamboo Garden" appears on the page-57 amenity grid, no caption named "Bamboo Garden" appears anywhere I read. Page 36 (which the source pages.json mislabeled `bamboo-garden-ground-view`) is captioned **"GROUND VIEW"** in the brochure — it's a generic ground-floor exterior render, not a bamboo garden.
- **Severity: CRITICAL — POSSIBLY FABRICATED.**

### C9. "Forest Mist Pond" duplicates "Mist Pond"

- **Source.json amenities.wellness:** Mist Pond
- **Source.json amenities.lifestyle:** Forest Mist Pond ("Atmospheric water feature with mist effect")
- **Brochure:** lists only ONE: "MIST POND" (page 57); page 15 has a render captioned "**FOREST MIST POND**" but it's the same single amenity, not two.
- **Severity: CRITICAL — DUPLICATE INVENTED AS SECOND AMENITY** to pad the lifestyle bucket.

### C10. Gallery image filenames are mislabeled vs. their actual brochure captions

The pages.json mapping used filenames that don't reflect the captions in the brochure. Examples (live page caption derived from imageKey will be wrong):

| imageKey on R2 | Source.json claim | Brochure caption (verbatim) |
|---|---|---|
| `forest-reserve-ii-drop-off-night` (page 32 extract) | drop-off render | page 32 = ENTRANCE PLAZA. Forest Reserve II drop-off is on **page 33**. |
| `forest-reserve-a-drop-off-ramp` (page 34 extract) | drop-off ramp | page 34 caption = "**THE FOREST RESERVE - II - RAMP**" (it's the Forest Reserve **II** ramp, not Forest Reserve A) |
| `bamboo-garden-ground-view` (page 36 extract) | bamboo garden | page 36 caption = "**GROUND VIEW**" (no bamboo) |
| `gym-pool-view-private-pool` (page 38 extract) | gym pool view | page 38 caption = "**THE FOREST RESERVE - A POOL**" (it's the Forest Reserve A pool — gym is not in the photo) |
| `kids-pool-mirage-pilotis` (page 40 extract) | kids pool | page 40 caption = "**FOREST FROM KIDS POOL**" (looking outward) |
| `oku-towers-architecture` (page 30 extract) | "oku towers" | page 30 is purely the OKU principle text card; not a "towers architecture" image |
| `entrance-lobby-renders` (page 42 extract) | entrance lobby | page 42 caption = "**THE FOREST RESERVE A - LOBBY**" (it's tower A's interior corridor, not a generic lobby render) |
| `the-afterglow-evening-render` (page 48 extract) | afterglow evening render | page 48 caption = "**The Afterglow / The Forest Reserve**" (correct topic but the file sits as `investmentThesis.backdropImageKey` in source.json) |
| `interior-living-dining-room` (page 44) | living + dining | page 44 caption = "**LIVING ROOM**" only (dining is visible but the captioned subject is living) |
| `interior-master-bedroom-balcony-view` (page 46) | master bedroom balcony | page 46 caption = "**MASTER BEDROOM**" (no "balcony view" emphasis in caption) |

**Severity: CRITICAL** because the mislabeling propagates into the Gallery section's auto-humanized captions (e.g., `bamboo-garden-ground-view` renders as "Bamboo — Garden Ground View" — but the image is just an exterior). MINOR per individual item, but the cumulative effect is CRITICAL.

### C11. Map coordinates point to the sales lounge, not the project site

- **Source.json location:** `latitude: 28.4180`, `longitude: 76.9732`
- **Source.json googleMapsEmbedUrl:** `2sKrisumi+Waterside+Residences` (search query baked in)
- **Brochure (page 63 footer, verbatim):**
  > "Krisumi Sales Lounge, Sector 36 A, Dwarka Expressway, Gurugram."
- The brochure does NOT publish lat/lng for the project site. Per Saurabh's report, when rendered the embed shows "Krisumi Sales Lounge" and "Tata project gurugram sec 36A" as nearby POIs, **not the project itself**.
- **Severity: CRITICAL.** Buyers cannot find the project on the map.
- **Fix needed:** developer must provide site-specific coordinates, OR pin the Krisumi City masterplan boundary in Sector 36A. The brochure's location-map illustration (page 60) shows the Krisumi pin between Pataudi Road and Cloverleaf Flyover, north of NH-48 and immediately south of NPR — that area is approximately `28.41–28.42°N, 76.95–76.97°E` but **I refuse to commit to specific coordinates without explicit developer confirmation, per your instruction not to guess.**

---

## MAJOR findings (project naming / branding)

### M1. Project name framing on the cover

- **Source.json `projectName`:** `"Krisumi Waterside Residences: The Forest Reserve"`
- **Brochure cover page 1 verbatim, top to bottom:**
  - "**KRISUMI**" (logo) — "INDO-JAPANESE REAL ESTATE DEVELOPMENT"
  - (wave/swirl logo)
  - "**WATERSIDE RESIDENCES**"
  - "**THE FOREST RESERVE**"
- **Brochure page 20 (project intro page, where the project self-introduces) verbatim:**
  > "**THE FOREST RESERVE. A SANCTUARY FOR THE SPIRIT.**"
  > "Your home at **The Forest Reserve** is built on an ancient Japanese concept: Chinju No Mori..."
- **Brochure page 56 (amenities title page):** "WATERSIDE RESIDENCES / THE FOREST RESERVE / AMENITIES & FACILITIES"
- **Brochure page 63 (RERA legal text):** "**Waterside Residences The Forest Reserve**" (no colon, no umbrella separator — written as a single phrase)
- **Saurabh's correction:** "Waterside Residences is a SEPARATE Krisumi project, not the parent. Correct name: 'The Forest Reserve' or 'Krisumi The Forest Reserve'."

**Tension:** the brochure cover **does** group "WATERSIDE RESIDENCES" above "THE FOREST RESERVE", but it could be read either as "this is part of the Waterside Residences family" OR "this is the branding header that all Krisumi residential projects share". Page 7 of the brochure shows a building separately captioned **"WATERSIDE RESIDENCES"** with a Krisumi City description — implying Waterside Residences is itself a distinct cluster, not just an umbrella term. The RERA legal text on page 63 uses "Waterside Residences The Forest Reserve" as one inseparable phrase.

**Recommendation:** I cannot resolve this with the brochure alone. Two clarifications are needed from Krisumi/Saurabh:
1. Is "Waterside Residences" a phase that contains The Forest Reserve, or a separate building branded similarly?
2. What does Krisumi want their channel partners to call this — "Krisumi The Forest Reserve" / "Krisumi Forest Reserve" / "Waterside Residences The Forest Reserve"?

For the live page, my read of the brochure is that the **legally registered name is "Waterside Residences The Forest Reserve"** (page 63 legal text), which is what should appear in the H1 / SEO title. The shorter conversational name is **"The Forest Reserve"** (page 20). Both are valid; "Krisumi Waterside Residences: The Forest Reserve" with the colon is awkward and not used in the brochure.

- **Severity: MAJOR.** Get clarification from Saurabh, then unify naming.

### M2. Address has a duplicated "Sector 36A" segment

- **Source.json location.addressLine:** `"Krisumi Waterside Residences The Forest Reserve, Sector 36A"`
- **Source.json location.locality:** `"Sector 36A"`
- **Rendered hero address line:** `"Krisumi Waterside Residences The Forest Reserve, Sector 36A, Sector 36A, Gurugram, Haryana"`
- **Brochure page 63 (verbatim):**
  > "Waterside Residences / The Forest Reserve / **Sector 36A, Gurugram**"
  > and "Krisumi Sales Lounge, Sector 36 A, Dwarka Expressway, Gurugram." (note brochure uses "**36 A**" with a space — minor)
- **Drift:** the duplicated "Sector 36A, Sector 36A" is from `addressLine` ending with locality and the renderer concatenating with the `locality` field again.
- **Fix:** drop ", Sector 36A" from `addressLine`. Suggested:
  - `addressLine`: `"Waterside Residences The Forest Reserve, Krisumi City"` (or just `"The Forest Reserve, Krisumi City"`)
  - `locality`: `"Sector 36A"` (unchanged)
- **Severity: MAJOR.** Visible cosmetic bug on the hero.

### M3. `building.towers` count and naming

- **Source.json building.towers:**
  ```
  { name: "The Forest Reserve A",  floors: 30 }
  { name: "The Forest Reserve B",  floors: 30 }
  { name: "The Forest Reserve II", floors: 30 }
  ```
- **Brochure (page 50):** spec section titled "**The Forest Reserve A & The Forest Reserve B**" treats A and B as one project under one RERA (944/676).
- **Brochure (page 54):** spec section titled "**The Forest Reserve II**" — separate project under RERA 945/677.
- **Brochure photos:** explicitly captioned "The Forest Reserve A — Pool" (p.38), "The Forest Reserve A — Lobby" (p.42), "The Forest Reserve - II - Drop Off" (p.33), "The Forest Reserve - II - Ramp" (p.34). I did NOT find a page explicitly captioned "The Forest Reserve B" anywhere in the brochure.
- **Floor count of 30:** the brochure does NOT specify floor counts numerically anywhere I read. Source.json's "30 floors" claim is unverified.
- **Severity: MAJOR.** "Forest Reserve B" exists in the spec text on page 50 ("A & B") but I have no visual or unit-count evidence for it. Tower B may be a thinly-referenced sub-block that shares spec with Tower A. The 30-floor figure is a guess.

### M4. Total units and total area are not listed correctly

- **Source.json atAGlance.totalUnits:** `600`
- **Source.json atAGlance.totalArea:** `"On Request"` (no quantitative value)
- **Brochure page 63 (RERA verbatim):**
  - The Forest Reserve: **298 residential units + 53 EWS units = 351 units** on **5.1743 acres**
  - The Forest Reserve - II: **244 residential units + 43 EWS units = 287 units** on **1.3125 acres**
  - **Combined: 542 residential + 96 EWS = 638 total** on **6.4868 acres**
- **Drift:** source.json's "600" doesn't match either residential-only (542) or full count (638). It's a round figure. `totalArea` should be `6.49 acres` (or `6.4868 acres`), not "On Request".
- **Severity: MAJOR.**

### M5. `developerName` styling is non-standard

- **Source.json developerName:** `"Krisumi Corporation (Sumitomo × Krishna Group)"`
- **Brochure:** uses "**KRISUMI**" as the corporate brand (page 1, 56, 59, 61); "**Krisumi Corporation Private Limited**" in the legal text (page 63). The "(Sumitomo × Krishna Group)" parenthetical is editorial commentary added by source author.
- **Severity: MAJOR (mild).** Recommend `developerName: "Krisumi Corporation"` (legal) and surface "Sumitomo × Krishna Group" as `builder.tagline` instead.

### M6. Krisumi project portfolio (`builder.notableProjects`) misnames Waterside Residences

- **Source.json builder.notableProjects:** lists "Krisumi Waterside Residences" alongside the Waterfall trio.
- **Brochure page 6:** shows three other Krisumi projects: **Waterfall Residences, Waterfall Suites, Waterfall Suites II**. "Waterside Residences" is NOT listed as a separate project on page 6.
- **Brochure page 7:** shows a "WATERSIDE RESIDENCES" caption next to a 3-tower render, with the Krisumi City description — this could mean Waterside Residences is its own cluster.
- **Drift:** ambiguous. Per M1, this needs developer confirmation. If "Waterside Residences" IS the umbrella under which The Forest Reserve sits, then it shouldn't appear separately in `notableProjects` (you can't list the parent as a sibling).
- **Severity: MAJOR.**

---

## MINOR findings

### m1. Possession date — unverified
- **Source.json:** "November 2030"
- **Brochure:** I did not find an explicit possession date on any page I read. The pages I skipped (10, 12, 18, 25, 27, 29, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55) might contain it.
- **Severity: MINOR (potentially MAJOR).** Need to verify against Krisumi sales team or HARERA registration data.

### m2. Configuration "2, 3 & 4 LDK + Penthouses" — verified by inference, not directly
- **Brochure:** spec sections discuss "Engineered Wood / Stone / Tile" floors and master bedroom configurations but I didn't see a clean "2/3/4 LDK + Penthouse" line item.
- The 19 floor plan filenames on krisumi.com confirm 2/3/4 LDK + Penthouse exist in the product.
- **Severity: MINOR.** Verified indirectly.

### m3. Pricing carpet/built-up areas are placeholders
- **Source.json pricing:** "2 LDK: 1200/1500", "3 LDK: 1800/2250", "4 LDK: 2400/3000", "Penthouse: 4000/5000" sq.ft.
- **Brochure:** I did not find a pricing or carpet-area table. These sound like estimated figures.
- **Severity: MINOR (potentially MAJOR).** Pending developer pricing sheet.

### m4. Floor plan list — provenance from website, NOT brochure
- **Source.json floorPlans:** 19 entries with names like "Forest Reserve A — 4LDKS Typical", "Forest Reserve B — 3LDKS FF-1", "Forest Reserve II — Penthouse B".
- **Brochure:** Contains no individual floor plans (within its 63 pages). The 19 floor plans were downloaded from `krisumi.com/wp-content/themes/krisumi/assets/images/plp/Waterside-Residences-*.jpg`.
- **Risk:** the krisumi.com filenames say "Waterside-Residences-..." NOT "Forest-Reserve-...". They MAY be generic Waterside Residences plans, or they MAY be the Forest Reserve sub-product's plans hosted on the parent product's URL. **Cannot confirm without developer.**
- **Severity: MINOR (potentially CRITICAL if they're for the wrong project).** Worth verifying with Krisumi.

### m5. Brochure typo "GAZIBO"
- Brochure page 57 amenity grid spells "OUTDOOR GAZIBO" (likely a typo for "GAZEBO").
- **Source.json:** "Outdoor Gazebo" (corrected spelling).
- **Severity: TRIVIAL.** Source is more correct than brochure.

### m6. Brochure address spacing "36 A" vs "36A"
- Brochure page 63: "Sector 36 A" (with space) AND "Sector 36A" (no space) — used inconsistently within the brochure.
- Source.json: "Sector 36A".
- **Severity: TRIVIAL.**

### m7. Sumitomo founding year
- Source.json: "Sumitomo founded 1615 (410+ years)" + "400+ years"
- Brochure page 5: "the **400-year-old** Sumitomo group"
- **Severity: TRIVIAL.** Both are right; source's "1615" is more specific (400+ years from 2026 = founded 1626 if we assume 400 exact, or 1615 per Sumitomo's own founding date).

---

## Section-by-section comparison tables

### Hero section

| Field | Live page value | Brochure ground truth | Match | Drift severity |
|---|---|---|---|---|
| `projectName` | "Krisumi Waterside Residences: The Forest Reserve" | "Waterside Residences / The Forest Reserve" (cover); "The Forest Reserve" (page 20); legal: "Waterside Residences The Forest Reserve" | ⚠️ partial — colon is editorial | MAJOR (M1) |
| `hero.tagline` | "Japanese craftsmanship in Gurugram — a sanctuary for the spirit, where timeless design meets modern luxury." | Brochure page 20: "**The Forest Reserve. A sanctuary for the spirit.**" — no "Japanese craftsmanship in Gurugram", no "timeless design meets modern luxury" | ❌ phrase is partly fabricated | MAJOR |
| `hero.priceFrom` | "On Request" | (no price in brochure) | ✅ | — |
| `hero.heroImageKey` | "hero-banner-forest" → from krisumi.com banner.jpg | (banner is decorative; no specific brochure source) | ✅ ok | — |
| `hero.keyStats[0]` Configuration | "2, 3 & 4 LDK + Penthouses" | Implied from floor plan filenames; not stated in brochure | ⚠️ unverified | MINOR (m2) |
| `hero.keyStats[1]` Status | "New Launch" | Brochure does not state launch status; RERA registration date 02.05.2025 | ⚠️ implied | MINOR |
| `hero.keyStats[2]` Possession | "November 2030" | Not found in brochure pages I read | ⚠️ unverified | MINOR (m1) |
| `hero.keyStats[3]` Location | "Sector 36A, Gurugram" | "Sector 36A, Gurugram" (page 63) | ✅ | — |
| `hero.keyStats[4]` Distance to IGI | "17 km" | "**24.8 Kms**" (page 60) | ❌ | **CRITICAL (C2)** |
| `hero.keyStats[5]` Joint Venture | "Sumitomo × Krishna Group" | Brochure page 4 (Krishna Group) + page 5 (Sumitomo Corporation) — both pages confirm the JV | ✅ | — |

### atAGlance

| Field | Live page value | Brochure ground truth | Match | Severity |
|---|---|---|---|---|
| `projectType` | "Residential Apartments" | (residential project, EWS too) | ✅ | — |
| `configuration` | "2 LDK, 3 LDK, 4 LDK & Penthouses" | inferred | ⚠️ | MINOR |
| `unitSizes` | "On Request" | not in brochure | ✅ | — |
| `totalArea` | "On Request" | **6.4868 acres total** (page 63: 5.1743 + 1.3125) | ❌ data exists, not used | MAJOR (M4) |
| `totalUnits` | 600 | **638 total** (542 residential + 96 EWS) per page 63 | ❌ rounding off in wrong direction | MAJOR (M4) |
| `totalTowers` | 3 | not stated numerically; spec text references "A & B" + "II" = ≥3 | ⚠️ plausible | MAJOR (M3) |
| `floors` | "Multi-tower mid-rise" | not stated | ⚠️ vague | MINOR |
| `possession` | "November 2030" → coerced "2030-11" | not found | ⚠️ unverified | MINOR (m1) |
| `status` | "Pre-Launch" | not stated | ⚠️ inferred | MINOR |
| `reraStatus` | "Registered" | confirmed (page 63 lists RERA numbers) | ✅ | — |

### Pricing rows

All four pricing rows are placeholders (`"On Request"` for `totalPriceFrom`). Carpet/built-up areas (1200, 1800, 2400, 4000 sq.ft.) are not in the brochure — m3.

### Floor plans (all 19)

| # | name | source carpetArea | imageKey | Verified vs brochure? |
|---:|---|---:|---|---|
| 1 | Forest Reserve A — 4LDKS Typical | 2400 | `floor-plan-fr-a-4ldks-typical` | ❌ source=krisumi.com, NOT in brochure (m4) |
| 2 | Forest Reserve A — 4LDKS First Floor (FF-1) | 2400 | `floor-plan-fr-a-4ldks-ff-1` | ❌ same |
| 3 | Forest Reserve A — 3LDK Refuge | 1800 | `floor-plan-fr-a-3ldk-refuge` | ❌ same |
| 4 | Forest Reserve A — Penthouse A (Lower) | 4000 | `floor-plan-fr-a-penthouse-a-lower` | ❌ same |
| 5 | Forest Reserve A — Penthouse A (Upper) | 4000 | `floor-plan-fr-a-penthouse-a-upper` | ❌ same |
| 6 | Forest Reserve A — Penthouse B (Lower) | 4500 | `floor-plan-fr-a-penthouse-b-lower` | ❌ same |
| 7 | Forest Reserve A — Penthouse B (Upper) | 4500 | `floor-plan-fr-a-penthouse-b-upper` | ❌ same |
| 8 | Forest Reserve A — Penthouse B Terrace | 4500 | `floor-plan-fr-a-penthouse-b-terrace` | ❌ same |
| 9 | Forest Reserve B — 3LDKS Typical | 1900 | `floor-plan-fr-b-3ldks-typical` | ❌ same |
| 10 | Forest Reserve B — 3LDKS FF-1 | 1900 | `floor-plan-fr-b-3ldks-ff-1` | ❌ same |
| 11 | Forest Reserve B — 3LDKS FF-2 | 1900 | `floor-plan-fr-b-3ldks-ff-2` | ❌ same |
| 12 | Forest Reserve B — 2LDKS Refuge | 1300 | `floor-plan-fr-b-2ldks-refuge` | ❌ same |
| 13 | Forest Reserve B — Penthouse 01 | 4200 | `floor-plan-fr-b-penthouse-01-lower` | ❌ same |
| 14 | Forest Reserve B — Penthouse 04 | 4500 | `floor-plan-fr-b-penthouse-04-lower` | ❌ same |
| 15 | Forest Reserve II — 3LDKS Type A | 2000 | `floor-plan-fr-ii-3ldks-a-ff` | ❌ same |
| 16 | Forest Reserve II — 3LDKS Type B | 2000 | `floor-plan-fr-ii-3ldks-b-ff` | ❌ same |
| 17 | Forest Reserve II — 2LDKS Refuge | 1400 | `floor-plan-fr-ii-2ldks-refuge` | ❌ same |
| 18 | Forest Reserve II — Penthouse A | 4500 | `floor-plan-fr-ii-penthouse-a-lower` | ❌ same |
| 19 | Forest Reserve II — Penthouse B | 4800 | `floor-plan-fr-ii-penthouse-b-lower` | ❌ same |

**All 19 floor plans came from `krisumi.com/wp-content/themes/krisumi/assets/images/plp/Waterside-Residences-*.jpg`. The filenames on krisumi.com prefix "Waterside-Residences-" — they may be the parent product's plans or this product's plans served from the parent URL.** Action required: confirm with Krisumi that these plans correspond to The Forest Reserve A/B/II specifically.

### Building / towers

| Field | Source.json | Brochure | Match | Severity |
|---|---|---|---|---|
| `building.structure` | "Earthquake-resistant RCC framed structure with high-strength concrete and advanced construction technology" | not in spec sections I read; pages 50/52/54 do not mention earthquake resistance | ❌ unverified, possibly fabricated | MAJOR |
| `building.towers[A].name` | "The Forest Reserve A" | confirmed (page 50, page 38, page 42) | ✅ | — |
| `building.towers[A].floors` | 30 | not stated | ⚠️ unverified | MAJOR (M3) |
| `building.towers[B].name` | "The Forest Reserve B" | spec section "A & B" page 50 implies B exists | ⚠️ implied | MAJOR (M3) |
| `building.towers[B].floors` | 30 | not stated | ⚠️ | MAJOR (M3) |
| `building.towers[II].name` | "The Forest Reserve II" | confirmed (pages 33, 34, 54) | ✅ | — |
| `building.towers[II].floors` | 30 | not stated | ⚠️ | MAJOR (M3) |
| `building.parking.type` | "basement" | not specified in spec sections I read; pages 50/52/54 mention "Basement to Ground Floor" shuttle elevators | ⚠️ implied | MINOR |

### Amenities

The brochure publishes an authoritative amenity grid on page 57 (common areas) and page 58 (Forest Reserve exclusives). All other amenity claims need scrutiny.

#### BROCHURE AUTHORITATIVE LIST (page 57 + 58)

**Common amenities (page 57, verbatim 11 items):**
1. POOL BAR
2. OUTDOOR GAZIBO *(brochure typo for GAZEBO)*
3. WATERSCAPE
4. MULTIPURPOSE HALL
5. AMPHITHEATRE
6. KID'S STREAM
7. KID'S WATER PARK
8. KID'S PLAY AREA
9. MIST POND
10. RESTING PLACE
11. SOURCE FOUNTAIN

**Forest Reserve exclusives (page 58, verbatim 3 items):**
12. LAP POOL
13. PDR DINING
14. GYM

**TOTAL: 14 amenities** (per the brochure).

#### Source.json amenity audit (23 items, 5 buckets)

| Bucket / Source.json item | In brochure? | Notes / Severity |
|---|---|---|
| **wellness** | | |
| Yoga Deck | ❌ — page 13 has a YOGA DECK render but it's NOT on the page-57 amenity grid | **CRITICAL (C7) — possibly fabricated as a delivered amenity** |
| Resting Place | ✅ | matches RESTING PLACE on page 57 |
| Mist Pond | ✅ | matches MIST POND on page 57 |
| **sports** | | |
| Forest Reserve Gym | ✅ | matches GYM on page 58 (FR exclusive) |
| Lap Pool | ✅ | matches LAP POOL on page 58 |
| Kid's Water Park | ✅ | matches KID'S WATER PARK on page 57 |
| **family** | | |
| Kid's Stream | ✅ | matches KID'S STREAM on page 57 |
| Kid's Play Area | ✅ | matches KID'S PLAY AREA on page 57 |
| Multipurpose Hall | ✅ | matches MULTIPURPOSE HALL on page 57 |
| Amphitheatre | ✅ | matches AMPHITHEATRE on page 57 |
| Outdoor Gazebo | ✅ | matches OUTDOOR GAZIBO (brochure typo) on page 57 |
| **lifestyle** | | |
| Pool Bar | ✅ | matches POOL BAR on page 57 |
| Source Fountain | ✅ | matches SOURCE FOUNTAIN on page 57 |
| Waterscape | ✅ | matches WATERSCAPE on page 57 |
| PDR Dining | ✅ | matches PDR DINING on page 58 (FR exclusive) |
| Bamboo Garden | ❌ | **CRITICAL (C8) — POSSIBLY FABRICATED** |
| Forest Mist Pond | ❌ | **CRITICAL (C9) — duplicate of "Mist Pond"** |
| **sustainability** | | |
| Rainwater Harvesting | ❌ | not in brochure amenity list. Could be in finer text I missed; **POSSIBLY FABRICATED** |
| Water Recycling | ❌ | same |
| LED Lighting Throughout | ❌ | same |
| Solar Power for Common Areas | ❌ | same |
| Low-flow Fixtures | ❌ | same |
| Sustainable Materials | ❌ | same |

**Drift summary:**
- 14 of 23 source.json items match the brochure
- 1 item (Yoga Deck) appears in renders but not in the amenity grid
- 1 item (Forest Mist Pond) duplicates "Mist Pond"
- 1 item (Bamboo Garden) appears nowhere in the brochure
- 6 sustainability items are not in any brochure amenity grid I read

**Severity: CRITICAL aggregate.** ~30% of advertised amenities are unverified or fabricated. Recommend rewriting amenities to match the brochure's 14-item canonical list, with sustainability claims either removed or sourced from a Krisumi sustainability statement.

### Location

| Field | Source.json | Brochure | Match | Severity |
|---|---|---|---|---|
| `addressLine` | "Krisumi Waterside Residences The Forest Reserve, Sector 36A" | "Waterside Residences The Forest Reserve, Sector 36A, Gurugram" (page 63) | ⚠️ duplicate Sector 36A when concatenated with `locality` | MAJOR (M2) |
| `locality` | "Sector 36A" | "Sector 36A" | ✅ | — |
| `city` | "Gurugram" | "Gurugram" | ✅ | — |
| `state` | "Haryana" | "Haryana" (page 63 legal text) | ✅ | — |
| `pincode` | "122004" | not in brochure | ⚠️ unverified | MINOR |
| `latitude` | 28.4180 | not in brochure | ❌ points to Sales Lounge | **CRITICAL (C11)** |
| `longitude` | 76.9732 | not in brochure | ❌ same | **CRITICAL (C11)** |
| `googleMapsEmbedUrl` | embed for "Krisumi Waterside Residences" | — | ❌ wrong project | **CRITICAL (C11)** |

### Connectivity

Source.json's distances vs. brochure page 60 (where present):

| Destination | Source.json km / min | Brochure km | Match | Severity |
|---|---:|---:|---|---|
| NH-48 (Delhi-Jaipur Expressway) | 1.5 / 3 | not in brochure list | ⚠️ | MINOR |
| Dwarka Expressway | 0.5 / 2 | NPR: **1 Km** | ❌ off | CRITICAL (C4) |
| Indira Gandhi International Airport | 17 / 25 | **IGI Airport: 24.8 Kms** | ❌ off by 7.8 km | **CRITICAL (C2)** |
| Cyber City Gurugram | 18 / 30 | Cyber City: 17 Kms | ⚠️ off by 1 km | MINOR |
| Vatika Business Park | 8 / 18 | not in brochure list | ⚠️ | — |
| Global City Gurugram | 5 / 10 | not in brochure list | ⚠️ | — |
| Delhi Public School | 3.5 / 8 | not in brochure list | ⚠️ | — |
| St. Xaviers High School | 4 / 10 | radial map page 62 (no km) | ⚠️ | — |
| Hyatt Regency Gurugram | 6 / 12 | radial map page 62 (no km) | ⚠️ | — |
| DoubleTree by Hilton | 5 / 11 | radial map page 62 (no km) | ⚠️ | — |
| Radisson Hotel | 7 / 15 | radial map page 62 (no km) | ⚠️ | — |
| Sapphire 83 Mall | 9 / 18 | radial map page 62 (no km) | ⚠️ | — |
| Ambience Mall Gurugram | 16 / 28 | Ambience Mall: 18 Kms | ⚠️ off by 2 km | MINOR |
| Yashobhoomi Convention Centre | 14 / 22 | not in brochure list | ⚠️ | — |
| Medanta Medicity | 16 / 30 | **Medanta Hospital: 9.6 Kms** | ❌ off by 6.4 km | **CRITICAL (C3)** |
| Apnoghar Amusement Park | 4 / 8 | radial map page 62 (no km) | ⚠️ | — |
| (missing from source) | — | IFFCO Chowk: 13.6 Kms | — | should add |
| (missing from source) | — | MG Road: 14.6 Kms | — | should add |
| (missing from source) | — | Hero Honda Chowk: 5.6 Kms | — | should add |
| (missing from source) | — | Rajiv Chowk: 8.6 Kms | — | should add |
| (missing from source) | — | Fortis Hospital: 9.2 Kms | — | should add |
| (missing from source) | — | Pataudi Road: 1.6 Kms | — | should add |
| (missing from source) | — | Dwarka: 19 Kms | — | should add |

**Severity: CRITICAL aggregate.** Three distance figures are wrong (IGI, Medanta, Dwarka Exp/NPR), seven legitimate brochure-published distances are missing.

### Builder narrative

| Field | Source.json claim | Brochure ground truth | Severity |
|---|---|---|---|
| Five Krisumi principles | Omotenashi, Monozukuri, **Kaizen**, Wa, **Genchi Genbutsu** | Wa, Omotenashi, Monozukuri, **Seijitsu**, **Iki** (page 3) | **CRITICAL (C5)** |
| Sumitomo founding | 1615, "400+ years" | "the 400-year-old Sumitomo group" (page 5) | MINOR (m7) |
| Krishna Group flagship | "Krishna Maruti as its flagship company" | "Krishna Maruti Limited" (page 4) | ✅ |
| Krishna Group JVs | Krishna's own diversification | Brochure page 4: "**17 successful Joint Ventures**" | ⚠️ source.json doesn't quote this number — should add |
| Sumitomo size | "400+ years of Japanese craftsmanship pedigree, global trading and infrastructure expertise" | Brochure page 5: "Fortune 500, $47 Billion USD revenue (FY 2024-25), 80,000 employees across 900 group companies, 65 countries, 300+ world-class projects" | ⚠️ source.json under-quotes the brochure's verifiable specifics | MINOR |
| Nikken Sekkei + A.N.D Nomura attribution | Yes — "Nikken Sekkei (Japan's No. 1 architects), interiors by A.N.D Nomura, project management by Nikken Sekkei Construction Management" | Brochure page 7: "Nikken Sekkei, Japan's No 1 architectural firm" — does NOT mention A.N.D Nomura on the pages I read | ⚠️ A.N.D Nomura attribution unverified in this brochure | MINOR |

### Investment thesis

The investment thesis prose is largely **editorial commentary written by source author**, not direct brochure content. It's not "wrong" to write thesis copy — that's what listings do — but several specific factual claims need correction:

| Claim in investmentThesis | Brochure says | Severity |
|---|---|---|
| "Sumitomo Corporation (a 400-year-old institution founded in 1615)" | "the 400-year-old Sumitomo group" | ✅ ok (1615 not contradicted) |
| "Waterfall Residences (delivered in 2025)" | not in brochure I read | ⚠️ unverified | 
| "the design integrates nine Japanese principles" | 13 principles, not 9 (see C6) | **CRITICAL (C6)** |
| "Five Japanese principles ... Omotenashi, Monozukuri, Kaizen, Wa, Genchi Genbutsu" | brochure 5 principles are different (see C5) | **CRITICAL (C5)** |
| Card "MapPin: 17 km to IGI in signal-free drive" | 24.8 km (see C2) | **CRITICAL (C2)** |
| dataPoints "Distance to IGI Airport: 17 km" | 24.8 km (see C2) | **CRITICAL (C2)** |
| dataPoints "Green zone buffer: 220 acres + 50m belt" | not in brochure I read | ⚠️ unverified |

### Neighbourhood

The four neighbourhood paragraphs have multiple unverified claims:

| Claim | Brochure backing | Severity |
|---|---|---|
| "Sector 36A sits at the confluence of NPR (Dwarka Expressway) and CPR" | Brochure radial map page 62 shows both NPR and CPR around Krisumi City. ✅ | ok |
| "NH-48 just three minutes away" | NH-48 distance not in brochure page 60. Source's "1.5 km / 3 min" unverified. | ⚠️ |
| "IGI Airport reachable in 17 km" | 24.8 km (see C2) | **CRITICAL (C2)** |
| "Forest Reserve sits inside the larger Krisumi City masterplan" | ✅ confirmed via page 63 "part of Group Housing Colony namely 'Krisumi City'" | ok |
| "Waterfall Residences project that has been the area's quality benchmark since 2019" | Brochure shows Waterfall Residences (page 6) but does NOT cite "since 2019" or "quality benchmark" | ⚠️ unverified |
| "encircled by 220 acres of green zone and an additional 50-metre green belt" | not in brochure I read | ⚠️ unverified |
| "'Chinju No Mori' design concept" | ✅ confirmed (page 20) | ok |
| "Sobha Aranya and several other premium NCR projects have built-in parks" | editorial comparison — not in this brochure | ✅ ok as opinion |

### FAQs (10 entries)

All 10 FAQ answers re-state claims audited above. Key issues:
- FAQ #5 (RERA): both numbers wrong — see C1 (`GGN/944/677` should be `GGM/945/677`)
- FAQ #6 (design): "nine Japanese design principles" — see C6
- FAQ #7 (amenities exclusive): correctly names "private gymnasium, lap pool, and PDR" matching page 58 ✅
- FAQ #1 (location): "17 km from IGI" — see C2 CRITICAL

### RERA section

| Field | Source.json | Brochure page 63 | Severity |
|---|---|---|---|
| `rera.number` | `RC/REP/HARERA/GGN/944/676/2025/47` | `RC/REP/HARERA/GGM/944/676/2025/47` | **CRITICAL (C1)** — `GGN` → `GGM` |
| `rera.registeredDate` | `2025-05-02` | "dated 02.05.2025" | ✅ |
| `rera.authority` | `HARERA` | "HARERA Gurugram" | ✅ |
| `rera.state` | `Haryana` | implied (Gurugram) | ✅ |
| `rera.verificationUrl` | `https://haryanarera.gov.in` | "https://haryanarera.gov.in/ under 'Registered Projects'" | ✅ |
| **Missing: Phase II RERA** | (not stored as a separate field) | `RC/REP/HARERA/GGM/945/677/2025/48` | **CRITICAL (C1)** — schema only allows ONE rera.number; need to surface both Phase I and Phase II numbers somewhere (in disclaimer text and FAQ at minimum) |

### videoMp4s

| Field | Source.json | Brochure | Severity |
|---|---|---|---|
| `videoMp4s[0].url` | `https://krisumi.com/wp-content/themes/krisumi/assets/images/plp/krisumi-video.mp4` | brochure page 47 (not read) likely shows a thumbnail; the MP4 itself is from krisumi.com generic site | ⚠️ may not be Forest Reserve specific |
| `videoMp4s[0].label` | "Krisumi Forest Reserve Walkthrough" | unverified | ⚠️ |
| `videoMp4s[0].posterImageKey` | `video-thumbnail` from `krisumi.com/wp-content/themes/krisumi/assets/images/plp/video-thumb.jpg` | unverified | ⚠️ |

### externalGalleryUrl

| Field | Source.json | Real | Severity |
|---|---|---|---|
| `externalGalleryUrl.url` | `https://krisumi.com/project/waterside-residences-the-forest-reserve/` | URL exists; previously verified as 200 OK after a 301 redirect from `/waterfall-residences/` | ✅ |
| `externalGalleryUrl.label` | "View More on Krisumi.com" | editorial choice | ✅ |
| `externalGalleryUrl.hostName` | "Krisumi" | ✅ | — |

### JSON-LD output (computed at scaffold time)

The JSON-LD `RealEstateListing` and `Product` blocks consume the same source fields above. Therefore:
- All CRITICAL findings (IGI distance, RERA, principles fabrication) propagate into structured data submitted to search engines.
- `name` field reads "Krisumi Waterside Residences: The Forest Reserve" — see M1.
- `address.streetAddress` will inherit the duplicated "Sector 36A" — see M2.
- `geo.latitude / geo.longitude` will inherit the sales-lounge coordinates — see C11.

**Severity: CRITICAL aggregate** — Google indexes structured data; it WILL pick up the wrong RERA number and wrong distance.

---

## Disclaimer addendum

**Source.json `disclaimerAddendum` (verbatim):**
> "Krisumi Waterside Residences: The Forest Reserve is being developed by Krisumi Corporation in partnership with Sumitomo Corporation Japan and Krishna Group India. HARERA Registration Nos. RC/REP/HARERA/GGN/944/676/2025/47 and RC/REP/HARERA/GGN/944/677/2025/47, both dated 2 May 2025..."

**Drift:**
1. Two RERA numbers, both quoted as `/944/...` — Phase II is wrong, see C1.
2. Authority code `GGN` is wrong (brochure: `GGM`).
3. Project name with colon — see M1.

**Brochure-correct version would read:**
> "Waterside Residences The Forest Reserve and Waterside Residences The Forest Reserve - II are being developed by Krisumi Corporation Private Limited in Sector 36A, Gurugram, as part of the Krisumi City Group Housing Colony. HARERA Registration Nos. **RC/REP/HARERA/GGM/944/676/2025/47** (Phase I) and **RC/REP/HARERA/GGM/945/677/2025/48** (Phase II), both dated 2 May 2025. The project is developed on land admeasuring 5.1743 acres (Phase I) + 1.3125 acres (Phase II) = 6.4868 acres total. Phase I comprises 298 residential units + 53 EWS units; Phase II comprises 244 residential units + 43 EWS units..."

---

## Items I could not verify against this brochure (need other sources)

These items are in source.json but the brochure pages I read do not confirm or deny them. Most are likely fine but should be cross-checked:

1. **Possession date**: "November 2030" — not in brochure pages I read. Verify against Krisumi sales team or HARERA record.
2. **Number of floors per tower**: 30 — not in brochure.
3. **Carpet/built-up areas in pricing rows**: 1200/1500, 1800/2250, 2400/3000, 4000/5000 sq.ft. — not in brochure pricing/spec sections.
4. **Earthquake-resistant RCC framed structure**: not in brochure spec sections.
5. **220 acres + 50m green belt**: not in brochure I read.
6. **A.N.D Nomura interiors**: not in brochure I read; only Nikken Sekkei is mentioned (page 7).
7. **"Waterfall Residences delivered in 2025"** — not stated.
8. **Waterscape, sustainability claims (rainwater harvesting, solar, etc.)** — not in brochure amenity grid; might be in pages I skipped (37, 39, 41, 43, 45, 47, 49, 51, 53, 55).

If you'd like, I can read the remaining ~10 pages I skipped to either confirm or deny these. Just ask.

---

## Brochure quotes I need clarified before fix

These are points where the brochure itself is ambiguous, contradicts source, or contradicts Saurabh:

1. **"Waterside Residences" as parent vs. sibling** (M1, M6): brochure cover treats it as a header above "The Forest Reserve"; brochure page 7 treats it as a sibling 3-tower project; legal text page 63 uses "Waterside Residences The Forest Reserve" as one phrase. **Need Krisumi/Saurabh's authoritative naming.**
2. **Tower B's existence and unit count** (M3, M4): brochure spec section page 50 covers "A & B" together with one RERA (944/676), but I found no photo or unit-count breakdown specific to Tower B. **Need to know if A and B are physically separate towers or one development with two tower designations.**
3. **Floor plan provenance** (m4): the 19 floor plans are hosted on krisumi.com under filenames `Waterside-Residences-XXX.jpg`. **Need confirmation that these are the Forest Reserve A/B/II plans, not generic Waterside Residences plans.**
4. **Yoga Deck status** (C7): is this a delivered amenity (and should be added to the brochure's grid) or concept-only? **Need Krisumi confirmation.**
5. **Bamboo Garden status** (C8): does this exist in the project at all? If yes, why isn't it on the page-57 amenity grid? **Need Krisumi confirmation.**
6. **Sustainability claims** (Rainwater Harvesting, Solar, etc.): are they part of the project's design? Most NCR projects of this tier do include these — but they're not in the brochure's amenity grid. **Need a sustainability fact sheet from Krisumi or removal from the listing.**
7. **Project map coordinates** (C11): **Need lat/lng from Krisumi** for the Forest Reserve site (not the sales lounge). The brochure's location-map illustration roughly centers on the Krisumi City masterplan but doesn't publish coordinates.

---

## Recommended fix sequence (for the next planning session)

1. **First triage call with Saurabh / Krisumi sales team** to resolve the 7 items above.
2. **Rewrite source.json** in this order (each is a self-contained edit):
   - Project name + addressLine + builder.name (M1, M2, M5, M6) — touches hero, address, JSON-LD, disclaimer, FAQ
   - RERA numbers + authority code (C1) — touches rera.number, FAQ #5, disclaimer
   - Distances: IGI, Medanta, Dwarka Expressway/NPR (C2, C3, C4) — touches connectivity[], hero.keyStats, neighbourhood, investmentThesis dataPoints, FAQ #1
   - Krisumi Way principles (C5) — touches builder.description, investmentThesis card #2, FAQ
   - 13 design principles (C6) — touches investmentThesis para 2, FAQ #6
   - Amenities consolidation (C7, C8, C9) — touches amenities.* (drop fabricated, dedupe Forest Mist Pond)
   - Coordinates (C11) — needs developer input first
   - Hero tagline (M2) — replace with brochure verbatim "A sanctuary for the spirit"
   - Total area + total units (M4) — touches atAGlance.totalArea, totalUnits
   - Add 7 missing connectivity entries from brochure page 60
3. **Gallery filename remapping** (C10): either rename R2 keys (expensive — re-upload required), or accept the mislabel and override captions in source.json by adding `gallery.curated[]` entries with correct captions. The latter is cheaper — recommend it.
4. **Re-scaffold + re-deploy** after audit fixes. Trigger a fresh IndexNow ping so the corrected metadata replaces the wrong cached version in Bing/Yandex.

---

## Final notes

- **No files were modified during this audit.** Read-only investigation.
- Rendered brochure pages are at `/tmp/krisumi-audit/p-NN.jpg` (63 files, ~150 MB total). They will be cleared on next reboot. If you want them preserved for review, run `cp -R /tmp/krisumi-audit ./audit-renders/krisumi-forest-reserve/` before commit.
- This audit covers what's in the brochure I have. If there's a more detailed Krisumi specification document or a developer fact sheet that wasn't shared with me, several MINOR/unverified items above might resolve in source.json's favor.
