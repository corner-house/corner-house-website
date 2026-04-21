import React from 'react';
import { useParams } from 'react-router-dom';
import { useLayoutContext } from '@/App';
import { PROPERTIES } from '@/constants';
import { getPropertyListing } from '@/data/propertyListings';
import PropertyListingPage from '@/components/property/PropertyListingPage';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { useLeadGate } from '@/lib/lead-gate';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Bed, Bath, Maximize, MapPin, Share2, Heart,
  Phone, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const richListing = getPropertyListing(id);
  const legacy = !richListing ? PROPERTIES.find((p) => p.id === id) : null;
  const projectTitle =
    richListing?.projectName ?? legacy?.title ?? 'this residence';

  const { captured, ready, markCaptured } = useLeadGate();
  const showGate = ready && !captured;

  const content = richListing ? (
    <PropertyListingPage listing={richListing} />
  ) : (
    <LegacyPropertyDetail id={id} />
  );

  return (
    <>
      {content}
      <LeadCaptureModal
        isOpen={showGate}
        persistent
        title={projectTitle}
        onClose={() => {}}
        onSuccess={() => markCaptured()}
      />
    </>
  );
}

function LegacyPropertyDetail({ id }: { id: string | undefined }) {
  const { onBack: layoutBack } = useLayoutContext();
  const onBack = () => layoutBack('#properties');
  const property = PROPERTIES.find((p) => p.id === id);
  const [activeImage, setActiveImage] = React.useState(0);

  if (!property) {
    return (
      <main className="pt-40 pb-32 bg-background min-h-screen">
        <SEO
          title="Property not found"
          description="The property you're looking for is no longer listed."
          path={`/properties/${id ?? ''}`}
          noindex
        />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-heading font-medium mb-6">Property not found</h1>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to collection
          </Button>
        </div>
      </main>
    );
  }

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: property.title,
    description: property.description,
    image: property.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
    url: `${SITE_URL}/properties/${property.id}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressCountry: 'IN',
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: { '@type': 'QuantitativeValue', value: property.area },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: `${SITE_URL}/#properties` },
      {
        '@type': 'ListItem',
        position: 3,
        name: property.title,
        item: `${SITE_URL}/properties/${property.id}`,
      },
    ],
  };

  return (
    <main className="pt-32 pb-24 bg-background">
      <SEO
        title={`${property.title} — ${property.type} in ${property.location}`}
        description={`${property.title}, ${property.type.toLowerCase()} in ${property.location}. ${property.beds} beds, ${property.baths} baths, ${property.area}. ${property.description.slice(0, 120)}...`}
        path={`/properties/${property.id}`}
        image={property.images[0]}
        keywords={[property.type, property.location, 'Gurugram luxury real estate', 'Delhi NCR']}
        jsonLd={[propertyJsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6">
        {/* Breadcrumb / Back */}
        <Button
          variant="ghost"
          className="mb-8 -ml-4 text-muted-foreground hover:text-primary group"
          onClick={onBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO COLLECTION
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-4 py-1 tracking-widest uppercase text-[10px]">
                  {property.type}
                </Badge>
                <Badge variant="outline" className="border-border text-muted-foreground px-4 py-1 tracking-widest uppercase text-[10px]">
                  FOR SALE
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight mb-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {property.location}
                  </div>
                </div>
                <div className="text-4xl font-heading font-semibold text-primary">
                  {property.price}
                </div>
              </div>
            </div>

            {/* Gallery / Floor Plan Tabs */}
            <Tabs defaultValue="gallery" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-secondary/50 p-1 rounded-none">
                  <TabsTrigger value="gallery" className="rounded-none px-8 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    GALLERY
                  </TabsTrigger>
                  <TabsTrigger value="floorplan" className="rounded-none px-8 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    FLOOR PLAN
                  </TabsTrigger>
                </TabsList>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full border-border">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="gallery" className="space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={property.images[activeImage]}
                    alt={`${property.title} — image ${activeImage + 1} of ${property.images.length}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 md:opacity-0 md:hover:opacity-100 transition-opacity">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full bg-white/80 shadow-lg"
                      onClick={() => setActiveImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full bg-white/80 shadow-lg"
                      onClick={() => setActiveImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {property.images.map((img, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square cursor-pointer overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      onClick={() => setActiveImage(i)}
                    >
                      <img
                        src={img}
                        alt={`${property.title} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="floorplan">
                <div className="aspect-[4/3] bg-white border border-border p-8 flex items-center justify-center">
                  <img
                    src={property.floorPlan}
                    alt={`${property.title} — floor plan`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-border/50">
              <div className="flex flex-col items-center text-center space-y-2">
                <Bed className="h-8 w-8 text-primary/60" />
                <span className="text-2xl font-heading font-medium">{property.beds}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Bath className="h-8 w-8 text-primary/60" />
                <span className="text-2xl font-heading font-medium">{property.baths}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Maximize className="h-8 w-8 text-primary/60" />
                <span className="text-2xl font-heading font-medium">{property.area}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Total Area</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-3xl font-heading font-medium">Description</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Details Table */}
            <div className="space-y-6">
              <h3 className="text-3xl font-heading font-medium">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(property.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-8">
              <h3 className="text-3xl font-heading font-medium">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.amenities.map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Highlights */}
            <div className="space-y-8">
              <h3 className="text-3xl font-heading font-medium">Location Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.highlights.map((item) => (
                  <div key={item} className="bg-secondary/30 p-6 border-l-4 border-primary">
                    <span className="font-light text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-luxury-charcoal text-white p-8 space-y-6 bg-[#1c1c1c]">
                <h4 className="text-xl font-heading font-medium">Direct Contact</h4>
                <p className="text-white/60 font-light text-sm">
                  Speak with one of our luxury advisors immediately for a private viewing.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6">
                    <MessageSquare className="mr-2 h-5 w-5" /> WHATSAPP US
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 py-6">
                    <Phone className="mr-2 h-5 w-5" /> CALL +91 98765 43210
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t p-4 pb-safe flex space-x-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Button className="flex-1 bg-primary text-white py-6">ENQUIRE</Button>
        <Button variant="outline" className="flex-1 border-primary text-primary py-6">
          <Phone className="mr-2 h-5 w-5" /> CALL
        </Button>
      </div>
    </main>
  );
}
