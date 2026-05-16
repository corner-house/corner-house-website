import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PriceRow {
  config: string;
  area: string;
  price: string;
}

interface PriceValueCardProps {
  rows: PriceRow[];
  valueProps: string[];
  ctaCopy: string;
  ctaLabel: string;
  ctaUrl: string;
}

export default function PriceValueCard({
  rows,
  valueProps,
  ctaCopy,
  ctaLabel,
  ctaUrl,
}: PriceValueCardProps) {
  return (
    <div className="my-10 space-y-8">
      {/* Configuration table */}
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground bg-secondary/40">
              <th className="text-left font-sans font-semibold px-6 py-4">Configuration</th>
              <th className="text-left font-sans font-semibold px-6 py-4">Area (Super Built-Up)</th>
              <th className="text-left font-sans font-semibold px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={`${r.config}-${i}`}
                className="border-t border-border/60 text-foreground/85"
              >
                <td className="px-6 py-4 font-heading font-medium">{r.config}</td>
                <td className="px-6 py-4 font-light">{r.area}</td>
                <td className="px-6 py-4 font-light">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Value props */}
      <ul className="space-y-4">
        {valueProps.map((v, i) => (
          <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
            <Check
              className="h-5 w-5 mt-0.5 shrink-0"
              style={{ color: '#C9933A' }}
              aria-hidden
            />
            <span>{v}</span>
          </li>
        ))}
      </ul>

      {/* Navy CTA box */}
      <div className="p-7 md:p-9" style={{ backgroundColor: '#0D1F3C' }}>
        <p className="text-base md:text-lg font-light leading-relaxed text-white/85">{ctaCopy}</p>
        <Link
          to={ctaUrl}
          className="mt-6 inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.3em] uppercase font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C9933A', color: '#0D1F3C' }}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
