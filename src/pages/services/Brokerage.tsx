import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Handshake,
  List,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import FAQAccordion from '@/components/blog/FAQAccordion';
import StatsBar from '@/components/blog/StatsBar';
import { SERVICES } from '@/constants';

const SERVICE_ID = 'brokerage';
const PATH = `/services/${SERVICE_ID}`;
const HARERA_PORTAL = 'https://haryanarera.gov.in';

const STATS = [
  { label: 'Active HARERA-verified listings', value: '6+' },
  { label: 'Gurugram luxury zones covered', value: '4' },
  { label: 'Buyers consulted in 2026', value: '50+' },
  { label: 'Brokerage fee (paid by developer)', value: 'Zero' },
] as const;

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>;
  step: string;
  title: string;
  body: string;
}

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: Search,
    step: 'Step 1',
    title: 'Requirements and budget',
    body: 'We begin by understanding your actual requirements — configuration, carpet area preferences, corridor priorities, possession timeline, and all-in budget including GST, stamp duty, PLC, and maintenance corpus. Most buyers discover their real all-in budget is 18 to 22 percent above the headline price. We make sure you know that before you shortlist anything.',
  },
  {
    icon: List,
    step: 'Step 2',
    title: 'HARERA-verified shortlist',
    body: 'We compile a written shortlist of projects that match your requirements. Every project includes its HARERA registration number, current compliance status, RERA-registered possession date, developer track record summary, and all-in cost breakdown. You can verify every HARERA number on haryanarera.gov.in independently.',
  },
  {
    icon: MapPin,
    step: 'Step 3',
    title: 'Site visits with context',
    body: 'We arrange site visits to both under-construction and delivered phases. For Krisumi projects, we can arrange a visit to the delivered Krisumi Waterfall Residences so you can assess actual build quality before booking an under-construction phase. For Sobha projects, we can arrange visits to delivered Sobha City Gurugram. You are not making a decision based only on renders.',
  },
  {
    icon: Handshake,
    step: 'Step 4',
    title: 'Written comparison',
    body: 'Before you make a decision, we provide a written comparison of your shortlisted options covering HARERA status, developer track record, corridor fundamentals, all-in pricing, and possession risk. This document is yours to keep, share with family, and review with your legal advisor.',
  },
  {
    icon: CheckCircle,
    step: 'Step 5',
    title: 'Booking support',
    body: "We coordinate with the developer's sales team for documentation, builder-buyer agreement review, and booking formalities. We flag any unusual clauses in the builder-buyer agreement before you sign.",
  },
];

interface ProjectListing {
  slug: string;
  name: string;
  location: string;
  configuration: string;
  harera?: string;
  possession?: string;
  priceFrom?: string;
}

const ACTIVE_PROJECTS: readonly ProjectListing[] = [
  {
    slug: 'krisumi-forest-reserve',
    name: 'Krisumi Forest Reserve',
    location: 'Sector 36A, Gurgaon',
    configuration: '2, 3, 4 LDK and Penthouses',
    harera: 'RC/REP/HARERA/GGM/944/676 and RC/REP/HARERA/GGM/945/677',
    possession: 'November 2030',
  },
  {
    slug: 'krisumi-waterside-residences',
    name: 'Krisumi Waterside Residences',
    location: 'Sector 36A, Gurgaon',
    configuration: '2 LDK to 3 LDK + S',
    harera: 'RC/REP/HARERA/GGM/812/544/2024/39',
    possession: 'October 2029',
    priceFrom: 'Rs 4.35 Cr',
  },
  {
    slug: 'sobha-aranya',
    name: 'Sobha Aranya',
    location: 'Sector 80, Karma Lakelands, Gurgaon',
    configuration: '3 and 4 BHK',
    harera: 'RC/REP/HARERA/GGM/808/540/2024/35',
    possession: 'March 2030',
    priceFrom: 'Rs 7.09 Cr',
  },
  {
    slug: 'emaar-serenity-hills',
    name: 'Emaar Serenity Hills',
    location: 'Sector 86, Gurgaon',
    configuration: '3 and 4 BHK',
    priceFrom: 'Rs 2.98 Cr',
  },
  {
    slug: 'max-estate-361-terraces',
    name: 'Max Estates — The Terraces at Estate 361',
    location: 'Sector 36A, Gurgaon',
    configuration: '1.5 and 2 BHK',
    priceFrom: 'Rs 2.40 Cr',
  },
  {
    slug: 'downtown66',
    name: 'BPTP Downtown 66',
    location: 'Sector 66, Gurgaon',
    configuration: '3 BHK',
    priceFrom: 'Rs 5.33 Cr',
  },
];

interface AeoCard {
  question: string;
  answer: React.ReactNode;
}

const AEO_CARDS: readonly AeoCard[] = [
  {
    question: 'How do I verify if a broker is RERA registered in Gurgaon?',
    answer: (
      <>
        You can verify any Haryana real estate broker's RERA registration on{' '}
        <a
          href={HARERA_PORTAL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          haryanarera.gov.in
        </a>{' '}
        under the Agent Registration section. A registered agent has a valid RERA number, has
        completed mandatory HARERA training, and is subject to HARERA's consumer protection code.
        Corner House is RERA-registered as a channel partner in Haryana.
      </>
    ),
  },
  {
    question: 'Do buyers pay brokerage to Corner House?',
    answer:
      "In new-launch transactions, the developer pays the channel partner's brokerage. Buyers do not pay a separate brokerage fee to Corner House for new-launch purchases. This is the standard commercial structure for new residential launches in Gurugram. For resale transactions, brokerage is disclosed and agreed upfront before we begin the search.",
  },
  {
    question: 'How does Corner House verify HARERA registration for projects?',
    answer: (
      <>
        We verify every project on{' '}
        <a
          href={HARERA_PORTAL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          haryanarera.gov.in
        </a>{' '}
        before adding it to our listings. We check that the registration is active, the possession
        date is current, quarterly compliance filings are up to date, and the RERA numbers match
        the brochure. Brochure typographic errors in RERA numbers are common in Gurugram. We
        cross-check every number on the portal directly.
      </>
    ),
  },
  {
    question: 'What is the difference between a luxury broker and a standard property agent in Gurgaon?',
    answer:
      'A luxury real estate broker in Gurugram specialises in projects above Rs 2 Crore, holds signed developer agreements with the relevant builders, provides written project comparisons with HARERA verification, and can arrange site visits to delivered phases for quality assessment. A standard property agent typically covers a broader price range with less depth of developer relationship and rarely provides written, HARERA-verified analysis before a buyer commits.',
  },
  {
    question: 'Which Gurgaon projects have the best HARERA compliance records?',
    answer: (
      <>
        Krisumi Corporation and Sobha Limited both show strong HARERA compliance records across
        their active Gurgaon registrations.{' '}
        <Link
          to="/properties/krisumi-waterside-residences"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          Krisumi Waterside Residences
        </Link>{' '}
        (RC/REP/HARERA/GGM/812/544/2024/39) and{' '}
        <Link
          to="/properties/sobha-aranya"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          Sobha Aranya
        </Link>{' '}
        (RC/REP/HARERA/GGM/808/540/2024/35) both have current quarterly compliance filings on{' '}
        <a
          href={HARERA_PORTAL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          haryanarera.gov.in
        </a>
        . Compliance filing currency is one of the three signals we use to assess delivery risk.
        Verify any project's compliance status yourself before booking.
      </>
    ),
  },
];

export default function BrokeragePage() {
  const service = SERVICES.find((s) => s.id === SERVICE_ID);
  const heroImage = service?.image ?? `${SITE_URL}/og-default.jpg`;
  const heroAlt = service?.imageAlt ?? 'Luxury real estate brokerage Gurugram';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Luxury Real Estate Brokerage',
    serviceType: 'Real Estate Brokerage',
    description:
      'HARERA-registered luxury real estate brokerage in Gurugram and Delhi NCR. HARERA-verified project listings, signed developer agreements, honest advisory.',
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Corner House Realty',
      url: SITE_URL,
      telephone: '+91-98719-50051',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C3-151, Sobha Sector 108',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        postalCode: '122004',
        addressCountry: 'IN',
      },
    },
    areaServed: ['Gurugram', 'Delhi NCR', 'Noida', 'Faridabad'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Brokerage fee paid by developer, not buyer, for new-launch transactions',
    },
    url: `${SITE_URL}${PATH}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Brokerage', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <SEO
        title="Luxury Real Estate Broker Gurugram — HARERA Verified | Corner House"
        description="HARERA-registered luxury real estate broker in Gurugram and Delhi NCR. HARERA-verified projects, honest advisory, no conflict of interest. Corner House."
        path={PATH}
        image={heroImage}
        keywords={[
          'luxury real estate broker gurugram',
          'HARERA verified broker gurugram',
          'property broker gurugram',
          'real estate agent gurugram',
          'luxury property advisory gurugram',
          'RERA registered broker gurugram',
        ]}
        jsonLd={[serviceJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero */}
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
        <div className="absolute inset-0 bg-black/55" />
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
              <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-6 leading-[1.05] max-w-4xl mx-auto">
                Luxury Real Estate Brokerage <br />
                <span className="italic">in Gurugram and Delhi NCR</span>
              </h1>
              <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-white/85 max-w-2xl mx-auto">
                HARERA-registered channel partner. Signed agreements with every developer we
                represent. No conflict of interest between your decision and ours.
              </p>
              <div className="h-1 w-24 bg-primary mx-auto mt-8" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <StatsBar stats={[...STATS]} />

      <article className="container mx-auto px-6 mt-20 max-w-4xl">
        {/* What Makes Corner House Different */}
        <section className="space-y-7">
          <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.15]">
            What Makes Corner House Different
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            Corner House is an RERA-authorised channel partner for luxury and ultra-luxury
            residential projects in Gurugram and Delhi NCR. The distinction that separates us from
            most broker networks in Gurgaon is straightforward: we hold signed broker agreements
            with every developer we represent.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            This matters because a broker without a signed developer agreement is operating on
            informal terms, which means their price sheet may be outdated, their HARERA numbers may
            be unverified, and their advice may be shaped by whichever developer is offering the
            highest commission that week.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            Corner House does not operate that way. Every project we show a buyer has been
            independently verified against the Haryana RERA portal at{' '}
            <a
              href={HARERA_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              haryanarera.gov.in
            </a>{' '}
            before we present it. We check that the HARERA registration is active, that the
            possession date is current and has not been extended without HARERA approval, and that
            quarterly compliance filings are up to date. If a project does not pass this
            verification, we do not show it.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            Our active listings span Gurugram's most relevant luxury corridors. Sector 36A on the
            Dwarka Expressway is home to Krisumi City, the 30-acre Indo-Japanese master township by
            Krisumi Corporation (Krishna Group and Sumitomo Corporation joint venture), with{' '}
            <Link
              to="/properties/krisumi-forest-reserve"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Krisumi Forest Reserve
            </Link>{' '}
            and{' '}
            <Link
              to="/properties/krisumi-waterside-residences"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Krisumi Waterside Residences
            </Link>{' '}
            both actively listed. Sector 80 on NH-48 is home to{' '}
            <Link
              to="/properties/sobha-aranya"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Sobha Aranya
            </Link>{' '}
            inside the 270-acre Karma Lakelands estate. Sector 86 on the Southern Peripheral Road
            is home to{' '}
            <Link
              to="/properties/emaar-serenity-hills"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Emaar Serenity Hills
            </Link>
            . Sector 66 on Golf Course Extension Road is home to{' '}
            <Link
              to="/properties/downtown66"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              BPTP Downtown 66
            </Link>
            . The full active list is at{' '}
            <Link
              to="/properties"
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              cornerhouse.co.in/properties
            </Link>
            .
          </p>
        </section>

        {/* What We Do in a Brokerage Engagement */}
        <section className="mt-20 pt-12 border-t border-border/40 space-y-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.15]">
              What We Do in a Brokerage Engagement
            </h2>
            <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              A Corner House brokerage engagement is not a sales call. It is a structured advisory
              process that starts with understanding your requirements and ends with a documented
              decision based on verified data.
            </p>
          </div>

          <ol className="space-y-6">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex gap-6 p-6 md:p-8 bg-secondary/30 border-l-4 border-primary"
                >
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary">
                      {s.step}
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-medium leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-base font-light leading-relaxed text-foreground/85">
                      {s.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {/* Active HARERA-Verified Projects */}
        <section className="mt-20 pt-12 border-t border-border/40 space-y-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.15]">
              Our Active HARERA-Verified Projects
            </h2>
            <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              Every project listed on{' '}
              <Link
                to="/properties"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                cornerhouse.co.in/properties
              </Link>{' '}
              is HARERA verified. Our{' '}
              <Link
                to="/blog/krisumi-forest-reserve-review"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                honest review of Krisumi Forest Reserve
              </Link>{' '}
              and{' '}
              <Link
                to="/blog/sobha-aranya-review"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Sobha Aranya review
              </Link>{' '}
              are examples of the depth of research we publish before recommending any project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACTIVE_PROJECTS.map((p) => (
              <Link
                key={p.slug}
                to={`/properties/${p.slug}`}
                className="group block p-6 border border-border/60 hover:border-primary/60 transition-colors space-y-3 bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-medium leading-snug group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">{p.location}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <div className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/70">
                  {p.configuration}
                  {p.priceFrom ? <span className="text-primary"> · from {p.priceFrom}</span> : null}
                </div>
                {p.harera && (
                  <div className="flex items-start gap-2 text-xs font-light text-muted-foreground border-t border-border/40 pt-3">
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="break-words">
                      <div className="font-medium text-foreground/85">HARERA</div>
                      <div className="leading-snug">{p.harera}</div>
                      {p.possession && (
                        <div className="mt-1">Possession {p.possession}</div>
                      )}
                    </div>
                  </div>
                )}
                {!p.harera && p.possession && (
                  <div className="text-xs font-light text-muted-foreground border-t border-border/40 pt-3">
                    Possession {p.possession}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* AEO Section — What Buyers Ask Us (visible cards, not accordion) */}
        <section className="mt-20 pt-12 border-t border-border/40 space-y-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.15]">
              What Buyers Ask Us
            </h2>
            <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              The questions buyers and AI search engines ask most often about Gurugram luxury
              brokerage.
            </p>
          </div>

          <div className="space-y-5">
            {AEO_CARDS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-secondary/20 border-l-4 border-primary p-6 md:p-7 space-y-3"
              >
                <h3 className="text-lg md:text-xl font-heading font-semibold leading-snug text-foreground">
                  {c.question}
                </h3>
                <p className="text-base font-light leading-relaxed text-foreground/85">
                  {c.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section — FAQAccordion (auto-emits FAQPage JSON-LD) */}
        <section className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground font-light mb-2">
            How a Corner House brokerage engagement actually works.
          </p>

          <FAQAccordion>
            <h3>What is an RERA authorised channel partner in Gurugram?</h3>
            <p>
              An RERA authorised channel partner is a real estate broker registered with HARERA —
              the Haryana Real Estate Regulatory Authority. Registration requires completion of
              mandatory HARERA training, payment of registration fees, and compliance with HARERA's
              code of conduct for agents. Working with a registered channel partner gives buyers
              regulatory recourse through HARERA if any aspect of the broker's conduct violates
              RERA's consumer protection provisions. Corner House is HARERA-registered. You can ask
              us for our registration number and verify it on haryanarera.gov.in.
            </p>

            <h3>How does Corner House select which projects to represent?</h3>
            <p>
              Corner House represents projects that meet three criteria. First, the project must be
              HARERA registered with an active, current registration on haryanarera.gov.in. Second,
              the developer must have a track record we can independently verify — either through
              delivered phases that buyers can visit, or through HARERA compliance history. Third,
              we must be able to hold a signed broker agreement with the developer, which gives us
              access to current pricing, payment plans, and allocation data. We do not represent
              projects with lapsed HARERA registrations or developers whose compliance filings are
              overdue.
            </p>

            <h3>What does the all-in cost of a Gurugram luxury property actually include?</h3>
            <p>
              The all-in cost of a Gurugram luxury property typically runs 18 to 22 percent above
              the advertised base price. Beyond the base price, buyers pay: GST at 5 percent on
              under-construction properties (calculated on the agreement value), stamp duty at 7
              percent for male buyers in Haryana or 5 percent for female buyers, registration at 1
              percent of the agreement value, Preferential Location Charges (PLC) for preferred
              floors and golf course or park facings, maintenance corpus typically covering 24
              months prepaid, mandatory or optional club membership, and covered basement parking.
              Corner House provides a full all-in cost breakdown before any booking recommendation.
            </p>

            <h3>Can Corner House help with HARERA complaints if something goes wrong?</h3>
            <p>
              Corner House can help buyers understand the HARERA complaint process and connect them
              with legal advisors experienced in HARERA proceedings. We are not legal advisors and
              do not represent buyers in HARERA proceedings ourselves. HARERA provides buyers with
              the right to file complaints at haryanarera.gov.in against developers who fail to
              deliver on time, misrepresent project details, or violate the builder-buyer
              agreement. Under HARERA, buyers are entitled to interest at SBI MCLR plus 2 percent
              per annum on amounts paid if possession is delayed beyond the RERA-registered date.
            </p>

            <h3>Does Corner House work with NRI buyers?</h3>
            <p>
              Yes. Corner House has facilitated property purchases for NRI buyers based in the UAE,
              Singapore, the USA, the UK, and Australia. We conduct remote due diligence including
              HARERA verification, site visits with video walkthroughs, and developer meetings on
              behalf of NRI buyers. We coordinate with FEMA-specialist legal advisors to ensure
              purchases are structured correctly for repatriation eligibility. See our dedicated{' '}
              <Link
                to="/services/nri"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                NRI Services page
              </Link>{' '}
              for a full description of the NRI advisory process.
            </p>

            <h3>How long does a typical luxury property purchase take in Gurugram?</h3>
            <p>
              A typical new-launch luxury property purchase in Gurugram takes 2 to 4 weeks from
              initial consultation to booking. The timeline includes requirements scoping and
              HARERA verification (3 to 5 days), site visits and shortlisting (1 to 2 weeks
              depending on availability), written comparison review and decision (3 to 7 days),
              builder-buyer agreement review (3 to 5 days), and booking formalities (1 to 2 days).
              For buyers purchasing remotely or who need legal review of documentation, allow
              additional time. Rushing this process is the most common reason buyers regret
              decisions — we do not compress the timeline to close faster.
            </p>

            <h3>What is the Corner House approach to negotiation with developers?</h3>
            <p>
              For new-launch luxury projects in Gurugram, the developer's listed price is generally
              firm. The negotiation space exists in payment plan structure, PLC waivers for
              specific units, floor choice, and parking allocation — not typically in headline
              price for projects from institutional developers like Sobha Limited, Krisumi
              Corporation, or Emaar India. We are transparent with buyers about where negotiation
              is realistic and where it is not. We do not promise discounts we cannot deliver in
              order to win a buyer's engagement.
            </p>
          </FAQAccordion>
        </section>

        {/* CTA Strip */}
        <section className="mt-20 pt-12 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.1]">
                Ready to start your{' '}
                <span className="italic text-primary/80">search?</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed">
                Talk to Saurabh directly. No sales pressure, no fake urgency. Just honest advice on
                which Gurugram project fits your requirements and budget.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <a
                href="https://wa.me/919871950051?text=Hi%2C%20I%27d%20like%20to%20discuss%20buying%20a%20luxury%20property%20in%20Gurugram.%20Please%20share%20your%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold tracking-[0.3em] uppercase bg-primary text-white px-8 py-4 hover:bg-primary/90 transition-colors group"
              >
                Chat on WhatsApp
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+919871950051"
                className="text-sm text-muted-foreground font-light hover:text-primary transition-colors"
              >
                or call +91 98719 50051
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
