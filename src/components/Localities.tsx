import React from 'react';
import { LOCALITIES } from '@/constants';
import { motion } from 'motion/react';

export default function Localities() {
  return (
    <section id="localities" className="py-32 bg-[#fdfcf8] relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-sans font-semibold tracking-[0.4em] uppercase text-primary mb-6 block">
                Selected Localities
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-medium leading-[1.1]">
                Where Luxury Meets <br className="hidden md:block" />
                <span className="italic text-primary/80">Exclusivity.</span>
              </h2>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground font-light max-w-sm mt-8 md:mt-0 text-base md:text-lg leading-relaxed"
          >
            We focus on the most sought-after neighborhoods in the NCR, ensuring your investment is as prestigious as your lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {LOCALITIES.map((locality, index) => (
            <motion.div
              key={locality.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] md:h-[600px] overflow-hidden cursor-pointer shadow-2xl"
            >
              <img
                src={locality.image}
                alt={`${locality.name} — luxury locality in Delhi NCR`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                width="600"
                height="800"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-4">
                  {locality.name}
                </h3>
                <p className="text-white/80 font-light text-sm md:text-base leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
                  {locality.description}
                </p>
                <div className="mt-8 h-[2px] w-full md:w-12 md:group-hover:w-full transition-all duration-700 ease-in-out bg-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
