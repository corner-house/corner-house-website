// Capture per-section screenshots for a property listing.
// Usage: node scripts/capture-property-shots.mjs <slug> [outDir]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const slug = process.argv[2];
const outDir = process.argv[3] ?? `/tmp/shots-${slug}`;
if (!slug) {
  console.error('Usage: node scripts/capture-property-shots.mjs <slug> [outDir]');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const url = `http://localhost:3000/properties/${slug}`;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Bypass the lead-capture gate before any app code runs.
await page.addInitScript(() => {
  try {
    window.sessionStorage.setItem('corner_home_lead_captured', 'true');
  } catch {
    // sessionStorage may be unavailable in some sandboxes; proceed anyway.
  }
});

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// 1. Hero (viewport at top)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outDir, '1-hero.png'), fullPage: false });
console.log(`✓ ${join(outDir, '1-hero.png')}`);

// 2. Gallery section (element-bounded shot)
const gallery = page.locator('#gallery');
await gallery.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await gallery.screenshot({ path: join(outDir, '2-gallery.png') });
console.log(`✓ ${join(outDir, '2-gallery.png')}`);

// 3. Floor plans section
const fp = page.locator('#floor-plans');
await fp.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await fp.screenshot({ path: join(outDir, '3-floor-plans.png') });
console.log(`✓ ${join(outDir, '3-floor-plans.png')}`);

await browser.close();
