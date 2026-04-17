import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROPERTIES, SERVICES, ARTICLES } from '../src/constants';

const BASE_URL = 'https://cornerhouse.co.in';
const today = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

const entries: SitemapEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
  { path: '/properties', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/journal', priority: '0.8', changefreq: 'weekly', lastmod: today },
  ...PROPERTIES.map((p) => ({
    path: `/properties/${p.id}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: today,
  })),
  ...SERVICES.map((s) => ({
    path: `/services/${s.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: today,
  })),
  ...ARTICLES.map((a) => ({
    path: `/journal/${a.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: today,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(process.cwd(), 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`Sitemap written: ${outPath} (${entries.length} URLs)`);
