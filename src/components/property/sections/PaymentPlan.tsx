import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleCalendar } from '../Doodles';

interface PaymentPlanProps {
  paymentPlan: PropertyListing['paymentPlan'];
}

export default function PaymentPlan({ paymentPlan }: PaymentPlanProps) {
  if (!paymentPlan) return null;

  const totalPct = paymentPlan.milestones.reduce((s, m) => s + m.percentage, 0);

  return (
    <section id="payment-plan" className="py-10 md:py-12 bg-[#EEF3EC]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="how it's paid"
          title={paymentPlan.planName}
          doodle={<DoodleCalendar />}
        />

        <div className="bg-white border border-border/40">
          <ul className="divide-y divide-dashed divide-border/50">
            {paymentPlan.milestones.map((m, i) => (
              <li
                key={`${i}-${m.milestone}`}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4"
              >
                <div className="shrink-0 text-[10px] tracking-[0.2em] uppercase text-muted-foreground tabular-nums w-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-medium text-sm sm:text-base leading-tight">
                    {m.milestone}
                  </div>
                  {m.description && (
                    <div className="text-xs text-muted-foreground mt-0.5">{m.description}</div>
                  )}
                </div>
                <div className="shrink-0 text-right font-heading font-semibold text-primary text-base sm:text-lg tabular-nums">
                  <span className={m.percentage > 0 ? 'highlight-yellow' : ''}>
                    {m.percentage}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border bg-secondary/30">
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Total</div>
            <div className="text-right font-heading font-semibold tabular-nums">{totalPct}%</div>
          </div>
        </div>

        {paymentPlan.notes.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
            {paymentPlan.notes.map((n, i) => (
              <li key={i}>· {n}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
