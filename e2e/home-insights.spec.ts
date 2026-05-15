import { test, expect } from '@playwright/test';

test('homepage Insights section shows real Krisumi post + two Coming Soon cards', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  await page.goto('http://localhost:3000/#insights', { waitUntil: 'load' });

  const section = page.locator('#insights');
  await expect(section).toBeVisible({ timeout: 15000 });

  // Real post: links to the blog detail page.
  const realLink = section.getByRole('link', { name: /Krisumi Forest Reserve/ });
  await expect(realLink).toBeVisible();
  await expect(realLink).toHaveAttribute('href', '/blog/krisumi-forest-reserve-review');

  // Old placeholders ("Delhi NCR Luxury Report", "Farmhouses in Chattarpur", "DLF Camellias")
  // should no longer be on this section.
  await expect(section.getByText(/Delhi NCR Luxury Report/i)).toHaveCount(0);
  await expect(section.getByText(/Farmhouses in Chattarpur/i)).toHaveCount(0);
  await expect(section.getByText(/DLF Camellias/i)).toHaveCount(0);

  // Two Coming Soon placeholders for the next two posts.
  await expect(section.getByText(/Coming Soon/i)).toHaveCount(2);

  // "View All Posts" CTA routes to /blog.
  const viewAll = section.getByRole('link', { name: /View All Posts/i });
  await expect(viewAll).toHaveAttribute('href', '/blog');

  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toEqual([]);
});
