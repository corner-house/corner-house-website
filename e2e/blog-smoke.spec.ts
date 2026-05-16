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
  await expect(page.getByText('On Request').first()).toBeVisible();
  await expect(page.getByText('November 2030').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Request Callback' })).toBeVisible();
  await expect(page.getByText('Corner House Scorecard').first()).toBeVisible();
  await expect(page.getByText('All-In Cost Breakdown').first()).toBeVisible();
  // New sections from the upgrade.
  await expect(page.getByRole('heading', { name: 'Amenities and Lifestyle' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Price and Value for Money' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What Buyers Are Saying' })).toBeVisible();
  await expect(page.getByText('Corner House Verdict').first()).toBeVisible();
  // Brochure card is now a lead-gated button: click opens LeadCaptureModal; on submit it
  // redirects to the R2 PDF in a new tab. We just verify the button exists here.
  const brochureBtn = page.getByRole('button', { name: /Download Brochure/i });
  await expect(brochureBtn).toBeVisible();

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
