import type { LucideIcon } from 'lucide-react';
import { Building2, LayoutGrid, Map, Calendar } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ProjectOverviewStatsProps {
  projectType?: string;
  configuration?: string;
  landArea?: string;
  possession?: string;
}

// White-card 4-up stats row shown after the credibility callout, before the first H2.
// Mirrors the navy hero stats bar visually (gold label, navy value) but on a light surface
// so it reads as a "factual quick reference" rather than a brand-style band.
export default function ProjectOverviewStats({
  projectType = 'Residential Apartments',
  configuration = '2, 3, 4 LDK and Penthouses',
  landArea = '6.49 acres',
  possession = 'November 2030',
}: ProjectOverviewStatsProps) {
  const items: StatItem[] = [
    { icon: Building2, label: 'Project Type', value: projectType },
    { icon: LayoutGrid, label: 'Configuration', value: configuration },
    { icon: Map, label: 'Total Land Area', value: landArea },
    { icon: Calendar, label: 'Possession', value: possession },
  ];

  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border border-border bg-card">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={
              'p-6 flex flex-col items-start gap-3 ' +
              (i < items.length - 1 ? 'md:border-r md:border-border' : '')
            }
          >
            <Icon className="h-5 w-5" style={{ color: '#C9933A' }} aria-hidden />
            <div className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              {item.label}
            </div>
            <div
              className="text-base md:text-lg font-heading font-semibold leading-tight"
              style={{ color: '#0D1F3C' }}
            >
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
