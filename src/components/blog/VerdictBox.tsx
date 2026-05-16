import type { ReactNode } from 'react';

interface VerdictBoxProps {
  children: ReactNode;
  label?: string;
}

// Wraps the Our Verdict prose in a styled container. Light navy fill, gold left rail, gold
// micro-label up top. Used in MDX as <VerdictBox>…prose…</VerdictBox>.
export default function VerdictBox({ children, label = 'Corner House Verdict' }: VerdictBoxProps) {
  return (
    <div
      className="my-10 p-8 border-l-4"
      style={{ backgroundColor: '#F0F3F8', borderLeftColor: '#C9933A' }}
    >
      <span
        className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase block mb-5"
        style={{ color: '#C9933A' }}
      >
        {label}
      </span>
      <div className="[&_p]:my-4 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
