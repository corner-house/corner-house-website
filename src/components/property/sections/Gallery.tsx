import { useEffect, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleSparkles } from '../Doodles';

interface GalleryProps {
  listing: PropertyListing;
}

type Category =
  | 'exteriors'
  | 'interiors'
  | 'amenities'
  | 'master-plans'
  | 'surroundings'
  | 'other';

interface Item {
  imageKey: string;
  caption: string;
  category: Category;
}

// Order matters — first match wins. master-plans first so karma-lakelands-master
// beats karma-lakelands-.
const PREFIX_RULES: Array<[Category, string[]]> = [
  [
    'master-plans',
    [
      'phase-1-master-plan-',
      'master-plan-',
      'masterplan-',
      'cluster-plan-',
      'site-plan-',
      'location-map-',
      'connectivity-radial-',
      'karma-lakelands-master',
    ],
  ],
  ['exteriors', ['towers-', 'tower-', 'elevation-', 'brochure-cover-', 'clubhouse-exterior', 'cover-']],
  ['interiors', ['interior-', 'balcony-']],
  [
    'amenities',
    [
      'active-zone-',
      'kids-zone-',
      'recreational-',
      'park-plaza-',
      'eco-amenities-',
      'club-antara',
      'camping-',
      'island-cove',
      'swimming-pool-',
      'pool-',
    ],
  ],
  ['surroundings', ['serenity-lake-', 'lake-', 'karma-lakelands-', 'pursuit-']],
];

const TAB_ORDER: Array<{ key: 'all' | Category; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'exteriors', label: 'Exteriors' },
  { key: 'interiors', label: 'Interiors' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'master-plans', label: 'Master Plans' },
  { key: 'surroundings', label: 'Surroundings' },
];

const SOURCE_MARKERS = new Set(['website', 'render', 'compressed', 'scaled']);

function categorize(key: string): Category {
  for (const [cat, prefs] of PREFIX_RULES) {
    if (prefs.some((p) => key.startsWith(p))) return cat;
  }
  return 'other';
}

function humanize(key: string): string {
  const cleaned = key.split('-').filter((p) => !SOURCE_MARKERS.has(p));
  if (cleaned.length === 0) return key;
  const titled = cleaned.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
  if (titled.length <= 1) return titled[0];
  return `${titled[0]} — ${titled.slice(1).join(' ')}`;
}

function collectReferenced(listing: PropertyListing): Set<string> {
  const r = new Set<string>();
  if (listing.seo?.ogImageKey) r.add(listing.seo.ogImageKey);
  if (listing.hero?.heroImageKey) r.add(listing.hero.heroImageKey);
  if (listing.hero?.mobileHeroImageKey) r.add(listing.hero.mobileHeroImageKey);
  for (const bucket of Object.values(listing.amenities ?? {})) {
    for (const item of bucket) if (item.imageKey) r.add(item.imageKey);
  }
  for (const f of listing.floorPlans ?? []) if (f.imageKey) r.add(f.imageKey);
  if (listing.neighbourhood?.backdropImageKey) r.add(listing.neighbourhood.backdropImageKey);
  if (listing.investmentThesis?.backdropImageKey) r.add(listing.investmentThesis.backdropImageKey);
  for (const v of listing.videoMp4s ?? []) if (v.posterImageKey) r.add(v.posterImageKey);
  for (const c of listing.gallery?.curated ?? []) r.add(c.imageKey);
  return r;
}

export default function Gallery({ listing }: GalleryProps) {
  const config = listing.gallery ?? { enabled: true, exclude: [] as string[] };

  const items = useMemo<Item[]>(() => {
    if (!config.enabled) return [];
    const referenced = collectReferenced(listing);
    const exclude = new Set(config.exclude ?? []);
    const manifest = Object.keys(listing.images ?? {});

    const curated: Item[] = (config.curated ?? [])
      .filter((c) => listing.images?.[c.imageKey])
      .map((c) => ({
        imageKey: c.imageKey,
        caption: c.caption ?? humanize(c.imageKey),
        category: c.category ?? categorize(c.imageKey),
      }));

    const auto: Item[] = manifest
      .filter((k) => !referenced.has(k) && !exclude.has(k))
      .map((k) => ({ imageKey: k, caption: humanize(k), category: categorize(k) }));

    return [...curated, ...auto];
  }, [listing, config]);

  const [activeTab, setActiveTab] = useState<'all' | Category>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => (activeTab === 'all' ? items : items.filter((i) => i.category === activeTab)),
    [items, activeTab],
  );

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % visibleItems.length)),
    [visibleItems.length],
  );
  const prev = useCallback(
    () =>
      setOpenIdx((i) => (i === null ? null : (i - 1 + visibleItems.length) % visibleItems.length)),
    [visibleItems.length],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIdx, close, next, prev]);

  if (items.length === 0) return null;

  const baseTabs = TAB_ORDER.filter(
    (t) => t.key === 'all' || items.some((i) => i.category === t.key),
  );
  const hasOther = items.some((i) => i.category === 'other');
  const tabs = hasOther ? [...baseTabs, { key: 'other' as const, label: 'Other' }] : baseTabs;

  const open = openIdx !== null ? visibleItems[openIdx] : null;
  const openVariants = open ? listing.images[open.imageKey] : null;

  return (
    <section id="gallery" className="py-10 md:py-12">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="visual tour"
          title="Gallery"
          doodle={<DoodleSparkles />}
        />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40" role="tablist">
          {tabs.map((t) => {
            const count =
              t.key === 'all' ? items.length : items.filter((i) => i.category === t.key).length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={activeTab === t.key}
                onClick={() => {
                  setActiveTab(t.key);
                  setOpenIdx(null);
                }}
                className={`px-5 py-3 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === t.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label} <span className="text-muted-foreground/60 ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map((it, i) => {
            const v = listing.images[it.imageKey];
            return (
              <button
                key={it.imageKey}
                type="button"
                onClick={() => setOpenIdx(i)}
                className="group relative aspect-[4/3] overflow-hidden bg-secondary/30"
                aria-label={`Open ${it.caption}`}
              >
                <img
                  src={v.thumb}
                  srcSet={`${v.thumb} 400w, ${v.gallery} 1200w`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  alt={it.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left">
                  <span className="text-white text-xs font-medium line-clamp-1">{it.caption}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {open && openVariants &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={open.caption}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <figure
              className="max-w-[92vw] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={openVariants.hero}
                alt={open.caption}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <figcaption className="mt-4 text-white/90 text-sm tracking-wide">
                {open.caption}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </section>
  );
}
