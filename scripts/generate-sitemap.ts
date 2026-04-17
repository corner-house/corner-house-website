import { writeFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { PROPERTIES, SERVICES, ARTICLES } from '../src/constants';

const BASE_URL = 'https://cornerhouse.co.in';

// Per-file last-commit date (ISO 8601, UTC). Falls back to file mtime if git is unavailable
// or the file is untracked. Google ignores sitemap lastmod when every URL shares the same date,
// so we want real per-source timestamps.
function fileLastMod(relativePath: string): string {
  const absPath = resolve(process.cwd(), relativePath);
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${absPath}"`, { encoding: 'utf-8' }).trim();
    if (iso) return iso.split('T')[0];
  } catch {
    // Swallow and fall through.
  }
  try {
    return statSync(absPath).mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

const constantsLastMod = fileLastMod('src/constants.ts');
const appLastMod = fileLastMod('src/App.tsx');
const homeLastMod = [constantsLastMod, appLastMod].sort().pop() as string;

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

const entries: SitemapEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: homeLastMod },
  { path: '/properties', priority: '0.9', changefreq: 'weekly', lastmod: constantsLastMod },
  { path: '/services', priority: '0.8', changefreq: 'monthly', lastmod: constantsLastMod },
  { path: '/journal', priority: '0.8', changefreq: 'weekly', lastmod: constantsLastMod },
  ...PROPERTIES.map((p) => ({
    path: `/properties/${p.id}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: constantsLastMod,
  })),
  ...SERVICES.map((s) => ({
    path: `/services/${s.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: constantsLastMod,
  })),
  ...ARTICLES.map((a) => ({
    path: `/journal/${a.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    // Use article's real publish date rather than build time.
    lastmod: a.datePublished,
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
