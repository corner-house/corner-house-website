import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTAStripProps {
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaUrl: string;
  note?: string;
}

export default function CTAStrip({ headline, subtext, ctaLabel, ctaUrl, note }: CTAStripProps) {
  return (
    <section className="my-16 bg-[#1c1c1c] text-white p-10 md:p-14">
      <div className="max-w-3xl space-y-5">
        <h3 className="text-3xl md:text-4xl font-heading font-medium leading-tight">{headline}</h3>
        <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">{subtext}</p>
        <div className="pt-4">
          <Link
            to={ctaUrl}
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-primary/90 transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {note && <p className="text-xs text-white/45 pt-2 font-light">{note}</p>}
      </div>
    </section>
  );
}
