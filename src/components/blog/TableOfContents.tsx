import { useEffect, useState } from 'react';
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

// Scans the rendered article for h2 headings (the strategy doc spec — section 5 — has 4 to 8 H2
// sections per post). Runs after mount so it sees the MDX-rendered DOM. Sticky on desktop.
export default function TableOfContents() {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');

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

    const observer = new IntersectionObserver(
      (entriesObserved) => {
        const visible = entriesObserved.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-12 lg:my-0 lg:sticky lg:top-32 border-l-2 border-border pl-6"
    >
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-5">
        On This Page
      </span>
      <ol className="space-y-3 text-sm">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={cn(
                'block leading-snug font-light transition-colors',
                activeId === e.id ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
