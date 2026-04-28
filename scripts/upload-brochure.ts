import { readFileSync, existsSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

loadEnv({ path: '.env.local' });

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) {
    console.error(`Missing env var: ${key} (expected in .env.local)`);
    process.exit(1);
  }
  return v;
}

async function main() {
  const [slugArg, localPathArg] = process.argv.slice(2);
  if (!slugArg || !localPathArg) {
    console.error('Usage: npx tsx scripts/upload-brochure.ts <slug> <localPath>');
    process.exit(1);
  }
  const slug = slugArg.trim();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error(`Invalid slug "${slug}" — must be lowercase-hyphenated.`);
    process.exit(1);
  }
  if (!existsSync(localPathArg)) {
    console.error(`File not found: ${localPathArg}`);
    process.exit(1);
  }

  const filename = basename(localPathArg);
  const ext = extname(filename).toLowerCase();
  const contentType = mime.lookup(ext) || 'application/octet-stream';
  const buffer = readFileSync(localPathArg);

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

  const key = `${slug}/brochure/${filename}`;
  process.stdout.write(`Uploading ${filename} (${(buffer.length / 1024 / 1024).toFixed(2)} MB) → ${bucket}/${key}... `);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ContentDisposition: `attachment; filename="${filename}"`,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
  process.stdout.write('✓\n');

  const finalUrl = `${publicUrl}/${key}`;
  console.log(`\nPublic URL:\n${finalUrl}\n`);
  console.log(`Add to data/properties/${slug}-source.json:`);
  console.log(`  "brochureUrl": "${finalUrl}",`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
