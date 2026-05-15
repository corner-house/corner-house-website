import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPostSummary, type BlogPostSummary } from '@/data/blogPosts';

// Accepts EITHER a list of slugs (looked up from the manifest) OR a list of inline post
// summaries authored directly in MDX. Inline form is convenient when the related post hasn't
// been published yet (the lookup would return undefined and the card would silently disappear).
interface InlineRelatedPost {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  category?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

interface RelatedPostsProps {
  slugs?: string[];
  posts?: InlineRelatedPost[];
}

const PLACEHOLDER_IMG =
  'https://pub-f00f91c779cf4225a9881062b14b46d3.r2.dev/author/saurabh.webp';

interface ResolvedPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  heroImage: string;
  heroImageAlt: string;
}

function resolveFromSlug(slug: string): ResolvedPost | null {
  const summary = getBlogPostSummary(slug);
  if (!summary) return null;
  return {
    slug: summary.slug,
    title: summary.title,
    description: summary.description,
    category: summary.category,
    heroImage: summary.heroImage,
    heroImageAlt: summary.heroImageAlt,
  };
}

function resolveFromInline(p: InlineRelatedPost): ResolvedPost {
  // Try to enrich from manifest if the post happens to exist.
  const summary = getBlogPostSummary(p.slug);
  return {
    slug: p.slug,
    title: p.title,
    description: p.description ?? p.excerpt ?? summary?.description ?? '',
    category: p.category ?? summary?.category ?? 'Coming Soon',
    heroImage: p.heroImage ?? summary?.heroImage ?? PLACEHOLDER_IMG,
    heroImageAlt: p.heroImageAlt ?? summary?.heroImageAlt ?? p.title,
  };
}

export default function RelatedPosts({ slugs, posts }: RelatedPostsProps) {
  const resolved: ResolvedPost[] = posts
    ? posts.map(resolveFromInline)
    : (slugs ?? [])
        .map(resolveFromSlug)
        .filter((p): p is ResolvedPost => p != null);

  if (resolved.length === 0) return null;

  return (
    <section className="my-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary mb-3 block">
            Continue Reading
          </span>
          <h3 className="text-3xl md:text-4xl font-heading font-medium leading-tight">Related Posts</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resolved.map((p) => {
          const isPublished = !!getBlogPostSummary(p.slug);
          const inner = (
            <div className="group block bg-card border border-border/60 hover:border-primary/40 transition-colors h-full">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.heroImage}
                  alt={p.heroImageAlt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-sans font-semibold tracking-[0.35em] uppercase text-primary block mb-3">
                  {p.category}
                </span>
                <h4 className="text-xl font-heading font-medium leading-tight mb-3 group-hover:text-primary transition-colors">
                  {p.title}
                </h4>
                <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-5 flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold">
                  {isPublished ? 'Read' : 'Coming Soon'}
                  {isPublished && <ArrowUpRight className="ml-2 h-3 w-3" />}
                </div>
              </div>
            </div>
          );
          return isPublished ? (
            <Link key={p.slug} to={`/blog/${p.slug}`}>{inner}</Link>
          ) : (
            <div key={p.slug} aria-disabled className="cursor-not-allowed opacity-70">{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

// Re-export the published-summary type so other modules don't have to round-trip through data/.
export type { BlogPostSummary };
