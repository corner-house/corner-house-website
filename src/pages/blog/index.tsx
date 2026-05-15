import { motion } from 'motion/react';
import SEO, { SITE_URL } from '@/components/SEO';
import BlogCard from '@/components/blog/BlogCard';
import { getAllBlogPostSummaries } from '@/data/blogPosts';

export default function BlogIndex() {
  const posts = getAllBlogPostSummaries();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Corner House Realty — Blog',
    url: `${SITE_URL}/blog`,
    publisher: { '@type': 'Organization', name: 'Corner House Realty', url: SITE_URL },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishDate,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <main className="pt-40 pb-32 bg-background min-h-screen">
      <SEO
        title="Honest Real Estate Reviews — Corner House Blog"
        description="HARERA-verified, brochure-sourced reviews of Gurugram luxury real estate. Project reviews, developer track records, hidden costs, and buyer education from Saurabh, RERA-authorised channel partner."
        path="/blog"
        keywords={[
          'Gurugram real estate reviews',
          'HARERA verified projects',
          'luxury property Delhi NCR',
          'honest builder reviews',
        ]}
        jsonLd={[blogJsonLd, breadcrumbJsonLd]}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
            Corner House Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-medium leading-[1.05]">
            Honest reviews from a <span className="italic text-primary/80">RERA-registered desk.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
            Project reviews built from HARERA certificates and signed broker agreements — not
            aggregator scrapes. Slow research, for buyers making 5-to-10 year decisions.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-lg font-light">
            No posts yet. Check back soon.
          </p>
        ) : (
          <>
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <BlogCard post={featured} />
              </motion.div>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
