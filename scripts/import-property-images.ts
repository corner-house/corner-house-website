import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import mime from 'mime-types';

loadEnv({ path: '.env.local' });

type Variant = { name: 'hero' | 'gallery' | 'thumb'; maxWidth: number; quality: number };

const VARIANTS: Variant[] = [
  { name: 'hero', maxWidth: 2000, quality: 85 },
  { name: 'gallery', maxWidth: 1200, quality: 82 },
  { name: 'thumb', maxWidth: 400, quality: 80 },
];

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.tif', '.tiff']);

type Manifest = {
  propertyName: string;
  uploadedAt: string;
  totalImages: number;
  images: Record<string, Record<string, string>>;
};

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) {
    console.error(`Missing env var: ${key} (expected in .env.local)`);
    process.exit(1);
  }
  return v;
}

function cleanName(rawFilename: string, propertyName: string): { stem: string; ext: string } {
  const ext = extname(rawFilename).toLowerCase();
  let stem = basename(rawFilename, extname(rawFilename));

  stem = stem.toLowerCase();
  stem = stem.replace(/[\s_]+/g, '-');
  stem = stem.replace(/[^a-z0-9-]/g, '-');
  stem = stem.replace(/-+/g, '-');
  stem = stem.replace(/^-+|-+$/g, '');

  const prefixVariants = new Set<string>();
  prefixVariants.add(propertyName.toLowerCase());
  prefixVariants.add(propertyName.toLowerCase().replace(/[\s_]+/g, '-'));
  const humanized = propertyName.replace(/([a-z])([0-9])/gi, '$1-$2').toLowerCase();
  prefixVariants.add(humanized);

  for (const prefix of prefixVariants) {
    if (prefix && stem.startsWith(`${prefix}-`)) {
      stem = stem.slice(prefix.length + 1);
      break;
    }
  }

  stem = stem.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

  return { stem, ext };
}

function filenameFromUrl(url: string): string {
  const u = new URL(url);
  const last = u.pathname.split('/').filter(Boolean).pop() ?? 'image';
  return decodeURIComponent(last);
}

async function downloadToBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function keyExists(s3: S3Client, bucket: string, key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (err: any) {
    const status = err?.$metadata?.httpStatusCode;
    if (status === 404 || err?.name === 'NotFound' || err?.name === 'NoSuchKey') return false;
    throw err;
  }
}

async function putObject(
  s3: S3Client,
  bucket: string,
  key: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
}

async function toWebpVariant(input: Buffer, maxWidth: number, quality: number): Promise<Buffer> {
  return sharp(input, { failOn: 'none' })
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .withMetadata({ exif: {}, icc: undefined as unknown as string })
    .toBuffer();
}

async function main() {
  const [propertyNameArg, urlListFileArg] = process.argv.slice(2);
  if (!propertyNameArg || !urlListFileArg) {
    console.error('Usage: npx tsx scripts/import-property-images.ts <propertyName> <urlListFile>');
    process.exit(1);
  }
  const propertyName = propertyNameArg.trim();
  const urlListFile = urlListFileArg;

  if (!existsSync(urlListFile)) {
    console.error(`URL list file not found: ${urlListFile}`);
    process.exit(1);
  }

  const accessKeyId = requireEnv('R2_ACCESS_KEY_ID');
  const secretAccessKey = requireEnv('R2_SECRET_ACCESS_KEY');
  const endpoint = requireEnv('R2_ENDPOINT');
  const bucket = requireEnv('R2_BUCKET_NAME');
  const publicUrl = requireEnv('R2_PUBLIC_URL').replace(/\/+$/, '');

  const s3 = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });

  const urls = readFileSync(urlListFile, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  const total = urls.length;
  console.log(`Importing ${total} images for property "${propertyName}"\n`);

  const manifestPath = `data/properties/${propertyName}-images.json`;
  const logPath = `logs/${propertyName}-failed.txt`;
  mkdirSync(dirname(manifestPath), { recursive: true });
  mkdirSync(dirname(logPath), { recursive: true });

  let existingManifest: Manifest | null = null;
  if (existsSync(manifestPath)) {
    try {
      existingManifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest;
    } catch {
      existingManifest = null;
    }
  }

  const manifest: Manifest = {
    propertyName,
    uploadedAt: new Date().toISOString(),
    totalImages: 0,
    images: existingManifest?.images ?? {},
  };

  let succeeded = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const idx = `[${i + 1}/${total}]`;
    const rawName = filenameFromUrl(url);
    const { stem, ext } = cleanName(rawName, propertyName);

    if (!stem) {
      console.log(`${idx} ✗ skipped (empty filename after cleaning): ${url}`);
      appendFileSync(logPath, `${url}\treason=empty-filename\n`);
      failed++;
      continue;
    }
    if (!ALLOWED_EXT.has(ext)) {
      console.log(`${idx} ✗ skipped (unsupported ext ${ext}): ${url}`);
      appendFileSync(logPath, `${url}\treason=unsupported-ext\n`);
      failed++;
      continue;
    }

    const originalKey = `${propertyName}/originals/${stem}${ext}`;
    const variantKeys = VARIANTS.map((v) => ({
      variant: v,
      key: `${propertyName}/webp/${v.name}/${stem}.webp`,
    }));

    process.stdout.write(`${idx} ${stem}${ext} `);

    try {
      const [origExists, ...variantExists] = await Promise.all([
        keyExists(s3, bucket, originalKey),
        ...variantKeys.map((v) => keyExists(s3, bucket, v.key)),
      ]);
      const allExist = origExists && variantExists.every(Boolean);

      if (allExist) {
        process.stdout.write('skip (all exist) ✓\n');
      } else {
        process.stdout.write('downloading... ');
        const buf = await downloadToBuffer(url);
        process.stdout.write('✓ ');

        if (!origExists) {
          const contentType = mime.lookup(ext) || 'application/octet-stream';
          await putObject(s3, bucket, originalKey, buf, contentType);
        }

        process.stdout.write('converting... ');
        const variantBuffers = await Promise.all(
          VARIANTS.map((v) => toWebpVariant(buf, v.maxWidth, v.quality)),
        );
        process.stdout.write('✓ ');

        process.stdout.write('uploading... ');
        await Promise.all(
          variantKeys.map((vk, vi) => {
            if (variantExists[vi]) return Promise.resolve();
            return putObject(s3, bucket, vk.key, variantBuffers[vi], 'image/webp');
          }),
        );
        process.stdout.write('✓\n');
      }

      manifest.images[stem] = {
        original: `${publicUrl}/${originalKey}`,
        hero: `${publicUrl}/${propertyName}/webp/hero/${stem}.webp`,
        gallery: `${publicUrl}/${propertyName}/webp/gallery/${stem}.webp`,
        thumb: `${publicUrl}/${propertyName}/webp/thumb/${stem}.webp`,
      };
      succeeded++;
    } catch (err: any) {
      process.stdout.write(`✗ ${err?.message ?? String(err)}\n`);
      appendFileSync(logPath, `${url}\treason=${(err?.message ?? 'unknown').replace(/\s+/g, ' ')}\n`);
      failed++;
    }
  }

  manifest.totalImages = Object.keys(manifest.images).length;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`\nManifest: ${manifestPath}`);
  if (failed > 0) console.log(`Failures logged to: ${logPath}`);
  console.log(`\n✓ ${succeeded} succeeded, ✗ ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
