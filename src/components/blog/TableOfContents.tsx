import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocEntry {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Mobile-only "Jump to section" collapsible. The desktop sidebar carries CTAs instead, so we
// hide this on lg+ to avoid a redundant TOC competing with the sidebar.
export default function TableOfContents() {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('article[data-blog-body]');
    if (!article) return;
    const headings = Array.from(article.querySelectorAll('h2'));
    const collected: TocEntry[] = headings.map((h) => {
      const text = h.textContent?.trim() ?? '';
      const id = h.id || slugify(text);
      if (!h.id) h.id = id;
      return { id, text };
    });
    setEntries(collected);
  }, []);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="lg:hidden my-8 border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary">
          Jump to Section
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180 text-primary')}
          aria-hidden
        />
      </button>
      {open && (
        <ol className="px-5 pb-5 pt-1 space-y-2 border-t border-border/60">
          {entries.map((e, i) => (
            <li key={e.id} className="text-sm font-light text-muted-foreground">
              <a
                href={`#${e.id}`}
                className="block hover:text-primary py-1.5"
                onClick={() => setOpen(false)}
              >
                <span className="text-primary font-medium mr-2">{String(i + 1).padStart(2, '0')}</span>
                {e.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
