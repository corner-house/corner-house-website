import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import FAQAccordion from '@/components/blog/FAQAccordion';
import { SERVICES } from '@/constants';

const SERVICE_ID = 'research';
const PATH = `/services/${SERVICE_ID}`;

export default function ResearchPage() {
  const service = SERVICES.find((s) => s.id === SERVICE_ID);
  const heroImage = service?.image ?? `${SITE_URL}/og-default.jpg`;
  const heroAlt = service?.imageAlt ?? 'Gurugram luxury real estate market research';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Real Estate Market Research',
    name: 'Gurugram Real Estate Market Research',
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Corner House Realty',
      url: SITE_URL,
    },
    areaServed: 'Gurugram, Delhi NCR',
    url: `${SITE_URL}${PATH}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Market Research', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <SEO
        title="Gurugram Real Estate Market Research — HARERA Data and Corridor Analysis | Corner House"
        description="Corner House publishes Gurugram real estate research from HARERA data and developer price sheets. Corridors: Dwarka Expressway, Sector 80, GCER."
        path={PATH}
        image={heroImage}
        keywords={[
          'gurugram real estate market research',
          'HARERA data analysis',
          'dwarka expressway corridor analysis',
          'sector 80 NH-48 corridor',
          'golf course extension road research',
          'gurugram luxury property research',
        ]}
        jsonLd={[serviceJsonLd, breadcrumbJsonLd]}
      />

      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={heroImage}
          alt={heroAlt}
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
              <Link
                to="/services"
                className="inline-flex items-center text-white/80 hover:text-white mb-8 text-xs tracking-[0.3em] uppercase group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                All Services
              </Link>
              <h1 className="text-5xl md:text-7xl font-heading font-medium text-white mb-6 leading-[1.05]">
                Gurugram Real Estate <br />
                <span className="italic">Market Research</span>
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 mt-20 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-7 text-foreground/85">
          <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            Corner House market research is built on a methodology that most Gurugram broker
            research is not: primary data from HARERA certificates and signed developer price
            sheets, not secondary aggregator estimates.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            When we analyse the Dwarka Expressway corridor or the NH-48 corridor, we use the actual
            registered prices from developer agreements, the actual HARERA-registered possession
            dates, and the actual construction progress reported in quarterly HARERA filings. This
            gives our research a factual accuracy that web aggregator content cannot match, because
            aggregators depend on developers to self-report data that is rarely updated.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            Our corridor research covers four primary zones in Gurugram:
          </p>

          <div className="space-y-5 pl-1">
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Sector 36A — Dwarka Expressway
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                The Indo-Japanese master township corridor anchored by{' '}
                <Link
                  to="/properties/krisumi-forest-reserve"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Krisumi City
                </Link>
                , with Northern Peripheral Road operational since 2019 and IGI Airport accessible
                in 35 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Sector 80 — NH-48 corridor
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                The eco-luxury corridor inside Karma Lakelands, anchored by{' '}
                <Link
                  to="/properties/sobha-aranya"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Sobha Aranya
                </Link>
                , with direct NH-48 frontage and IMT Manesar within 12 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Golf Course Extension Road
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                The established luxury corridor with the deepest social infrastructure in Gurugram
                outside of Golf Course Road itself.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Sector 86 — Southern Peripheral Road
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                The emerging corridor with{' '}
                <Link
                  to="/properties/emaar-serenity-hills"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Emaar
                </Link>
                's active development footprint.
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg font-light leading-relaxed">
            All Corner House market research is published in the{' '}
            <Link
              to="/blog"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Corner House Journal
            </Link>
            . Every post is sourced from HARERA certificates and developer brochures, independently
            verified before publication.
          </p>
        </div>

        <section className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground font-light mb-2">
            Common questions about how Corner House researches the Gurugram market.
          </p>

          <FAQAccordion>
            <h3>How does Corner House research Gurugram real estate?</h3>
            <p>
              Corner House research uses primary data from three sources: HARERA certificates
              verified directly on haryanarera.gov.in, current price sheets from signed developer
              agreements, and quarterly construction progress data from developer portals. We do
              not use aggregator platforms like 99acres or MagicBricks as primary sources because
              their price data depends on developer self-reporting, which is frequently outdated or
              inaccurate. Every data point in our published research is traceable to a primary
              source.
            </p>

            <h3>Where is Corner House research published?</h3>
            <p>
              Corner House publishes market research and project reviews in the Corner House
              Journal at cornerhouse.co.in/blog. Published research includes honest project reviews
              with HARERA verification, corridor investment analysis, developer track record
              assessments, and buyer education guides covering hidden costs, HARERA verification
              processes, and Gurugram market fundamentals.
            </p>

            <h3>Which Gurugram corridors does Corner House research cover?</h3>
            <p>
              Corner House actively researches four Gurugram corridors: Sector 36A on the Dwarka
              Expressway, Sector 80 on NH-48 inside Karma Lakelands, Golf Course Extension Road,
              and Sector 86 on the Southern Peripheral Road. Our active listings and published
              research cover projects by Krisumi Corporation, Sobha Limited, Emaar India, Max
              Estates, and BPTP.
            </p>

            <h3>Can I request a custom market research report?</h3>
            <p>
              Yes. For buyers evaluating a specific corridor or comparing multiple projects, Corner
              House provides a written project comparison covering HARERA status, developer track
              record, all-in pricing, possession risk, and corridor fundamentals. Contact us via
              WhatsApp at +91 98719 50051 or email hello@cornerhouse.co.in to discuss your research
              requirements.
            </p>

            <h3>How often is Corner House market data updated?</h3>
            <p>
              HARERA registration and compliance data is verified at the time of each buyer
              engagement. Price sheet data is updated when developers issue revised price lists
              under our signed agreements. Published blog posts show a lastUpdated date in the
              frontmatter indicating when the post was last verified against primary sources.
            </p>
          </FAQAccordion>
        </section>

        <section className="mt-20 pt-12 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.1]">
                Want a corridor-specific{' '}
                <span className="italic text-primary/80">research report?</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed">
                Tell us which corridor or projects you are evaluating. We will respond with
                HARERA-verified data and a written comparison.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <a
                href="https://wa.me/919871950051?text=Hi%2C%20I%27d%20like%20a%20Corner%20House%20market%20research%20report."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold tracking-[0.3em] uppercase bg-primary text-white px-8 py-4 hover:bg-primary/90 transition-colors group"
              >
                Chat on WhatsApp
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-sm text-muted-foreground font-light">
                Or call +91 98719 50051
              </span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
