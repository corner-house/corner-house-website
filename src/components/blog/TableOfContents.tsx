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

// "In this article" TOC. Desktop: bordered card with numbered list, active section highlighted
// in gold via IntersectionObserver. Mobile: collapsed "Jump to Section" accordion. The TOC is
// rendered inline at the top of the article body (not in the sidebar), so it never competes
// with the sticky CTA rail.
export default function TableOfContents() {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('article[data-blog-body]');
    if (!article) return;
    const headings = Array.from(article.querySelectorAll('h2'));
    const collected: TocEntry[] = headings.map((h) => {
      const text = h.textContent?.trim() ?? '';
      const id = h.id || slugify(text);
      if (!h.id) h.id = id;
      // Compensate for the fixed navbar when smooth-scrolling to a heading.
      (h as HTMLElement).style.scrollMarginTop = '6rem';
      return { id, text };
    });
    setEntries(collected);

    const observer = new IntersectionObserver(
      (entriesObserved) => {
        const visible = entriesObserved
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="my-8">
      {/* Mobile: collapsible */}
      <div className="lg:hidden border border-border bg-card">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary">
            Jump to Section
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              mobileOpen && 'rotate-180 text-primary',
            )}
            aria-hidden
          />
        </button>
        {mobileOpen && (
          <ol className="px-5 pb-5 pt-1 space-y-2 border-t border-border/60">
            {entries.map((e, i) => (
              <li key={e.id} className="text-sm font-light">
                <a
                  href={`#${e.id}`}
                  className={cn(
                    'block py-1.5 transition-colors',
                    activeId === e.id ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className="font-heading font-medium mr-3"
                    style={{ color: activeId === e.id ? '#C9933A' : undefined }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {e.text}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop: numbered card */}
      <div className="hidden lg:block border border-border bg-card p-7">
        <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-5">
          In this article
        </span>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {entries.map((e, i) => {
            const isActive = activeId === e.id;
            const number = String(i + 1).padStart(2, '0');
            return (
              <li key={e.id} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-heading font-medium transition-colors',
                    isActive ? 'text-white' : 'text-foreground/70 border border-border',
                  )}
                  style={isActive ? { backgroundColor: '#C9933A' } : undefined}
                >
                  {number}
                </span>
                <a
                  href={`#${e.id}`}
                  className={cn(
                    'text-sm leading-snug pt-1 transition-colors',
                    isActive ? 'font-medium' : 'text-muted-foreground hover:text-foreground',
                  )}
                  style={isActive ? { color: '#C9933A' } : undefined}
                >
                  {e.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
