import { useMemo, useState } from 'react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleCalculator } from '../Doodles';

interface EmiCalculatorProps {
  defaults: NonNullable<PropertyListing['emiCalculator']>;
  projectName: string;
}

function formatINR(amount: number): string {
  if (!Number.isFinite(amount)) return '₹ 0';
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(amount));
}

function calculateEmi(principal: number, annualRatePct: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = annualRatePct / 12 / 100;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  const factor = Math.pow(1 + monthlyRate, n);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export default function EmiCalculator({ defaults, projectName }: EmiCalculatorProps) {
  const [priceCr, setPriceCr] = useState<number>(defaults.defaultPrincipalCr);
  const [ratePct, setRatePct] = useState<number>(defaults.defaultInterestRatePct);
  const [tenureYears, setTenureYears] = useState<number>(defaults.defaultTenureYears);
  const [downPct, setDownPct] = useState<number>(defaults.downPaymentPct);

  const { priceRupees, downPaymentRupees, loanAmount, emiMonthly, totalInterest, totalPayable } =
    useMemo(() => {
      const priceRupees = priceCr * 1_00_00_000;
      const downPaymentRupees = priceRupees * (downPct / 100);
      const loanAmount = priceRupees - downPaymentRupees;
      const emiMonthly = calculateEmi(loanAmount, ratePct, tenureYears);
      const totalPayable = emiMonthly * tenureYears * 12;
      const totalInterest = totalPayable - loanAmount;
      return { priceRupees, downPaymentRupees, loanAmount, emiMonthly, totalInterest, totalPayable };
    }, [priceCr, ratePct, tenureYears, downPct]);

  return (
    <section id="emi" className="py-10 md:py-12 bg-[#EEF3EC]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the maths"
          title="EMI calculator"
          description={`Estimate monthly payments for ${projectName}. Indicative only — final rates depend on lender, credit profile, and loan product.`}
          doodle={<DoodleCalculator />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white border border-border/40 p-5 md:p-8">
          <div className="lg:col-span-3 space-y-6">
            <SliderField
              label="Property price"
              value={`₹ ${priceCr.toFixed(2)} Cr`}
              min={0.5}
              max={50}
              step={0.1}
              current={priceCr}
              onChange={setPriceCr}
            />
            <SliderField
              label="Down payment"
              value={`${downPct}% · ₹ ${formatINR(priceRupees * (downPct / 100))}`}
              min={10}
              max={90}
              step={1}
              current={downPct}
              onChange={setDownPct}
            />
            <SliderField
              label="Interest rate"
              value={`${ratePct.toFixed(2)}%`}
              min={6}
              max={14}
              step={0.05}
              current={ratePct}
              onChange={setRatePct}
            />
            <SliderField
              label="Tenure"
              value={`${tenureYears} years`}
              min={5}
              max={30}
              step={1}
              current={tenureYears}
              onChange={setTenureYears}
            />
          </div>

          <div className="lg:col-span-2 bg-luxury-charcoal text-white p-6 bg-[#1c1c1c] space-y-5">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1">
                Monthly EMI
              </div>
              <div className="text-4xl md:text-5xl font-heading font-semibold text-primary">
                ₹ {formatINR(emiMonthly)}
              </div>
            </div>
            <dl className="space-y-2.5 text-sm border-t border-white/10 pt-5">
              <Row label="Loan amount" value={`₹ ${formatINR(loanAmount)}`} />
              <Row label="Down payment" value={`₹ ${formatINR(downPaymentRupees)}`} />
              <Row label="Total interest" value={`₹ ${formatINR(totalInterest)}`} />
              <Row label="Total payable" value={`₹ ${formatINR(totalPayable)}`} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderFieldProps {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}

function SliderField({ label, value, min, max, step, current, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {label}
        </label>
        <span className="font-heading font-medium">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-white/60">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
