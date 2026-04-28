import { useState } from 'react';
import type { ComponentType } from 'react';
import { Leaf, Heart, Dumbbell, Users, Sparkles } from 'lucide-react';
import type { PropertyListing } from '../schema';
import { getImageOrNull } from '../image-helpers';
import SectionHeading from '../SectionHeading';
import { DoodleSparkles } from '../Doodles';
import {
  IconIGBC,
  IconRainwater,
  IconWaterCycle,
  IconSolar,
  IconEVCharge,
  IconCactus,
} from '../Doodles';

interface AmenitiesProps {
  amenities: PropertyListing['amenities'];
  listing: PropertyListing;
}

type CategoryKey = keyof PropertyListing['amenities'];

const CATEGORIES: Array<{ key: CategoryKey; label: string; icon: typeof Leaf }> = [
  { key: 'wellness', label: 'Wellness', icon: Heart },
  { key: 'sports', label: 'Sports', icon: Dumbbell },
  { key: 'family', label: 'Family', icon: Users },
  { key: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
  { key: 'sustainability', label: 'Sustainability', icon: Leaf },
];

const CATEGORY_ICON_MAP: Record<CategoryKey, typeof Leaf> = {
  wellness: Heart,
  sports: Dumbbell,
  family: Users,
  lifestyle: Sparkles,
  sustainability: Leaf,
};

type SvgComponent = ComponentType<{ className?: string }>;

const SUSTAINABILITY_ILLUSTRATIONS: Record<string, SvgComponent> = {
  'IGBC Platinum Pre-Certification': IconIGBC,
  'Rainwater Harvesting System': IconRainwater,
  'Sewage Treatment Plant': IconWaterCycle,
  'Solar Water Heating': IconSolar,
  'EV Charging Points': IconEVCharge,
  'Drought-Tolerant Landscaping': IconCactus,
};

const hasVisual = (
  item: { imageKey?: string; name: string },
  cat: CategoryKey,
): boolean =>
  Boolean(item.imageKey) ||
  (cat === 'sustainability' && item.name in SUSTAINABILITY_ILLUSTRATIONS);

export default function Amenities({ amenities, listing }: AmenitiesProps) {
  const populated = CATEGORIES.filter((c) =>
    amenities[c.key].some((i) => hasVisual(i, c.key)),
  );
  const [active, setActive] = useState<CategoryKey>(populated[0]?.key ?? 'wellness');

  if (populated.length === 0) return null;

  const items = amenities[active].filter((i) => hasVisual(i, active));
  const isSustainability = active === 'sustainability';

  return (
    <section id="amenities" className="py-10 md:py-12 bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the lifestyle"
          title="Amenities"
          doodle={<DoodleSparkles />}
        />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40" role="tablist">
          {populated.map((cat) => {
            const TabIcon = cat.icon;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={active === cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-3 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px flex items-center gap-2 ${
                  active === cat.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <TabIcon className="h-3.5 w-3.5" />
                {cat.label}{' '}
                <span className="text-muted-foreground/60 ml-1">
                  ({amenities[cat.key].filter((i) => hasVisual(i, cat.key)).length})
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const variants = getImageOrNull(listing, item.imageKey);
            const FallbackIcon = CATEGORY_ICON_MAP[active];
            const SustainIcon = isSustainability
              ? SUSTAINABILITY_ILLUSTRATIONS[item.name]
              : undefined;
            return (
              <div
                key={item.name}
                className="bg-white border border-border/40 overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-[#EEF3EC] overflow-hidden flex items-center justify-center">
                  {variants ? (
                    <img
                      src={variants.thumb}
                      srcSet={`${variants.thumb} 400w, ${variants.gallery} 1200w`}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                  ) : SustainIcon ? (
                    <SustainIcon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                  ) : (
                    <FallbackIcon
                      className="h-12 w-12 text-primary/40"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="font-heading font-medium text-sm md:text-base">{item.name}</div>
                  {item.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
