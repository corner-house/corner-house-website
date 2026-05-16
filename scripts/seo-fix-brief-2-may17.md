# SEO Fix Brief 2 — Corner House — May 17 2026

## Context
Repo: `/Users/saurabhiim/Documents/Antigravity/corner-home-project`
Branch: continue on `fix/seo-broken-links-dates-faq` or create `fix/seo-schema-sitemap-canonical`

---

## Fix 1 — Canonical www Mismatch (URGENT — causes Soft 404)

Google URL Inspection shows the blog post canonical is `https://cornerhouse.co.in/blog/krisumi-forest-reserve-review` (no www). The live site serves from `https://www.cornerhouse.co.in/`. This mismatch is causing a Soft 404 — Google won't index these posts until it's fixed.

**Find and replace across the entire repo:**
```bash
grep -r "https://cornerhouse.co.in" src/ content/
```

Replace every instance of `https://cornerhouse.co.in/` with `https://www.cornerhouse.co.in/` — with www. This includes:
- MDX frontmatter `canonical` field in all 3 blog posts
- MDX frontmatter `og:url` field in all 3 blog posts
- Any canonical or og:url in page components (homepage, property pages, blog index)
- JSON-LD `url` fields anywhere they reference the no-www domain
- `public/sitemap.xml` if URLs are hardcoded there

Do not touch R2 asset URLs (`pub-f00f91c779cf4225a9881062b14b46d3.r2.dev`) — those are correct as-is.

---

## Fix 2 — Identify and Fix 4XX Pages

Run a crawl of the built `dist/` folder to find all internal links and check which ones return 4XX:

```bash
# Build first
npm run build

# List all HTML files in dist
find dist/ -name "*.html" | head -40

# Extract all internal hrefs from dist
grep -roh 'href="[^"]*"' dist/ | grep -v "http" | sort -u
```

Cross-reference the extracted internal links against actual files in `dist/`. Any link that points to a route with no corresponding HTML file in dist is a 4XX candidate.

For each broken route found — two options:
- If the page should exist → create a minimal placeholder `.tsx` page and register it in the router
- If the page is genuinely missing and not needed yet → add a `_redirects` rule in `public/_redirects` pointing to the nearest real page (e.g. `/services/brokerage` → `/services`)

Also check `public/_redirects` — confirm it exists. If not, create it.

---

## Fix 3 — Sitemap Verification and Submission

**3a. Verify sitemap exists and is correct**

Check if `public/sitemap.xml` exists. If it does, open it and verify:
- All live pages are listed (homepage, all property pages, all blog posts, blog index)
- All URLs use `https://www.cornerhouse.co.in/` with www
- `<lastmod>` dates are present and accurate
- No 4XX URLs are included in the sitemap

If `public/sitemap.xml` does not exist, generate it. The site has approximately 23 rendered pages per the build output. Required entries at minimum:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.cornerhouse.co.in/</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.cornerhouse.co.in/properties</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.9</priority>
  </url>
  <!-- all property detail pages -->
  <url>
    <loc>https://www.cornerhouse.co.in/blog</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.cornerhouse.co.in/blog/krisumi-forest-reserve-review</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.cornerhouse.co.in/blog/krisumi-projects-explained</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.cornerhouse.co.in/blog/is-krisumi-good-investment</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

Generate the full list from `dist/` — every `.html` file that isn't a 404 page gets an entry.

**3b. Verify sitemap is accessible**

After build, confirm `dist/sitemap.xml` exists and is served at the root. Check `vite.config.ts` or `wrangler.toml` — static files in `public/` should be copied to `dist/` automatically by Vite.

**Note:** Do not submit to GSC from code — Saurabh will submit manually at `https://search.google.com/search-console` → Sitemaps → Add `sitemap.xml`.

---

## Fix 4 — LocalBusiness Schema on Homepage

In the homepage component (likely `src/pages/HomePage.tsx` or `src/pages/Home.tsx`), add a `<script type="application/ld+json">` block in the `<head>` with the following schema. Use the existing Helmet/head management pattern already used on blog posts.

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "The Corner House",
  "url": "https://www.cornerhouse.co.in/",
  "logo": "https://www.cornerhouse.co.in/logos/corner-house-horizontal-transparent.svg",
  "image": "https://www.cornerhouse.co.in/og-default.jpg",
  "description": "Boutique luxury real estate brokerage specialising in ultra-premium residences across Gurugram and Delhi NCR. Golf Course Road, DLF Camellias, Aerocity, Chattarpur farmhouses.",
  "telephone": "+919871950051",
  "email": "hello@cornerhouse.co.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C3-151, Sobha Sector 108",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122006",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.4089,
    "longitude": 77.0373
  },
  "areaServed": [
    "Gurugram",
    "Delhi NCR",
    "New Delhi",
    "Noida"
  ],
  "sameAs": [
    "https://www.instagram.com/thecornerhouserealty/"
  ],
  "priceRange": "₹₹₹₹",
  "openingHours": "Mo-Sa 09:00-19:00"
}
```

---

## Fix 5 — RealEstateListing Schema on Property Pages

Each property detail page needs a `ListingSchema` JSON-LD block. Use the data already present in each property's JSON files in `data/properties/`.

Add this schema pattern to the shared `PropertyDetail.tsx` component so it applies to all listings automatically. Pull values from the existing property data object:

```json
{
  "@context": "https://schema.org",
  "@type": "Residence",
  "name": "[property.name]",
  "description": "[property.description]",
  "url": "https://www.cornerhouse.co.in/properties/[property.slug]",
  "image": "[property.heroImage]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[property.sector]",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "addressCountry": "IN"
  },
  "numberOfRooms": "[property.bedrooms]",
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "[property.areaSqft]",
    "unitCode": "FTK"
  },
  "offers": {
    "@type": "Offer",
    "price": "[property.priceNumeric]",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
```

For properties where price is "On Request" — omit the `offers` block entirely rather than putting placeholder text. Schema with fake data is worse than no schema.

Check the actual field names in `data/properties/sobha-aranya.json` (canonical reference) and map accordingly. If any field doesn't exist in the JSON, skip it rather than hardcoding.

---

## After All Fixes

1. `npm run build` — green, zero errors
2. Confirm in `dist/`:
   - `sitemap.xml` present at root
   - No `href="#"` anywhere (grep check)
   - Blog post canonicals all show `www.cornerhouse.co.in`
   - Homepage HTML contains `RealEstateAgent` JSON-LD
   - A property detail page HTML contains `Residence` JSON-LD
3. Push branch to origin → Cloudflare preview URL
4. Share preview URL for review before PR to staging → main

After merge to main, Saurabh will manually:
- Submit sitemap in GSC (`https://www.cornerhouse.co.in/sitemap.xml`)
- Request indexing for all 3 blog post URLs in GSC URL Inspection
