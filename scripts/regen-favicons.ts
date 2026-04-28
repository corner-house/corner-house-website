import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SOURCE_SVG = 'public/favicon.svg';

async function render(targetPath: string, size: number) {
  const svg = readFileSync(SOURCE_SVG);
  const png = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(targetPath, png);
  console.log(`✓ ${targetPath} (${size}×${size})`);
}

async function main() {
  await render('public/favicon-32.png', 32);
  await render('public/apple-touch-icon.png', 180);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
