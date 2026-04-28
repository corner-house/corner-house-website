import SEO from '@/components/SEO';
import type { PropertyListing } from './schema';
import Hero from './sections/Hero';
import Walkthrough from './sections/Walkthrough';
import Gallery from './sections/Gallery';
import AtAGlance from './sections/AtAGlance';
import Pricing from './sections/Pricing';
import FloorPlans from './sections/FloorPlans';
import Building from './sections/Building';
import Amenities from './sections/Amenities';
import LocationMap from './sections/LocationMap';
import Connectivity from './sections/Connectivity';
import Neighbourhood from './sections/Neighbourhood';
import Builder from './sections/Builder';
import PaymentPlan from './sections/PaymentPlan';
import EmiCalculator from './sections/EmiCalculator';
import InvestmentThesis from './sections/InvestmentThesis';
import SimilarProperties from './sections/SimilarProperties';
import Faq from './sections/Faq';
import ContactBlock from './sections/ContactBlock';
import Rera from './sections/Rera';
import Disclaimer from './sections/Disclaimer';

interface PropertyListingPageProps {
  listing: PropertyListing;
}

export default function PropertyListingPage({ listing }: PropertyListingPageProps) {
  const path = `/properties/${listing.slug}`;
  const jsonLd = [
    listing.jsonLd.realEstateListing,
    listing.jsonLd.product,
    listing.jsonLd.faqPage,
    listing.jsonLd.breadcrumbList,
  ];

  return (
    <main className="bg-background">
      <SEO
        title={listing.computedSeo.title}
        description={listing.computedSeo.description}
        path={path}
        image={listing.computedSeo.ogImageUrl}
        keywords={listing.computedSeo.keywords}
        jsonLd={jsonLd}
      />

      <Hero listing={listing} />
      <Walkthrough listing={listing} />
      <Gallery listing={listing} />
      <AtAGlance atAGlance={listing.atAGlance} />
      <Pricing pricing={listing.pricing} />
      <FloorPlans floorPlans={listing.floorPlans} listing={listing} />
      <Building building={listing.building} />
      <Amenities amenities={listing.amenities} listing={listing} />
      <LocationMap location={listing.location} />
      <Connectivity connectivity={listing.connectivity} />
      <Neighbourhood neighbourhood={listing.neighbourhood} listing={listing} />
      <Builder builder={listing.builder} />
      <PaymentPlan paymentPlan={listing.paymentPlan} />
      <EmiCalculator defaults={listing.emiCalculator} projectName={listing.projectName} />
      <InvestmentThesis thesis={listing.investmentThesis} listing={listing} />
      <SimilarProperties slugs={listing.similarProperties} />
      <Faq faqs={listing.faqs} />
      <ContactBlock projectName={listing.projectName} locality={listing.location.locality} />
      <Rera rera={listing.rera} />
      <Disclaimer addendum={listing.disclaimerAddendum} />
    </main>
  );
}
