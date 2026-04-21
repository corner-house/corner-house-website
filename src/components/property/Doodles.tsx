import { cn } from '@/lib/utils';

export {
  SquiggleUnderline,
  SquiggleDivider,
  DoodleCorner,
  DoodleStar,
  DoodleArrow,
} from './Squiggle';

interface SvgProps {
  className?: string;
}

const common = 'text-primary/70';
const base = (c?: string) => cn('w-10 h-10 shrink-0', common, c);

export function DoodleStarBurst({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M20 4 L22 16 L32 14 L24 21 L30 31 L20 25 L10 31 L16 21 L8 14 L18 16 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

export function DoodleCurrency({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M11 9 L29 9 M11 15 L29 15 M11 9 Q12 21 20 22 Q24 22 28 20 L14 36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleFloorPlan({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <rect x="5" y="9" width="30" height="22" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1.3" />
      <line x1="24" y1="9" x2="24" y2="31" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="26" x2="10" y2="26" stroke="currentColor" strokeWidth="1.1" />
      <line x1="15" y1="20" x2="15" y2="24" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="29" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

export function DoodleBuilding({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <rect x="10" y="8" width="20" height="28" stroke="currentColor" strokeWidth="1.3" />
      <rect x="14" y="13" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
      <rect x="22.5" y="13" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
      <rect x="14" y="20" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
      <rect x="22.5" y="20" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
      <path d="M17 36 L17 28 L23 28 L23 36" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function DoodlePin({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M20 5 Q10 5 10 17 Q10 25 20 35 Q30 25 30 17 Q30 5 20 5 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function DoodleArrows({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 13 Q18 7 34 13"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M29 9 L34 13 L29 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M36 28 Q22 34 6 28"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M11 24 L6 28 L11 32" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleHouses({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 26 L12 17 L20 26 L20 34 L4 34 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M20 26 L28 19 L36 26 L36 34 L20 34 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <rect x="9" y="28" width="4" height="6" stroke="currentColor" strokeWidth="1" />
      <rect x="26" y="28" width="4" height="6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleHandshake({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 22 Q8 16 12 18 L16 20 Q18 21 20 20 L24 18 Q28 16 32 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 18 L8 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M28 18 L32 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

export function DoodleCalendar({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <rect x="6" y="10" width="28" height="24" stroke="currentColor" strokeWidth="1.3" />
      <line x1="6" y1="17" x2="34" y2="17" stroke="currentColor" strokeWidth="1.3" />
      <line x1="12" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="28" y1="6" x2="28" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="14" cy="23" r="1.2" fill="currentColor" />
      <circle cx="20" cy="23" r="1.2" fill="currentColor" />
      <circle cx="26" cy="23" r="1.2" fill="currentColor" />
      <circle cx="14" cy="29" r="1.2" fill="currentColor" />
      <circle cx="20" cy="29" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function DoodleCalculator({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <rect x="8" y="5" width="24" height="30" stroke="currentColor" strokeWidth="1.3" rx="2" />
      <rect x="12" y="9" width="16" height="6" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="21" r="1.2" fill="currentColor" />
      <circle cx="20" cy="21" r="1.2" fill="currentColor" />
      <circle cx="26" cy="21" r="1.2" fill="currentColor" />
      <circle cx="14" cy="27" r="1.2" fill="currentColor" />
      <circle cx="20" cy="27" r="1.2" fill="currentColor" />
      <circle cx="26" cy="27" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function DoodleTrendingUp({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M4 30 L14 20 L20 25 L34 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 10 L34 10 L34 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleQuestion({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M15 15 Q15 10 20 10 Q25 10 25 15 Q25 19 20 20 L20 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="29" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function DoodleChat({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path
        d="M6 10 Q6 6 10 6 L30 6 Q34 6 34 10 L34 22 Q34 26 30 26 L18 26 L10 32 L12 26 Q6 26 6 22 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="16" r="1.3" fill="currentColor" />
      <circle cx="20" cy="16" r="1.3" fill="currentColor" />
      <circle cx="26" cy="16" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function DoodlePlay({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <rect x="4" y="10" width="32" height="20" stroke="currentColor" strokeWidth="1.3" rx="2" />
      <path d="M16 16 L25 20 L16 24 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor" />
    </svg>
  );
}

export function DoodleSparkles({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={base(className)} aria-hidden="true">
      <path d="M14 6 L15 12 L21 13 L15 14 L14 20 L13 14 L7 13 L13 12 Z" fill="currentColor" />
      <path d="M28 18 L29 23 L34 24 L29 25 L28 30 L27 25 L22 24 L27 23 Z" fill="currentColor" />
    </svg>
  );
}

/* ─── Sustainability illustrations (larger canvas, 80×80 viewBox) ─── */

const sustainBase = (c?: string) =>
  cn('w-16 h-16 md:w-20 md:h-20 text-[#4a5d4e]', c);

export function IconIGBC({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <circle cx="40" cy="34" r="18" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M40 21 L44 32 L56 32 L46 39 L50 51 L40 44 L30 51 L34 39 L24 32 L36 32 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 52 L20 72 L32 66 L40 72 L48 66 L60 72 L54 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconRainwater({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <path
        d="M24 10 Q18 22 24 28 Q30 22 24 10 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M44 6 Q38 18 44 24 Q50 18 44 6 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M60 14 Q54 26 60 32 Q66 26 60 14 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 40 L70 40 L66 68 Q65 72 61 72 L19 72 Q15 72 14 68 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M22 48 Q26 52 30 48 Q34 52 38 48 Q42 52 46 48 Q50 52 54 48 Q58 52 62 48"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconWaterCycle({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M40 20 L40 32 M30 28 L40 38 L50 28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 46 Q28 56 34 52 Q40 48 46 56 Q52 60 58 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 16 L66 12 L64 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 58 L14 62 L20 64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSolar({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <circle cx="56" cy="20" r="9" stroke="currentColor" strokeWidth="1.8" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <line x1="56" y1="4" x2="56" y2="8" />
        <line x1="56" y1="32" x2="56" y2="36" />
        <line x1="40" y1="20" x2="44" y2="20" />
        <line x1="68" y1="20" x2="72" y2="20" />
        <line x1="46" y1="10" x2="48" y2="12" />
        <line x1="64" y1="28" x2="66" y2="30" />
        <line x1="46" y1="30" x2="48" y2="28" />
        <line x1="64" y1="12" x2="66" y2="10" />
      </g>
      <rect x="8" y="42" width="36" height="28" stroke="currentColor" strokeWidth="1.8" rx="2" />
      <circle cx="26" cy="56" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M44 48 L56 36 L56 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconEVCharge({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <path
        d="M10 58 L10 46 L16 36 L48 36 L54 46 L54 58 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="58" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="42" cy="58" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M54 48 L62 48 L62 58 L66 58 L62 70"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 42 L24 50 L32 50 L28 58"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCactus({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={sustainBase(className)} aria-hidden="true">
      <path
        d="M36 68 L44 68 L44 40 Q44 30 52 30 Q60 30 60 40 L60 46 Q60 50 56 50 L44 50"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 40 Q44 22 28 22 Q20 22 20 32 L20 38 Q20 42 24 42 L36 42"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M36 50 L44 50 L44 68 L36 68 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M30 68 L50 68 L50 72 L30 72 Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M40 34 L40 30 M40 26 L40 24 M52 34 L52 32"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
