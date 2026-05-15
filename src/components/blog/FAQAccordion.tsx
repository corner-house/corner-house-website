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

function FAQItem({ question, answerNodes, defaultOpen }: { question: string; answerNodes: ReactNode[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState<boolean>(!!defaultOpen);
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <h3 className="text-lg md:text-xl font-heading font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            'h-5 w-5 mt-1 shrink-0 text-muted-foreground transition-transform duration-300',
            open && 'rotate-180 text-primary',
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div className="pb-8 pr-10 text-base md:text-lg font-light leading-[1.85] text-muted-foreground space-y-4 [&_p]:m-0">
          {answerNodes}
        </div>
      )}
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
    <section className="my-12">
      {entries.length > 0 && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Head>
      )}
      <div className="border-t border-border/60">
        {entries.map((entry, i) => (
          <FAQItem
            key={`${entry.question}-${i}`}
            question={entry.question}
            answerNodes={entry.answerNodes}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
