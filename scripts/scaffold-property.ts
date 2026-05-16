import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { z } from 'zod';
import {
  propertySourceSchema,
  propertyListingSchema,
  softWarn,
  type PropertySource,
  type PropertyListing,
  type ImageVariants,
} from '../src/components/property/schema.js';

const SITE_URL = 'https://www.cornerhouse.co.in';

interface ImagesManifest {
  propertyName: string;
  uploadedAt: string;
  totalImages: number;
  images: Record<string, ImageVariants>;
}

function die(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function loadJson<T>(path: string, description: string): T {
  if (!existsSync(path)) die(`${description} not found: ${path}`);
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch (err) {
    die(`Failed to parse ${description} at ${path}: ${(err as Error).message}`);
  }
}

function collectImageKeys(source: PropertySource): string[] {
  const keys = new Set<string>();
  keys.add(source.hero.heroImageKey);
  if (source.hero.mobileHeroImageKey) keys.add(source.hero.mobileHeroImageKey);
  if (source.seo.ogImageKey) keys.add(source.seo.ogImageKey);
  for (const fp of source.floorPlans) keys.add(fp.imageKey);
  const cats = [
    source.amenities.wellness,
    source.amenities.sports,
    source.amenities.family,
    source.amenities.lifestyle,
    source.amenities.sustainability,
  ];
  for (const list of cats) for (const a of list) if (a.imageKey) keys.add(a.imageKey);
  if (source.neighbourhood.backdropImageKey) keys.add(source.neighbourhood.backdropImageKey);
  if (source.investmentThesis.backdropImageKey) keys.add(source.investmentThesis.backdropImageKey);
  return Array.from(keys);
}

function verifyImageKeys(referenced: string[], manifest: ImagesManifest): void {
  const available = new Set(Object.keys(manifest.images));
  const missing = referenced.filter((k) => !available.has(k));
  if (missing.length > 0) {
    console.error('✗ Image keys referenced in source.json but missing from manifest:');
    for (const k of missing) console.error(`    - ${k}`);
    console.error(`  Available keys (${available.size}): ${Array.from(available).slice(0, 8).join(', ')}…`);
    process.exit(1);
  }
}

function parseIndianPrice(raw: string): number | null {
  const s = raw.replace(/[₹,\s]/g, '').trim().toLowerCase();
  const crMatch = s.match(/^([\d.]+)(cr|crore|crores)$/);
  if (crMatch) return Math.round(parseFloat(crMatch[1]) * 1_00_00_000);
  const lakhMatch = s.match(/^([\d.]+)(l|lakh|lakhs)$/);
  if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 1_00_000);
  const plainMatch = s.match(/^([\d.]+)$/);
  if (plainMatch) return Math.round(parseFloat(plainMatch[1]));
  return null;
}

function clampDescription(s: string, max = 155): string {
  const compact = s.replace(/\s+/g, ' ').trim();
  if (compact.length <= max) return compact;
  const cut = compact.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut) + '…';
}

function clampTitle(s: string, max = 70): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

function computeTitle(source: PropertySource): string {
  if (source.seo.title) return source.seo.title;
  return clampTitle(
    `${source.projectName} — ${source.location.locality} | Price ${source.hero.priceFrom}+`,
  );
}

function computeDescription(source: PropertySource): string {
  if (source.seo.description) return clampDescription(source.seo.description);
  const parts = [
    `Buy ${source.projectName} in ${source.location.locality}, ${source.location.city}.`,
    `${source.atAGlance.configuration} from ${source.hero.priceFrom}.`,
    source.atAGlance.status + '.',
    `${source.atAGlance.totalUnits} units across ${source.atAGlance.totalTowers} towers.`,
    `Possession ${source.atAGlance.possession}.`,
  ];
  return clampDescription(parts.join(' '));
}

function computeKeywords(source: PropertySource): string[] {
  const auto = [
    source.projectName,
    source.developerName,
    `${source.projectName} ${source.location.locality}`,
    `${source.projectName} price`,
    `${source.projectName} floor plan`,
    `luxury apartments ${source.location.city}`,
    `${source.location.locality} real estate`,
  ];
  const merged = Array.from(new Set([...source.seo.keywords, ...auto]));
  return merged.slice(0, 12);
}

function buildRealEstateListingLd(
  source: PropertySource,
  images: Record<string, ImageVariants>,
  canonicalUrl: string,
): Record<string, unknown> {
  const lowPrice = parseIndianPrice(source.hero.priceFrom);
  const highPrice = source.hero.priceTo ? parseIndianPrice(source.hero.priceTo) : null;
  const heroUrl = images[source.hero.heroImageKey]?.hero;
  const imageUrls = [heroUrl, ...source.floorPlans.slice(0, 4).map((fp) => images[fp.imageKey]?.gallery)]
    .filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: source.projectName,
    url: canonicalUrl,
    description: source.hero.tagline,
    image: imageUrls,
    address: {
      '@type': 'PostalAddress',
      streetAddress: source.location.addressLine,
      addressLocality: source.location.locality,
      addressRegion: source.location.city,
      postalCode: source.location.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: source.location.latitude,
      longitude: source.location.longitude,
    },
    datePosted: new Date().toISOString().slice(0, 10),
    ...(lowPrice !== null && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        ...(highPrice !== null && highPrice !== lowPrice
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: lowPrice, maxPrice: highPrice, priceCurrency: 'INR' } }
          : { price: lowPrice }),
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

function buildProductLd(
  source: PropertySource,
  images: Record<string, ImageVariants>,
): Record<string, unknown> {
  const heroUrl = images[source.hero.heroImageKey]?.hero;
  const prices = source.pricing
    .map((p) => parseIndianPrice(p.totalPriceFrom))
    .filter((n): n is number => n !== null);
  const pricesHigh = source.pricing
    .map((p) => parseIndianPrice(p.totalPriceTo ?? p.totalPriceFrom))
    .filter((n): n is number => n !== null);
  const low = prices.length > 0 ? Math.min(...prices) : null;
  const high = pricesHigh.length > 0 ? Math.max(...pricesHigh) : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: source.projectName,
    description: source.hero.tagline,
    image: heroUrl ? [heroUrl] : [],
    brand: { '@type': 'Brand', name: source.developerName },
    ...(low !== null && high !== null && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: low,
        highPrice: high,
        offerCount: source.pricing.length,
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

function buildFaqLd(source: PropertySource): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: source.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function buildBreadcrumbLd(
  source: PropertySource,
  canonicalUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: `${SITE_URL}/properties` },
      { '@type': 'ListItem', position: 3, name: source.projectName, item: canonicalUrl },
    ],
  };
}

function main() {
  const [slug] = process.argv.slice(2);
  if (!slug) die('Usage: npx tsx scripts/scaffold-property.ts <propertyName>');

  const sourcePath = `data/properties/${slug}-source.json`;
  const manifestPath = `data/properties/${slug}-images.json`;
  const outputPath = `data/properties/${slug}.json`;

  console.log(`Scaffolding "${slug}"`);
  console.log(`  source:   ${sourcePath}`);
  console.log(`  manifest: ${manifestPath}`);
  console.log(`  output:   ${outputPath}\n`);

  const rawSource = loadJson<unknown>(sourcePath, 'source file');
  const manifest = loadJson<ImagesManifest>(manifestPath, 'images manifest');

  const parseResult = propertySourceSchema.safeParse(rawSource);
  if (!parseResult.success) {
    console.error('✗ source.json failed schema validation:');
    for (const issue of parseResult.error.issues) {
      console.error(`    ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    process.exit(1);
  }
  const source = parseResult.data;

  if (source.slug !== slug) {
    die(`source.slug "${source.slug}" does not match CLI arg "${slug}"`);
  }

  verifyImageKeys(collectImageKeys(source), manifest);

  const warnings = softWarn(source);
  if (warnings.length > 0) {
    console.log('⚠ Warnings (non-blocking):');
    for (const w of warnings) console.log(`    ${w}`);
    console.log('');
  }

  const canonicalUrl = `${SITE_URL}/properties/${slug}`;
  const ogKey = source.seo.ogImageKey ?? source.hero.heroImageKey;
  const ogImageUrl = manifest.images[ogKey]?.gallery;
  if (!ogImageUrl) die(`OG image key "${ogKey}" missing from manifest`);

  const listing: PropertyListing = {
    ...source,
    images: manifest.images,
    canonicalUrl,
    computedSeo: {
      title: computeTitle(source),
      description: computeDescription(source),
      ogImageUrl,
      keywords: computeKeywords(source),
    },
    jsonLd: {
      realEstateListing: buildRealEstateListingLd(source, manifest.images, canonicalUrl),
      product: buildProductLd(source, manifest.images),
      faqPage: buildFaqLd(source),
      breadcrumbList: buildBreadcrumbLd(source, canonicalUrl),
    },
    generatedAt: new Date().toISOString(),
  };

  const validation = propertyListingSchema.safeParse(listing);
  if (!validation.success) {
    console.error('✗ Generated listing failed its own schema validation (bug in scaffold script):');
    for (const issue of validation.error.issues) {
      console.error(`    ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    process.exit(1);
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(validation.data, null, 2) + '\n');

  console.log('✓ Listing generated successfully');
  console.log(`  Title:       ${listing.computedSeo.title}`);
  console.log(`  Description: ${listing.computedSeo.description}`);
  console.log(`  Canonical:   ${canonicalUrl}`);
  console.log(`  Images:      ${Object.keys(listing.images).length}`);
  console.log(`  FAQs:        ${listing.faqs.length}`);
  console.log(`\nNext step: visit ${canonicalUrl.replace(SITE_URL, 'http://localhost:3000')} after running \`npm run dev\`.`);
}

main();
