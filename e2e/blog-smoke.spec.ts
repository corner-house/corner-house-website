import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/blog/krisumi-forest-reserve-review';

test('blog post renders without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  await page.goto(URL, { waitUntil: 'networkidle' });

  // H1 from MDX, breadcrumb, FAQ, related posts — verify all rendered.
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Krisumi Forest Reserve');
  await expect(page.getByText('TL;DR').first()).toBeVisible();
  await expect(page.getByText('About this review:').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  await expect(page.getByText('About the Author').first()).toBeVisible();
  // Redesign assertions: stats bar values, sidebar callback CTA, scorecard, cost breakdown.
  await expect(page.getByText('Rs 6.29 Cr onwards').first()).toBeVisible();
  await expect(page.getByText('June 2031').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Request Callback' })).toBeVisible();
  await expect(page.getByText('Corner House Scorecard').first()).toBeVisible();
  await expect(page.getByText('All-In Cost Breakdown').first()).toBeVisible();

  // JSON-LD schemas: Article + FAQPage + BreadcrumbList.
  const schemaTypes = await page.$$eval(
    'script[type="application/ld+json"]',
    (nodes) => nodes.map((n) => {
      try { return JSON.parse(n.textContent ?? ''); } catch { return null; }
    }).filter(Boolean).map((s) => s['@type'])
  );
  expect(schemaTypes).toEqual(expect.arrayContaining(['Article', 'BreadcrumbList', 'FAQPage']));

  // Title set by SEO component.
  await expect(page).toHaveTitle(/Krisumi Forest Reserve/);

  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toEqual([]);
});
