import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
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
import { MdxH1, MdxH2, MdxH3, MdxP } from './mdx-elements';
import type { BlogFrontmatter } from './types';

interface BlogPostProps {
  frontmatter: BlogFrontmatter;
  Content: ComponentType<Record<string, unknown>>;
}

const MDX_COMPONENTS = {
  // Heading + paragraph overrides live in mdx-elements.tsx so FAQAccordion can detect MdxH3
  // as a question marker via reference equality (see FAQAccordion.isH3).
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  ul: (props: { children?: ReactNode }) => (
    <ul {...props} className="list-disc pl-6 my-5 space-y-2 text-base md:text-lg font-light leading-[1.8] text-muted-foreground" />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol {...props} className="list-decimal pl-6 my-5 space-y-2 text-base md:text-lg font-light leading-[1.8] text-muted-foreground" />
  ),
  li: (props: { children?: ReactNode }) => <li {...props} className="pl-1" />,
  a: ({ href, children, ...rest }: { href?: string; children?: ReactNode }) => {
    const isExternal = !!href && /^https?:\/\//i.test(href) && !href.includes('cornerhouse.co.in');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/30 hover:decoration-primary underline-offset-4 transition-colors"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        to={href ?? '#'}
        className="text-primary underline decoration-primary/30 hover:decoration-primary underline-offset-4 transition-colors"
      >
        {children}
      </Link>
    );
  },
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote
      {...props}
      className="my-8 border-l-4 border-primary pl-6 py-2 font-heading italic text-xl md:text-2xl leading-snug text-foreground"
    />
  ),
  // Centered gold rule between H2 sections — replaces the default thin border the previous
  // hr override produced. Visual rhythm between major sections per FIX 8.
  hr: () => (
    <div className="my-14 flex justify-center" aria-hidden>
      <span className="block h-px w-16" style={{ backgroundColor: '#C9933A' }} />
    </div>
  ),
  img: ({ src, alt, width, height, loading }: { src?: string; alt?: string; width?: string | number; height?: string | number; loading?: 'lazy' | 'eager' }) => (
    <img
      src={src}
      alt={alt ?? ''}
      width={width ?? 1200}
      height={height ?? 675}
      loading={loading ?? 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      className="my-10 w-full h-auto"
    />
  ),
  code: (props: { children?: ReactNode }) => (
    <code {...props} className="bg-secondary/60 px-1.5 py-0.5 rounded text-[0.9em] font-mono text-foreground" />
  ),
  pre: (props: { children?: ReactNode }) => (
    <pre {...props} className="my-8 bg-[#1c1c1c] text-white p-6 overflow-x-auto text-sm rounded-sm" />
  ),
  // Inline-usable components from MDX (authors write <TLDRBox>, <CalloutBox>, etc. directly in .mdx)
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

export default function BlogPost({ frontmatter, Content }: BlogPostProps) {
  const projectName = projectNameFrom(frontmatter.title);
  const recentPosts = [
    {
      slug: 'krisumi-projects-explained',
      title: 'Krisumi Projects Explained',
      category: 'Project Reviews',
      comingSoon: true,
    },
    {
      slug: 'sector-36a-gurgaon-guide',
      title: 'Sector 36A Gurgaon Guide',
      category: 'Location Guides',
      comingSoon: true,
    },
  ];

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
            <article data-blog-body>
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
