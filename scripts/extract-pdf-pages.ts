import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';

interface MappingEntry {
  page: number;
  filename: string;
}

const TARGET_WIDTH = 2400;
const JPEG_QUALITY = 90;
const RENDER_SCALE = 4;

function die(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function sanitizeFilename(raw: string): string {
  const name = raw.trim().replace(/\.jpe?g$/i, '');
  if (name.length === 0) die(`Empty filename after trim`);
  if (name.includes('/') || name.includes('\\') || name.includes('..')) {
    die(`Filename "${raw}" contains path separators or traversal`);
  }
  if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    die(`Filename "${raw}" must match [A-Za-z0-9._-]+`);
  }
  return name;
}

function parseMapping(path: string): MappingEntry[] {
  if (!existsSync(path)) die(`Mapping file not found: ${path}`);

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    die(`Failed to parse mapping JSON at ${path}: ${(err as Error).message}`);
  }

  if (!Array.isArray(parsed)) die(`Mapping must be an array, got ${typeof parsed}`);
  if (parsed.length === 0) die(`Mapping is empty`);

  const seen = new Set<string>();
  return parsed.map((raw, i): MappingEntry => {
    if (typeof raw !== 'object' || raw === null) die(`Entry ${i}: not an object`);
    const entry = raw as Record<string, unknown>;

    const page = entry.page;
    if (typeof page !== 'number' || !Number.isInteger(page) || page < 1) {
      die(`Entry ${i}: "page" must be a positive integer, got ${JSON.stringify(page)}`);
    }

    const filenameRaw = entry.filename;
    if (typeof filenameRaw !== 'string') {
      die(`Entry ${i}: "filename" must be a string, got ${typeof filenameRaw}`);
    }
    const filename = sanitizeFilename(filenameRaw);

    if (seen.has(filename)) {
      die(`Entry ${i}: duplicate filename "${filename}" — each output must be unique`);
    }
    seen.add(filename);

    return { page, filename };
  });
}

async function renderPageToJpg(
  pngBuffer: Buffer,
  outputPath: string,
): Promise<void> {
  const jpgBuffer = await sharp(pngBuffer)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize({ width: TARGET_WIDTH, withoutEnlargement: false, fit: 'inside' })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
  writeFileSync(outputPath, jpgBuffer);
}

async function main() {
  const [pdfPathArg, mappingPathArg, outputDirArg] = process.argv.slice(2);
  if (!pdfPathArg || !mappingPathArg || !outputDirArg) {
    console.error(
      'Usage: npx tsx scripts/extract-pdf-pages.ts <pdfPath> <mappingFile> <outputDir>',
    );
    process.exit(1);
  }

  const pdfPath = resolve(pdfPathArg);
  const mappingPath = resolve(mappingPathArg);
  const outputDir = resolve(outputDirArg);

  if (!existsSync(pdfPath)) die(`PDF not found: ${pdfPath}`);

  const mapping = parseMapping(mappingPath);
  mkdirSync(outputDir, { recursive: true });

  console.log(`PDF:      ${pdfPath}`);
  console.log(`Mapping:  ${mappingPath} (${mapping.length} entries)`);
  console.log(`Output:   ${outputDir}\n`);

  let document;
  try {
    document = await pdf(pdfPath, { scale: RENDER_SCALE });
  } catch (err) {
    die(`Failed to open PDF: ${(err as Error).message}`);
  }

  const totalPages = document.length;
  let extracted = 0;
  let skipped = 0;

  for (let i = 0; i < mapping.length; i++) {
    const { page, filename } = mapping[i];
    const idx = `[${i + 1}/${mapping.length}]`;

    if (page > totalPages) {
      console.log(
        `${idx} page ${page} → ✗ skipped (PDF has ${totalPages} page${
          totalPages === 1 ? '' : 's'
        })`,
      );
      skipped++;
      continue;
    }

    const outputPath = join(outputDir, `${filename}.jpg`);
    process.stdout.write(`${idx} page ${page} → ${filename}.jpg `);

    try {
      const pngBuffer = await document.getPage(page);
      await renderPageToJpg(pngBuffer, outputPath);
      process.stdout.write('✓\n');
      extracted++;
    } catch (err) {
      process.stdout.write(`✗ ${(err as Error).message}\n`);
      skipped++;
    }
  }

  console.log(`\n✓ ${extracted} extracted, ✗ ${skipped} skipped`);
  process.exit(skipped > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(`Fatal: ${(err as Error).message}`);
  process.exit(1);
});
