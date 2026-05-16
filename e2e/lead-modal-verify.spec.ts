import { test, expect, chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const ARTIFACTS_DIR = '/Users/saurabhiim/Documents/Antigravity/corner-home-project/e2e-artifacts/lead-modal';
if (!fs.existsSync(ARTIFACTS_DIR)) fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

async function checkModal(page: any, label: string) {
  // 1. Is [data-lead-modal] present in DOM?
  const present = await page.evaluate(() => {
    return !!document.querySelector('[data-lead-modal]');
  });

  // 2. Is it a direct child of <body>?
  const parentTag = await page.evaluate(() => {
    const el = document.querySelector('[data-lead-modal]');
    if (!el) return null;
    return el.parentElement?.tagName ?? null;
  });

  // 3. getBoundingClientRect
  const rect = await page.evaluate(() => {
    const el = document.querySelector('[data-lead-modal]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right };
  });

  // 4. Computed z-index of the modal wrapper
  const zIndex = await page.evaluate(() => {
    const el = document.querySelector('[data-lead-modal]');
    if (!el) return null;
    return window.getComputedStyle(el).zIndex;
  });

  // 5. elementFromPoint at center of viewport (720, 450)
  const elementFromPointInfo = await page.evaluate(() => {
    const el = document.elementFromPoint(720, 450);
    if (!el) return null;
    const modal = document.querySelector('[data-lead-modal]');
    const insideModal = modal ? modal.contains(el) : false;
    return {
      tag: el.tagName,
      id: el.id,
      classList: Array.from(el.classList).slice(0, 5),
      insideModal,
      dataAttrs: Array.from(el.attributes)
        .filter(a => a.name.startsWith('data-'))
        .map(a => `${a.name}=${a.value}`)
        .slice(0, 5),
    };
  });

  // 6. Capture console logs for [gate] / [lead-gate]
  // (collected via listener, see below)

  // 7. Check for debug badge
  const hasBadge = await page.evaluate(() => {
    // The removed LeadGateDebugBadge was a fixed-position element at bottom-right
    const allFixed = Array.from(document.querySelectorAll('*')).filter(el => {
      const style = window.getComputedStyle(el as Element);
      return style.position === 'fixed' && style.bottom !== 'auto' && style.right !== 'auto';
    });
    // Look for anything that looks like a debug badge (small, colorful, bottom-right)
    const badgeCandidate = allFixed.find(el => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const style = window.getComputedStyle(el as Element);
      const text = (el as HTMLElement).innerText || '';
      return rect.width < 300 && rect.height < 100 &&
        (text.toLowerCase().includes('gate') || text.toLowerCase().includes('debug') ||
         text.toLowerCase().includes('lead') || text.toLowerCase().includes('portal'));
    });
    return {
      count: allFixed.length,
      badgeFound: !!badgeCandidate,
      candidates: allFixed.map(el => ({
        tag: el.tagName,
        text: ((el as HTMLElement).innerText || '').slice(0, 80),
        rect: (() => { const r = (el as HTMLElement).getBoundingClientRect(); return { w: r.width, h: r.height, bottom: r.bottom, right: r.right }; })()
      })).slice(0, 10)
    };
  });

  console.log(`\n====== [${label}] MODAL CHECKS ======`);
  console.log(`[data-lead-modal] present in DOM: ${present}`);
  console.log(`Parent element tag (should be BODY): ${parentTag}`);
  console.log(`getBoundingClientRect: ${JSON.stringify(rect)}`);
  console.log(`Computed z-index: ${zIndex}`);
  console.log(`elementFromPoint(720,450): ${JSON.stringify(elementFromPointInfo)}`);
  console.log(`Debug badge check: ${JSON.stringify(hasBadge)}`);
  console.log(`======================================\n`);

  return { present, parentTag, rect, zIndex, elementFromPointInfo, hasBadge };
}

test.describe('LeadCaptureModal Portal Verification', () => {
  let consoleLogs: string[] = [];

  test('PATH 1: Direct URL - /properties/downtown66', async () => {
    consoleLogs = [];
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      // Fresh incognito-style context (no persistent storage)
    });
    const page = await context.newPage();

    // Capture console logs
    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(text);
      if (text.toLowerCase().includes('gate') || text.toLowerCase().includes('lead')) {
        console.log(`[CONSOLE ${msg.type()}]: ${text}`);
      }
    });

    console.log('Navigating to direct URL: https://www.cornerhouse.co.in/properties/downtown66');
    await page.goto('https://www.cornerhouse.co.in/properties/downtown66', {
      waitUntil: 'load',
      timeout: 45000
    });

    // Wait 3 seconds for React hydration
    await page.waitForTimeout(3000);

    // Screenshot before modal check
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '01-direct-url-after-load.png'),
      fullPage: false
    });
    console.log('Screenshot saved: 01-direct-url-after-load.png');

    const results = await checkModal(page, 'DIRECT URL');

    // Check for [gate] / [lead-gate] debug logs
    const debugLogs = consoleLogs.filter(l =>
      l.includes('[gate]') || l.includes('[lead-gate]') || l.includes('[lead gate]')
    );
    console.log(`Debug [gate] console logs: ${debugLogs.length}`);
    if (debugLogs.length > 0) {
      console.log('Debug logs found (should be ZERO):', debugLogs);
    }

    // Screenshot with modal visible
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '02-direct-url-modal-state.png'),
      fullPage: false
    });

    // ASSERTIONS
    expect(results.present, '[data-lead-modal] should be in DOM').toBe(true);
    expect(results.parentTag, 'Modal parent should be BODY (Portal)').toBe('BODY');
    expect(results.rect?.width, 'Modal should have non-zero width').toBeGreaterThan(0);
    expect(results.rect?.height, 'Modal should have non-zero height').toBeGreaterThan(0);
    expect(results.rect?.top, 'Modal should be within viewport top').toBeGreaterThanOrEqual(0);
    expect(results.rect?.left, 'Modal should be within viewport left').toBeGreaterThanOrEqual(0);
    expect(results.elementFromPointInfo?.insideModal, 'Center of viewport should be inside modal').toBe(true);
    expect(debugLogs.length, 'No [gate] debug logs should appear').toBe(0);
    expect(results.hasBadge.badgeFound, 'Debug badge should be removed').toBe(false);

    await context.close();
    await browser.close();
  });

  test('PATH 2: SPA navigation - Homepage carousel → VIEW DETAILS', async () => {
    consoleLogs = [];
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push(text);
      if (text.toLowerCase().includes('gate') || text.toLowerCase().includes('lead')) {
        console.log(`[CONSOLE ${msg.type()}]: ${text}`);
      }
    });

    console.log('Navigating to homepage: https://www.cornerhouse.co.in/');
    await page.goto('https://www.cornerhouse.co.in/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '03-spa-homepage-loaded.png'),
      fullPage: false
    });

    // Find "VIEW DETAILS" button - try multiple selectors
    console.log('Looking for VIEW DETAILS button...');
    const viewDetailsSelectors = [
      'text=VIEW DETAILS',
      'button:has-text("VIEW DETAILS")',
      'a:has-text("VIEW DETAILS")',
      '[data-testid*="view-details"]',
      'text=View Details',
      'button:has-text("View Details")',
    ];

    let clicked = false;
    for (const sel of viewDetailsSelectors) {
      try {
        const el = page.locator(sel).first();
        const count = await el.count();
        if (count > 0) {
          console.log(`Found VIEW DETAILS with selector: ${sel} (${count} matches)`);
          await el.scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(ARTIFACTS_DIR, '04-spa-before-click.png'),
            fullPage: false
          });
          await el.click({ timeout: 5000 });
          clicked = true;
          console.log('Clicked VIEW DETAILS');
          break;
        }
      } catch (e) {
        // try next
      }
    }

    if (!clicked) {
      // Dump all buttons/links text for debugging
      const allButtons = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button, a')).map(el => ({
          tag: el.tagName,
          text: (el as HTMLElement).innerText?.slice(0, 60),
          class: el.className?.slice(0, 60)
        })).filter(b => b.text && b.text.trim().length > 0).slice(0, 30);
      });
      console.log('Available buttons/links:', JSON.stringify(allButtons, null, 2));

      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, '04-spa-no-button-found.png'),
        fullPage: false
      });
      throw new Error('Could not find VIEW DETAILS button on homepage');
    }

    // Wait 3s for navigation + React hydration
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '05-spa-after-view-details-click.png'),
      fullPage: false
    });

    const results = await checkModal(page, 'SPA NAVIGATION');

    const debugLogs = consoleLogs.filter(l =>
      l.includes('[gate]') || l.includes('[lead-gate]') || l.includes('[lead gate]')
    );
    console.log(`Debug [gate] console logs: ${debugLogs.length}`);
    if (debugLogs.length > 0) {
      console.log('Debug logs found (should be ZERO):', debugLogs);
    }

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, '06-spa-modal-state.png'),
      fullPage: false
    });

    // ASSERTIONS
    expect(results.present, '[data-lead-modal] should be in DOM').toBe(true);
    expect(results.parentTag, 'Modal parent should be BODY (Portal)').toBe('BODY');
    expect(results.rect?.width, 'Modal should have non-zero width').toBeGreaterThan(0);
    expect(results.rect?.height, 'Modal should have non-zero height').toBeGreaterThan(0);
    expect(results.elementFromPointInfo?.insideModal, 'Center of viewport should be inside modal').toBe(true);
    expect(debugLogs.length, 'No [gate] debug logs should appear').toBe(0);
    expect(results.hasBadge.badgeFound, 'Debug badge should be removed').toBe(false);

    await context.close();
    await browser.close();
  });
});
