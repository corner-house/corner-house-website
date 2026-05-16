import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NextArticleStripProps {
  category: string;
  title: string;
  href: string;
  comingSoon?: boolean;
}

// Full-width "Next Article" footer strip. Replaces the multi-card RelatedPosts grid for the
// canonical "what to read next" pointer at the end of a post.
export default function NextArticleStrip({
  category,
  title,
  href,
  comingSoon = false,
}: NextArticleStripProps) {
  const content = (
    <>
      <div className="flex items-center gap-4 shrink-0">
        <span
          className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase"
          style={{ color: '#C9933A' }}
        >
          Next Article
        </span>
      </div>
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-6 min-w-0">
        <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-primary shrink-0">
          {category}
        </span>
        <h4 className="text-base md:text-lg font-heading font-medium leading-snug text-foreground truncate md:whitespace-normal">
          {title}
        </h4>
        {comingSoon && (
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>
      <ArrowRight
        className={cn(
          'h-5 w-5 shrink-0 transition-transform',
          !comingSoon && 'group-hover:translate-x-1',
        )}
        style={{ color: '#0D1F3C' }}
        aria-hidden
      />
    </>
  );

  const baseClasses =
    'not-prose my-14 border-y border-border py-7 md:py-8 px-6 md:px-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-colors group';
  if (comingSoon) {
    return (
      <div className={cn(baseClasses, 'opacity-70 cursor-not-allowed')} aria-disabled>
        {content}
      </div>
    );
  }

  return (
    <Link to={href} className={cn(baseClasses, 'hover:bg-[#F0F3F8]')}>
      {content}
    </Link>
  );
}
