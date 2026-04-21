import { MapPin } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodlePin } from '../Doodles';

interface LocationMapProps {
  location: PropertyListing['location'];
}

function isValidEmbedUrl(url: string): boolean {
  if (url.includes('/maps/embed')) return true;
  if (url.includes('output=embed')) return true;
  return false;
}

function buildEmbedUrl(location: PropertyListing['location']): string {
  if (location.googleMapsEmbedUrl && isValidEmbedUrl(location.googleMapsEmbedUrl)) {
    return location.googleMapsEmbedUrl;
  }
  return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=en&z=15&output=embed`;
}

export default function LocationMap({ location }: LocationMapProps) {
  const embedUrl = buildEmbedUrl(location);
  const fullAddress = [
    location.addressLine,
    location.locality,
    location.city,
    location.state,
    location.pincode,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <section id="location" className="py-10 md:py-12 bg-[#EEF4F8]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="where it lives"
          title={`${location.locality}, ${location.city}`}
          doodle={<DoodlePin />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Address
              </div>
              <div className="flex items-start text-foreground">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>{fullAddress}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Coordinates
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm tracking-widest uppercase text-primary hover:underline"
            >
              Get directions →
            </a>
          </div>

          <div className="lg:col-span-2 aspect-[16/10] bg-secondary/30 border border-border/40">
            <iframe
              title={`Map of ${location.locality}`}
              src={embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
