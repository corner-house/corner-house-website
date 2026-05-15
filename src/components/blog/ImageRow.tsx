interface ImageRowItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageRowProps {
  images: ImageRowItem[];
  caption?: string;
}

// 2-up or 3-up image row inserted between body sections. On mobile collapses to a single
// column so each image stays legible. All images use lazy loading + explicit dimensions per
// the project's CLS-prevention rule.
export default function ImageRow({ images, caption }: ImageRowProps) {
  if (images.length === 0) return null;
  const colsClass =
    images.length === 2
      ? 'md:grid-cols-2'
      : images.length === 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2';

  return (
    <figure className="my-12">
      <div className={`grid grid-cols-1 ${colsClass} gap-4 md:gap-5`}>
        {images.map((img, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={img.src}
              alt={img.alt}
              width={img.width ?? 1200}
              height={img.height ?? 900}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-4 text-xs tracking-[0.2em] uppercase text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
