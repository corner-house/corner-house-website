import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/blog';

test('/blog index lists the krisumi-forest-reserve-review card', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });

  await page.goto(URL, { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Honest reviews');
  // Featured card surfaces the post.
  const card = page.getByRole('link', { name: /Krisumi Forest Reserve/ }).first();
  await expect(card).toBeVisible();
  await expect(card).toHaveAttribute('href', '/blog/krisumi-forest-reserve-review');

  expect(errors, `Console/page errors:\n${errors.join('\n')}`).toEqual([]);
});
