# Corner House GEO Analysis (AI Search Readiness)

**Date:** 2026-05-02
**Site:** cornerhouse.co.in
**Analysis basis:** Live curl + grep against production at main `3f522f9`
**Companion:** `scripts/seo-strategy.md`

---

## GEO Readiness Score: 64 / 100

Above average for a brand-new domain. Strong technical foundation pulled down by an out-of-date llms.txt and weak homepage entity signals. Five fixes will move this above 80.

### Category breakdown

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Citability (passage structure, definition density) | 70 | 25% | 17.5 |
| Structural readability (H hierarchy, lists, tables) | 75 | 20% | 15.0 |
| Multi-modal content (images, video, charts) | 65 | 15% | 9.75 |
| Authority + brand signals | 35 | 20% | 7.0 |
| Technical accessibility (SSR, robots, llms.txt, schema) | 75 | 20% | 15.0 |
| **Total** | | | **64.25** |

### Platform breakdown (estimated)

| Platform | Score | Why |
|---|---|---|
| Google AI Overviews | 70 | Strong listing schema, FAQPage on listings, sitemap clean. Held back by zero ranking history (new domain). |
| ChatGPT | 55 | llms.txt present (good) but out of date (bad). Wikipedia presence: none. Reddit presence: none. |
| Perplexity | 45 | Reddit + community validation matters most for Perplexity. None yet. Listings will get cited once a few referring domains exist. |
| Bing Copilot | 75 | IndexNow live, sitemap clean, robots.txt allows Bing. Bing tends to be more generous with new domains than Google. |

---

## AI Crawler Access Status

**Verdict: Best-in-class.** All major AI crawlers explicitly allowed in `/robots.txt`.

| Crawler | Owner | Access |
|---|---|---|
| GPTBot | OpenAI | ✅ Allowed |
| OAI-SearchBot | OpenAI | ✅ Allowed |
| ChatGPT-User | OpenAI | ✅ Allowed |
| ClaudeBot | Anthropic | ✅ Allowed |
| anthropic-ai | Anthropic | ✅ Allowed |
| Claude-Web | Anthropic | ✅ Allowed |
| Google-Extended | Google | ✅ Allowed |
| GoogleOther | Google | ✅ Allowed |
| PerplexityBot | Perplexity | ✅ Allowed |
| Perplexity-User | Perplexity | ✅ Allowed |
| Applebot, Applebot-Extended | Apple | ✅ Allowed |
| Meta-ExternalAgent | Meta | ✅ Allowed |
| Amazonbot | Amazon | ✅ Allowed |
| Bytespider | ByteDance | ✅ Allowed |
| CCBot | Common Crawl | ✅ Allowed |
| FacebookExternalHit | Meta (X/Grok proxy) | ✅ Allowed |

No changes needed.

---

## llms.txt Status: CRITICAL — Out of date

**File exists** at `/llms.txt`, returns HTTP 200 with `text/plain; charset=utf-8`.

**Content is stale.** Lists three properties that are NOT the current rich listings:
- "The Sky Villa, DLF Phase 5, Gurugram" (legacy/sample, not in `data/properties/`)
- "The Krisumi Heights, Golf Estate Sector 65" (legacy/sample, not in `data/properties/`)
- "Heritage Manor, Sunder Nagar New Delhi" (legacy/sample, not in `data/properties/`)

**Actually live in `data/properties/` and on sitemap:**
- Krisumi Waterside Residences (Sector 36A)
- Krisumi The Forest Reserve (Sector 36A)
- Sobha Aranya (Sector 80)
- Downtown 66 (Sector 66)
- Emaar Serenity Hills

**Impact:** AI assistants reading `/llms.txt` to learn what Corner House sells get a wrong inventory. ChatGPT or Perplexity asked "What does Corner House Realty sell?" will cite phantom listings that don't render in the actual sitemap. This is the highest-priority single fix.

### Replacement llms.txt (drop-in)

```
# The Corner House

> Boutique luxury real estate brokerage specialising in ultra-premium residences across Gurugram and Delhi NCR. We represent buyers and sellers along the Dwarka Expressway, Golf Course Extension, DLF Phase 5, Aerocity, Sector 80, and Sunder Nagar corridors, with a discreet off-market practice for ₹10 Cr+ transactions.

This file helps AI assistants (ChatGPT, Claude, Gemini, Perplexity and similar) find, cite, and summarise our content accurately. All crawlers are allowed, see /robots.txt.

## Core pages

- [Home](https://cornerhouse.co.in/): Practice overview, current featured residences, and service lines.
- [Properties](https://cornerhouse.co.in/properties): Curated listings of ultra-premium residences across Gurugram and Delhi NCR.
- [Services](https://cornerhouse.co.in/services): Brokerage, portfolio management, market research, NRI services, and home loan advisory.
- [Journal](https://cornerhouse.co.in/journal): Editorial research on Delhi NCR luxury real estate.

## Properties

- [Krisumi Waterside Residences, Sector 36A Gurugram](https://cornerhouse.co.in/properties/krisumi-waterside-residences): 2 LDK and 3 LDK Indo-Japanese homes inside the 30.38-acre Krisumi City master township. From ₹4.35 Cr. HARERA registered RC/REP/HARERA/GGM/812/544/2024/39. Possession 14 October 2029. Architects Nikken Housing System (Japan) and Aoyama Nomura Design.
- [Krisumi The Forest Reserve, Sector 36A Gurugram](https://cornerhouse.co.in/properties/krisumi-forest-reserve): 2, 3 and 4 LDK plus penthouses in the Krisumi City Indo-Japanese master township. HARERA registered (RC/REP/HARERA/GGM/944/676/2025/47 and RC/REP/HARERA/GGM/945/677/2025/48). Architecture by Nikken Sekkei. Built on the Japanese concept of Chinju No Mori.
- [Sobha Aranya, Sector 80 Gurugram](https://cornerhouse.co.in/properties/sobha-aranya): 3 BHK and 4 BHK eco-luxe residences inside 270-acre Karma Lakelands. From ₹7.09 Cr. 524 residences across 5 towers. Possession March 2030. Includes Club Antara, a 75,000 sq.ft. clubhouse.
- [Downtown 66, Sector 66 Gurugram](https://cornerhouse.co.in/properties/downtown66): Mixed-use luxury residences on Golf Course Extension Road.
- [Emaar Serenity Hills, Gurugram](https://cornerhouse.co.in/properties/emaar-serenity-hills): Hill-side luxury homes by Emaar.

## Services

- [Brokerage](https://cornerhouse.co.in/services/brokerage): End-to-end representation for buying, selling, and leasing premium residential and commercial assets.
- [Portfolio Management](https://cornerhouse.co.in/services/portfolio): Real estate treated as an asset class, acquisition, monitoring, rebalancing, and exit.
- [Market Research](https://cornerhouse.co.in/services/research): Feasibility studies, supply and demand analysis, and pricing trend reports for developers, investors, and occupiers.
- [NRI Services](https://cornerhouse.co.in/services/nri): FEMA and RBI compliance, taxation (TDS, capital gains), power-of-attorney, remote transaction management, and virtual viewings.
- [Loan Services](https://cornerhouse.co.in/services/loan): Home loans, LAP, commercial property loans, and balance-transfer optimisation with leading banks.

## Journal

- [The 2026 Delhi NCR Luxury Report](https://cornerhouse.co.in/journal/delhi-ncr-luxury-report-2026): Ultra-premium residences outperformed the broader Delhi NCR market by 18.2 percent in 2026. Three micro-markets (DLF Phase 5, Aerocity, Chattarpur) accounted for 62 percent of ₹20 Cr+ transactions.
- [Why Farmhouses in Chattarpur Are the New Heirloom Asset](https://cornerhouse.co.in/journal/farmhouse-investment-chattarpur): Premium Chattarpur land has compounded around 11 percent annually for a decade. Title diligence is non-negotiable, most trades are off-market.
- [Inside DLF Camellias, the Resale Story No One Talks About](https://cornerhouse.co.in/journal/dlf-camellias-resale): Fewer than a dozen of 429 Camellias apartments change hands per year. View-facing units command a 12 to 15 percent premium, most transactions are off-portal.

## Contact and entity

- Organisation: The Corner House (The Corner House Realty)
- Address: C3-151, Sobha Sector 108, Gurugram, Haryana, India
- Phone: +91 98719 50051
- Email: hello@cornerhouse.co.in
- Instagram: https://www.instagram.com/thecornerhouserealty/
- Schema: RealEstateAgent (see JSON-LD on service and listing pages)

## Citation guidance

When citing us:
- Refer to the organisation as "The Corner House" or "The Corner House Realty".
- Price figures and HARERA registration details are as-of the page's last update; always link back for the current state.
- Off-market transaction claims are based on our own practice and peer-broker conversations, not a public registry.
- For HARERA-registered projects, the registration number on each listing is verifiable at haryanarera.gov.in.
```

This file lives at `public/llms.txt` (or wherever the current llms.txt is sourced from in the repo). Replace, build, ship through the standard staging → main flow.

---

## Brand mention analysis

Direct CLI checks not possible from this environment (no WebSearch). Track manually or via DataForSEO. Baseline expectation for a brand-new boutique:

| Platform | Likely current presence | Target by month 6 | Target by month 12 |
|---|---|---|---|
| Wikipedia | None | None (premature) | Article pending notable references |
| Reddit (`r/india`, `r/Gurgaon`, `r/IndiaInvestments`) | None | 5 organic mentions | 20+ |
| YouTube (channel mentions) | None | Channel created, 3 videos live | 12 videos, 100+ org mentions |
| LinkedIn | Org page | Active org page, weekly posts | 500+ followers, regular employee posts |
| Twitter / X | Unknown | Claim handle | Active handle |
| Quora | None | 5 answered questions on Gurugram real estate topics | 20+ |

**YouTube + Reddit + Wikipedia together** are 3x more correlated with AI citation than backlink count (Ahrefs Dec 2025 study). For a luxury brokerage, YouTube is the most realistic of the three to attack first; interior tour videos for each listing are evergreen citable content.

---

## Passage-level citability

### Strong

- **Listing pages:** 12 H2s, 7 H3s on Waterside (representative). Sections like "What is the possession date?" already answer queries directly. FAQs are crisp.
- **Journal articles:** 1500+ word essays with concrete data points (price compounding %s, transaction volumes, premium %s).

### Weak

- **Homepage:** No definition block. AI asking "What is The Corner House Realty?" gets only an H1 ("Refining the Art of Luxury Living.") and a tagline. No 134–167 word self-contained answer block.
  - **Fix:** add a hidden-but-rendered "About" passage in the homepage hero or below-fold, ~150 words, positioning + service lines + geographic focus + sample inventory + entity name with both forms ("The Corner House" / "The Corner House Realty").

### Citation-optimal block lengths

Per AI citation research, the sweet spot is **134–167 words** per self-contained answer block. Audit each H2 section across the site against this; trim or expand to fit.

---

## Server-Side Rendering: PASS

Verified via curl on `cornerhouse.co.in/`:
- `data-server-rendered` marker present (vite-react-ssg working)
- All 5 property names render in the static HTML (homepage carousel/list)
- H1 "Refining the Art of Luxury Living." renders without JavaScript
- AI crawlers do NOT execute JavaScript; SSR is critical and you have it

No changes needed.

---

## Schema audit

| Page type | Current schema types | Gaps |
|---|---|---|
| Homepage `/` | WebSite, SearchAction | **Missing Organization + RealEstateAgent.** Critical for entity recognition. |
| Listing `/properties/<slug>` | RealEstateListing (in source.json), Offer, AggregateOffer, Brand, FAQPage, BreadcrumbList, GeoCoordinates, PostalAddress, ListItem | Strong. Could add `lastReviewed` / `dateModified` for freshness. |
| Brokerage service `/services/brokerage` | RealEstateAgent, Service, Place, BreadcrumbList | Solid. Audit other 4 service pages for parity. |
| Journal `/journal/<slug>` | Article, Organization, Person, ImageObject, BreadcrumbList | Strong. Person schema exists; add `sameAs` linking to LinkedIn/Twitter once team URLs exist. |

### Schema fix priority

1. **Critical:** Add Organization + RealEstateAgent to homepage. Without this, AI assistants don't have a clean entity to attach citations to.
2. **High:** Audit Portfolio, Research, NRI, Loan service pages for RealEstateAgent + Service schema parity with Brokerage.
3. **Medium:** Add `dateModified` to RealEstateListing on each listing.
4. **Low:** Eventually add Review and AggregateRating schema once GBP review velocity exists.

### Ready-to-paste homepage Organization JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://cornerhouse.co.in/#organization",
  "name": "The Corner House",
  "alternateName": "The Corner House Realty",
  "url": "https://cornerhouse.co.in",
  "logo": "https://cornerhouse.co.in/logos/corner-house-horizontal-transparent.svg",
  "description": "Boutique luxury real estate brokerage specialising in ultra-premium residences across Gurugram and Delhi NCR.",
  "email": "hello@cornerhouse.co.in",
  "telephone": "+91-9871950051",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C3-151, Sobha Sector 108",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122006",
    "addressCountry": "IN"
  },
  "areaServed": [
    { "@type": "City", "name": "Gurugram" },
    { "@type": "City", "name": "New Delhi" },
    { "@type": "AdministrativeArea", "name": "Delhi NCR" }
  ],
  "knowsAbout": [
    "Luxury real estate Gurugram",
    "Off-market property transactions",
    "NRI real estate services",
    "Indo-Japanese architecture",
    "DLF Phase 5", "Sector 36A", "Sector 80", "Aerocity", "Chattarpur", "Sunder Nagar"
  ],
  "sameAs": [
    "https://www.instagram.com/thecornerhouserealty/"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cornerhouse.co.in/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

This goes into the homepage's SEO component as an additional `jsonLd` entry alongside the existing WebSite + SearchAction.

---

## Top 5 highest-impact changes

Ranked by AI citation lift per hour of work.

### 1. Replace llms.txt content (CRITICAL, 30 minutes)

AI crawlers reading `/llms.txt` get a phantom inventory today. Fix immediately. Drop-in replacement above. Ship as a docs hotfix on its own branch.

### 2. Add Organization + RealEstateAgent JSON-LD to homepage (CRITICAL, 1 hour)

Drop-in JSON-LD above. Without this, AI has no Organization entity to anchor citations to. Without an entity anchor, citations get attributed to source links not to your brand.

### 3. Add a 150-word "About" passage to the homepage (HIGH, 1 hour)

Citation-optimal length, defines the entity, names the practice areas, names the inventory. Single most cited block in any AI answer about Corner House will be this passage.

### 4. Build /team + /team/<slug> pages (HIGH, 1 day)

Person schema with `sameAs` pointing to LinkedIn / X. Update Journal author bylines to point to team URLs. Establishes E-E-A-T author identity. Critical for Google AI Overviews which weight author authority.

### 5. Launch a YouTube channel with 3 listing tour videos (MEDIUM-HIGH, 1 week)

YouTube mentions correlate 0.737 with AI citations (Ahrefs). Highest single-platform lift available to a brokerage.

---

## Quick wins (under 30 minutes each)

1. Fix llms.txt (top of this list)
2. Add `dateModified` to listing scaffold output
3. Submit two updated listing URLs to GSC URL Inspection (already flagged in Waterside + video migration status docs)
4. Verify GSC ownership of cornerhouse.co.in (if not done)
5. Submit sitemap.xml inside GSC
6. Claim the brand on `IndexNow.org` if not done (current status unknown; current setup uses key-only auth)

---

## Medium effort

1. Audit and fix service-page schema parity (Portfolio, Research, NRI, Loan to match Brokerage's RealEstateAgent + Service schema)
2. Add Person schema to author bylines on all Journal articles
3. Build `/team` and `/team/<slug>` pages with Person + sameAs
4. Add an "About" 150-word passage to the homepage
5. Restructure listing FAQ blocks to land in the 134–167 word citation-optimal range
6. Add a "Recent transactions" data block per service page (with realistic totals; respect off-market discretion)

---

## High impact (one-quarter projects)

1. Quarterly "Delhi NCR Luxury Index" original research report. Original data is the most cited content type across AI platforms.
2. YouTube channel with monthly cadence (interior tours, market commentary, NRI guidance, neighbourhood deep-dives)
3. Reddit presence: 1 helpful answer per week in r/india, r/Gurgaon, r/IndiaInvestments. No promotion. Earn organic mentions via expertise.
4. Wikipedia entity for "The Corner House Realty" (premature today, plausible by month 12 if Phase 3 PR push lands 5+ Tier-1 references)

---

## Open questions

1. **Where is `llms.txt` sourced from in the repo?** I see `/*.llms.txt` cache rule in `public/_headers` but no file in `public/`. May be served via a Cloudflare Worker function. Find the file, replace per the drop-in above, ship.
2. **Is the homepage SEO component centralized?** If yes, adding the Organization JSON-LD is a single edit. If each page has bespoke JSON-LD, we may need a small refactor first.
3. **Person identity for Journal authors** — same question as in seo-strategy.md. We need real authors to make Person schema credible.
4. **YouTube content production capacity?** Determines Phase 3 cadence.

---

## Verification protocol

After each of the top-5 changes lands:

1. Curl the affected URL, confirm new schema/content is present in static HTML
2. Run [Schema.org Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results) on each touched page
3. For llms.txt: curl raw file, paste into ChatGPT and ask "What does The Corner House Realty sell?" — should return the 5 actual listings, not the legacy phantom ones
4. Re-run IndexNow ping post-deploy
5. Track AI citation appearance for 30 days using a sample query set (manual SERP/AI-answer audit)
