import { Building2, Layers, ShieldCheck, Car } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleBuilding } from '../Doodles';

interface BuildingProps {
  building: PropertyListing['building'];
}

export default function Building({ building }: BuildingProps) {
  const facts: Array<{ icon: typeof Building2; label: string; value: string }> = [
    {
      icon: Building2,
      label: 'Towers',
      value: `${building.towers.length} tower${building.towers.length > 1 ? 's' : ''}`,
    },
    {
      icon: Layers,
      label: 'Structure',
      value: building.structure,
    },
  ];

  if (building.heightMeters) {
    facts.push({ icon: Layers, label: 'Height', value: `${building.heightMeters} m` });
  }
  if (building.earthquakeZone) {
    facts.push({ icon: ShieldCheck, label: 'Seismic', value: building.earthquakeZone });
  }
  if (building.parking) {
    facts.push({
      icon: Car,
      label: 'Parking',
      value: building.parking.slotsPerUnit
        ? `${building.parking.slotsPerUnit}/unit, ${building.parking.type}`
        : building.parking.type,
    });
  }
  if (building.liftsPerTower) {
    facts.push({ icon: Layers, label: 'Lifts / tower', value: String(building.liftsPerTower) });
  }

  return (
    <section id="building" className="py-10 md:py-12 bg-[#F5F0E8]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the skeleton"
          title="Structure & engineering"
          doodle={<DoodleBuilding />}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="bg-white/60 p-4 text-center">
                <Icon className="h-5 w-5 text-primary/70 mx-auto mb-2" />
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  {fact.label}
                </div>
                <div className="font-heading font-medium text-sm md:text-base">{fact.value}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-border/40">
          <div className="p-5 border-b border-border/40">
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Tower Breakdown
            </div>
          </div>
          <ul className="divide-y divide-border/30">
            {building.towers.map((tower) => (
              <li key={tower.name} className="flex justify-between items-center px-6 py-3.5">
                <span className="font-heading font-medium">{tower.name}</span>
                <span className="text-muted-foreground text-sm">
                  {tower.floors} floors
                  {tower.unitsPerFloor ? ` · ${tower.unitsPerFloor} units/floor` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
