interface Stat {
  label: string;
  value: string;
}

interface StatsBarProps {
  stats: Stat[];
}

// Full-width dark band shown directly under the hero. Navy (#0D1F3C) + gold (#C9933A) per
// the redesign brief. Stats are factual at-a-glance fields the buyer wants without scrolling.
export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section
      className="w-full py-8 md:py-10"
      style={{ backgroundColor: '#0D1F3C' }}
      aria-label="Project at a glance"
    >
      <div className="container mx-auto px-6">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-12">
          {stats.map((s) => (
            <li
              key={s.label}
              className="flex flex-col items-start md:items-center text-left md:text-center md:not-last:border-r md:not-last:border-white/10 md:pr-6"
            >
              <span className="text-[10px] md:text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-white/55 mb-3">
                {s.label}
              </span>
              <span
                className="text-xl md:text-2xl font-heading font-medium leading-tight"
                style={{ color: '#C9933A' }}
              >
                {s.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
