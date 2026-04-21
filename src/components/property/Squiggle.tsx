import { cn } from '@/lib/utils';

interface SvgProps {
  className?: string;
}

export function SquiggleUnderline({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className={cn('text-primary/50', className)}
      aria-hidden="true"
    >
      <path
        d="M2,6 Q20,1 40,6 T80,6 T120,6 T160,6 T198,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SquiggleDivider({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-5 w-full max-w-[180px] text-primary/30', className)}
      aria-hidden="true"
    >
      <path
        d="M10,10 Q40,2 70,10 T130,10 T190,10 T250,10 T290,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleCorner({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('text-primary/25', className)}
      aria-hidden="true"
    >
      <path
        d="M2,20 Q2,2 20,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="30" cy="30" r="1.5" fill="currentColor" />
      <path d="M24,36 L36,24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleStar({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn('text-primary/60', className)} aria-hidden="true">
      <path
        d="M12 3 L13 10 L20 11 L13 12 L12 19 L11 12 L4 11 L11 10 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DoodleArrow({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 60 30" className={cn('text-primary/40', className)} aria-hidden="true">
      <path
        d="M4,18 Q20,4 45,16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M38,8 L48,16 L38,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
