import { Check, X } from 'lucide-react';

interface ProsConsTableProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export default function ProsConsTable({
  pros,
  cons,
  prosTitle = 'Pros',
  consTitle = 'Cons',
}: ProsConsTableProps) {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      <div className="border border-emerald-200 bg-emerald-50/40 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Check className="h-5 w-5 text-emerald-700" aria-hidden />
          <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-emerald-800">
            {prosTitle}
          </span>
        </div>
        <ul className="space-y-4">
          {pros.map((p, i) => (
            <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
              <Check className="h-4 w-4 mt-1.5 shrink-0 text-emerald-700" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-rose-200 bg-rose-50/40 p-8">
        <div className="flex items-center gap-3 mb-6">
          <X className="h-5 w-5 text-rose-700" aria-hidden />
          <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-rose-800">
            {consTitle}
          </span>
        </div>
        <ul className="space-y-4">
          {cons.map((c, i) => (
            <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
              <X className="h-4 w-4 mt-1.5 shrink-0 text-rose-700" aria-hidden />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
