import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import FAQAccordion from '@/components/blog/FAQAccordion';
import { SERVICES } from '@/constants';

const SERVICE_ID = 'portfolio';
const PATH = `/services/${SERVICE_ID}`;

export default function PortfolioPage() {
  const service = SERVICES.find((s) => s.id === SERVICE_ID);
  const heroImage = service?.image ?? `${SITE_URL}/og-default.jpg`;
  const heroAlt = service?.imageAlt ?? 'Real estate portfolio management Gurugram';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Real Estate Portfolio Management',
    name: 'Real Estate Portfolio Management in Gurugram',
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
      { '@type': 'ListItem', position: 3, name: 'Portfolio Management', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <SEO
        title="Real Estate Portfolio Management Gurugram — Investment Advisory | Corner House"
        description="Real estate portfolio advisory for Gurugram and NCR investors — corridor allocation, acquisition strategy, HARERA monitoring, exit advisory."
        path={PATH}
        image={heroImage}
        keywords={[
          'real estate portfolio management gurugram',
          'gurugram property investment advisory',
          'NRI portfolio advisory gurugram',
          'corridor allocation strategy',
          'exit advisory luxury property gurugram',
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
                Real Estate Portfolio Management <br />
                <span className="italic">in Gurugram</span>
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 mt-20 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-7 text-foreground/85">
          <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            Corner House portfolio management advisory is designed for buyers who already own or
            are building a residential real estate portfolio in Gurugram and NCR. We do not manage
            properties operationally — we advise on portfolio composition, corridor allocation, and
            acquisition strategy.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            The Gurugram luxury residential market in 2026 offers buyers exposure to multiple
            corridors at different stages of maturity: the established Golf Course Extension Road
            belt, the infrastructure-complete Dwarka Expressway corridor, and the emerging NH-48
            and Southern Peripheral Road zones. Each corridor has different appreciation potential,
            different possession risk profiles, and different liquidity characteristics.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">Portfolio advisory covers:</p>

          <div className="space-y-5 pl-1">
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Portfolio audit
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                Review of existing Gurugram residential holdings with HARERA status verification,
                corridor benchmark comparison, and identification of underperforming or at-risk
                assets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Acquisition strategy
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                For buyers adding to an existing portfolio, advice on corridor diversification,
                developer concentration risk, and possession timeline staggering to manage
                construction period liquidity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                NRI portfolio advisory
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                For non-resident Indian buyers, quarterly portfolio updates, HARERA compliance
                monitoring for under-construction assets, and coordination with legal and tax
                advisors for repatriation planning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Exit advisory
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                For buyers considering resale of existing Gurugram assets, market timing advice,
                pricing strategy relative to current corridor benchmarks, and buyer identification.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground font-light mb-2">
            How Corner House structures portfolio advisory for Gurugram buyers.
          </p>

          <FAQAccordion>
            <h3>What does real estate portfolio management mean at Corner House?</h3>
            <p>
              Corner House portfolio management is investment advisory, not operational property
              management. We advise on which corridors to buy in, which developers carry acceptable
              delivery risk, how to diversify across Gurugram's multiple luxury zones, and when to
              exit specific assets. We do not collect rent, manage tenants, or handle maintenance.
              Our advisory is based on HARERA-verified data and direct developer relationships, not
              aggregator data.
            </p>

            <h3>Which Gurugram corridors are best for investment in 2026?</h3>
            <p>
              The answer depends on your investment horizon and exit strategy. The Dwarka
              Expressway corridor (Sector 36A) offers strong infrastructure fundamentals, airport
              proximity, and projects with institutional developer backing like{' '}
              <Link
                to="/blog/krisumi-corporation-track-record"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Krisumi Corporation's Sumitomo joint venture
              </Link>
              . The NH-48 corridor (Sector 80) offers a unique eco-luxury positioning inside{' '}
              <Link
                to="/properties/sobha-aranya"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Karma Lakelands
              </Link>{' '}
              with{' '}
              <Link
                to="/blog/sobha-developer-track-record"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Sobha Limited's construction quality
              </Link>{' '}
              standards. Golf Course Extension Road offers the most mature social infrastructure
              and broadest resale liquidity. Each corridor suits a different buyer profile and
              timeline. Contact Corner House for a corridor-specific analysis tailored to your
              requirements.
            </p>

            <h3>How do you assess delivery risk for under-construction Gurugram projects?</h3>
            <p>
              Corner House assesses delivery risk using three signals: HARERA quarterly compliance
              filing currency (available on haryanarera.gov.in), developer track record on previous
              phases (delivered on time or not), and construction progress data from developer
              portals versus the RERA-registered possession timeline. We also assess the financial
              structure — developer size, institutional backing, and project banker involvement.
              These signals together give a more reliable delivery risk picture than brochure
              claims alone.
            </p>

            <h3>Can Corner House help with NRI portfolio management from overseas?</h3>
            <p>
              Yes. We monitor HARERA compliance for under-construction assets on behalf of NRI
              clients, provide quarterly portfolio updates, and coordinate with legal advisors for
              repatriation planning. For NRI buyers who cannot attend possession in person, we
              coordinate site inspections and documentation on their behalf. Contact us to discuss
              your specific portfolio requirements.
            </p>

            <h3>What is the minimum portfolio size for Corner House portfolio advisory?</h3>
            <p>
              Corner House portfolio advisory is relevant for buyers who own or are planning to own
              two or more residential assets in Gurugram and NCR, or buyers making a single
              acquisition above Rs 5 Crore where corridor allocation and developer selection
              require structured analysis. There is no minimum asset count or value threshold for
              an initial portfolio consultation. Contact us via WhatsApp at +91 98719 50051 to
              discuss your specific situation.
            </p>
          </FAQAccordion>
        </section>

        <section className="mt-20 pt-12 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.1]">
                Ready for a{' '}
                <span className="italic text-primary/80">portfolio audit?</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed">
                Share what you own or are considering. We will respond with HARERA-verified
                analysis and a corridor-specific recommendation.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <a
                href="https://wa.me/919871950051?text=Hi%2C%20I%27d%20like%20a%20Corner%20House%20portfolio%20advisory%20conversation."
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
