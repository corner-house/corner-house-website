import { test, expect } from '@playwright/test';

test('/blog cards each render a different hero image', async ({ page }) => {
  await page.goto('http://localhost:3000/blog', { waitUntil: 'load' });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15000 });

  // Collect the <img src> values inside every <a href="/blog/..."> card on the listing.
  const cardImageSrcs = await page.$$eval('a[href^="/blog/"]', (anchors) =>
    anchors
      .map((a) => {
        const img = a.querySelector('img');
        return img ? img.getAttribute('src') : null;
      })
      .filter((src): src is string => !!src && !src.includes('data:')),
  );

  expect(cardImageSrcs.length).toBeGreaterThanOrEqual(3);

  // Three or more cards must have distinct sources. The previous bug collapsed posts that
  // shared a basename across /webp/hero/ and /webp/gallery/ to the same /webp/thumb/ URL.
  const uniqueSrcs = new Set(cardImageSrcs);
  expect(
    uniqueSrcs.size,
    `Card images should be distinct. Got:\n${cardImageSrcs.join('\n')}`,
  ).toBeGreaterThanOrEqual(3);
});
