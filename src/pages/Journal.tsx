import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO, { SITE_URL } from '@/components/SEO';
import { ARTICLES } from '@/constants';

export default function Journal() {
  const navigate = useNavigate();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Corner House Journal',
    url: `${SITE_URL}/journal`,
    publisher: { '@type': 'Organization', name: 'The Corner House', url: SITE_URL },
    blogPost: ARTICLES.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${SITE_URL}/journal/${a.id}`,
      datePublished: a.datePublished,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/journal` },
    ],
  };

  return (
    <main className="pt-40 pb-32 bg-background min-h-screen">
      <SEO
        title="The Journal — Luxury Real Estate Insights | The Corner House"
        description="Editorial insights on Delhi NCR luxury real estate — market reports, neighbourhood analysis, investment guides, and off-market deal dynamics from our research team."
        path="/journal"
        keywords={[
          'Delhi NCR real estate insights',
          'luxury property research',
          'market reports Gurugram',
        ]}
        jsonLd={[blogJsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <span className="text-xs font-sans font-semibold tracking-[0.5em] uppercase text-primary mb-8 block">
            The Journal
          </span>
          <h1 className="text-6xl md:text-7xl font-heading font-medium leading-[1.05]">
            Editorial insights from <span className="italic text-primary/80">the Delhi NCR luxury desk.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed">
            Research, neighbourhood dispatches, and investment notes from our desk. Written slowly,
            for readers who make decades-long decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTICLES.map((article, index) => (
            <motion.button
              key={article.id}
              onClick={() => navigate(`/journal/${article.id}`)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group text-left bg-card border border-border/60 rounded-sm overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-5">
                  {article.category} — {article.date}
                </span>
                <h3 className="text-2xl font-heading font-medium leading-tight mb-4">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                <div className="mt-6 text-xs text-muted-foreground uppercase tracking-[0.3em]">
                  {article.readTime}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
