import React from 'react';
import { TESTIMONIALS } from '@/constants';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-luxury-charcoal text-white bg-[#1c1c1c]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Testimonials
          </span>
          <h2 className="text-5xl font-heading font-medium leading-tight text-white">
            Trusted by the <br />
            <span className="italic">Discerning Few.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 md:p-12 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500"
            >
              <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
              <div className="flex items-center space-x-6 mb-8">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/30">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary font-medium tracking-widest uppercase">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white/70 font-light leading-relaxed text-lg italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
