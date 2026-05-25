import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import FAQAccordion from '@/components/blog/FAQAccordion';
import { SERVICES } from '@/constants';
import type { Service } from '@/types';

interface RichServiceSection {
  id: string;
  heading: string;
  intro: string[];
  listHeading: string;
  bullets: ReadonlyArray<{ label?: string; body: string }>;
  context?: string;
}

// Page-specific long-form content for each of the five service lines.
// Image, title, and short description still come from src/constants.ts so the homepage
// Services grid and individual /services/<id> detail pages stay in sync.
const RICH_SECTIONS: readonly RichServiceSection[] = [
  {
    id: 'brokerage',
    heading: 'Luxury Real Estate Brokerage in Gurugram',
    intro: [
      'Corner House is an RERA-authorised channel partner for premium and ultra-luxury residential projects across Gurugram and Delhi NCR. Our brokerage is built on a principle that distinguishes us from most broker networks: we hold signed agreements with every developer we represent, which means our price sheets are current, our HARERA numbers are verified, and our advice is not shaped by commission pressure from one project over another.',
      'Every property we show a buyer has been independently verified against the Haryana RERA portal before we present it. We do not show projects with lapsed HARERA registrations or unverified possession claims. If we cannot verify a data point, we say so rather than estimating.',
    ],
    listHeading: 'What we do in a brokerage engagement',
    bullets: [
      { body: 'Verify HARERA registration and quarterly compliance status for every project under consideration' },
      { body: 'Share current price sheets and payment plans directly from signed developer agreements' },
      { body: 'Arrange site visits to delivered and under-construction phases so buyers can assess build quality directly' },
      { body: 'Provide a written comparison of shortlisted projects covering HARERA status, developer track record, possession risk, and all-in cost including PLC, GST, stamp duty, and maintenance corpus' },
      { body: "Coordinate with the developer's sales team for documentation and booking formalities" },
    ],
    context: 'Who we work with: Buyers targeting the Rs 2 Crore to Rs 25 Crore residential segment in Gurugram and Delhi NCR. Our active listings span Sector 36A (Dwarka Expressway), Sector 80 (NH-48 corridor), Golf Course Extension Road, and Sector 86.',
  },
  {
    id: 'portfolio',
    heading: 'Real Estate Portfolio Management — Gurugram and Delhi NCR',
    intro: [
      'For buyers who own or are building a portfolio of residential assets in Gurugram and NCR, Corner House provides structured portfolio review and acquisition advisory. This is not property management in the operational sense — we do not collect rent or manage tenants. We advise on portfolio composition, corridor allocation, and acquisition timing across the Gurugram luxury market.',
    ],
    listHeading: 'What portfolio management covers',
    bullets: [
      { label: 'Portfolio audit', body: 'Review of existing Gurugram and NCR residential holdings — HARERA status verification, corridor appreciation analysis, and identification of assets that may be underperforming relative to the current market.' },
      { label: 'Acquisition strategy', body: 'For buyers adding to an existing portfolio, we advise on corridor diversification, developer concentration risk, possession timeline staggering, and the balance between under-construction appreciation potential and ready-to-move liquidity.' },
      { label: 'NRI portfolio advisory', body: 'For non-resident Indian buyers managing a Gurugram portfolio from overseas, we provide quarterly portfolio updates, HARERA compliance monitoring for under-construction assets, and coordination with legal and tax advisors for repatriation planning.' },
      { label: 'Exit advisory', body: 'For buyers considering resale of existing Gurugram assets, we advise on market timing, pricing strategy relative to current corridor benchmarks, and buyer identification.' },
    ],
  },
  {
    id: 'research',
    heading: 'Gurugram Luxury Real Estate Market Research',
    intro: [
      'Corner House publishes independent research on the Gurugram and NCR luxury residential market. Our research methodology is based on HARERA portal data, developer-disclosed price sheets from signed agreements, and direct corridor analysis — not aggregator estimates or secondary market hearsay.',
    ],
    listHeading: 'What our research covers',
    bullets: [
      { label: 'Corridor analysis', body: 'Price trend analysis across Dwarka Expressway (Sector 36A), NH-48 (Sector 80), Golf Course Extension Road, and Sector 86. Updated quarterly as new price data becomes available from developer agreements.' },
      { label: 'Developer track record assessment', body: 'Systematic review of HARERA compliance histories, quarterly filing consistency, and delivery records for active Gurugram developers. This research underpins every Corner House buyer recommendation.' },
      { label: 'New launch evaluation', body: 'When a new luxury project launches in Gurugram, we evaluate it against a consistent framework: HARERA registration status, developer delivery track record, corridor fundamentals, all-in pricing versus comparable delivered assets, and possession risk.' },
      { label: 'Published research', body: 'Our market research is published in the Corner House Journal at cornerhouse.co.in/blog. Every post is sourced from HARERA certificates and developer brochures, not web aggregator data.' },
    ],
  },
  {
    id: 'nri',
    heading: 'NRI Property Services — Gurugram and Delhi NCR',
    intro: [
      'Corner House provides end-to-end advisory for non-resident Indians buying luxury residential property in Gurugram and Delhi NCR. We understand that NRI buyers face specific challenges that domestic buyers do not — time zone constraints, inability to visit sites frequently, dependence on remote document review, and uncertainty about repatriation regulations.',
    ],
    listHeading: 'What NRI advisory covers',
    bullets: [
      { label: 'Remote due diligence', body: 'We conduct HARERA verification, site visits, and developer meetings on your behalf and report back with verified data, photographs, and video walkthroughs. You do not need to be present in Gurugram to make an informed decision. For an example of the depth of research we produce on a single project, see our Sobha Aranya review.' },
      { label: 'FEMA compliance', body: 'Residential property purchase by NRI buyers is governed by FEMA regulations. We coordinate with our network of FEMA-specialist legal advisors to ensure your purchase is structured correctly for repatriation eligibility.' },
      { label: 'Power of attorney structure', body: 'For buyers who cannot be physically present for registration, we advise on the appropriate PoA structure and connect you with legal professionals experienced in NRI property registration in Haryana.' },
      { label: 'Payment and repatriation', body: 'We advise on NRE/NRO account payment routing, TDS obligations on property purchase, and the documentation required for repatriation of sale proceeds under FEMA regulations.' },
      { label: 'Possession coordination', body: 'For under-construction purchases, we monitor HARERA quarterly filings and construction progress on your behalf and alert you to any signals of possession delay risk before they become a crisis.' },
    ],
    context: 'Documentation checklist for NRI buyers: passport and visa copies, PAN card (mandatory for property purchase above Rs 50 Lakh), NRE/NRO bank account details for payment routing, address proof (overseas and India), and a power of attorney if you cannot be present for registration.',
  },
  {
    id: 'loan',
    heading: 'Home Loan Advisory — Luxury Property Gurugram',
    intro: [
      'Corner House provides home loan advisory and facilitation for buyers of luxury residential property in Gurugram and Delhi NCR. We work with leading scheduled banks and housing finance companies to identify the most appropriate loan product for each buyer profile and property.',
    ],
    listHeading: 'What loan advisory covers',
    bullets: [
      { label: 'Eligibility assessment', body: 'Review of your income profile, existing liabilities, and credit position to identify realistic loan quantum and best-fit lenders before you begin the property search.' },
      { label: 'Lender identification', body: 'We maintain working relationships with the home loan teams at major banks active in the Gurugram luxury segment. For luxury properties above Rs 5 Crore, specialist private banking home loan products are often available at rates and terms not visible through retail loan comparisons.' },
      { label: 'NRI home loans', body: 'NRI buyers face specific lender requirements — overseas income verification, foreign currency income conversion, and co-applicant requirements. We facilitate introductions to lenders with established NRI home loan products and coordinate the documentation process.' },
      { label: 'Under-construction loan structuring', body: 'For under-construction purchases, construction-linked payment plans require loan disbursement tranches aligned to construction milestones. We advise on how to structure the loan facility to match the developer payment schedule and avoid interest on undisbursed funds.' },
      { label: 'Documentation facilitation', body: 'We assist with the documentation assembly process — income proofs, bank statements, property documents, HARERA certificate, allotment letter, and builder-buyer agreement — to accelerate loan processing timelines.' },
    ],
  },
];

function findService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

interface ServiceSectionProps {
  section: RichServiceSection;
  flipped: boolean;
  index: number;
}

function ServiceSection({ section, flipped, index }: ServiceSectionProps) {
  const service = findService(section.id);
  if (!service) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="py-20 md:py-28 border-t border-border/40"
      id={`service-${section.id}`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${
          flipped ? 'md:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div className="md:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl bg-muted">
            <img
              src={service.image}
              alt={service.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="md:col-span-6 space-y-7">
          <span className="text-xs font-sans font-semibold tracking-[0.4em] uppercase text-primary">
            {String(index + 1).padStart(2, '0')} · {service.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.15]">
            {section.heading}
          </h2>
          {section.intro.map((para, i) => (
            <p key={i} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
          <div className="pt-2">
            <h3 className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-foreground mb-5">
              {section.listHeading}
            </h3>
            <ul className="space-y-3">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
                  <span className="text-primary mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                  <span>
                    {b.label && <strong className="font-medium text-foreground">{b.label}: </strong>}
                    {b.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {section.context && (
            <p className="text-sm font-light leading-relaxed text-muted-foreground italic border-l-2 border-primary/40 pl-5">
              {section.context}
            </p>
          )}
          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center text-xs font-semibold tracking-[0.3em] uppercase text-primary group pt-2"
          >
            Detailed service page
            <ArrowUpRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default function Services() {
  const realEstateAgentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Corner House Realty',
    url: SITE_URL,
    logo: `${SITE_URL}/logos/corner-house-horizontal-transparent.svg`,
    description:
      'HARERA-registered luxury real estate brokerage in Gurugram and Delhi NCR. Specialising in HARERA-verified premium residential projects.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C3-151, Sobha Sector 108',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122004',
      addressCountry: 'IN',
    },
    telephone: '+91-98719-50051',
    areaServed: ['Gurugram', 'Delhi NCR', 'Noida', 'Faridabad'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Luxury Real Estate Brokerage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Portfolio Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Market Research' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NRI Property Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Loan Advisory' } },
      ],
    },
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
        title="Real Estate Services Gurugram — Brokerage, NRI, Loans | Corner House"
        description="Corner House offers HARERA-verified luxury real estate brokerage, portfolio management, market research, NRI property services, and home loan advisory in Gurugram and Delhi NCR."
        path="/services"
        keywords={[
          'luxury real estate broker gurugram',
          'HARERA verified broker gurugram',
          'NRI property services gurugram',
          'real estate portfolio management gurugram',
          'home loan advisory gurugram',
          'luxury property advisory delhi ncr',
        ]}
        jsonLd={[realEstateAgentJsonLd, breadcrumbJsonLd]}
      />

      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-20">
          <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
            Our Practice
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-medium leading-[1.05]">
            Comprehensive Advisory for{' '}
            <span className="italic text-primary/80">Serious Buyers.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
            Every Corner House service is built around one principle: verified information, honest
            counsel, and no conflict of interest between your decision and ours.
          </p>
        </header>

        {RICH_SECTIONS.map((section, i) => (
          <ServiceSection key={section.id} section={section} flipped={i % 2 === 1} index={i} />
        ))}

        <section className="mt-24 pt-20 border-t border-border/40">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-6 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-[1.1]">
              Questions buyers ask before{' '}
              <span className="italic text-primary/80">engaging us.</span>
            </h2>
          </div>

          <FAQAccordion>
            <h3>What is an RERA authorised channel partner?</h3>
            <p>
              An RERA authorised channel partner is a real estate broker who is registered with the
              state Real Estate Regulatory Authority — in Haryana, this is HARERA. Registration
              requires completion of mandatory training, payment of registration fees, and
              compliance with RERA code of conduct. Corner House is HARERA-registered, which means
              buyers have regulatory recourse through HARERA if any aspect of our advisory is found
              to be in violation of RERA consumer protection provisions. Working with an
              RERA-registered channel partner is a basic protection buyers should verify before
              engaging any broker for a Gurugram property purchase.
            </p>

            <h3>How does Corner House verify HARERA registration for properties?</h3>
            <p>
              Every project we present to buyers is verified directly on the Haryana RERA portal at
              haryanarera.gov.in before we recommend it. We check that the RERA registration is
              active and not lapsed or revoked, that the possession date is current and has not
              been extended without HARERA approval, and that quarterly compliance filings are
              current. We do not rely on builder-provided HARERA numbers without cross-checking the
              portal, because brochure typographic errors in RERA numbers are common.
            </p>

            <h3>Does Corner House charge a brokerage fee to buyers?</h3>
            <p>
              In standard new-launch transactions in Gurugram, the developer pays the channel
              partner brokerage. Buyers do not pay a separate brokerage fee to Corner House for
              new-launch purchases. For resale transactions, brokerage structure is disclosed
              upfront before engagement and is negotiated separately. We do not receive undisclosed
              fees from developers or lenders — all commercial arrangements are disclosed to buyers
              on request.
            </p>

            <h3>Can Corner House help NRI buyers who cannot visit Gurugram?</h3>
            <p>
              Yes. We conduct remote due diligence including HARERA verification, site visits with
              video walkthroughs, developer meetings, and document review on behalf of NRI buyers.
              We have facilitated purchases for buyers based in the UAE, Singapore, the USA, the
              UK, and Australia without requiring a physical visit to Gurugram during the research
              and decision phase. Site visits before possession are strongly recommended but can be
              planned to coincide with India travel rather than being required during the booking
              process. Our published{' '}
              <Link to="/blog/sobha-aranya-review" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                Sobha Aranya review
              </Link>{' '}
              is an example of the depth of remote research we produce on a single project.
            </p>

            <h3>What hidden costs should I budget for beyond the property price in Gurugram?</h3>
            <p>
              The all-in cost of a Gurugram luxury property typically runs 18 to 22 percent above
              the advertised base price. The additional costs include Preferential Location Charges
              (PLC) for preferred floors and facings, GST at 5 percent on under-construction
              properties, stamp duty at 7 percent for male buyers in Haryana (5 percent for female
              buyers), registration at 1 percent of agreement value, maintenance corpus typically
              covering 24 months prepaid, mandatory club membership, and covered parking. We always
              provide buyers with an all-in cost calculation before booking, not just the base
              price.
            </p>

            <h3>What is the difference between carpet area and super built-up area pricing?</h3>
            <p>
              Carpet area is the usable floor space inside your apartment, measured wall to wall
              excluding the thickness of walls. Super built-up area includes carpet area plus a
              proportionate share of common areas such as lobbies, stairwells, lift shafts, and
              corridors. Most Gurugram luxury developers price on super built-up area, which means
              the advertised per-sqft rate applies to a larger number than your actual usable
              space. Sobha Limited is an exception — Sobha Aranya prices on carpet area, which is
              a more buyer-transparent pricing model. When comparing projects, always confirm which
              area definition applies to the quoted per-sqft rate, as this significantly affects
              your effective cost per usable sqft.
            </p>

            <h3>What is FEMA and why does it matter for NRI property buyers?</h3>
            <p>
              FEMA — the Foreign Exchange Management Act — governs foreign exchange transactions in
              India, including property purchases by non-resident Indians. NRI buyers must ensure
              their property purchase is structured in compliance with FEMA to preserve their right
              to repatriate sale proceeds when the property is eventually sold. Key FEMA
              requirements for NRI property purchase include routing payments through NRE or NRO
              bank accounts, maintaining proper documentation of the source of funds, and ensuring
              the property type qualifies under FEMA permitted categories. We coordinate with
              FEMA-specialist legal advisors for NRI buyers to ensure their purchase is structured
              correctly from the outset.
            </p>
          </FAQAccordion>
        </section>

        <section className="mt-24 pt-16 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-medium leading-[1.1]">
                Ready to begin a{' '}
                <span className="italic text-primary/80">verified search?</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed">
                Tell us what you are looking for. We will respond with HARERA-verified options that
                fit your budget, corridor, and possession timeline.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <a
                href="https://wa.me/919871950051?text=Hi%2C%20I%27d%20like%20to%20discuss%20Corner%20House%20services."
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
      </div>
    </main>
  );
}
