import type { ReactNode } from 'react';

// MdxH3 is registered in BlogPost's MDX_COMPONENTS so that FAQAccordion can detect question
// boundaries via `node.type === MdxH3` (reference equality). The component itself renders a
// bare <h3> — Tailwind Typography (prose-h3:* modifiers on the article wrapper) handles the
// visual styling. MdxH1 / MdxH2 / MdxP are exported for backwards compatibility but are no
// longer registered with MDXProvider (prose handles those elements).

export function MdxH3(props: { children?: ReactNode; id?: string }) {
  return <h3 {...props} />;
}

export function MdxH1(props: { children?: ReactNode; id?: string }) {
  return <h1 {...props} />;
}

export function MdxH2(props: { children?: ReactNode; id?: string }) {
  return <h2 {...props} />;
}

export function MdxP(props: { children?: ReactNode }) {
  return <p {...props} />;
}
