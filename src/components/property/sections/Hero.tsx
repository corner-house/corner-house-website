import { MapPin, MessageSquare, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PropertyListing } from '../schema';
import { getImage, getImageOrNull } from '../image-helpers';
import { SITE_CONTACT, phoneLink, whatsappLink } from '@/site-contact';

interface HeroProps {
  listing: PropertyListing;
}

export default function Hero({ listing }: HeroProps) {
  const desktop = getImage(listing, listing.hero.heroImageKey);
  const mobile = getImageOrNull(listing, listing.hero.mobileHeroImageKey) ?? desktop;

  const priceDisplay = listing.hero.priceTo
    ? `${listing.hero.priceFrom} – ${listing.hero.priceTo}`
    : `${listing.hero.priceFrom} ${listing.hero.priceSuffix}`;

  const whatsappMessage = `Hi, I'd like more details on ${listing.projectName} in ${listing.location.locality}.`;

  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[520px] max-h-[820px] w-full overflow-hidden bg-luxury-charcoal">
        <picture>
          <source media="(max-width: 640px)" srcSet={mobile.hero} type="image/webp" />
          <source srcSet={desktop.hero} type="image/webp" />
          <img
            src={desktop.original}
            alt={`${listing.projectName} — ${listing.hero.tagline}`}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={2000}
            height={1200}
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:from-black/60" />

        <div className="absolute inset-x-0 bottom-0 pb-12 md:pb-20">
          <div className="container mx-auto px-6 text-white">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-none px-4 py-1 tracking-widest uppercase text-[10px] backdrop-blur"
              >
                {listing.atAGlance.projectType}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/50 bg-black/30 text-white px-4 py-1 tracking-widest uppercase text-[10px] backdrop-blur"
              >
                {listing.atAGlance.status}
              </Badge>
            </div>

            <h1
              className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-4 max-w-4xl"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.35)' }}
            >
              {listing.projectName}
            </h1>
            <p
              className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-6"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
            >
              {listing.hero.tagline}
            </p>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div
                className="flex items-center text-white/95 text-base md:text-lg"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
              >
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {listing.location.addressLine}, {listing.location.locality}, {listing.location.city}
              </div>
              <div
                className="text-3xl md:text-4xl font-heading font-semibold text-primary"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}
              >
                {priceDisplay}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink(whatsappMessage)}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-8 py-4 transition-colors shadow-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" /> WHATSAPP
              </a>
              <a
                href={phoneLink()}
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-black/30 hover:bg-black/50 text-white font-medium text-sm px-8 py-4 transition-colors backdrop-blur"
              >
                <Phone className="mr-2 h-5 w-5" /> CALL {SITE_CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 md:-mt-14 relative z-10">
        <div className="bg-white shadow-xl border border-border/30 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border/40">
          {listing.hero.keyStats.map((stat) => (
            <div key={stat.label} className="p-5 md:p-6 text-center">
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-lg md:text-xl font-heading font-medium">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
