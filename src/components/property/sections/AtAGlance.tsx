import {
  Home,
  Building2,
  Ruler,
  MapPin,
  Users,
  Building,
  Layers,
  CalendarClock,
  Calendar,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleStarBurst } from '../Doodles';

interface AtAGlanceProps {
  atAGlance: PropertyListing['atAGlance'];
}

export default function AtAGlance({ atAGlance }: AtAGlanceProps) {
  type Row = { icon: typeof Home; label: string; value: string | undefined };
  const rows: Row[] = [
    { icon: Home, label: 'Project Type', value: atAGlance.projectType },
    { icon: Building2, label: 'Configuration', value: atAGlance.configuration },
    { icon: Ruler, label: 'Unit Sizes', value: atAGlance.unitSizes },
    { icon: MapPin, label: 'Total Land Area', value: atAGlance.totalArea },
    { icon: Users, label: 'Total Units', value: atAGlance.totalUnits.toLocaleString('en-IN') },
    { icon: Building, label: 'Total Towers', value: String(atAGlance.totalTowers) },
    { icon: Layers, label: 'Floors', value: atAGlance.floors },
    { icon: CalendarClock, label: 'Launch Date', value: atAGlance.launchDate },
    { icon: Calendar, label: 'Possession', value: atAGlance.possession },
    { icon: Activity, label: 'Status', value: atAGlance.status },
    { icon: ShieldCheck, label: 'RERA', value: atAGlance.reraStatus },
  ];

  return (
    <section id="at-a-glance" className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the essentials"
          title="At a glance"
          doodle={<DoodleStarBurst />}
        />
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {rows
            .filter((r): r is Required<Row> => Boolean(r.value))
            .map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center gap-3 py-3 border-b border-dashed border-border/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 flex justify-between items-center gap-3">
                    <dt className="text-sm text-muted-foreground uppercase tracking-wider">
                      {row.label}
                    </dt>
                    <dd className="font-medium text-right">{row.value}</dd>
                  </div>
                </div>
              );
            })}
        </dl>
      </div>
    </section>
  );
}
