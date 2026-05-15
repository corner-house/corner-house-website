import { Head } from 'vite-react-ssg';
import type { BlogFrontmatter } from './types';
import { SITE_URL } from '@/components/SEO';

interface BlogSchemaProps {
  frontmatter: BlogFrontmatter;
}

// Per Section 8: Article + BreadcrumbList JSON-LD here. FAQPage JSON-LD is emitted by
// FAQAccordion at render time (it walks ### H3 children to build mainEntity[]) and hoists
// to <head> via vite-react-ssg's Head — so all three end up in the page head as required.
export default function BlogSchema({ frontmatter }: BlogSchemaProps) {
  const url = `${SITE_URL}/blog/${frontmatter.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
      description: frontmatter.authorCredential,
      url: `${SITE_URL}${frontmatter.authorUrl}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Corner House Realty',
      url: SITE_URL,
    },
    datePublished: frontmatter.publishDate,
    dateModified: frontmatter.lastUpdated,
    image: frontmatter.heroImage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: url },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Head>
  );
}
