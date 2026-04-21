import React from 'react';
import { Property } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize, MapPin, Image as ImageIcon, Layout, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyCardProps {
  key?: React.Key;
  property: Property;
  onClick: (id: string) => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const [view, setView] = React.useState<'photo' | 'floorplan'>('photo');

  return (
    <Card
      className="group border border-border/40 bg-white overflow-hidden rounded-none shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(property.id)}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.img
              key={view}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src={view === 'photo' ? property.images[0] : property.floorPlan}
              alt={
                view === 'photo'
                  ? `${property.title} — ${property.type} in ${property.location}`
                  : `${property.title} — floor plan`
              }
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width="400"
              height="500"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              type="button"
              aria-label="View photo"
              className={`h-9 w-9 rounded-full backdrop-blur-xl border-none transition-all duration-500 flex items-center justify-center ${
                view === 'photo' ? 'bg-primary text-white' : 'bg-white/25 text-white hover:bg-white/45'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setView('photo');
              }}
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="View floorplan"
              className={`h-9 w-9 rounded-full backdrop-blur-xl border-none transition-all duration-500 flex items-center justify-center ${
                view === 'floorplan' ? 'bg-primary text-white' : 'bg-white/25 text-white hover:bg-white/45'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setView('floorplan');
              }}
            >
              <Layout className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-primary text-white px-3 py-1 text-[10px] tracking-[0.3em] uppercase border-none rounded-none shadow-xl">
              {property.type}
            </Badge>
          </div>
        </div>

        <div className="px-6 md:px-8 py-6 md:py-8 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-500 leading-tight tracking-tight">
                {property.title}
              </h3>
              <div className="flex items-start text-muted-foreground text-xs sm:text-sm mt-3 font-light tracking-wide">
                <MapPin className="h-4 w-4 mr-1.5 mt-0.5 text-primary/60 flex-shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary whitespace-nowrap tabular-nums">
              {property.price}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-border/40">
            <Stat icon={Bed} value={`${property.beds} Beds`} />
            <Stat icon={Bath} value={`${property.baths} Baths`} bordered />
            <Stat icon={Maximize} value={property.area} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(property.id);
            }}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all py-4 text-xs font-bold tracking-[0.2em] rounded-none touch-manipulation"
          >
            VIEW DETAILS
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatProps {
  icon: typeof Bed;
  value: string;
  bordered?: boolean;
}

function Stat({ icon: Icon, value, bordered = false }: StatProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 ${
        bordered ? 'border-x border-border/40' : ''
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
        <Icon className="h-4 w-4 text-primary/60" />
      </div>
      <span className="text-[9px] md:text-[10px] text-muted-foreground font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-center leading-tight">
        {value}
      </span>
    </div>
  );
}
