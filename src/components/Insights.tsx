import { Fragment } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllBlogPostSummaries, type BlogPostSummary } from '@/data/blogPosts';

interface InsightsProps {
  // Kept for API compatibility with Home.tsx call site even though section no longer needs it.
  onNavigate?: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

// Static placeholder slots used to fill the 3-column homepage grid while subsequent blog posts
// are being written. Each entry surfaces a real upcoming post by title so visitors see the
// roadmap rather than dead cards. Order matches the editorial calendar in the strategy doc.
const COMING_SOON: Array<{ title: string; category: string; teaser: string }> = [
  {
    title: 'Krisumi Projects Explained: Waterfall, Waterside, and Forest Reserve',
    category: 'Project Reviews',
    teaser:
      'A full walkthrough of every Krisumi City phase — which are delivered, which are under construction, and what Forest Reserve actually is.',
  },
  {
    title: 'Sector 36A Gurgaon: Investment and Location Guide 2026',
    category: 'Location Guides',
    teaser:
      'Price trends, connectivity, infrastructure, and HARERA-registered projects on Dwarka Expressway.',
  },
];

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

interface RealCardProps {
  post: BlogPostSummary;
  index: number;
}

function RealCard({ post, index }: RealCardProps) {
  // Use heroImage directly so each card shows its own image; the previous /thumb/
  // substitution collapsed posts that shared a filename to the same URL.
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

interface ComingSoonCardProps {
  data: { title: string; category: string; teaser: string };
  index: number;
}

function ComingSoonCard({ data, index }: ComingSoonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      aria-disabled
      className="cursor-not-allowed"
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-xl bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary" />
        <div className="absolute top-6 left-6">
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-foreground/60 bg-white/80 px-4 py-2">
            {data.category}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 bg-white/85 px-5 py-2.5 border border-border">
            Coming Soon
          </span>
        </div>
      </div>
      <div className="space-y-4 opacity-70">
        <div className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
          In Production
        </div>
        <h3 className="text-2xl md:text-3xl font-heading font-medium leading-tight text-foreground/70">
          {data.title}
        </h3>
        <p className="text-muted-foreground font-light leading-relaxed text-base">{data.teaser}</p>
      </div>
    </motion.div>
  );
}

export default function Insights(_props: InsightsProps) {
  // Real posts come from the same MDX source as public/blog-manifest.json — using the in-app
  // data layer keeps SSG happy (no runtime fetch) and stays in sync automatically.
  const posts = getAllBlogPostSummaries().slice(0, 3);
  const remainingSlots = Math.max(0, 3 - posts.length);
  const placeholders = COMING_SOON.slice(0, remainingSlots);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <Fragment key={post.slug}>
              <RealCard post={post} index={i} />
            </Fragment>
          ))}
          {placeholders.map((data, i) => (
            <Fragment key={data.title}>
              <ComingSoonCard data={data} index={posts.length + i} />
            </Fragment>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold group"
          >
            View All Posts
            <ArrowUpRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
