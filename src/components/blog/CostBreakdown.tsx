interface CostRow {
  item: string;
  amount: string;
  notes?: string;
  total?: boolean;
}

interface CostBreakdownProps {
  rows: CostRow[];
  title?: string;
}

// Renders the all-in cost breakdown for a project. The total row gets a heavier visual
// treatment so the headline number ("18-22% above base") is unmissable on scan.
export default function CostBreakdown({ rows, title = 'All-In Cost Breakdown' }: CostBreakdownProps) {
  return (
    <section className="my-12 border border-border bg-card">
      <header className="px-6 py-5 border-b border-border bg-secondary/40">
        <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary">
          {title}
        </span>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <th className="text-left font-sans font-semibold px-6 py-4">Cost Item</th>
              <th className="text-left font-sans font-semibold px-6 py-4">Amount</th>
              <th className="text-left font-sans font-semibold px-6 py-4 hidden md:table-cell">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={`${r.item}-${i}`}
                className={
                  r.total
                    ? 'border-t-2 border-primary bg-primary/5 font-medium text-foreground'
                    : 'border-t border-border/60 text-foreground/85'
                }
              >
                <td className="px-6 py-4 font-light">
                  {r.total ? (
                    <span className="font-heading text-base md:text-lg">{r.item}</span>
                  ) : (
                    r.item
                  )}
                </td>
                <td
                  className={`px-6 py-4 font-light ${r.total ? 'font-heading text-lg md:text-xl text-primary' : ''}`}
                >
                  {r.amount}
                </td>
                <td className="px-6 py-4 font-light text-muted-foreground hidden md:table-cell">
                  {r.notes ?? ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
