interface VerdictBadgeProps {
  score: string;
  outOf?: string;
  label?: string;
  subtitle?: string;
}

// Big circular rating disc that headlines the Verdict section. Navy disc, gold score, navy
// "/10" suffix, gold caption, single-line subtitle. Used inline in MDX above the scorecard.
export default function VerdictBadge({
  score,
  outOf = '/10',
  label = 'Corner House Rating',
  subtitle,
}: VerdictBadgeProps) {
  return (
    <div className="not-prose my-10 flex flex-col items-center text-center">
      <div className="flex items-baseline gap-2">
        <div
          className="h-[100px] w-[100px] rounded-full flex items-center justify-center font-heading font-medium"
          style={{ backgroundColor: '#0D1F3C' }}
        >
          <span style={{ color: '#C9933A', fontSize: '2.5rem', lineHeight: 1 }}>{score}</span>
        </div>
        <span className="font-heading text-xl md:text-2xl" style={{ color: '#0D1F3C' }}>
          {outOf}
        </span>
      </div>
      <span
        className="mt-5 text-[10px] font-sans font-semibold tracking-[0.4em] uppercase"
        style={{ color: '#C9933A' }}
      >
        {label}
      </span>
      {subtitle && (
        <p className="mt-3 max-w-md text-sm font-light text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
