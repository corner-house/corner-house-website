import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, Quote } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import BlogSchema from './BlogSchema';
import TLDRBox from './TLDRBox';
import CalloutBox from './CalloutBox';
import ProsConsTable from './ProsConsTable';
import FAQAccordion from './FAQAccordion';
import AuthorCard from './AuthorCard';
import CTAStrip from './CTAStrip';
import RelatedPosts from './RelatedPosts';
import TableOfContents from './TableOfContents';
import StatsBar from './StatsBar';
import ImageRow from './ImageRow';
import CostBreakdown from './CostBreakdown';
import ProjectScorecard from './ProjectScorecard';
import BlogSidebar from './BlogSidebar';
import AmenitiesGrid from './AmenitiesGrid';
import TestimonialsGrid from './TestimonialsGrid';
import PriceValueCard from './PriceValueCard';
import VerdictBox from './VerdictBox';
import PullQuote from './PullQuote';
import ProjectOverviewStats from './ProjectOverviewStats';
import LocationAdvantage from './LocationAdvantage';
import DesignImageStrip from './DesignImageStrip';
import VerdictBadge from './VerdictBadge';
import NextArticleStrip from './NextArticleStrip';
import Mark from './Mark';
import { ComparisonTable } from './ComparisonTable';
import { MdxH3 } from './mdx-elements';
import { getAllBlogPostSummaries } from '@/data/blogPosts';
import type { BlogFrontmatter } from './types';

interface BlogPostProps {
  frontmatter: BlogFrontmatter;
  Content: ComponentType<Record<string, unknown>>;
}

const MDX_COMPONENTS = {
  // Tailwind Typography (prose) handles h1/h2/h4/h5/h6/p/ul/ol/li/a/blockquote/img/code/pre
  // visually via prose-* modifiers on the article wrapper below. We only keep:
  //   - h3 → MdxH3 reference equality is how FAQAccordion detects FAQ question boundaries.
  //     MdxH3 itself is now minimal so prose can apply its own h3 styling on top.
  //   - a  → custom anchor that opens external links in a new tab and uses react-router Link
  //     for internal hrefs. Prose handles colour/underline via prose-a:* modifiers; the
  //     internal/external routing decision lives in the component, not in CSS.
  //   - hr → centered gold rule (project-specific visual rhythm).
  h3: MdxH3,
  // h2 with scroll-reveal motion. Renders an actual <h2> so prose's prose-h2:* modifiers
  // still apply for typography. Used for FIX 4e (scroll entrance animation per section).
  h2: ({ children, ...rest }: { children?: ReactNode; id?: string }) => (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-80px' }}
      {...rest}
    >
      {children}
    </motion.h2>
  ),
  a: ({ href, children, ...rest }: { href?: string; children?: ReactNode }) => {
    const isExternal = !!href && /^https?:\/\//i.test(href) && !href.includes('cornerhouse.co.in');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return <Link to={href ?? '#'}>{children}</Link>;
  },
  // Decorative dot divider between sections (FIX 4a). MDX `---` separators were already
  // present between every H2 in the existing posts, so updating the hr override is enough
  // — no auto-injection needed and no MDX edits required across the existing content set.
  hr: () => (
    <div className="not-prose flex items-center gap-4 my-10" aria-hidden>
      <div className="flex-1 h-px bg-gray-200" />
      <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#C9933A' }} />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  ),
  // Pull-quote style for any markdown `>` blockquotes (FIX 4b). Gold rail + Cormorant italic
  // + Quote icon + light gold tint. PullQuote component is preferred for editorial set-pieces;
  // this default makes plain markdown blockquotes visually consistent.
  blockquote: ({ children }: { children?: ReactNode }) => (
    <figure
      className="not-prose my-10 pl-6 pr-5 py-5 border-l-[6px] relative"
      style={{
        borderLeftColor: '#C9933A',
        backgroundColor: 'rgba(201, 147, 58, 0.06)',
      }}
    >
      <Quote
        className="absolute top-4 right-4 h-5 w-5 opacity-60"
        style={{ color: '#C9933A' }}
        aria-hidden
      />
      <blockquote className="font-cormorant italic text-2xl leading-snug text-foreground/85 [&_p]:m-0 [&_p+p]:mt-3">
        {children}
      </blockquote>
    </figure>
  ),
  // Inline-usable components from MDX (authors write <TLDRBox>, <CalloutBox>, etc. directly).
  TLDRBox,
  CalloutBox,
  ProsConsTable,
  FAQAccordion,
  AuthorCard,
  CTAStrip,
  RelatedPosts,
  TableOfContents,
  ImageRow,
  CostBreakdown,
  ProjectScorecard,
  AmenitiesGrid,
  TestimonialsGrid,
  PriceValueCard,
  VerdictBox,
  PullQuote,
  ProjectOverviewStats,
  LocationAdvantage,
  DesignImageStrip,
  VerdictBadge,
  NextArticleStrip,
  Mark,
  ComparisonTable,
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Project name extraction for sidebar headlines — strips the editorial subtitle off the title.
function projectNameFrom(title: string): string {
  return title.split(/[:—–-]/)[0].trim();
}

// Convert /webp/hero/file.webp → /webp/thumb/file.webp when the source follows the R2 size
// convention. Falls back to the original URL otherwise so non-conforming hero URLs still
// render (just at full size). Used by the sidebar Recent Posts thumbnails (FIX 2).
function deriveThumbUrl(heroUrl: string): string {
  if (!heroUrl) return heroUrl;
  if (heroUrl.includes('/webp/hero/')) return heroUrl.replace('/webp/hero/', '/webp/thumb/');
  if (heroUrl.includes('/webp/gallery/')) return heroUrl.replace('/webp/gallery/', '/webp/thumb/');
  return heroUrl;
}

export default function BlogPost({ frontmatter, Content }: BlogPostProps) {
  const projectName = projectNameFrom(frontmatter.title);
  // Recent Posts sidebar (FIX 2): read all published posts from the in-app manifest, exclude
  // the post currently being viewed, take the 2 newest. Replaces the previous hardcoded
  // Coming Soon list. Static at build time so no runtime fetch needed.
  const recentPosts = getAllBlogPostSummaries()
    .filter((p) => p.slug !== frontmatter.slug)
    .slice(0, 2)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      href: `/blog/${p.slug}`,
      thumbUrl: deriveThumbUrl(p.heroImage),
      thumbAlt: p.heroImageAlt,
      publishDate: p.publishDate,
    }));

  return (
    <main className="bg-background pb-24">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        path={`/blog/${frontmatter.slug}`}
        image={frontmatter.ogImage}
        type="article"
        publishedTime={frontmatter.publishDate}
        author={frontmatter.author}
        keywords={[frontmatter.primaryKeyword, ...frontmatter.secondaryKeywords, ...frontmatter.tags]}
      />
      <BlogSchema frontmatter={frontmatter} />

      {/* SECTION 1 — Full-width hero. The <img> is absolutely positioned inside the section so
          it always fills the 70vh box (and so a broken image can never break out of layout to
          leak alt text above the navbar). overflow-hidden on the section is the safety net. */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#1c1c1c]">
        {/* fetchPriority is the React 19 prop spelling; the rendered HTML attribute is the
            lowercase `fetchpriority` per spec, matching the project rule.
            text-[0] + text-transparent hides the alt-text rendering inside the broken-image
            box without removing the alt attribute (screen readers still read it). */}
        <img
          src={frontmatter.heroImage}
          alt={frontmatter.heroImageAlt}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover text-[0px] text-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/85" />
        <div className="absolute inset-0 flex flex-col">
          <div className="container mx-auto px-6 pt-32">
            <Link
              to="/blog"
              className="inline-flex items-center text-white/80 hover:text-white text-[11px] tracking-[0.3em] uppercase font-semibold group"
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>
          <div className="container mx-auto px-6 mt-auto pb-14">
            <div className="max-w-4xl">
              {/* Green pill badge — uses theme primary (sage green) so it stays brand-consistent. */}
              <span className="inline-block bg-primary text-white px-4 py-1.5 mb-6 tracking-[0.3em] uppercase text-[10px] font-semibold">
                {frontmatter.badge ?? 'Buyer Review'}
              </span>
              {/* Hero title is presentational only — the canonical H1 lives in the MDX body. */}
              <div
                role="heading"
                aria-level={2}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-white leading-[1.05] mb-6"
              >
                {frontmatter.title}
              </div>
              <p className="text-lg md:text-xl text-white/75 font-light leading-relaxed max-w-3xl">
                {frontmatter.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-white/70 text-[11px] tracking-[0.25em] uppercase">
                <span>{frontmatter.author}</span>
                <span className="h-4 w-[1px] bg-white/20" />
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  {formatDate(frontmatter.publishDate)}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-2" />
                  {frontmatter.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Stats bar (full-width navy band). Optional, only renders when frontmatter
          provides stats. */}
      {frontmatter.stats && (
        <StatsBar
          stats={[
            { label: 'Configuration', value: frontmatter.stats.configuration },
            { label: 'Starting Price', value: frontmatter.stats.startingPrice },
            { label: 'HARERA Status', value: frontmatter.stats.hareraStatus },
            { label: 'Possession', value: frontmatter.stats.possession },
          ]}
        />
      )}

      {/* SECTION 3 — Two-column body */}
      <section className="container mx-auto px-6 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8">
            {/* Mobile-only TOC accordion. Desktop sidebar replaces it. */}
            <TableOfContents />
            <article
              data-blog-body
              className="prose prose-slate max-w-none
                prose-headings:font-playfair
                prose-h2:text-[#0D1F3C] prose-h2:text-2xl
                prose-h3:text-[#0D1F3C]
                prose-a:text-[#0F6E56] prose-a:no-underline
                hover:prose-a:underline
                prose-blockquote:border-l-[#C9933A]
                prose-blockquote:font-cormorant prose-blockquote:italic
                prose-img:rounded-lg
                prose-table:text-sm
                prose-th:bg-[#0D1F3C] prose-th:text-white prose-th:p-3
                prose-td:p-3"
            >
              <MDXProvider components={MDX_COMPONENTS}>
                <Content />
              </MDXProvider>
            </article>
          </div>
          <div className="lg:col-span-4">
            {/* Sticky sidebar with viewport-bound max-height + internal scroll so the rail
                never overlaps the author card or footer at the bottom of the article. */}
            <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto pr-1">
              <BlogSidebar
                projectName={projectName}
                contactSlug={frontmatter.slug}
                recentPosts={recentPosts}
                brochureUrl={frontmatter.brochureUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
