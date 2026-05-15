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
import { MdxH1, MdxH2, MdxH3, MdxP } from './mdx-elements';
import type { BlogFrontmatter } from './types';

interface BlogPostProps {
  frontmatter: BlogFrontmatter;
  Content: ComponentType<Record<string, unknown>>;
}

// MDX component overrides — applied to every element MDX emits. Keeps the editorial typography
// (font-heading, prose-style line-height) consistent across every post without authors having to
// add classes inline in the .mdx file.
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
  hr: () => <hr className="my-14 border-border/60" />,
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
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost({ frontmatter, Content }: BlogPostProps) {
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

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        {/* fetchPriority is the React 19 prop spelling; the rendered HTML attribute is the
            lowercase `fetchpriority` per spec, matching the project rule. */}
        <img
          src={frontmatter.heroImage}
          alt={frontmatter.heroImageAlt}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
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
              <span className="bg-primary/90 text-white border-none px-4 py-1.5 tracking-[0.3em] uppercase text-[10px] mb-6 inline-block">
                {frontmatter.category}
              </span>
              {/* Hero title is presentational only — the canonical H1 lives in the MDX body
                  (Section 5, item 4). Using a div/p avoids two H1s on the page. */}
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

      {/* Body */}
      <section className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article data-blog-body className="lg:col-span-8 lg:col-start-2 max-w-none">
            <MDXProvider components={MDX_COMPONENTS}>
              <Content />
            </MDXProvider>
          </article>
        </div>
      </section>
    </main>
  );
}
