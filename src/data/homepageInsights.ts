/**
 * Curated selection of blog posts featured in the homepage Journal section.
 *
 * Update this list to change which posts appear on the homepage. The full
 * archive remains available at /blog and continues to list every post in
 * publishDate order.
 *
 * Slugs are the filename (without extension) of each MDX file under
 * content/blog/. Posts are resolved at build time via getBlogPostSummary
 * in src/data/blogPosts.ts; an invalid or removed slug is silently dropped
 * and the section still renders.
 */
export const HOMEPAGE_INSIGHTS = {
  /** Featured large card at the top of the section. */
  featuredSlug: 'krisumi-forest-reserve-review',

  /** Three smaller cards beneath the featured card, left-to-right. */
  rowSlugs: [
    'sobha-aranya-review',
    'is-krisumi-good-investment',
    'krisumi-projects-explained',
  ] as const,
} as const;

export type HomepageInsightsConfig = typeof HOMEPAGE_INSIGHTS;
