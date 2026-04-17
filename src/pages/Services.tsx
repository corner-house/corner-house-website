import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import { SERVICES } from '@/constants';

export default function Services() {
  const navigate = useNavigate();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Services',
    url: `${SITE_URL}/services`,
    hasPart: SERVICES.map((s) => ({
      '@type': 'Service',
      name: s.title,
      url: `${SITE_URL}/services/${s.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  };

  return (
    <main className="pt-40 pb-32 bg-background min-h-screen">
      <SEO
        title="Our Services — Brokerage, Portfolio, NRI, Loans | The Corner House"
        description="Boutique advisory services for luxury real estate: brokerage, portfolio management, market research, NRI services, and home loan assistance across Gurugram and Delhi NCR."
        path="/services"
        keywords={[
          'real estate services',
          'NRI property services',
          'luxury broker Gurugram',
          'home loan advisory',
        ]}
        jsonLd={[collectionJsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
            Our Practice
          </span>
          <h1 className="text-6xl md:text-7xl font-heading font-medium leading-[1.05]">
            Five service lines, <span className="italic text-primary/80">one client outcome.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
            From representation on a single transaction to long-term portfolio oversight, we work
            with owners, investors, and NRIs across Delhi NCR's most discerning residential market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => navigate(`/services/${service.id}`)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-sm bg-card border border-border/60 p-12 text-left hover:border-primary/40 transition-colors"
            >
              <h3 className="text-3xl font-heading font-medium mb-4">{service.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                {service.description}
              </p>
              <div className="mt-8 inline-flex items-center text-primary text-sm font-medium tracking-widest uppercase">
                Read More
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
