import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  label: string;
}

interface TestimonialsGridProps {
  items: Testimonial[];
  disclaimer?: string;
}

export default function TestimonialsGrid({ items, disclaimer }: TestimonialsGridProps) {
  return (
    <div className="not-prose my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="relative bg-card border border-border p-7 flex flex-col"
          >
            <Quote
              className="absolute top-5 left-5 h-5 w-5"
              style={{ color: '#C9933A' }}
              aria-hidden
            />
            <blockquote className="pt-6 text-lg md:text-xl font-heading italic leading-snug text-foreground/85 flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border/60">
              <div className="font-heading font-medium text-base text-foreground">{t.name}</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                {t.label}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {disclaimer && (
        <p className="mt-5 text-xs italic text-muted-foreground text-center">{disclaimer}</p>
      )}
    </div>
  );
}
