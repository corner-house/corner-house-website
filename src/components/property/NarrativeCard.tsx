import type { ComponentType } from 'react';
import * as React from 'react';
import {
  Building2,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Home,
  MapPin,
  Users,
  Briefcase,
  Landmark,
  Sparkles,
} from 'lucide-react';
import { DoodleCorner } from './Squiggle';

type IconName =
  | 'Building2'
  | 'GraduationCap'
  | 'TrendingUp'
  | 'ShieldCheck'
  | 'Calendar'
  | 'Home'
  | 'MapPin'
  | 'Users'
  | 'Briefcase'
  | 'Landmark'
  | 'Sparkles';

const ICON_MAP: Record<IconName, ComponentType<{ className?: string }>> = {
  Building2,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Home,
  MapPin,
  Users,
  Briefcase,
  Landmark,
  Sparkles,
};

interface NarrativeCardProps {
  key?: React.Key;
  icon?: IconName;
  label: string;
  body: string;
}

export default function NarrativeCard({ icon, label, body }: NarrativeCardProps) {
  const Icon = icon ? ICON_MAP[icon] : null;

  return (
    <article className="relative bg-white/80 border border-border/40 p-5 md:p-6 shadow-sm">
      <DoodleCorner className="absolute top-2 right-2 w-5 h-5 text-primary/25 rotate-90" />
      <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6">
        {Icon && (
          <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-heading font-semibold text-base md:text-lg mb-2 leading-tight">
            {label}
          </h3>
          <p className="text-foreground/75 font-light leading-relaxed text-sm md:text-base">
            {body}
          </p>
        </div>
      </div>
    </article>
  );
}
