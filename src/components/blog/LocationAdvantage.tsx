import { MapPin, ExternalLink } from 'lucide-react';

interface LocationItem {
  place: string;
  distance: string;
  time: string;
}

interface LocationAdvantageProps {
  items: LocationItem[];
  mapEmbedSrc: string;
  directionsUrl: string;
}

// Two-column connectivity block: bulletted distance list on the left, Google Maps iframe on
// the right (stacks on mobile). Used in MDX immediately after the Investment Case section.
export default function LocationAdvantage({
  items,
  mapEmbedSrc,
  directionsUrl,
}: LocationAdvantageProps) {
  return (
    <div className="not-prose my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      {/* Left — bullet list */}
      <ul className="space-y-3">
        {items.map((it) => (
          <li
            key={it.place}
            className="flex items-start gap-4 border-b border-border/60 pb-3"
          >
            <span
              className="mt-1.5 h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: '#C9933A' }}
              aria-hidden
            />
            <MapPin className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" aria-hidden />
            <div className="flex-1 flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-heading font-medium text-base text-foreground">{it.place}</span>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {it.distance} · {it.time}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Right — map */}
      <div className="space-y-3">
        <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
          <iframe
            src={mapEmbedSrc}
            title="Krisumi Forest Reserve location map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase font-semibold text-primary hover:underline"
        >
          Get Directions
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
