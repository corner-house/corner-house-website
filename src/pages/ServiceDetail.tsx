import React from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES } from '@/constants';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';

interface ServiceDetailProps {
  onBack: () => void;
}

export default function ServiceDetail({ onBack }: ServiceDetailProps) {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <main className="pt-40 pb-32 bg-background min-h-screen">
        <SEO
          title="Service not found"
          description="The service you're looking for is no longer offered."
          path={`/services/${id ?? ''}`}
          noindex
        />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-heading font-medium mb-6">Service not found</h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Button>
        </div>
      </main>
    );
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'The Corner House',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Place', name: 'Delhi NCR' },
    url: `${SITE_URL}/services/${service.id}`,
    image: service.image,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.id}`,
      },
    ],
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <SEO
        title={`${service.title} — The Corner House`}
        description={service.fullDescription.slice(0, 160)}
        path={`/services/${service.id}`}
        image={service.image}
        keywords={['real estate services', 'Gurugram', 'Delhi NCR', service.title]}
        jsonLd={[serviceJsonLd, breadcrumbJsonLd]}
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white mb-8 group"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                BACK TO HOME
              </Button>
              <h1 className="text-5xl md:text-7xl font-heading font-medium text-white mb-6">
                {service.title}
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl font-heading font-medium">Overview</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                {service.fullDescription}
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-heading font-medium">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 bg-secondary/30 border-l-4 border-primary"
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="text-lg font-light">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {service.process && (
              <section className="space-y-12">
                <h2 className="text-3xl font-heading font-medium">Our Process</h2>
                <div className="space-y-8">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex space-x-8">
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-heading text-xl shrink-0">
                          {index + 1}
                        </div>
                        {index !== service.process!.length - 1 && (
                          <div className="w-px h-full bg-border mt-4" />
                        )}
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-heading font-medium mb-2">{step.title}</h3>
                        <p className="text-muted-foreground font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-luxury-charcoal text-white p-8 space-y-6 bg-[#1c1c1c]">
                <h4 className="text-xl font-heading font-medium">Expert Consultation</h4>
                <p className="text-white/60 font-light text-sm">
                  Connect with our specialized advisors for a personalized consultation on {service.title}.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6">
                    <MessageSquare className="mr-2 h-5 w-5" /> WHATSAPP US
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 py-6">
                    <Phone className="mr-2 h-5 w-5" /> CALL NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
