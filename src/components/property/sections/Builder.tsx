import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleHandshake } from '../Doodles';

interface BuilderProps {
  builder: PropertyListing['builder'];
}

export default function Builder({ builder }: BuilderProps) {
  return (
    <section id="builder" className="py-10 md:py-12 bg-[#F0F0F0]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="the developer"
          title={`About ${builder.name}`}
          description={builder.tagline}
          doodle={<DoodleHandshake />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-4 text-foreground/75 font-light leading-relaxed text-base md:text-lg">
            {builder.description.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <aside className="bg-white border border-border/40 p-5 space-y-4">
            {builder.logoUrl && (
              <img
                src={builder.logoUrl}
                alt={`${builder.name} logo`}
                className="h-12 object-contain"
                loading="lazy"
                decoding="async"
              />
            )}
            <dl className="space-y-2.5 text-sm">
              {builder.foundedYear !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Founded</dt>
                  <dd className="font-medium">{builder.foundedYear}</dd>
                </div>
              )}
              {builder.headquarters && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Headquarters</dt>
                  <dd className="font-medium">{builder.headquarters}</dd>
                </div>
              )}
            </dl>
            {builder.notableProjects.length > 0 && (
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Notable Projects
                </div>
                <ul className="space-y-1 text-sm">
                  {builder.notableProjects.map((p) => (
                    <li key={p} className="font-light">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {builder.websiteUrl && (
              <a
                href={builder.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm tracking-widest uppercase text-primary hover:underline"
              >
                Visit website →
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
