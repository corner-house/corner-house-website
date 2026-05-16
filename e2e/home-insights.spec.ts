import { test, expect } from '@playwright/test';

test('homepage Insights section surfaces real blog posts and routes to /blog', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  await page.goto('http://localhost:3000/#insights', { waitUntil: 'load' });

  const section = page.locator('#insights');
  await expect(section).toBeVisible({ timeout: 15000 });

  // Pin the assertion to the krisumi-forest-reserve-review post specifically — the section
  // can hold multiple Krisumi-related posts as more content lands.
  const reviewLink = section.locator('a[href="/blog/krisumi-forest-reserve-review"]');
  await expect(reviewLink).toBeVisible();

  // Old hard-coded placeholders should be gone.
  await expect(section.getByText(/Delhi NCR Luxury Report/i)).toHaveCount(0);
  await expect(section.getByText(/Farmhouses in Chattarpur/i)).toHaveCount(0);
  await expect(section.getByText(/DLF Camellias/i)).toHaveCount(0);

  // "View All Posts" CTA routes to /blog.
  const viewAll = section.getByRole('link', { name: /View All Posts/i });
  await expect(viewAll).toHaveAttribute('href', '/blog');

  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toEqual([]);
});
