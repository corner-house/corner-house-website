import { useState, type ReactNode, type ReactElement } from 'react';
import { Children, isValidElement } from 'react';
import { Head } from 'vite-react-ssg';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MdxH3 } from './mdx-elements';

interface FAQAccordionProps {
  children: ReactNode;
}

interface FAQEntry {
  question: string;
  answerNodes: ReactNode[];
  answerText: string;
}

// Recursively flatten a React node to plain text. Used for both the H3 question text and the
// answer text that goes into FAQPage JSON-LD (Google requires plain strings, no HTML).
function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return nodeToText(props.children);
  }
  return '';
}

// Inside MDXProvider the `### Q` markdown is rendered through MdxH3 (a function component),
// not as a literal 'h3' string element. Accept both so FAQAccordion works whether the author
// uses the wrapped form (default) or raw <h3> tags.
function isH3(node: ReactNode): node is ReactElement {
  if (!isValidElement(node)) return false;
  return node.type === 'h3' || node.type === MdxH3;
}

// Group MDX children by H3: each H3 begins a new entry; everything until the next H3 is its answer.
// MDX preserves whitespace strings between elements — we filter those out before grouping.
function extractFAQs(children: ReactNode): FAQEntry[] {
  const flat = Children.toArray(children).filter((c) => {
    if (typeof c === 'string') return c.trim().length > 0;
    return true;
  });

  const entries: FAQEntry[] = [];
  let current: FAQEntry | null = null;

  for (const child of flat) {
    if (isH3(child)) {
      if (current) entries.push(current);
      current = {
        question: nodeToText((child.props as { children?: ReactNode }).children).trim(),
        answerNodes: [],
        answerText: '',
      };
    } else if (current) {
      current.answerNodes.push(child);
    }
  }
  if (current) entries.push(current);

  // Compute combined plain-text answer for schema. Schema rules forbid em-dashes — the author is
  // responsible for that in the MDX; we don't paraphrase here.
  for (const entry of entries) {
    entry.answerText = entry.answerNodes
      .map(nodeToText)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return entries;
}

function FAQItem({
  question,
  answerNodes,
  defaultOpen,
  index,
}: {
  question: string;
  answerNodes: ReactNode[];
  defaultOpen?: boolean;
  index: number;
}) {
  const [open, setOpen] = useState<boolean>(!!defaultOpen);
  const panelId = `faq-panel-${index}`;
  const number = String(index + 1).padStart(2, '0');
  // Always render the answer body and toggle visibility via CSS rather than {open && (...)}.
  // The lazy-mount pattern produced broken SSG → hydration behaviour in production: items 2-10
  // body content was excluded from the server HTML and never mounted on the client when
  // toggled. Always-rendered bodies make the SSR/CSR DOM identical and put all 10 answers in
  // static HTML (crawlers + AI citation).
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-start justify-between gap-5 py-6 text-left group"
      >
        <div className="flex items-start gap-5 flex-1">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-[11px] font-medium mt-0.5"
            style={{ backgroundColor: '#C9933A', color: '#0D1F3C' }}
          >
            {number}
          </span>
          <h3
            className="text-lg md:text-xl font-heading font-semibold leading-snug group-hover:text-primary transition-colors"
            style={{ color: '#0D1F3C' }}
          >
            {question}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 mt-1 shrink-0 transition-transform duration-300 ease-out',
            open && 'rotate-180',
          )}
          style={{ color: open ? '#C9933A' : undefined }}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={cn(
          'pl-13 md:pl-[3.25rem] pr-10 text-base md:text-lg font-light leading-[1.85] text-gray-700 space-y-4 [&_p]:m-0 transition-all duration-300 ease-out overflow-hidden',
          open ? 'opacity-100 pb-8 max-h-[2000px]' : 'opacity-0 pb-0 max-h-0',
        )}
      >
        {answerNodes}
      </div>
    </div>
  );
}

export default function FAQAccordion({ children }: FAQAccordionProps) {
  const entries = extractFAQs(children);

  // FAQPage JSON-LD. Per Section 8.5: name must match H3 exactly, text must match answer exactly.
  // We hoist via vite-react-ssg's <Head> so the script lands in document <head>.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answerText },
    })),
  };

  return (
    <section className="not-prose my-12">
      {entries.length > 0 && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Head>
      )}
      <div className="border-t border-border/60">
        {entries.map((entry, i) => (
          <FAQItem
            key={`${entry.question}-${i}`}
            index={i}
            question={entry.question}
            answerNodes={entry.answerNodes}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
