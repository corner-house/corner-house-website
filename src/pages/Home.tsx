import Hero from '@/components/Hero';
import HomePropertyCarousel from '@/components/HomePropertyCarousel';
import Services from '@/components/Services';
import Localities from '@/components/Localities';
import Insights from '@/components/Insights';
import Testimonials from '@/components/Testimonials';
import InquiryForm from '@/components/InquiryForm';
import SEO, { SITE_URL } from '@/components/SEO';
import { useLayoutContext } from '@/App';
import { PROPERTIES } from '@/constants';
import { RICH_PROPERTIES } from '@/data/propertyListings';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { onNavigate } = useLayoutContext();
  const allProperties = [...RICH_PROPERTIES, ...PROPERTIES];
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Corner House',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <main className="overflow-hidden">
      <SEO
        title="The Corner House — Luxury Real Estate in Gurugram & Delhi NCR"
        description="Boutique luxury real estate brokerage specialising in ultra-premium residences across Gurugram and Delhi NCR. Golf Course Road, DLF Camellias, Aerocity, Chattarpur farmhouses."
        path="/"
        keywords={[
          'luxury real estate Gurugram',
          'Delhi NCR luxury homes',
          'DLF Camellias',
          'Golf Course Road apartments',
          'Chattarpur farmhouse',
          'Aerocity residences',
          'boutique real estate brokerage',
        ]}
        jsonLd={websiteJsonLd}
      />
      <Hero onNavigate={onNavigate} />

      {/* Featured Properties */}
      <section id="properties" className="py-32 relative">
        {/* Decorative Background Text */}
        <div className="absolute top-60 -left-20 text-[20rem] font-heading font-bold text-secondary/40 select-none pointer-events-none -rotate-90 origin-top-left opacity-10">
          ESTATES
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
                  Featured Collection
                </span>
                <h2 className="text-7xl md:text-8xl font-heading font-medium leading-[1]">
                  Selected Residences for <br />
                  <span className="italic text-primary/80">Exceptional Living.</span>
                </h2>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-12 md:mt-0"
            >
              <Button variant="link" className="text-primary p-0 h-auto text-xl font-medium group hover:no-underline">
                <span className="relative">
                  VIEW ALL PROPERTIES
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary/30 group-hover:h-[2px] group-hover:bg-primary transition-all" />
                </span>
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <HomePropertyCarousel
            properties={allProperties}
            onNavigate={(id) => onNavigate('detail', id)}
          />
        </div>
      </section>

      <Services onNavigate={onNavigate} />

      <Localities />
      <Insights onNavigate={onNavigate} />
      <Testimonials />

      {/* Final CTA */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=70&w=2000"
            alt=""
            role="presentation"
            aria-hidden="true"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl font-heading font-medium leading-tight">
                Ready to find your <br />
                <span className="italic text-primary">Corner House?</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
                Whether you're looking to buy, sell, or invest, our team of expert advisors is here to guide you through every step of the process.
              </p>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-heading font-semibold text-foreground">20+</span>
                  <span className="text-xs text-primary font-medium tracking-widest uppercase">Years Experience</span>
                </div>
                <div className="h-12 w-[1px] bg-border" />
                <div className="flex flex-col">
                  <span className="text-3xl font-heading font-semibold text-foreground">500+</span>
                  <span className="text-xs text-primary font-medium tracking-widest uppercase">Happy Clients</span>
                </div>
                <div className="h-12 w-[1px] bg-border" />
                <div className="flex flex-col">
                  <span className="text-3xl font-heading font-semibold text-foreground">₹2000Cr+</span>
                  <span className="text-xs text-primary font-medium tracking-widest uppercase">Assets Managed</span>
                </div>
              </div>
            </div>
            
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
