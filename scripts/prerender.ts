import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { PROPERTIES, SERVICES, ARTICLES } from '../src/constants';

const SITE_URL = 'https://cornerhouse.co.in';
const distDir = resolve(process.cwd(), 'dist');
const indexHtmlPath = resolve(distDir, 'index.html');
const template = readFileSync(indexHtmlPath, 'utf-8');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  canonical: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown>[];
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHead(meta: RouteMeta): string {
  const ogImage = meta.image
    ? meta.image.startsWith('http')
      ? meta.image
      : `${SITE_URL}${meta.image}`
    : `${SITE_URL}/og-default.jpg`;

  const tags: string[] = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ];

  if (meta.keywords?.length) {
    tags.push(`<meta name="keywords" content="${escape(meta.keywords.join(', '))}" />`);
  }
  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${escape(meta.publishedTime)}" />`);
  }
  if (meta.author) {
    tags.push(`<meta property="article:author" content="${escape(meta.author)}" />`);
  }
  if (meta.jsonLd) {
    for (const schema of meta.jsonLd) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
    }
  }

  return tags.join('\n    ');
}

const MARKER_RE = /<!-- PRERENDER:START[\s\S]*?PRERENDER:END -->/m;

function renderHtml(meta: RouteMeta): string {
  const block = `<!-- PRERENDER:START -->\n    ${buildHead(meta)}\n    <!-- PRERENDER:END -->`;
  if (!MARKER_RE.test(template)) {
    throw new Error('Prerender markers not found in index.html — add <!-- PRERENDER:START -->/END --> tags.');
  }
  return template.replace(MARKER_RE, block);
}

function writeRoute(meta: RouteMeta) {
  const html = renderHtml(meta);
  if (meta.path === '/') {
    writeFileSync(resolve(distDir, 'index.html'), html);
    return;
  }
  // Write as /path.html so Cloudflare Pages serves /path without a trailing-slash redirect.
  const trimmed = meta.path.replace(/^\//, '');
  const outPath = resolve(distDir, `${trimmed}.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

function breadcrumb(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Home
writeRoute({
  path: '/',
  title: 'The Corner House — Luxury Real Estate in Gurugram & Delhi NCR',
  description:
    'Boutique luxury real estate brokerage specialising in ultra-premium residences across Gurugram and Delhi NCR. Golf Course Road, DLF Camellias, Aerocity, Chattarpur farmhouses.',
  canonical: `${SITE_URL}/`,
  keywords: [
    'luxury real estate Gurugram',
    'Delhi NCR luxury homes',
    'DLF Camellias',
    'Golf Course Road apartments',
    'Chattarpur farmhouse',
    'Aerocity residences',
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'The Corner House',
      url: SITE_URL,
    },
  ],
});

// Hub: Properties listing
writeRoute({
  path: '/properties',
  title: 'Luxury Properties — Gurugram & Delhi NCR | The Corner House',
  description:
    'Explore curated ultra-premium residences across Gurugram and Delhi NCR — penthouses, luxury apartments, and independent bungalows from our exclusive portfolio.',
  canonical: `${SITE_URL}/properties`,
  keywords: ['luxury properties Gurugram', 'Delhi NCR luxury homes', 'penthouses for sale', 'luxury apartments'],
  jsonLd: [
    breadcrumb([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Properties', url: `${SITE_URL}/properties` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Luxury Properties',
      url: `${SITE_URL}/properties`,
      about: { '@type': 'Thing', name: 'Ultra-premium residences in Delhi NCR' },
      hasPart: PROPERTIES.map((p) => ({
        '@type': 'Residence',
        name: p.title,
        url: `${SITE_URL}/properties/${p.id}`,
      })),
    },
  ],
});

// Hub: Services listing
writeRoute({
  path: '/services',
  title: 'Our Services — Brokerage, Portfolio, NRI, Loans | The Corner House',
  description:
    'Boutique advisory services for luxury real estate: brokerage, portfolio management, market research, NRI services, and home loan assistance across Gurugram and Delhi NCR.',
  canonical: `${SITE_URL}/services`,
  keywords: ['real estate services', 'NRI property services', 'luxury broker Gurugram', 'home loan advisory'],
  jsonLd: [
    breadcrumb([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Services', url: `${SITE_URL}/services` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Services',
      url: `${SITE_URL}/services`,
      hasPart: SERVICES.map((s) => ({
        '@type': 'Service',
        name: s.title,
        url: `${SITE_URL}/services/${s.id}`,
      })),
    },
  ],
});

// Hub: Journal listing
writeRoute({
  path: '/journal',
  title: 'The Journal — Luxury Real Estate Insights | The Corner House',
  description:
    'Editorial insights on Delhi NCR luxury real estate — market reports, neighbourhood analysis, investment guides, and off-market deal dynamics from our research team.',
  canonical: `${SITE_URL}/journal`,
  keywords: ['Delhi NCR real estate insights', 'luxury property research', 'market reports Gurugram'],
  jsonLd: [
    breadcrumb([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Journal', url: `${SITE_URL}/journal` },
    ]),
    {
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
    },
  ],
});

// Properties
for (const p of PROPERTIES) {
  writeRoute({
    path: `/properties/${p.id}`,
    title: `${p.title} — ${p.type} in ${p.location} | The Corner House`,
    description: `${p.title}, ${p.type.toLowerCase()} in ${p.location}. ${p.beds} beds, ${p.baths} baths, ${p.area}. ${p.description.slice(0, 120)}...`,
    image: p.images[0],
    canonical: `${SITE_URL}/properties/${p.id}`,
    keywords: [p.type, p.location, 'Gurugram luxury real estate', 'Delhi NCR'],
    jsonLd: [
      breadcrumb([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Properties', url: `${SITE_URL}/properties` },
        { name: p.title, url: `${SITE_URL}/properties/${p.id}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Residence',
        name: p.title,
        description: p.description,
        image: p.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
        url: `${SITE_URL}/properties/${p.id}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: p.location,
          addressCountry: 'IN',
        },
        numberOfRooms: p.beds,
        numberOfBathroomsTotal: p.baths,
        floorSize: { '@type': 'QuantitativeValue', value: p.area },
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  });
}

// Services
for (const s of SERVICES) {
  writeRoute({
    path: `/services/${s.id}`,
    title: `${s.title} — The Corner House`,
    description: s.fullDescription.slice(0, 160),
    image: s.image,
    canonical: `${SITE_URL}/services/${s.id}`,
    keywords: ['real estate services', 'Gurugram', 'Delhi NCR', s.title],
    jsonLd: [
      breadcrumb([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Services', url: `${SITE_URL}/services` },
        { name: s.title, url: `${SITE_URL}/services/${s.id}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        description: s.fullDescription,
        provider: { '@type': 'RealEstateAgent', name: 'The Corner House', url: SITE_URL },
        areaServed: { '@type': 'Place', name: 'Delhi NCR' },
        url: `${SITE_URL}/services/${s.id}`,
        image: s.image,
      },
    ],
  });
}

// Articles
for (const a of ARTICLES) {
  writeRoute({
    path: `/journal/${a.id}`,
    title: `${a.title} | The Corner House`,
    description: a.subtitle || a.excerpt,
    image: a.image,
    canonical: `${SITE_URL}/journal/${a.id}`,
    ogType: 'article',
    publishedTime: a.datePublished,
    author: a.author.name,
    keywords: a.tags,
    jsonLd: [
      breadcrumb([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Journal', url: `${SITE_URL}/journal` },
        { name: a.title, url: `${SITE_URL}/journal/${a.id}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.title,
        description: a.excerpt,
        image: a.image,
        datePublished: a.datePublished,
        author: { '@type': 'Person', name: a.author.name, jobTitle: a.author.role },
        publisher: {
          '@type': 'Organization',
          name: 'The Corner House',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: `${SITE_URL}/journal/${a.id}`,
        keywords: a.tags.join(', '),
      },
    ],
  });
}

// 404 page (served with HTTP 404 via _redirects catch-all)
writeRoute({
  path: '/404',
  title: 'Page not found — The Corner House',
  description: 'The page you are looking for does not exist. Return home to explore our current collection of luxury residences.',
  canonical: `${SITE_URL}/404`,
  jsonLd: [],
});

// 1 home + 3 hubs + properties + services + articles + 404
const count = 1 + 3 + PROPERTIES.length + SERVICES.length + ARTICLES.length + 1;
console.log(`Prerendered ${count} routes to dist/`);
