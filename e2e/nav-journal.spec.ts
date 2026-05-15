import { test, expect } from '@playwright/test';

test('JOURNAL nav link routes to /blog via client-side navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  // Home page is heavy (motion + many sections); 'load' is sufficient — we don't need every
  // background asset to settle before interacting with the nav.
  await page.goto('http://localhost:3000/', { waitUntil: 'load' });

  const journalLink = page.getByRole('navigation').getByRole('link', { name: /^Journal$/i });
  await expect(journalLink).toBeVisible({ timeout: 15000 });
  await expect(journalLink).toHaveAttribute('href', '/blog');

  await journalLink.click();
  await page.waitForURL('**/blog', { timeout: 15000 });
  expect(page.url()).toMatch(/\/blog$/);

  // Confirm we landed on the listing, not the homepage insights section.
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Honest reviews');
  await expect(
    page.getByRole('link', { name: /Krisumi Forest Reserve/ }).first(),
  ).toBeVisible();

  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toEqual([]);
});
