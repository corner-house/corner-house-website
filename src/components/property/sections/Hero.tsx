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
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-medium tracking-tight mb-3 md:mb-4 max-w-4xl leading-tight"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.35)' }}
            >
              {listing.projectName}
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl mb-5 md:mb-6"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
            >
              {listing.hero.tagline}
            </p>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8">
              <div
                className="flex items-start text-white/95 text-sm sm:text-base md:text-lg"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
              >
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>{listing.location.addressLine}, {listing.location.locality}, {listing.location.city}</span>
              </div>
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}
              >
                {priceDisplay}
              </div>
            </div>

            <div className="mt-6 md:mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink(whatsappMessage)}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 md:px-8 py-3.5 md:py-4 transition-colors shadow-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" /> WHATSAPP
              </a>
              <a
                href={phoneLink()}
                className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-lg border border-white/50 bg-black/30 hover:bg-black/50 text-white font-medium text-sm px-6 md:px-8 py-3.5 md:py-4 transition-colors backdrop-blur"
              >
                <Phone className="mr-2 h-5 w-5" /> <span className="hidden sm:inline">CALL&nbsp;</span>{SITE_CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-8 md:-mt-14 relative z-10">
        <div className="bg-white shadow-xl border border-border/30 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {listing.hero.keyStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-3 sm:p-4 md:p-6 text-center border-border/40 ${
                i !== 0 ? 'border-l' : ''
              } ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
            >
              <div className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1 sm:mb-2 leading-tight">
                {stat.label}
              </div>
              <div className="text-sm sm:text-lg md:text-xl font-heading font-medium leading-tight">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
