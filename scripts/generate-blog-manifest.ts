import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import matter from 'gray-matter';

// Auto-generates public/blog-manifest.json from content/blog/*.mdx frontmatter.
// Per Section 3.1: NEVER edit manually. Run via `npm run blog:manifest`.

interface ManifestEntry {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  lastUpdated: string;
  category: string;
  tags: string[];
  heroImage: string;
  ogImage: string;
  readingTime: string;
  wordCount: number;
  featured: boolean;
  url: string;
}

const SITE_URL = 'https://www.cornerhouse.co.in';
const BLOG_DIR = resolve(process.cwd(), 'content/blog');
const OUT = resolve(process.cwd(), 'public/blog-manifest.json');

function loadEntries(): ManifestEntry[] {
  if (!existsSync(BLOG_DIR)) return [];
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const entries: ManifestEntry[] = [];

  for (const file of files) {
    const slug = basename(file, '.mdx');
    const raw = readFileSync(resolve(BLOG_DIR, file), 'utf-8');
    const { data } = matter(raw);
    if (!data.slug || !data.title) {
      console.warn(`[blog-manifest] Skipping ${file} — missing slug or title in frontmatter.`);
      continue;
    }
    entries.push({
      slug: data.slug ?? slug,
      title: data.title,
      description: data.description ?? '',
      publishDate: data.publishDate ?? '',
      lastUpdated: data.lastUpdated ?? data.publishDate ?? '',
      category: data.category ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      heroImage: data.heroImage ?? '',
      ogImage: data.ogImage ?? '',
      readingTime: data.readingTime ?? '',
      wordCount: typeof data.wordCount === 'number' ? data.wordCount : 0,
      featured: !!data.featured,
      url: `${SITE_URL}/blog/${data.slug ?? slug}`,
    });
  }

  // Newest first.
  return entries.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

const manifest = {
  generatedAt: new Date().toISOString(),
  count: 0,
  posts: [] as ManifestEntry[],
};

manifest.posts = loadEntries();
manifest.count = manifest.posts.length;

const publicDir = resolve(process.cwd(), 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Blog manifest written: ${OUT} (${manifest.count} posts)`);
