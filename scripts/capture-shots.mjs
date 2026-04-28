import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('/tmp/shots', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({
  path: '/tmp/shots/1-navbar-top.png',
  clip: { x: 0, y: 0, width: 1440, height: 200 },
});
console.log('1-navbar-top.png saved');

await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(800);
await page.screenshot({
  path: '/tmp/shots/2-navbar-scrolled.png',
  clip: { x: 0, y: 0, width: 1440, height: 140 },
});
console.log('2-navbar-scrolled.png saved');

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);
const footerBox = await page.locator('footer').first().boundingBox();
if (footerBox) {
  const docH = await page.evaluate(() => document.body.scrollHeight);
  const viewportH = 900;
  const maxScrollY = docH - viewportH;
  const footerY = footerBox.y - maxScrollY;
  await page.screenshot({
    path: '/tmp/shots/3-footer.png',
    clip: { x: 0, y: Math.max(0, footerY), width: 1440, height: Math.min(viewportH - Math.max(0, footerY), 900) },
  });
} else {
  await page.screenshot({ path: '/tmp/shots/3-footer.png' });
}
console.log('3-footer.png saved');

await browser.close();
