import { Clock, Plane, TrainFront, Briefcase, ShoppingBag, GraduationCap, Stethoscope, MapPin } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleArrows } from '../Doodles';

interface ConnectivityProps {
  connectivity: PropertyListing['connectivity'];
}

const CATEGORY_ICON = {
  airport: Plane,
  metro: TrainFront,
  business: Briefcase,
  retail: ShoppingBag,
  education: GraduationCap,
  healthcare: Stethoscope,
  other: MapPin,
} as const;

export default function Connectivity({ connectivity }: ConnectivityProps) {
  const sorted = [...connectivity].sort((a, b) => a.driveTimeMinutes - b.driveTimeMinutes);

  return (
    <section id="connectivity" className="py-10 md:py-12 bg-[#EDF5F3]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="getting around"
          title="Connectivity"
          doodle={<DoodleArrows />}
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 bg-white border border-border/40">
          {sorted.map((item) => {
            const Icon = CATEGORY_ICON[item.category];
            return (
              <li
                key={item.destination}
                className="flex items-center justify-between px-5 py-4 border-b border-dashed border-border/40 last:border-0 md:[&:nth-last-child(2)]:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{item.destination}</div>
                    {item.distanceKm !== undefined && (
                      <div className="text-xs text-muted-foreground">{item.distanceKm} km</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-heading font-semibold text-foreground">
                    <span className="highlight-yellow">{item.driveTimeMinutes}</span>
                  </span>
                  <span>min</span>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Drive times are approximate, sourced from typical off-peak traffic. Verify with a current
          navigation service before planning visits.
        </p>
      </div>
    </section>
  );
}
