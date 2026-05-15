import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROPERTIES, SERVICES, ARTICLES } from '../src/constants';

const SITE_URL = 'https://cornerhouse.co.in';
const KEY = '843e23ec010cf01b84a9f1068c9df883';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

// Rich listings (data/properties/<slug>.json) are loaded at build time by
// src/data/propertyListings.ts via import.meta.glob — a Vite-only primitive.
// Mirror that discovery here for Node/tsx, filtering the same two suffixes.
function listRichPropertySlugs(): string[] {
  const dir = resolve(process.cwd(), 'data/properties');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(
      (f) => f.endsWith('.json') && !f.endsWith('-images.json') && !f.endsWith('-source.json'),
    )
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

// Blog posts (content/blog/<slug>.mdx) — same filesystem-scan approach so new posts are
// pinged without any hardcoded list maintenance.
function listBlogSlugs(): string[] {
  const dir = resolve(process.cwd(), 'content/blog');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort();
}

const blogSlugs = listBlogSlugs();

const allUrls: string[] = [
  `${SITE_URL}/`,
  ...PROPERTIES.map((p) => `${SITE_URL}/properties/${p.id}`),
  ...listRichPropertySlugs().map((slug) => `${SITE_URL}/properties/${slug}`),
  ...SERVICES.map((s) => `${SITE_URL}/services/${s.id}`),
  ...ARTICLES.map((a) => `${SITE_URL}/journal/${a.id}`),
  ...(blogSlugs.length > 0 ? [`${SITE_URL}/blog`] : []),
  ...blogSlugs.map((slug) => `${SITE_URL}/blog/${slug}`),
];

// Deduplicate by URL — first occurrence wins. Matches the generate-sitemap.ts dedup pattern:
// if a legacy PROPERTIES entry and a rich listing ever collide at the same path, only one gets pinged.
const seen = new Set<string>();
const urls: string[] = allUrls.filter((u) => {
  if (seen.has(u)) return false;
  seen.add(u);
  return true;
});

async function ping() {
  // Skip on local/dev where the key file won't be reachable.
  if (process.env.INDEXNOW_SKIP === '1') {
    console.log('IndexNow: skipped (INDEXNOW_SKIP=1).');
    return;
  }

  console.log(`IndexNow: submitting ${urls.length} URLs:`);
  for (const u of urls) console.log(`  · ${u}`);

  const body = {
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    // 200/202 = accepted. 400 = malformed. 403 = key not found (file not yet deployed).
    console.log(`\nIndexNow: ${res.status} ${res.statusText} (${urls.length} URLs submitted)`);
  } catch (error) {
    console.warn('IndexNow ping failed:', error instanceof Error ? error.message : error);
  }
}

ping();
