import { z } from 'zod';

const imageKey = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be lowercase-hyphenated, no extension');

const url = z.string().url();
const nonEmpty = z.string().min(1).trim();

const possessionCoerced = z
  .string()
  .min(1)
  .transform((val, ctx) => {
    const v = val.trim();
    if (/^\d{4}-\d{2}(-\d{2})?$/.test(v)) return v;
    const monthMap: Record<string, string> = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
      january: '01', february: '02', march: '03', april: '04',
      june: '06', july: '07', august: '08', september: '09',
      october: '10', november: '11', december: '12',
    };
    const mName = v.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (mName) {
      const mon = monthMap[mName[1].toLowerCase()];
      if (mon) return `${mName[2]}-${mon}`;
    }
    const mQuarter = v.match(/^Q([1-4])\s+(\d{4})$/i);
    if (mQuarter) {
      const endMonth: Record<string, string> = { '1': '03', '2': '06', '3': '09', '4': '12' };
      return `${mQuarter[2]}-${endMonth[mQuarter[1]]}`;
    }
    ctx.addIssue({
      code: 'custom',
      message: `Cannot parse possession date "${v}". Use ISO (e.g. "2029-12") or "Dec 2029" / "Q4 2029".`,
    });
    return z.NEVER;
  });

export const heroSchema = z.object({
  tagline: nonEmpty.max(120),
  priceFrom: nonEmpty,
  priceTo: nonEmpty.optional(),
  priceSuffix: z.string().default('onwards'),
  heroImageKey: imageKey.default('banner-image'),
  mobileHeroImageKey: imageKey.optional(),
  keyStats: z.array(z.object({ label: nonEmpty, value: nonEmpty })).min(3).max(6),
});

export const atAGlanceSchema = z.object({
  projectType: nonEmpty,
  configuration: nonEmpty,
  unitSizes: nonEmpty,
  totalArea: nonEmpty,
  totalUnits: z.number().int().positive(),
  totalTowers: z.number().int().positive(),
  floors: nonEmpty,
  launchDate: nonEmpty.optional(),
  possession: possessionCoerced,
  status: z.enum(['Pre-Launch', 'Under Construction', 'Ready to Move', 'Resale']),
  reraStatus: z.enum(['Registered', 'Applied', 'Pending']),
});

export const pricingRowSchema = z.object({
  configuration: nonEmpty,
  carpetAreaSqft: z.number().positive(),
  builtUpAreaSqft: z.number().positive(),
  pricePerSqft: z.number().positive().optional(),
  totalPriceFrom: nonEmpty,
  totalPriceTo: nonEmpty.optional(),
  inventoryStatus: z.enum(['Available', 'Limited', 'Sold Out']).default('Available'),
});

export const floorPlanSchema = z.object({
  name: nonEmpty,
  configuration: nonEmpty,
  carpetAreaSqft: z.number().positive(),
  imageKey,
  description: z.string().optional(),
});

export const towerSchema = z.object({
  name: nonEmpty,
  floors: z.number().int().positive(),
  unitsPerFloor: z.number().int().positive().optional(),
});

export const buildingSchema = z.object({
  towers: z.array(towerSchema).min(1),
  heightMeters: z.number().positive().optional(),
  structure: nonEmpty.default('RCC framed structure'),
  earthquakeZone: nonEmpty.optional(),
  basements: z.number().int().nonnegative().optional(),
  liftsPerTower: z.number().int().positive().optional(),
  parking: z.object({
    type: z.enum(['basement', 'podium', 'mixed', 'stilt']),
    slotsPerUnit: z.number().positive().optional(),
  }).optional(),
});

export const amenityItemSchema = z.object({
  name: nonEmpty,
  imageKey: imageKey.optional(),
  description: z.string().max(160).optional(),
});

export const amenitiesSchema = z.object({
  wellness: z.array(amenityItemSchema).default([]),
  sports: z.array(amenityItemSchema).default([]),
  family: z.array(amenityItemSchema).default([]),
  lifestyle: z.array(amenityItemSchema).default([]),
  sustainability: z.array(amenityItemSchema).default([]),
});

export const locationSchema = z
  .object({
    addressLine: nonEmpty,
    locality: nonEmpty,
    city: nonEmpty,
    state: nonEmpty.default('Haryana'),
    pincode: z.string().regex(/^\d{6}$/).optional(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    googleMapsPlaceId: z.string().optional(),
    googleMapsEmbedUrl: url.optional(),
  })
  .refine(
    (d) => d.googleMapsPlaceId || d.googleMapsEmbedUrl,
    { message: 'Provide googleMapsPlaceId or googleMapsEmbedUrl' },
  );

export const connectivityItemSchema = z.object({
  destination: nonEmpty,
  driveTimeMinutes: z.number().int().positive(),
  distanceKm: z.number().positive().optional(),
  category: z
    .enum(['airport', 'metro', 'business', 'retail', 'education', 'healthcare', 'other'])
    .default('other'),
});

export const cardIconEnum = z.enum([
  'Building2',
  'GraduationCap',
  'TrendingUp',
  'ShieldCheck',
  'Calendar',
  'Home',
  'MapPin',
  'Users',
  'Briefcase',
  'Landmark',
  'Sparkles',
]);

export const narrativeCardSchema = z.object({
  icon: cardIconEnum.optional(),
  label: nonEmpty.max(80),
  body: nonEmpty,
});

export const neighbourhoodSchema = z.object({
  title: nonEmpty,
  paragraphs: z.array(nonEmpty).min(2).max(6),
  highlights: z.array(nonEmpty).min(3).max(8),
  backdropImageKey: imageKey.optional(),
  cards: z.array(narrativeCardSchema).max(6).default([]),
});

export const builderSchema = z.object({
  name: nonEmpty,
  tagline: nonEmpty.optional(),
  logoUrl: url.optional(),
  description: nonEmpty,
  foundedYear: z.number().int().min(1800).max(2100).optional(),
  headquarters: z.string().optional(),
  websiteUrl: url.optional(),
  notableProjects: z.array(nonEmpty).max(8).default([]),
});

export const paymentMilestoneSchema = z.object({
  milestone: nonEmpty,
  percentage: z.number().min(0).max(100),
  description: z.string().optional(),
});

export const paymentPlanSchema = z.object({
  planName: nonEmpty.default('Construction-Linked Plan'),
  milestones: z.array(paymentMilestoneSchema).min(2),
  notes: z.array(z.string()).default([]),
});

export const emiDefaultsSchema = z
  .object({
    defaultPrincipalCr: z.number().positive().default(3.8),
    defaultInterestRatePct: z.number().positive().default(8.5),
    defaultTenureYears: z.number().int().positive().default(20),
    downPaymentPct: z.number().min(0).max(100).default(20),
  })
  .default({
    defaultPrincipalCr: 3.8,
    defaultInterestRatePct: 8.5,
    defaultTenureYears: 20,
    downPaymentPct: 20,
  });

export const investmentThesisSchema = z.object({
  headline: nonEmpty,
  paragraphs: z.array(nonEmpty).min(2).max(4),
  dataPoints: z
    .array(z.object({
      label: nonEmpty,
      value: nonEmpty,
      source: z.string().optional(),
    }))
    .max(6)
    .default([]),
  backdropImageKey: imageKey.optional(),
  cards: z.array(narrativeCardSchema).max(6).default([]),
});

export const faqSchema = z
  .array(z.object({ question: nonEmpty.max(200), answer: nonEmpty }))
  .min(5)
  .max(15);

export const reraSchema = z.object({
  number: nonEmpty,
  authority: nonEmpty.default('HARERA'),
  state: nonEmpty.default('Haryana'),
  registeredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  validUpto: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  verificationUrl: url.optional(),
});

export const propertySourceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  projectName: nonEmpty,
  developerName: nonEmpty,

  seo: z
    .object({
      title: z.string().max(70).optional(),
      description: z.string().max(155).optional(),
      keywords: z.array(nonEmpty).max(12).default([]),
      ogImageKey: imageKey.optional(),
    })
    .default({ keywords: [] }),

  hero: heroSchema,
  videos: z
    .object({
      vimeoId: z.string().regex(/^\d{6,12}$/).optional(),
      youtubeId: z.string().regex(/^[A-Za-z0-9_-]{6,20}$/).optional(),
      virtualTourUrl: url.optional(),
      tagline: z.string().optional(),
    })
    .optional(),
  videoMp4s: z
    .array(
      z.object({
        url: url,
        label: nonEmpty,
        description: z.string().optional(),
        posterImageKey: imageKey.optional(),
      }),
    )
    .default([]),
  atAGlance: atAGlanceSchema,
  pricing: z.array(pricingRowSchema).min(1),
  floorPlans: z.array(floorPlanSchema).default([]),
  building: buildingSchema,
  amenities: amenitiesSchema,
  location: locationSchema,
  connectivity: z.array(connectivityItemSchema).min(2),
  neighbourhood: neighbourhoodSchema,
  builder: builderSchema,
  paymentPlan: paymentPlanSchema.optional(),
  emiCalculator: emiDefaultsSchema,
  investmentThesis: investmentThesisSchema,
  similarProperties: z.array(z.string()).default([]),
  faqs: faqSchema,
  rera: reraSchema,
  brochureUrl: url.optional(),
  externalGalleryUrl: z
    .object({
      url: url,
      label: nonEmpty.default('More Photos'),
      hostName: nonEmpty.optional(),
    })
    .optional(),
  gallery: z
    .object({
      enabled: z.boolean().default(true),
      curated: z
        .array(
          z.object({
            imageKey: imageKey,
            caption: z.string().optional(),
            category: z
              .enum(['exteriors', 'interiors', 'amenities', 'master-plans', 'surroundings', 'other'])
              .optional(),
          }),
        )
        .optional(),
      exclude: z.array(imageKey).default([]),
    })
    .default({ enabled: true, exclude: [] }),
  disclaimerAddendum: z.string().optional(),
});

export type PropertySource = z.infer<typeof propertySourceSchema>;

export const imageVariantsSchema = z.object({
  original: z.string().url(),
  hero: z.string().url(),
  gallery: z.string().url(),
  thumb: z.string().url(),
});

export type ImageVariants = z.infer<typeof imageVariantsSchema>;

export const propertyListingSchema = propertySourceSchema.extend({
  images: z.record(z.string(), imageVariantsSchema),
  canonicalUrl: z.string().url(),
  computedSeo: z.object({
    title: z.string(),
    description: z.string(),
    ogImageUrl: z.string().url(),
    keywords: z.array(z.string()),
  }),
  jsonLd: z.object({
    realEstateListing: z.record(z.string(), z.unknown()),
    product: z.record(z.string(), z.unknown()),
    faqPage: z.record(z.string(), z.unknown()),
    breadcrumbList: z.record(z.string(), z.unknown()),
  }),
  generatedAt: z.string(),
});

export type PropertyListing = z.infer<typeof propertyListingSchema>;

export function softWarn(listing: PropertySource): string[] {
  const warnings: string[] = [];

  if (listing.paymentPlan) {
    const sum = Math.round(
      listing.paymentPlan.milestones.reduce((s, m) => s + m.percentage, 0),
    );
    if (sum !== 100) {
      warnings.push(`paymentPlan milestones sum to ${sum}% (expected 100%)`);
    }
  }

  const neighbourhoodWords = listing.neighbourhood.paragraphs.join(' ').split(/\s+/).length;
  if (neighbourhoodWords < 200) {
    warnings.push(`neighbourhood content is ${neighbourhoodWords} words (recommend ≥ 200)`);
  }

  const thesisWords = listing.investmentThesis.paragraphs.join(' ').split(/\s+/).length;
  if (thesisWords < 150) {
    warnings.push(`investmentThesis content is ${thesisWords} words (recommend ≥ 150)`);
  }

  if (listing.faqs.length !== 10) {
    warnings.push(`faqs has ${listing.faqs.length} entries (recommend exactly 10)`);
  }

  return warnings;
}
