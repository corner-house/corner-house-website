# Corner House SEO Strategy

**Date:** 2026-05-02
**Site:** cornerhouse.co.in
**Vertical:** Boutique luxury real estate brokerage, Gurugram + Delhi NCR
**Stack:** Vite SSG (vite-react-ssg) + Cloudflare Pages + R2 assets
**Current commit:** main `3f522f9` (post Waterside ship + legacy video R2 migration)

---

## 1. Discovery

### Business model

Boutique brokerage, ultra-premium residences (₹4 Cr to ₹45 Cr+). Self-positioning per llms.txt: "discreet off-market practice for ₹10 Cr+ transactions". Five service lines (Brokerage, Portfolio, Research, NRI, Loan). Editorial Journal (3 articles live) used as authority signal.

### Current site state

| Surface | Count | Notes |
|---|---|---|
| Property listings (rich) | 5 | Waterside, Forest Reserve, Sobha Aranya, Downtown 66, Emaar Serenity Hills |
| Service pages | 5 | Brokerage, Portfolio, Research, NRI, Loan |
| Journal articles | 3 | Delhi NCR Luxury Report 2026, Chattarpur Farmhouses, DLF Camellias Resale |
| Total indexable URLs (per sitemap) | 14 | 1 home + 5 properties + 5 services + 3 journal |
| Domain age | ~weeks | Brand-new authority, no backlink profile yet |
| IndexNow coverage | Bing + Yandex | Pinged twice (yesterday + today) |
| Google Search Console | Verification status pending Saurabh confirmation |

### Strategic constraints

- Inventory is small and highly curated. Programmatic SEO is **not** the model. Quality over quantity.
- Source-of-truth rule (per CLAUDE.md): listings are brochure-grounded only. No invented copy. This is a long-term moat: AI cites verifiable content over puffed marketing.
- ₹10 Cr+ off-market positioning means peer-broker referrals matter as much as inbound search.

### KPIs to track

| Metric | What measures success |
|---|---|
| Branded search "Corner House" / "Cornerhouse Realty" Gurugram | Impressions in GSC, click-through, direct-to-site sessions |
| Listing keyword presence | Each listing should rank top-10 for `<projectname> <location>` and `<projectname> price` within 90 days |
| Journal authority queries | Long-tail informational: "DLF Camellias resale", "Chattarpur farmhouse investment", "Sector 36A new launches" |
| AI citations | ChatGPT / Perplexity citing Corner House for the same long-tail queries |
| Lead form fills via organic | Primary commercial KPI |

---

## 2. Competitive landscape

### Three competitor classes

| Class | Examples | What they own | Where you differentiate |
|---|---|---|---|
| **National portals** | 99acres, MagicBricks, Housing.com, NoBroker | Crushing volume on `<location> apartments`, `<sector> property` head terms | Curated quality, off-market, written-by-humans editorial. Don't try to outrank on raw volume. |
| **Boutique luxury brokers** | Sotheby's India, Knight Frank India, Anarock Luxury, India Sotheby's International Realty, Wonderwall, Concrete Estates | Brand search, established backlink profile, offline brand equity | New entrant disadvantage on brand. Counter with sharper editorial (you have 3 strong articles already), stronger schema, better AI Overviews citation. |
| **Local Gurugram brokers** | Many small ops with weak sites | Long-tail local queries via word-of-mouth + Google Business Profile | Easy beat with current technical setup. Win local with GBP + Journal. |

### Keyword gap snapshot (informed estimates, validate with DataForSEO when available)

High-intent long-tail you can realistically own in 6 months:
- "krisumi waterside residences price" (you're the only Corner House page for this; competing only with krisumi.com itself, 99acres, MagicBricks)
- "krisumi forest reserve sector 36a"
- "sobha aranya sector 80 review"
- "DLF camellias resale" (already have a deep journal article)
- "chattarpur farmhouse investment"
- "off-market luxury homes Gurugram"

High-intent head terms NOT to chase (saturated, portal-dominated):
- "luxury apartments gurugram"
- "3 BHK gurugram"
- "real estate gurugram"

### E-E-A-T baseline

Strong signals already present:
- llms.txt declares positioning, contact, address, phone, schema
- Journal articles signed with author + Person schema
- Each listing has source citations (krisumi.com, brochure references) explicit in audit docs

Missing signals:
- No author bio pages (the Journal Person entity has no `/team/<author>` URL)
- No press / media mentions page
- No client logos / testimonials with attribution
- No Wikipedia presence for "The Corner House Realty"
- No YouTube channel
- No Reddit presence

---

## 3. Architecture

Current architecture is sound. Minor tweaks recommended.

### URL hierarchy (current, leave as-is)

```
/                          home
/properties                listings index
/properties/<slug>         listing detail
/services                  services index
/services/<slug>           service detail
/journal                   journal index
/journal/<slug>            article detail
```

### Recommended additions

```
/team                      team index (NEW, supports E-E-A-T author signals)
/team/<slug>               team member bio (NEW, Person schema, social sameAs)
/about                     about page (likely exists in some form, audit needed)
/contact                   contact page (likely exists)
/sitemap.xml               (live, served correctly)
/robots.txt                (live, AI-friendly)
/llms.txt                  (live but OUT OF DATE — see GEO analysis)
```

### Internal linking

- Listings should cross-link to Journal articles where contextually relevant ("Krisumi Waterside Residences" listing → "Delhi NCR Luxury Report 2026" if Krisumi is mentioned)
- Journal articles should cross-link to relevant listings in their content body, not just sidebar
- Service pages should link to relevant Journal articles (NRI service ↔ NRI investment articles, when written)

---

## 4. Content strategy

### Pillar 1: Listings (transactional)

5 active listings is healthy for a boutique. Don't pad with junk; only add inventory you actually represent. Per-listing checklist already enforced via the audit-doc pattern.

### Pillar 2: Journal (authority)

Current 3 articles are strong (1,500+ words each based on file sizes). Cadence target: **2 articles/month** sustained. Topic priorities, ranked by long-tail commercial value:

1. **"Krisumi City Sector 36A: A Buyer's Guide to the Indo-Japanese Township"** — owns the master-township query, links to Forest Reserve + Waterside listings
2. **"DLF Phase 5 vs Golf Course Extension: Where Luxury Buyers Are Moving in 2026"** — comparison content has high citation value for AI
3. **"Sobha Aranya vs Karma Lakelands Phase 2: Eco-Luxury Buyer's Guide"** — directly supports Sobha Aranya listing
4. **"Aerocity Residential Inventory: What's Actually for Sale in 2026"** — niche but fills a market data gap
5. **"NRI's Guide to Buying Luxury Homes in Gurugram: FEMA, TDS, POA"** — supports NRI service page, ranks for procedural queries
6. **"Off-Market Luxury Real Estate Gurugram: How It Actually Works"** — owns the off-market positioning explicitly
7. **"Smart Home Tech in 2026 Luxury Apartments: A Practical Audit"** — evergreen, broad reader interest
8. **"What Indo-Japanese Architecture Actually Means in Indian Real Estate"** — partners well with Krisumi listings, AI-citable thematic content
9. **"Penthouse Resale in Gurugram: 5-Year Price Movement Across Top Towers"** — original-research style, highest AI citation potential
10. **"Luxury Apartment Brokerage Fees in India: What's Standard and What's Not"** — service-level transparency, builds trust

Each article ≥ 1,500 words, with author byline (Person schema), publication date, last-updated date, internal links to relevant listings + services, at least one custom data point or table that makes it citable.

### Pillar 3: Service pages (commercial)

5 service pages are live with RealEstateAgent schema (verified on Brokerage page). Quick wins:
- Add testimonials (with attribution where possible) to each service page
- Add "Recent transactions" stat block per service (e.g., "12 NRI transactions completed in 2025")
- Cross-link to relevant Journal articles

### Pillar 4: Team / Authority (NEW)

Add `/team` index + `/team/<slug>` per principal. Each team member page:
- Person schema with `sameAs` linking to LinkedIn, Instagram (already used for org), Twitter if applicable
- Photo, role, years of experience, transactions managed
- Article author attribution updated to point to team URLs

This is the single biggest E-E-A-T upgrade and prerequisite for authority-level link building.

---

## 5. Technical foundation

Most boxes already ticked.

| Item | Status | Notes |
|---|---|---|
| HTTPS + HSTS | Live | Cloudflare-managed |
| Sitemap.xml | Live | Auto-generated by `npm run sitemap`, 14 URLs |
| Robots.txt | Live | All AI crawlers explicitly allowed |
| llms.txt | Live but OUT OF DATE | **Critical fix in GEO analysis** |
| SSR / SSG | Live | vite-react-ssg, `data-server-rendered` marker present |
| Canonical URLs | Per-listing | Verified via scaffold-property.ts |
| OG meta | Per-listing | Hero R2 image |
| Schema (listings) | Solid | RealEstateListing + Offer + AggregateOffer + FAQPage + BreadcrumbList |
| Schema (homepage) | Thin | Only WebSite + SearchAction. **Add Organization + RealEstateAgent** |
| Schema (services) | Brokerage page has RealEstateAgent | Audit other 4 service pages for parity |
| CSP | Strong | Recently added media-src for r2.dev |
| Image optimization | Hero/Gallery/Thumb variants on R2 | Sharp pipeline |
| IndexNow | Live | Manual ping per release |

### Technical follow-ups

1. **Add Organization + RealEstateAgent JSON-LD to homepage** (currently only WebSite). High impact for brand entity recognition.
2. **Audit service pages for schema parity** — ensure Portfolio, Research, NRI, Loan also carry RealEstateAgent + Service schema.
3. **Add `lastUpdated` date to each listing** (RealEstateListing schema supports it; aids freshness signal).
4. **GSC verification** confirmed and Submit Sitemap inside GSC.
5. **Performance baseline:** run a Lighthouse audit on a representative listing page; target LCP < 2.5s, INP < 200ms, CLS < 0.1.

---

## 6. Implementation roadmap

### Phase 1, weeks 1–4 (foundation + immediate fixes)

- **Week 1:**
  - Fix llms.txt with current 5 listings (see GEO analysis for ready-to-use replacement)
  - Add Organization + RealEstateAgent JSON-LD to homepage
  - Verify GSC, submit sitemap, submit two updated listing URLs to URL Inspection
  - Set up Google Business Profile (Gurugram service-area business)
- **Week 2:**
  - Service page schema parity audit + fixes
  - Add `lastUpdated` date pattern to listing scaffold
  - Lighthouse baseline + fix any CWV regressions
- **Weeks 3–4:**
  - Build `/team` + `/team/<slug>` pages (Person schema, sameAs)
  - Update Journal author bylines to link to team URLs

### Phase 2, weeks 5–12 (content expansion + local SEO)

- **2 articles/month cadence on Journal.** Start with topics 1–4 from the list above.
- **Local citations** (the user's primary link-building focus, see section 7 below)
- **Property portal listings** for each of the 5 inventory items (99acres, MagicBricks, Housing.com)
- **Internal linking pass:** retroactively cross-link existing listings ↔ journal articles ↔ service pages

### Phase 3, weeks 13–24 (link building + GEO scale)

- **Real estate blogger outreach** (see section 7)
- **Review and comparison site listings** (see section 7)
- **YouTube channel launch** with 1 video/month (interior tours, market commentary). YouTube mentions correlate 0.737 with AI citations (Ahrefs) — single highest-impact authority signal.
- **Press / PR push:** pitch 1–2 stories per month to Mint, Economic Times Real Estate, Property Pistol, Square Yards. Goal: earn brand mentions, not just backlinks.
- **GEO content pass:** rewrite top 5 listing pages and top 3 journal articles to optimal AI citation format (134–167 word self-contained answer blocks per H2 section)

### Phase 4, months 7–12 (authority compounding)

- **Original research:** publish a quarterly "Delhi NCR Luxury Index" report. Original data → highest citation value across AI platforms + traditional press.
- **Wikipedia entity creation** for "The Corner House Realty" (carefully, with notable references — needs press coverage from Phase 3 first)
- **Reddit + LinkedIn presence:** answer questions in r/india, r/IndiaInvestments, r/Gurgaon. Establish brand authority through helpful commentary.
- **Backlink earning:** by month 12, target 20+ referring domains, with 5+ from Tier 1 publications (Mint, ET, Hindustan Times, Times of India)

---

## 7. Link building strategy (per Saurabh's focus)

### 7a. Local real estate directories and portals

| Target | Purpose | Effort |
|---|---|---|
| 99acres broker profile + 5 listings | Visibility, lead gen, brand citation | 2 hours |
| MagicBricks broker profile + 5 listings | Same | 2 hours |
| Housing.com broker profile + 5 listings | Same | 2 hours |
| NoBroker broker profile (free side) | Brand mention | 30 minutes |
| Square Yards broker profile | Brand mention + occasional referral | 1 hour |
| PropTiger | Brand mention | 1 hour |
| Sulekha Real Estate | Brand mention, low-effort | 30 minutes |
| Quikr Real Estate | Brand mention | 30 minutes |

Each listing on a portal should link back to your canonical listing on cornerhouse.co.in. Use UTM tracking. Audit referral traffic monthly.

### 7b. Real estate blogger outreach

Target list (Indian real estate bloggers / content sites):
- **Property Pistol** (real estate news)
- **PropertyWala** (long-form analysis)
- **TrackMyHomeLoan**, **BankBazaar Real Estate** (loan-adjacent content for NRI service)
- **Niraj Pandey blog**, **CommonFloor Insights**, **PropertyGuru blog** (when these are active)
- **YouTube real estate channels:** GarryTalksReal, Investonomics, REI Tube — pitch interior video collaboration

Outreach template:
- Subject: "Krisumi Waterside Residences inventory + verified RERA data for [their site]"
- Body: 3 sentences, lead with what's in it for them (verified data, exclusive interior renders), end with a clear ask (link from their next Krisumi/Sector 36A coverage)
- Attach: a 1-page market summary with linkable stats

Realistic conversion: 2–4 backlinks per 20 outreach emails. Quality > quantity.

### 7c. Gurugram / NCR local citations

NAP consistency (Name, Address, Phone) across:
- Google Business Profile (Gurugram, service-area business)
- Bing Places
- Justdial
- Sulekha
- IndiaMART
- TradeIndia
- LocalBookings.com
- Yellowpages.in
- Hotfrog India

Use the exact NAP from llms.txt:
- Name: The Corner House Realty
- Address: C3-151, Sobha Sector 108, Gurugram, Haryana, India
- Phone: +91 98719 50051
- Email: hello@cornerhouse.co.in

### 7d. Property review and comparison sites

| Target | Approach |
|---|---|
| Glassdoor (employer page) | Even with no employees, claim brand presence |
| Mouthshut Real Estate | Claim broker page; encourage 2–3 client reviews |
| Trustpilot | Claim brand; pursue verified-review pipeline |
| Google reviews on GBP | Primary review velocity goal: 1 review/month minimum |
| Facebook page reviews | Even if FB is dormant, claim and link |

### 7e. Google Business Profile (highest-leverage single move)

Setup checklist:
- Business type: Real estate agency (service-area business, not storefront)
- Service area: Gurugram + Delhi NCR sub-locations (DLF Phases, Golf Course Road, Sector 80, Sector 36A, Aerocity, Chattarpur, Sunder Nagar, etc.)
- Categories: "Real estate agency" (primary), "Property management company", "Real estate consultant" (additional)
- Hours: Mon–Sat 10am–7pm or your actual hours
- Photos: 10+ high-quality (use R2-hosted listing renders; you have plenty)
- Posts: weekly "What's New" posts with each new listing or journal article
- Q&A: seed with 3–5 common questions and answer them (off-market services, NRI assistance, etc.)
- Service descriptions: one per service page (Brokerage, Portfolio, Research, NRI, Loan)

Once verified, GBP becomes the highest-leverage single SEO asset for a brokerage. Local pack visibility, knowledge panel, review velocity, direct calls all flow from this.

---

## KPI targets

| Metric | Now | 3 month | 6 month | 12 month |
|---|---|---|---|---|
| Indexed pages (GSC) | 14 (sitemap) | 14 + 6 articles | 20 + 6 articles + team pages | 30+ |
| Branded "Corner House Gurugram" impressions | unknown | 200/mo | 800/mo | 3,000/mo |
| Long-tail listing impressions | unknown | 1,000/mo | 5,000/mo | 20,000/mo |
| Domain Rating (Ahrefs proxy) | ~0 | 5 | 15 | 25 |
| Referring domains | 0 | 5 | 15 | 35 |
| GBP profile views | 0 | 500/mo | 2,000/mo | 5,000/mo |
| GBP direction requests | 0 | 5/mo | 25/mo | 75/mo |
| AI Overview citations (manual sample) | 0 | 0–2 | 5–10 | 20+ |
| Lead form fills via organic | unknown | 5/mo | 20/mo | 50/mo |

---

## Risks + dependencies

| Risk | Mitigation |
|---|---|
| Source-of-truth rule limits content velocity (can't pump out fluff) | Treat as strategic moat; AI rewards verifiable content |
| Solo / small team | Outsource specific tasks (portal listing setup, GBP photo upload) but keep editorial in-house |
| Brand has zero authority signals today | Phase 3 PR push is the lever; treat as 6-month investment |
| Krisumi / Sobha may release exclusive content via other brokers | Maintain direct broker relationships; verify via signed asset agreements as already done |
| Google's E-E-A-T weighting penalizes anonymous content | Phase 1 team page work is prerequisite to Journal scaling |

---

## Open questions for Saurabh

1. **GSC verified?** If not, week-1 priority. Need access to verify and submit sitemap.
2. **GBP claimed?** If yes, share access for optimization. If no, week-1 setup.
3. **Author identity for Journal articles?** Currently Person schema is generic. Need real author identities to make E-E-A-T credible.
4. **Press relationships?** Do you have direct contacts at Mint, ET, Hindustan Times Real Estate, Times Property? Affects Phase 3 outreach plan.
5. **Outreach budget?** Influencer/blogger outreach can be done on a shoestring (₹0 with cold email), or accelerated with sponsored content / paid placements (~₹50k–2L/month).
6. **Original research budget?** A quarterly Luxury Index report needs data sourcing (DataForSEO subscription? Magicbricks Insights data partnership?).

---

## Companion document

See `scripts/geo-analysis.md` for AI Search / GEO optimization analysis run alongside this plan.
