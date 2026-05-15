interface ScoreRow {
  label: string;
  score: string;
  overall?: boolean;
}

interface ProjectScorecardProps {
  rows: ScoreRow[];
  title?: string;
}

// Visual summary of the verdict — five rows by default, last row marked overall.
export default function ProjectScorecard({ rows, title = 'Corner House Scorecard' }: ProjectScorecardProps) {
  return (
    <section className="my-10 border border-border bg-card">
      <header className="px-6 py-5 border-b border-border bg-secondary/40">
        <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary">
          {title}
        </span>
      </header>
      <ul>
        {rows.map((r, i) => (
          <li
            key={`${r.label}-${i}`}
            className={
              r.overall
                ? 'flex items-center justify-between px-6 py-5 border-t-2 border-primary bg-primary/5'
                : 'flex items-center justify-between px-6 py-4 border-t border-border/60'
            }
          >
            <span
              className={
                r.overall
                  ? 'font-heading text-base md:text-lg text-foreground'
                  : 'text-base font-light text-foreground/85'
              }
            >
              {r.label}
            </span>
            <span
              className={
                r.overall
                  ? 'font-heading text-2xl md:text-3xl text-primary'
                  : 'font-heading text-xl text-foreground'
              }
            >
              {r.score}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
