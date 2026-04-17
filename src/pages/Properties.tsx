import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO, { SITE_URL } from '@/components/SEO';
import PropertyCard from '@/components/PropertyCard';
import { PROPERTIES } from '@/constants';

export default function Properties() {
  const navigate = useNavigate();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Luxury Properties',
    url: `${SITE_URL}/properties`,
    about: { '@type': 'Thing', name: 'Ultra-premium residences in Delhi NCR' },
    hasPart: PROPERTIES.map((p) => ({
      '@type': 'Residence',
      name: p.title,
      url: `${SITE_URL}/properties/${p.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: `${SITE_URL}/properties` },
    ],
  };

  return (
    <main className="pt-40 pb-32 bg-background min-h-screen">
      <SEO
        title="Luxury Properties — Gurugram & Delhi NCR | The Corner House"
        description="Explore curated ultra-premium residences across Gurugram and Delhi NCR — penthouses, luxury apartments, and independent bungalows from our exclusive portfolio."
        path="/properties"
        keywords={[
          'luxury properties Gurugram',
          'Delhi NCR luxury homes',
          'penthouses for sale',
          'luxury apartments',
        ]}
        jsonLd={[collectionJsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
            The Collection
          </span>
          <h1 className="text-6xl md:text-7xl font-heading font-medium leading-[1.05]">
            Curated luxury residences <span className="italic text-primary/80">across Delhi NCR.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
            A discreet, regularly refreshed selection of penthouses, apartments, and independent
            residences across Gurugram and Delhi. Every listing has been personally vetted by our
            team before it reaches this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onClick={(id) => navigate(`/properties/${id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
