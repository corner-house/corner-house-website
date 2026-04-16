import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export default function Founder() {
  return (
    <section id="about" className="py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative z-10 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="Founder"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 w-full h-full border-2 border-primary/10 -z-0" />
            <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-48 h-48 md:w-64 md:h-64 bg-primary/5 -z-0 rounded-full blur-[60px] md:blur-[100px]" />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary text-white p-6 md:p-8 z-20 shadow-xl">
              <div className="text-3xl md:text-4xl font-heading font-bold">20+</div>
              <div className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-medium">Years of Legacy</div>
            </div>
          </motion.div>

          <div className="space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-6">
                The Visionary
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-medium leading-[1.1]">
                A Personal Approach to <br className="hidden md:block" />
                <span className="italic text-primary/80">Premium Real Estate.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 md:space-y-8 text-muted-foreground font-light leading-relaxed text-lg md:text-xl"
            >
              <p className="relative pl-8 md:pl-10">
                <span className="absolute left-0 top-0 text-4xl md:text-6xl text-primary/20 font-serif">"</span>
                Real estate in the luxury segment isn't just about square footage or amenities; it's about finding a space that resonates with your soul and reflects your journey.
              </p>
              <p>
                With over two decades of experience in the Delhi NCR market, I founded The Corner House to bridge the gap between impersonal property portals and the bespoke service that high-net-worth individuals deserve.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0"
            >
              <div>
                <h4 className="text-2xl font-heading font-semibold text-foreground">Aryan Khurana</h4>
                <p className="text-sm text-primary font-medium tracking-[0.2em] uppercase mt-2">Founder & Managing Director</p>
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-border hover:border-primary hover:text-primary transition-all duration-300">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-border hover:border-primary hover:text-primary transition-all duration-300">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 md:h-12 md:w-12 border-border hover:border-primary hover:text-primary transition-all duration-300">
                  <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
