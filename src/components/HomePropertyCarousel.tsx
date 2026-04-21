import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '@/types';
import PropertyCard from './PropertyCard';

interface HomePropertyCarouselProps {
  properties: Property[];
  onNavigate: (id: string) => void;
}

export default function HomePropertyCarousel({
  properties,
  onNavigate,
}: HomePropertyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = properties.length;

  const updateActiveFromScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.clientWidth ?? 1;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0') || 0;
    const step = cardWidth + gap;
    const idx = Math.round(container.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => updateActiveFromScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [total]);

  const getStep = (): number => {
    const container = scrollRef.current;
    if (!container) return 0;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild?.clientWidth ?? 0;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0') || 0;
    return cardWidth + gap;
  };

  const isAtStart = (): boolean => {
    const container = scrollRef.current;
    if (!container) return true;
    return container.scrollLeft <= 4;
  };

  const isAtEnd = (): boolean => {
    const container = scrollRef.current;
    if (!container) return true;
    return container.scrollLeft + container.clientWidth >= container.scrollWidth - 4;
  };

  const next = () => {
    const container = scrollRef.current;
    if (!container) return;
    if (isAtEnd()) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: getStep(), behavior: 'smooth' });
    }
  };

  const prev = () => {
    const container = scrollRef.current;
    if (!container) return;
    if (isAtStart()) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -getStep(), behavior: 'smooth' });
    }
  };

  if (total === 0) return null;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured properties"
    >
      <div className="flex items-center justify-between mb-8 gap-6">
        <div
          className="font-heading text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-foreground">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-primary/40 mx-2">/</span>
          {String(total).padStart(2, '0')}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous property"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center shadow-sm active:scale-95 touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next property"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center shadow-sm active:scale-95 touch-manipulation"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 md:gap-8 -mx-6 px-6 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {properties.map((property, i) => (
          <div
            key={property.id}
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}: ${property.title}`}
          >
            <PropertyCard property={property} onClick={onNavigate} />
          </div>
        ))}
      </div>
    </div>
  );
}
