interface StripImage {
  src: string;
  alt: string;
}

interface DesignImageStripProps {
  images: StripImage[];
}

// Horizontal scrollable photo strip used in the Design and Architecture section. Each image
// is a fixed-height card (240px) so the strip scrolls horizontally on overflow regardless of
// the underlying aspect ratio — works on mobile too.
export default function DesignImageStrip({ images }: DesignImageStripProps) {
  if (images.length === 0) return null;
  return (
    <div className="not-prose my-8 -mx-6 md:mx-0 overflow-x-auto">
      <div className="flex gap-4 px-6 md:px-0 pb-3">
        {images.map((img, i) => (
          <figure
            key={`${img.src}-${i}`}
            className="shrink-0 overflow-hidden bg-muted rounded-sm"
            style={{ height: 240, width: 360 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              width={720}
              height={480}
              className="w-full h-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
