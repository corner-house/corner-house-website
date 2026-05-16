import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import type { BlogFrontmatter } from './types';

interface BlogCardProps {
  post: Pick<
    BlogFrontmatter,
    | 'slug'
    | 'title'
    | 'description'
    | 'category'
    | 'heroImage'
    | 'heroImageAlt'
    | 'publishDate'
    | 'readingTime'
    | 'featured'
    | 'author'
  > & { author?: string };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Excerpt = first ~160 chars of description (≈ first 2 lines on most card widths).
function excerpt(description: string, max = 160): string {
  if (description.length <= max) return description;
  const cut = description.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trim()}…`;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Use heroImage directly — no URL substitution. Previously this swapped
  // /webp/hero/ and /webp/gallery/ for /webp/thumb/, which collapsed posts
  // that shared a filename across folders to the same thumb URL.
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-card border border-border/60 hover:border-primary/40 transition-colors h-full"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 text-[0px] text-transparent"
        />
        <span className="absolute top-4 left-4 bg-primary text-white text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5">
          {post.category}
        </span>
        {post.featured && (
          <span className="absolute top-4 right-4 bg-[#1c1c1c] text-white text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5">
            Featured
          </span>
        )}
        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="p-7 space-y-4">
        <h3 className="text-xl md:text-2xl font-heading font-medium leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-sm font-light text-muted-foreground leading-relaxed">
          {excerpt(post.description)}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground pt-1">
          {post.author && <span>{post.author}</span>}
          {post.author && <span className="h-3 w-[1px] bg-border" />}
          <span className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishDate)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <div className="pt-2 flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold group/cta">
          Read More
          <ArrowUpRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
