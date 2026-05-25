import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogPostSummary, type BlogPostSummary } from '@/data/blogPosts';
import { HOMEPAGE_INSIGHTS } from '@/data/homepageInsights';

interface InsightsProps {
  // Kept for API compatibility with Home.tsx call site even though section no longer needs it.
  onNavigate?: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function excerpt(description: string, max = 160): string {
  if (description.length <= max) return description;
  const cut = description.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trim()}…`;
}

interface FeaturedCardProps {
  post: BlogPostSummary;
}

function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-7 relative aspect-[16/10] overflow-hidden shadow-2xl bg-muted">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 text-[0px] text-transparent"
              loading="lazy"
              decoding="async"
              width={1200}
              height={750}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-white bg-primary/90 px-4 py-2">
                Featured
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-white bg-black/40 backdrop-blur-sm px-4 py-2">
                {post.category}
              </span>
            </div>
            <div className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-white/90 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-4 text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
              <span>{formatDate(post.publishDate)}</span>
              <span className="h-[1px] w-6 bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-heading font-medium leading-[1.1] group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg">
              {excerpt(post.description, 240)}
            </p>
            <div className="pt-2">
              <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-primary inline-flex items-center">
                Read Article
                <span className="ml-3 h-[1px] w-8 bg-primary group-hover:w-16 transition-all duration-500" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface RowCardProps {
  post: BlogPostSummary;
  index: number;
}

function RowCard({ post, index }: RowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-xl bg-muted">
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 text-[0px] text-transparent"
            loading="lazy"
            decoding="async"
            width={600}
            height={750}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-white bg-primary/90 px-4 py-2">
              {post.category}
            </span>
          </div>
          <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-white/90 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
            <span>{formatDate(post.publishDate)}</span>
            <span className="h-[1px] w-6 bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-medium leading-tight group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-muted-foreground font-light leading-relaxed text-base">
            {excerpt(post.description)}
          </p>
          <div className="pt-2">
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-primary inline-flex items-center">
              Read Article
              <span className="ml-3 h-[1px] w-8 bg-primary group-hover:w-16 transition-all duration-500" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Insights(_props: InsightsProps) {
  const featured = getBlogPostSummary(HOMEPAGE_INSIGHTS.featuredSlug);
  const rowPosts = HOMEPAGE_INSIGHTS.rowSlugs
    .map((slug) => getBlogPostSummary(slug))
    .filter((s): s is BlogPostSummary => s != null);

  return (
    <section id="insights" className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-sans font-semibold tracking-[0.4em] uppercase text-primary mb-6 block">
                The Journal
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-medium leading-[1.1]">
                Insights from the <br className="hidden md:block" />
                <span className="italic text-primary/80">Luxury Market.</span>
              </h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground font-light max-w-sm mt-8 md:mt-0 text-base md:text-lg leading-relaxed"
          >
            Considered perspectives on Delhi NCR&apos;s most coveted addresses, market movements,
            and the art of acquiring them.
          </motion.p>
        </div>

        {featured && <FeaturedCard post={featured} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rowPosts.map((post, i) => (
            <RowCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold group"
          >
            View all posts in the Journal
            <ArrowUpRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
