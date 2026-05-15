import type { ComponentType } from 'react';
import type { BlogFrontmatter } from '@/components/blog/types';

interface MdxModule {
  default: ComponentType<Record<string, unknown>>;
  frontmatter: BlogFrontmatter;
}

// Eager glob: every .mdx in /content/blog is bundled at build time so SSG can pre-render each
// route without filesystem I/O. The remark-mdx-frontmatter plugin (vite.config.ts) puts the
// YAML frontmatter onto an exported `frontmatter` const.
const modules = import.meta.glob<MdxModule>('../../content/blog/*.mdx', { eager: true });

interface BlogPostEntry {
  slug: string;
  frontmatter: BlogFrontmatter;
  Component: ComponentType<Record<string, unknown>>;
}

const posts: Record<string, BlogPostEntry> = {};

for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split('/').pop() ?? '';
  const slug = filename.replace(/\.mdx$/, '');
  if (!mod.frontmatter) {
    if (typeof console !== 'undefined') {
      console.warn(`[blogPosts] Skipping "${slug}" — no frontmatter exported.`);
    }
    continue;
  }
  posts[slug] = {
    slug,
    frontmatter: mod.frontmatter,
    Component: mod.default,
  };
}

export const BLOG_POSTS: Readonly<Record<string, BlogPostEntry>> = posts;
export const BLOG_POST_SLUGS: readonly string[] = Object.keys(posts).sort(
  (a, b) => (posts[b].frontmatter.publishDate ?? '').localeCompare(posts[a].frontmatter.publishDate ?? ''),
);

export function getBlogPost(slug: string | undefined): BlogPostEntry | undefined {
  if (!slug) return undefined;
  return posts[slug];
}

// Lightweight summary used by RelatedPosts and BlogCard.
export interface BlogPostSummary
  extends Pick<
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
    | 'tags'
    | 'author'
  > {}

export function getBlogPostSummary(slug: string): BlogPostSummary | undefined {
  const post = posts[slug];
  if (!post) return undefined;
  const fm = post.frontmatter;
  return {
    slug: fm.slug,
    title: fm.title,
    description: fm.description,
    category: fm.category,
    heroImage: fm.heroImage,
    heroImageAlt: fm.heroImageAlt,
    publishDate: fm.publishDate,
    readingTime: fm.readingTime,
    featured: fm.featured,
    tags: fm.tags,
    author: fm.author,
  };
}

export function getAllBlogPostSummaries(): BlogPostSummary[] {
  return BLOG_POST_SLUGS.map((slug) => getBlogPostSummary(slug)).filter(
    (s): s is BlogPostSummary => s != null,
  );
}
