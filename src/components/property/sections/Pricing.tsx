import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleCurrency } from '../Doodles';

interface PricingProps {
  pricing: PropertyListing['pricing'];
}

function statusColor(status: 'Available' | 'Limited' | 'Sold Out'): string {
  if (status === 'Sold Out') return 'text-muted-foreground';
  if (status === 'Limited') return 'text-amber-700';
  return 'text-green-700';
}

export default function Pricing({ pricing }: PricingProps) {
  return (
    <section id="pricing" className="py-10 md:py-12 bg-[#FAF6E8]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="price guide"
          title="Pricing & configurations"
          doodle={<DoodleCurrency />}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-left">
                {['Configuration', 'Carpet', 'Built-up', '₹ / sq.ft', 'Total Price', 'Inventory'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.map((row, i) => (
                <tr key={row.configuration} className={i % 2 === 0 ? 'bg-white/80' : 'bg-white/40'}>
                  <td className="px-5 py-5 font-heading font-medium text-base">
                    {row.configuration}
                  </td>
                  <td className="px-5 py-5 text-muted-foreground tabular-nums">
                    {row.carpetAreaSqft.toLocaleString('en-IN')} sq.ft
                  </td>
                  <td className="px-5 py-5 text-muted-foreground tabular-nums">
                    {row.builtUpAreaSqft.toLocaleString('en-IN')} sq.ft
                  </td>
                  <td className="px-5 py-5 text-muted-foreground tabular-nums">
                    {row.pricePerSqft ? `₹ ${row.pricePerSqft.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-5 py-5 font-heading font-semibold">
                    <span className="highlight-yellow text-primary">
                      {row.totalPriceTo
                        ? `${row.totalPriceFrom} – ${row.totalPriceTo}`
                        : row.totalPriceFrom}
                    </span>
                  </td>
                  <td className={`px-5 py-5 font-medium text-xs tracking-widest uppercase ${statusColor(row.inventoryStatus)}`}>
                    {row.inventoryStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          All prices inclusive of EDC / IDC unless otherwise stated. GST, stamp duty & registration
          applicable as per prevailing rates.
        </p>
      </div>
    </section>
  );
}
