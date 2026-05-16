import { CircleCheck, XCircle, ThumbsUp, AlertTriangle } from 'lucide-react';

interface ProsConsTableProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export default function ProsConsTable({
  pros,
  cons,
  prosTitle = 'What Buyers Love',
  consTitle = 'Watch Out For',
}: ProsConsTableProps) {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Pros */}
      <div className="border border-emerald-200 bg-emerald-50/60 p-7">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200">
          <ThumbsUp className="h-5 w-5" style={{ color: '#C9933A' }} aria-hidden />
          <span
            className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase"
            style={{ color: '#C9933A' }}
          >
            {prosTitle}
          </span>
        </div>
        <ul className="space-y-4">
          {pros.map((p, i) => (
            <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
              <CircleCheck className="h-5 w-5 mt-0.5 shrink-0 text-emerald-700" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Cons */}
      <div className="border border-amber-200 bg-amber-50/60 p-7">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden />
          <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-amber-800">
            {consTitle}
          </span>
        </div>
        <ul className="space-y-4">
          {cons.map((c, i) => (
            <li key={i} className="flex gap-3 text-base font-light leading-relaxed text-foreground/85">
              <XCircle className="h-5 w-5 mt-0.5 shrink-0 text-rose-700" aria-hidden />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
