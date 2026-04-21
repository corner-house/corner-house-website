import type { Property } from '@/types';
import { propertyListingSchema, type PropertyListing } from '@/components/property/schema';

const modules = import.meta.glob<{ default: unknown }>('../../data/properties/*.json', {
  eager: true,
});

const listings: Record<string, PropertyListing> = {};

for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split('/').pop() ?? '';
  if (filename.endsWith('-images.json') || filename.endsWith('-source.json')) continue;
  const slug = filename.replace(/\.json$/, '');
  const parsed = propertyListingSchema.safeParse(mod.default);
  if (parsed.success) {
    listings[slug] = parsed.data;
  } else if (typeof console !== 'undefined') {
    console.warn(
      `[propertyListings] Skipping "${slug}" — schema validation failed:`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
    );
  }
}

export const PROPERTY_LISTINGS: Readonly<Record<string, PropertyListing>> = listings;
export const PROPERTY_LISTING_SLUGS: readonly string[] = Object.keys(listings);

export function getPropertyListing(slug: string | undefined): PropertyListing | undefined {
  if (!slug) return undefined;
  return PROPERTY_LISTINGS[slug];
}

function parseBedCount(config: string): number {
  const match = config.match(/(\d+)\s*BHK/i);
  return match ? parseInt(match[1], 10) : 3;
}

export function listingAsProperty(listing: PropertyListing): Property {
  const heroUrl = listing.images[listing.hero.heroImageKey]?.gallery ?? '';
  const firstFloorPlanKey = listing.floorPlans[0]?.imageKey;
  const floorPlanUrl = firstFloorPlanKey
    ? listing.images[firstFloorPlanKey]?.gallery ?? heroUrl
    : heroUrl;
  const beds = parseBedCount(listing.atAGlance.configuration);
  return {
    id: listing.slug,
    title: listing.projectName,
    location: `${listing.location.locality}, ${listing.location.city}`,
    price: listing.hero.priceFrom,
    type: listing.atAGlance.projectType,
    beds,
    baths: beds,
    area: listing.atAGlance.unitSizes,
    images: [heroUrl].filter(Boolean),
    floorPlan: floorPlanUrl,
    description: listing.hero.tagline,
    amenities: [],
    highlights: [],
    details: {},
  };
}

export const RICH_PROPERTIES: readonly Property[] = Object.values(listings).map(listingAsProperty);

if (typeof console !== 'undefined') {
  console.log('[propertyListings] modules globbed:', Object.keys(modules));
  console.log('[propertyListings] listings populated:', Object.keys(listings));
  console.log('[propertyListings] RICH_PROPERTIES count:', RICH_PROPERTIES.length);
  if (RICH_PROPERTIES.length > 0) {
    console.log('[propertyListings] first card:', RICH_PROPERTIES[0]);
  }
}
