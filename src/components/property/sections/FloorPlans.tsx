import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import type { PropertyListing } from '../schema';
import { getImage } from '../image-helpers';
import SectionHeading from '../SectionHeading';
import { DoodleFloorPlan } from '../Doodles';

interface FloorPlansProps {
  floorPlans: PropertyListing['floorPlans'];
  listing: PropertyListing;
}

export default function FloorPlans({ floorPlans, listing }: FloorPlansProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (floorPlans.length === 0) return null;

  const active = activeIndex !== null ? floorPlans[activeIndex] : null;
  const activeVariants = active ? getImage(listing, active.imageKey) : null;

  return (
    <section id="floor-plans" className="py-10 md:py-12 bg-[#F4F5F7]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the blueprints"
          title="Layouts & unit plans"
          doodle={<DoodleFloorPlan />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {floorPlans.map((plan, i) => {
            const variants = getImage(listing, plan.imageKey);
            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative bg-white border border-border/40 p-4 text-left hover:border-primary transition-colors"
              >
                <div className="relative aspect-[4/3] bg-secondary/30 flex items-center justify-center overflow-hidden">
                  <img
                    src={variants.gallery}
                    alt={`${plan.name} floor plan`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="font-heading font-medium">{plan.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.configuration} · {plan.carpetAreaSqft.toLocaleString('en-IN')} sq.ft carpet
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active && activeVariants && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} floor plan enlarged`}
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute top-6 right-6 p-2 text-white hover:text-primary transition-colors"
            aria-label="Close floor plan"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="flex-1 flex items-center justify-center p-6">
            <img
              src={activeVariants.original}
              alt={`${active.name} floor plan — enlarged`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="p-6 text-center text-white">
            <div className="font-heading text-xl">{active.name}</div>
            <div className="text-sm text-white/70">
              {active.configuration} · {active.carpetAreaSqft.toLocaleString('en-IN')} sq.ft carpet
            </div>
            {active.description && (
              <p className="mt-2 text-sm text-white/60 max-w-2xl mx-auto">{active.description}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
