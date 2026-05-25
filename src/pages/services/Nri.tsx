import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';
import FAQAccordion from '@/components/blog/FAQAccordion';
import { SERVICES } from '@/constants';

const SERVICE_ID = 'nri';
const PATH = `/services/${SERVICE_ID}`;

export default function NriPage() {
  const service = SERVICES.find((s) => s.id === SERVICE_ID);
  const heroImage = service?.image ?? `${SITE_URL}/og-default.jpg`;
  const heroAlt = service?.imageAlt ?? 'NRI property services Gurugram';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'NRI Property Services',
    name: 'NRI Property Services in Gurugram and Delhi NCR',
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
      { '@type': 'ListItem', position: 3, name: 'NRI Services', item: `${SITE_URL}${PATH}` },
    ],
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <SEO
        title="NRI Property Services Gurugram — FEMA, PoA, Remote Buying | Corner House"
        description="NRI property advisory for Gurugram and NCR. FEMA, remote due diligence, power of attorney, HARERA verification, and repatriation planning."
        path={PATH}
        image={heroImage}
        keywords={[
          'NRI property services gurugram',
          'NRI real estate advisory gurugram',
          'FEMA compliance NRI property',
          'remote property buying gurugram',
          'power of attorney property registration haryana',
          'NRI repatriation planning property',
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
                NRI Property Services <br />
                <span className="italic">Gurugram and Delhi NCR</span>
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 mt-20 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-7 text-foreground/85">
          <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            Corner House provides dedicated advisory for non-resident Indian buyers purchasing
            luxury residential property in Gurugram and Delhi NCR. NRI buyers face challenges that
            domestic buyers do not: time zone constraints, inability to visit sites frequently,
            dependence on remote document review, and regulatory requirements under FEMA that
            differ from domestic purchase rules.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed">
            We have facilitated NRI property purchases for buyers based in the UAE, Singapore, the
            USA, the UK, and Australia. In each case, the buyer was able to make an informed,
            HARERA-verified decision without needing to travel to Gurugram during the research and
            negotiation phase.
          </p>

          <div className="space-y-5 pl-1">
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Remote due diligence
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                We conduct HARERA verification, site visits with video walkthroughs, developer
                meetings, and document review on your behalf. You receive a written report with
                verified HARERA data, current pricing from our signed developer agreements, and a
                documented comparison of shortlisted options — for example, our HARERA-verified
                review of{' '}
                <Link
                  to="/blog/krisumi-forest-reserve-review"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  HARERA-registered projects
                </Link>{' '}
                like{' '}
                <Link
                  to="/properties/krisumi-forest-reserve"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Krisumi Forest Reserve
                </Link>{' '}
                and{' '}
                <Link
                  to="/properties/sobha-aranya"
                  className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Sobha Aranya
                </Link>{' '}
                gives NRI buyers the depth of research they would otherwise have to assemble
                themselves.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                FEMA compliance
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                Residential property purchase by NRI buyers is governed by the Foreign Exchange
                Management Act. We coordinate with FEMA-specialist legal advisors to ensure your
                purchase structure is correct for repatriation eligibility from day one.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Power of attorney
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                For buyers who cannot be physically present for registration, we advise on the
                appropriate PoA structure and connect you with legal professionals experienced in
                NRI property registration in Haryana.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Payment routing
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                We advise on NRE and NRO account payment routing, TDS obligations, and the
                documentation required for repatriation of sale proceeds under FEMA.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-1">
                Possession monitoring
              </h3>
              <p className="text-base font-light leading-relaxed text-foreground/85">
                For under-construction purchases, we monitor HARERA quarterly filings and
                construction progress on your behalf throughout the construction period to November
                2030 or your project's possession date.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground font-light mb-2">
            Common NRI questions about buying property in Gurugram.
          </p>

          <FAQAccordion>
            <h3>Can NRI buyers purchase property in Gurugram?</h3>
            <p>
              Yes. Non-resident Indians can purchase residential property in India, including
              Gurugram and Delhi NCR, subject to FEMA regulations. NRI buyers can purchase most
              types of residential property including apartments and villas. Commercial property
              and agricultural land have separate FEMA restrictions. Payments must be routed
              through NRE or NRO bank accounts. We coordinate with FEMA-specialist legal advisors
              to ensure every NRI purchase at Corner House is structured correctly for regulatory
              compliance and repatriation eligibility.
            </p>

            <h3>What is FEMA and why does it matter for NRI property buyers in Gurugram?</h3>
            <p>
              FEMA, the Foreign Exchange Management Act, governs foreign exchange transactions in
              India including residential property purchases by non-resident Indians. Proper FEMA
              compliance ensures that when you eventually sell the property, you can repatriate the
              sale proceeds to your overseas account. Key requirements include routing purchase
              payments through NRE or NRO bank accounts, maintaining documentation of the source of
              funds, and filing any required RBI declarations. Non-compliance at the time of
              purchase can create complications at the time of sale.
            </p>

            <h3>Can I buy property in Gurugram without visiting India?</h3>
            <p>
              Yes. Corner House facilitates complete remote purchase processes for NRI buyers. We
              conduct HARERA verification, site visits with video walkthroughs, and developer
              meetings on your behalf. We provide written reports with all verified data.
              Registration can be handled through a properly structured power of attorney. We have
              facilitated purchases for NRI buyers in the UAE, Singapore, the USA, the UK, and
              Australia without requiring India travel during the research and booking phase. A
              site visit before possession is recommended but can be planned around your India
              travel rather than being required upfront.
            </p>

            <h3>What documents does an NRI need to buy property in Gurugram?</h3>
            <p>
              NRI buyers need: valid passport and visa copies, PAN card (mandatory for transactions
              above Rs 50 Lakh), NRE or NRO bank account details for payment routing, overseas and
              India address proof, and a power of attorney if not present for registration.
              Depending on the source of funds, additional documentation of overseas income may be
              required by the lender or for FEMA compliance. Corner House provides a complete NRI
              documentation checklist as part of our onboarding process.
            </p>

            <h3>Is HARERA protection available to NRI buyers?</h3>
            <p>
              Yes. HARERA protection applies to all buyers of HARERA-registered projects in
              Haryana, regardless of residency status. NRI buyers purchasing HARERA-registered
              projects in Gurugram have the same legal rights as domestic buyers: the right to
              interest on delayed possession at SBI MCLR plus 2% per annum, the right to refund
              with interest if the project is cancelled, and the right to file complaints with the
              Haryana RERA authority at haryanarera.gov.in. Every project Corner House recommends
              to NRI buyers is HARERA-verified before recommendation.
            </p>

            <h3>How does TDS work for NRI property buyers?</h3>
            <p>
              When an NRI buys property in India from a resident seller, TDS at 1% applies. When
              buying from a developer for an under-construction property, standard TDS rules apply.
              When an NRI eventually sells the property, the buyer is required to deduct TDS at 20%
              on long-term capital gains or 30% on short-term gains. We coordinate with tax
              advisors familiar with NRI property taxation to ensure your purchase and eventual
              sale are structured correctly. We do not provide tax advice directly, but we can
              facilitate introductions to appropriate advisors.
            </p>
          </FAQAccordion>
        </section>

        <section className="mt-20 pt-12 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium leading-[1.1]">
                Buying from overseas?{' '}
                <span className="italic text-primary/80">Let us handle the diligence.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed">
                Share what you are looking for and where you are based. We will respond with a
                remote-buying plan and HARERA-verified options.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <a
                href="https://wa.me/919871950051?text=Hi%2C%20I%27m%20an%20NRI%20looking%20at%20Gurugram%20property.%20Please%20share%20options."
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
