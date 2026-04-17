import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '@/constants';

interface InsightsProps {
  onNavigate?: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

export default function Insights({ onNavigate }: InsightsProps) {
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
            Considered perspectives on Delhi NCR&apos;s most coveted addresses, market movements, and the art of acquiring them.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ARTICLES.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onNavigate?.('article', article.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-white bg-primary/90 px-4 py-2">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-white/90 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
                  <span>{article.date}</span>
                  <span className="h-[1px] w-6 bg-border" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-medium leading-tight group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-base">
                  {article.excerpt}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-primary inline-flex items-center">
                    Read Article
                    <span className="ml-3 h-[1px] w-8 bg-primary group-hover:w-16 transition-all duration-500" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
