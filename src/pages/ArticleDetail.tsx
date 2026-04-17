import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Bookmark, Share2, Twitter, Linkedin, Facebook, Clock, Calendar } from 'lucide-react';
import { ARTICLES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SEO, { SITE_URL } from '@/components/SEO';

interface ArticleDetailProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

export default function ArticleDetail({ onBack, onNavigate }: ArticleDetailProps) {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find((a) => a.id === id);
  const related = ARTICLES.filter((a) => a.id !== id).slice(0, 2);

  if (!article) {
    return (
      <main className="pt-40 pb-32 bg-background min-h-screen">
        <SEO
          title="Article not found"
          description="The article you're looking for is no longer available."
          path={`/journal/${id ?? ''}`}
          noindex
        />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-heading font-medium mb-6">Article not found</h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
          </Button>
        </div>
      </main>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      image: `${SITE_URL}${article.author.image}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Corner House',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/journal/${article.id}`,
    keywords: article.tags.join(', '),
    articleSection: article.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/#insights` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/journal/${article.id}`,
      },
    ],
  };

  return (
    <main className="bg-background pb-24">
      <SEO
        title={article.title}
        description={article.subtitle || article.excerpt}
        path={`/journal/${article.id}`}
        image={article.image}
        type="article"
        publishedTime={article.date}
        author={article.author.name}
        keywords={article.tags}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img
          src={article.image}
          alt={`${article.title} — ${article.category}`}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        <div className="absolute inset-0 flex flex-col">
          <div className="container mx-auto px-6 pt-32">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/5 -ml-4 group"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              BACK TO JOURNAL
            </Button>
          </div>

          <div className="container mx-auto px-6 mt-auto pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <Badge className="bg-primary/90 hover:bg-primary text-white border-none px-4 py-1 tracking-[0.3em] uppercase text-[10px] mb-8 rounded-none">
                {article.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-white leading-[1.05] mb-8">
                {article.title}
              </h1>
              <p className="text-lg md:text-2xl text-white/75 font-light leading-relaxed max-w-3xl">
                {article.subtitle}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center space-x-3">
                  <img
                    src={article.author.image}
                    alt={`${article.author.name}, ${article.author.role}`}
                    className="h-11 w-11 rounded-full object-cover object-top border border-white/30"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{article.author.name}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-white/50">
                      {article.author.role}
                    </div>
                  </div>
                </div>

                <span className="h-8 w-[1px] bg-white/20 hidden md:block" />

                <div className="flex items-center text-[11px] tracking-[0.25em] uppercase text-white/60">
                  <Calendar className="h-4 w-4 mr-2" />
                  {article.date}
                </div>
                <div className="flex items-center text-[11px] tracking-[0.25em] uppercase text-white/60">
                  <Clock className="h-4 w-4 mr-2" />
                  {article.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Social Rail */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 flex flex-col items-center space-y-5">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground -rotate-90 mt-12 mb-12">
                Share
              </span>
              <a
                href="#"
                aria-label="Share on Twitter"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Share on LinkedIn"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Share on Facebook"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <span className="h-12 w-[1px] bg-border" />
              <button
                aria-label="Bookmark"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </aside>

          {/* Article Column */}
          <article className="lg:col-span-8 space-y-14">
            {article.heroQuote && (
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-primary pl-8 py-4"
              >
                <p className="font-heading italic text-2xl md:text-3xl leading-snug text-foreground">
                  &ldquo;{article.heroQuote}&rdquo;
                </p>
              </motion.blockquote>
            )}

            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/90">
              {article.excerpt}
            </p>

            <Separator />

            {article.sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="space-y-6"
              >
                {section.heading && (
                  <h2 className="text-3xl md:text-4xl font-heading font-medium leading-tight">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-lg font-light leading-[1.85] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.section>
            ))}

            {/* Tags */}
            <div className="pt-8 border-t border-border/60 flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2 hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile share */}
            <div className="lg:hidden flex items-center justify-between pt-8 border-t border-border/60">
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                Share this article
              </span>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" className="rounded-full border-border">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-border">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-border">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="lg:sticky lg:top-32 space-y-10">
              {/* Key Takeaways */}
              <div className="bg-secondary/30 p-8 border-l-4 border-primary">
                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold block mb-6">
                  Key Takeaways
                </span>
                <ul className="space-y-4">
                  {article.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex space-x-3 text-sm leading-relaxed text-foreground/80 font-light">
                      <span className="text-primary font-heading font-semibold">0{i + 1}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author card */}
              <div className="border border-border p-8 space-y-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block">
                  Written by
                </span>
                <div className="flex items-center space-x-4">
                  <img
                    src={article.author.image}
                    alt={`${article.author.name}, ${article.author.role}`}
                    className="h-14 w-14 rounded-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-heading font-medium text-lg leading-tight">
                      {article.author.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{article.author.role}</div>
                  </div>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Part of our Research &amp; Advisory desk. Reach out for bespoke market briefings.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#1c1c1c] text-white p-8 space-y-5">
                <h4 className="text-xl font-heading font-medium leading-tight">
                  Private market briefings
                </h4>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Receive our quarterly intelligence report on Delhi NCR&apos;s ultra-premium residential market.
                </p>
                <Button
                  onClick={() => onNavigate('home', '#contact')}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-none"
                >
                  REQUEST ACCESS
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container mx-auto px-6 mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary mb-4 block">
                Continue Reading
              </span>
              <h3 className="text-3xl md:text-5xl font-heading font-medium leading-tight">
                More from <span className="italic text-primary/80">The Journal</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('home', '#insights')}
              className="hidden md:inline-flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold group"
            >
              All Articles
              <span className="ml-3 h-[1px] w-8 bg-primary group-hover:w-16 transition-all duration-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {related.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onNavigate('article', item.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-6 shadow-xl">
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.category}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-white bg-primary/90 px-4 py-2">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-white/90 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
                    <span>{item.date}</span>
                    <span className="h-[1px] w-6 bg-border" />
                    <span>{item.readTime}</span>
                  </div>
                  <h4 className="text-2xl font-heading font-medium leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
