import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[850px] lg:h-screen flex items-center overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 z-0 bg-luxury-charcoal overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="w-full h-full"
        >
          <img
            src="https://pub-82d76e9f6b704c56b2da92d2d7335ba8.r2.dev/Videos/the-cascades-club.webp"
            alt="The Cascades Club — luxury residence exterior in Gurugram"
            className="w-full h-full object-cover brightness-[0.7]"
            width="1920"
            height="1080"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm font-sans font-semibold tracking-[0.4em] uppercase text-white/90 mb-8 block"
            >
              Gurugram • New Delhi • NCR
            </motion.span>
            <h1 className="text-4xl md:text-9xl font-heading font-medium text-white leading-[1.1] md:leading-[0.95] mb-10 tracking-tighter [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
              Refining the Art of <br className="hidden md:block" />
              <span className="italic font-light opacity-90">Luxury Living.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mb-14 leading-relaxed">
              Boutique real estate advisory for the discerning few. We curate the most exclusive addresses in Delhi NCR with an editorial eye for detail.
            </p>
            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8">
              <Button
                size="lg"
                onClick={() => onNavigate?.('home', '#properties')}
                className="bg-primary text-white px-10 py-8 text-lg hover:bg-primary/90 transition-all duration-500 rounded-none"
              >
                VIEW COLLECTION
              </Button>
              <Button
                size="lg"
                variant="outline"
                aria-label="Learn about our services"
                onClick={() => onNavigate?.('home', '#services')}
                className="bg-white/5 backdrop-blur-xl border-white/20 text-white px-10 py-8 text-lg hover:bg-white/10 transition-all duration-500 rounded-none"
              >
                OUR SERVICES <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 left-6 right-6 flex justify-between items-end">
        <div className="hidden lg:block">
          <div className="flex space-x-16 text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold">
            <button
              type="button"
              onClick={() => onNavigate?.('home', '#properties')}
              aria-label="Curated Assets — view featured residences"
              className="flex flex-col items-start group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="text-white text-lg font-heading font-medium mb-2 group-hover:text-primary transition-colors">01</span>
              <span className="group-hover:text-white/80 transition-colors">Curated Assets</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('service', 'research')}
              aria-label="Market Research — view service details"
              className="flex flex-col items-start group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="text-white text-lg font-heading font-medium mb-2 group-hover:text-primary transition-colors">02</span>
              <span className="group-hover:text-white/80 transition-colors">Market Research</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('service', 'nri')}
              aria-label="NRI Advisory — view service details"
              className="flex flex-col items-start group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="text-white text-lg font-heading font-medium mb-2 group-hover:text-primary transition-colors">03</span>
              <span className="group-hover:text-white/80 transition-colors">NRI Advisory</span>
            </button>
          </div>
        </div>
        <motion.button
          type="button"
          onClick={() => onNavigate?.('home', '#properties')}
          aria-label="Scroll to featured residences"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex items-center space-x-6 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <div className="h-[1px] w-32 bg-white/20 group-hover:bg-white/40 transition-colors" />
          <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold group-hover:text-white/70 transition-colors">Scroll to Explore</span>
        </motion.button>
      </div>
    </section>
  );
}
