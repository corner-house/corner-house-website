import type { ReactNode } from 'react';

interface TLDRBoxProps {
  children: ReactNode;
}

export default function TLDRBox({ children }: TLDRBoxProps) {
  return (
    <aside className="not-prose my-12 bg-secondary/40 border-l-4 border-primary p-8 md:p-10">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-5">
        TL;DR
      </span>
      <div className="prose-tldr text-base md:text-lg font-light leading-[1.75] text-foreground/85 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_p]:mb-3">
        {children}
      </div>
    </aside>
  );
}
