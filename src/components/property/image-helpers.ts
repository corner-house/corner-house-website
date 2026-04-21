import type { ImageVariants, PropertyListing } from './schema';

export function getImage(listing: PropertyListing, key: string): ImageVariants {
  const variants = listing.images[key];
  if (!variants) {
    throw new Error(
      `Image key "${key}" not found in property "${listing.slug}" manifest. ` +
        `Available keys: ${Object.keys(listing.images).slice(0, 10).join(', ')}${
          Object.keys(listing.images).length > 10 ? '…' : ''
        }`,
    );
  }
  return variants;
}

export function getImageOrNull(
  listing: PropertyListing,
  key: string | undefined,
): ImageVariants | null {
  if (!key) return null;
  return listing.images[key] ?? null;
}

export interface ResponsiveImgProps {
  variants: ImageVariants;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
}
