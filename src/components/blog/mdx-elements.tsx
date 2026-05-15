import type { ReactNode } from 'react';

// Named function components shared between BlogPost (registers them via MDXProvider) and
// FAQAccordion (uses MdxH3 to detect question boundaries inside MDX children). Defined here so
// the two modules compare against the same component reference instead of the string 'h3'.

export function MdxH1(props: { children?: ReactNode; id?: string }) {
  return (
    <h1
      {...props}
      className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-[1.1] tracking-tight mt-4 mb-10 text-foreground"
    />
  );
}

export function MdxH2(props: { children?: ReactNode; id?: string }) {
  return (
    <h2
      {...props}
      className="text-3xl md:text-4xl font-heading font-medium leading-tight mt-16 mb-6 text-foreground scroll-mt-32"
    />
  );
}

export function MdxH3(props: { children?: ReactNode; id?: string }) {
  return (
    <h3
      {...props}
      className="text-xl md:text-2xl font-heading font-medium leading-snug mt-10 mb-4 text-foreground"
    />
  );
}

export function MdxP(props: { children?: ReactNode }) {
  return (
    <p
      {...props}
      className="text-base md:text-lg font-light leading-[1.85] text-muted-foreground my-5"
    />
  );
}
