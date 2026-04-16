import React from 'react';
import { Service } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  key?: React.Key;
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // @ts-ignore
  const Icon = Icons[service.icon] || Icons.Home;

  return (
    <Card className="group relative overflow-hidden border-none bg-white transition-all duration-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-4 rounded-none">
      {/* Background Image on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 z-0">
        <img 
          src={`https://picsum.photos/seed/${service.title}/800/600?grayscale`} 
          alt="" 
          className="w-full h-full object-cover scale-125 group-hover:scale-100 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <CardContent className="relative z-10 p-10 flex flex-col items-center text-center h-full">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-primary/5 rounded-full scale-[2.5] blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
          <div className="relative h-24 w-24 rounded-full bg-secondary/50 group-hover:bg-primary flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:scale-110">
            <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-semibold mb-6 group-hover:text-primary transition-colors duration-500 tracking-tight">
          {service.title}
        </h3>
        
        <div className="w-10 h-[1px] bg-primary/20 mb-8 group-hover:w-16 group-hover:bg-primary transition-all duration-700" />
        
        <p className="text-muted-foreground font-light leading-relaxed text-base transition-colors duration-500 group-hover:text-foreground/80">
          {service.description}
        </p>
        
        <div className="mt-auto pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-primary cursor-pointer hover:tracking-[0.4em] transition-all">
            Learn More
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
