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
  >;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-card border border-border/60 hover:border-primary/40 transition-colors h-full"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {post.featured && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5">
            Featured
          </span>
        )}
        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="p-7 space-y-4">
        <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block">
          {post.category}
        </span>
        <h3 className="text-xl md:text-2xl font-heading font-medium leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center gap-5 text-[10px] tracking-[0.3em] uppercase text-muted-foreground pt-2">
          <span className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishDate)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
