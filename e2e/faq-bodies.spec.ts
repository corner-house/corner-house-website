import { test, expect } from '@playwright/test';

const ANSWER_STARTS = [
  'Yes, Krisumi Forest Reserve is worth serious consideration',
  'The krisumi forest reserve price is available on request',
  'The hidden costs at Krisumi Forest Reserve that buyers consistently',
  'The key pros of Krisumi Forest Reserve are:',
  'Yes, based on available evidence, Krisumi Corporation',
  'Krisumi Waterfall Residences and Krisumi Forest Reserve are both',
  'Krisumi Forest Reserve carries two HARERA registration numbers',
  'The HARERA-registered possession date for Krisumi Forest Reserve',
  'Krisumi Forest Reserve is under construction with a June 2031',
  "Krisumi Forest Reserve's construction quality advantage",
];

test('all 10 FAQ answers render in the DOM (regardless of open state)', async ({ page }) => {
  await page.goto('http://localhost:3000/blog/krisumi-forest-reserve-review', {
    waitUntil: 'load',
  });
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible({
    timeout: 15000,
  });

  // Verify each answer's first sentence is present in the DOM, even before user interaction.
  // This is the key invariant — SSG/SSR must include all 10 answers for crawlers + AI citation.
  for (const phrase of ANSWER_STARTS) {
    const count = await page.getByText(phrase, { exact: false }).count();
    expect(count, `Answer phrase missing from DOM: "${phrase}"`).toBeGreaterThanOrEqual(1);
  }

  // Click items 2..10 and verify each panel becomes visible.
  const buttons = page.locator('section.my-12 button[aria-expanded]');
  const count = await buttons.count();
  expect(count).toBe(10);
  for (let i = 1; i < count; i++) {
    const btn = buttons.nth(i);
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    const panelId = await btn.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = page.locator(`#${panelId}`);
    await expect(panel).toBeVisible();
    const text = (await panel.textContent())?.trim() ?? '';
    expect(text.length, `Item ${i} body empty`).toBeGreaterThan(50);
  }
});
