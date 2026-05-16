import type { LucideIcon } from 'lucide-react';
import {
  Waves, Baby, Droplets, Dumbbell, Leaf, Sparkles,
  TreePine, Wind, Car, Shield, Building2, Award,
} from 'lucide-react';

interface Amenity {
  label: string;
  icon: LucideIcon;
  note?: string;
}

const AMENITIES: Amenity[] = [
  { label: "Lap Pool", icon: Waves, note: "Exclusive to Forest Reserve" },
  { label: "Kid's Pool", icon: Baby, note: "Exclusive to Forest Reserve" },
  { label: "Kid's Stream / Lake", icon: Droplets, note: "Landscaped water feature" },
  { label: "Gymnasium", icon: Dumbbell, note: "Brochure p.58" },
  { label: "Yoga Deck", icon: Leaf, note: "Central courtyard" },
  { label: "Source Fountain", icon: Sparkles, note: "Forest Mist Pond" },
  { label: "Forest Resting Spaces", icon: TreePine, note: "Landscaped gardens" },
  { label: "Bamboo Garden", icon: Wind, note: "Japanese garden design" },
  { label: "Covered Parking", icon: Car, note: "Basement" },
  { label: "24/7 Security", icon: Shield, note: "Gated community" },
  { label: "Clubhouse", icon: Building2, note: "Shared Krisumi City facility" },
  { label: "Nikken Sekkei Design", icon: Award, note: "Japan's No.1 architectural firm" },
];

// 4-col desktop, 2-col mobile. Gold icon up top, label, optional note.
export default function AmenitiesGrid() {
  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {AMENITIES.map((a) => {
        const Icon = a.icon;
        return (
          <div
            key={a.label}
            className="bg-card border border-border p-5 flex flex-col items-start gap-3"
          >
            <Icon className="h-6 w-6" style={{ color: '#C9933A' }} aria-hidden />
            <div>
              <div className="font-heading font-medium text-base leading-tight text-foreground">
                {a.label}
              </div>
              {a.note && (
                <div className="mt-1.5 text-xs font-light text-muted-foreground leading-snug">
                  {a.note}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
