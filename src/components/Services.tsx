import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '@/constants';
import { ArrowRight } from 'lucide-react';

export default function Services({ onNavigate }: { onNavigate: (page: 'home' | 'detail' | 'service', id?: string) => void }) {
  return (
    <section id="services" className="py-32 bg-[#fdfcf8] relative overflow-hidden border-y border-border/40">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 -skew-x-12 translate-x-1/4 -z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-8xl font-heading font-medium leading-[1.1] md:leading-[1]">
              Comprehensive Solutions for <br className="hidden md:block" />
              <span className="italic text-primary/80">Your Real Estate Journey.</span>
            </h2>
            <div className="w-32 h-[1px] bg-primary/30 mx-auto mt-12" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
          {/* Featured Card: Brokerage */}
          <ServiceCard 
            service={SERVICES[0]} 
            index={0} 
            className="md:col-span-4 md:row-span-2"
            number="01"
            onNavigate={onNavigate}
          />
          
          {/* Portfolio Management */}
          <ServiceCard 
            service={SERVICES[1]} 
            index={1} 
            className="md:col-span-2 md:row-span-1"
            number="02"
            onNavigate={onNavigate}
          />
          
          {/* Market Research */}
          <ServiceCard 
            service={SERVICES[2]} 
            index={2} 
            className="md:col-span-2 md:row-span-1"
            number="03"
            onNavigate={onNavigate}
          />
          
          {/* NRI Services */}
          <ServiceCard 
            service={SERVICES[3]} 
            index={3} 
            className="md:col-span-3 md:row-span-1"
            number="04"
            onNavigate={onNavigate}
          />
          
          {/* Loan Services */}
          <ServiceCard 
            service={SERVICES[4]} 
            index={4} 
            className="md:col-span-3 md:row-span-1"
            number="05"
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, className, number, onNavigate }: { service: any, index: number, className: string, number: string, onNavigate: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer ${className}`}
      onClick={() => onNavigate('service', service.id)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.4] group-hover:brightness-[0.6]"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-end">
        {/* Faded Number */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 text-6xl md:text-8xl font-heading font-bold text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors duration-700">
          {number}
        </div>

        <div className="space-y-4 translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-700 ease-out">
          <h3 className="text-2xl md:text-4xl font-heading font-medium text-white leading-tight">
            {service.title}
          </h3>
          
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100">
            {service.description}
          </p>

          <div className="pt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-200">
            <button className="flex items-center text-primary font-medium tracking-widest text-xs uppercase group/btn">
              <span className="mr-3">Learn More</span>
              <div className="w-8 h-[1px] bg-primary group-hover/btn:w-12 transition-all duration-500" />
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Accent Border (Bottom) */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700 ease-in-out" />
    </motion.div>
  );
}
