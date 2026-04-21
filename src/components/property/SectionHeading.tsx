import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  doodle?: ReactNode;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  doodle,
  className,
  titleClassName,
  eyebrowClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-6 md:mb-8',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div className={cn('flex items-center gap-4', align === 'center' && 'justify-center')}>
        {doodle && <div className="flex-shrink-0">{doodle}</div>}
        <div>
          <span
            className={cn(
              'block text-2xl md:text-3xl font-medium text-primary mb-0',
              eyebrowClassName,
            )}
            style={{ fontFamily: 'var(--font-accent)', fontWeight: 500 }}
          >
            {eyebrow}
          </span>
          <h2
            className={cn(
              'text-3xl md:text-4xl font-heading font-medium tracking-tight leading-tight',
              titleClassName,
            )}
          >
            {title}
          </h2>
        </div>
      </div>
      {description && (
        <p className="mt-4 text-muted-foreground font-light text-base md:text-lg max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
