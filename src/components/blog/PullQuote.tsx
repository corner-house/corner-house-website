import type { ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

// Large gold-railed blockquote for editorial emphasis. Used between body sections to surface
// the single most quotable sentence in the preceding section.
export default function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <figure
      className="not-prose my-12 pl-6 md:pl-8 border-l-4"
      style={{ borderLeftColor: '#C9933A' }}
    >
      <blockquote className="font-heading italic text-2xl md:text-3xl leading-snug text-foreground">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-xs tracking-[0.25em] uppercase text-muted-foreground">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
