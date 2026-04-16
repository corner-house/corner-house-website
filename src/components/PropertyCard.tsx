import React from 'react';
import { Property } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Maximize, MapPin, Image as ImageIcon, Layout } from 'lucide-react';
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
      className="group border border-border/40 bg-white overflow-hidden rounded-none shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.img
              key={view}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src={view === 'photo' ? property.images[0] : property.floorPlan}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* View Toggle */}
          <div className="absolute top-6 right-6 flex space-x-3 z-10">
            <Button
              size="icon"
              variant={view === 'photo' ? 'default' : 'secondary'}
              className={`h-10 w-10 rounded-full backdrop-blur-xl border-none transition-all duration-500 ${
                view === 'photo' ? 'bg-primary text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setView('photo');
              }}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={view === 'floorplan' ? 'default' : 'secondary'}
              className={`h-10 w-10 rounded-full backdrop-blur-xl border-none transition-all duration-500 ${
                view === 'floorplan' ? 'bg-primary text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setView('floorplan');
              }}
            >
              <Layout className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute top-6 left-6 z-10">
            <Badge className="bg-primary text-white px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase border-none rounded-none shadow-xl">
              {property.type}
            </Badge>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="hidden md:block absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]">
            <Button 
              className="w-full bg-white text-foreground hover:bg-primary hover:text-white transition-all duration-500 py-8 text-sm font-bold tracking-[0.2em] rounded-none"
            >
              VIEW DETAILS
            </Button>
          </div>
        </div>

        <div className="px-10 py-12 space-y-12">
          <div className="flex justify-between items-start gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-500 leading-[1.2] tracking-tight">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-6 font-light tracking-wide">
                <MapPin className="h-4 w-4 mr-2.5 text-primary/60" />
                {property.location}
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-heading font-bold text-primary whitespace-nowrap tabular-nums pt-1">
              {property.price}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="flex flex-col items-center gap-2.5">
              <div className="h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500">
                <Bed className="h-5 w-5 text-primary/60" />
              </div>
              <span className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
                {property.beds} Beds
              </span>
            </div>
            <div className="flex flex-col items-center gap-2.5 border-x border-border/40">
              <div className="h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500">
                <Bath className="h-5 w-5 text-primary/60" />
              </div>
              <span className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
                {property.baths} Baths
              </span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="h-12 w-12 rounded-full bg-secondary/30 flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500">
                <Maximize className="h-5 w-5 text-primary/60" />
              </div>
              <span className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
                {property.area}
              </span>
            </div>
          </div>

          {/* Mobile View Details Button */}
          <div className="md:hidden pt-4">
            <Button 
              className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-500 py-6 text-xs font-bold tracking-[0.2em] rounded-none"
              onClick={() => onClick(property.id)}
            >
              VIEW DETAILS
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
