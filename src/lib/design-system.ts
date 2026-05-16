/*
 * CORNER HOUSE — DESIGN SYSTEM PACKAGE MAP
 * Reference this before building any new component.
 * All packages are installed globally.
 */

// ── ICONS ─────────────────────────────────────────────────
// lucide-react          → base UI icons (nav, cards, forms, buttons)
// @phosphor-icons/react → expressive editorial icons (multiple weights: thin/light/bold/duotone)
// react-icons           → mega-pack: Phosphor, Tabler, Heroicons, Game Icons via react-icons/pi etc
// @tabler/icons-react   → real estate icons (home, building, key, map-pin, bed, bath, ruler)
// @heroicons/react      → clean outline/solid icons for CTAs and UI chrome

// ── DOODLES AND ANNOTATIONS ───────────────────────────────
// react-rough-notation  → hand-drawn highlight, underline, box, circle around text
// roughjs               → custom sketch arrows, dividers, frames, map callouts
// react-open-doodles    → free sketchy human illustrations for empty states and hero sections
//                         (installed with --legacy-peer-deps; package declares React 15/16
//                         peer dep but only ships static SVG components, works on React 19)
// vite-plugin-svgr      → import any .svg file as a React component
//                         (use ?react query suffix: `import Logo from './logo.svg?react'`)

// ── TEXT AND HIGHLIGHTING ─────────────────────────────────
// react-marker          → keyword highlighting inside article/MDX content

// ── TYPOGRAPHY ────────────────────────────────────────────
// @tailwindcss/typography → prose styling for all MDX content
// Google Fonts loaded in index.html:
//   Sacramento         → decorative hero accent titles (use sparingly)
//   Tangerine          → manuscript-style section headings
//   Cormorant Garamond → elegant editorial headings and pull quotes
//   Playfair Display   → premium real estate section headings
//   Inter              → body text (default)
//   Caveat             → handwritten annotations and labels
// Tailwind fontFamily keys: font-sacramento, font-tangerine,
//   font-cormorant, font-playfair, font-inter, font-caveat

// ── LAYOUT AND MOTION ─────────────────────────────────────
// embla-carousel-react         → image galleries, property photo strips, testimonial sliders
// yet-another-react-lightbox   → click-to-enlarge image overlay for gallery images
// class-variance-authority     → typed Tailwind card variants (featureCard, quoteCard etc)
// motion (formerly framer-motion) → reveal animations, floating doodles, card entrance motion
//                                   Imported via `motion/react`; this repo already uses it
//                                   throughout (e.g. <motion.div initial={…} animate={…} />).
//                                   Do NOT install `framer-motion` separately — `motion`
//                                   IS the modern package name. Installing both would
//                                   ship two animation libraries in the bundle.

// ── CORNER HOUSE COLOUR PALETTE ───────────────────────────
// Navy:   #0D1F3C  (primary dark)
// Gold:   #C9933A  (accent)
// Teal:   #0F6E56  (secondary)
// White:  #FFFFFF
// Cream:  #F7F6F2  (alt background)
// Gray:   #5F5E5A  (body text)

// Type-only export so this file is treated as a module by TypeScript. The hex constants
// below are the canonical source of truth for the brand palette; reference them in CSS via
// the existing Tailwind theme tokens or inline `style={{ color: BRAND.gold }}` when needed.
export const BRAND = {
  navy: '#0D1F3C',
  gold: '#C9933A',
  teal: '#0F6E56',
  white: '#FFFFFF',
  cream: '#F7F6F2',
  gray: '#5F5E5A',
} as const;

export type BrandColor = keyof typeof BRAND;
