import { CheckCircle2 } from 'lucide-react';
import type { PropertyListing } from '../schema';
import { getImageOrNull } from '../image-helpers';
import { DoodleHouses } from '../Doodles';
import NarrativeCard from '../NarrativeCard';

interface NeighbourhoodProps {
  neighbourhood: PropertyListing['neighbourhood'];
  listing: PropertyListing;
}

export default function Neighbourhood({ neighbourhood, listing }: NeighbourhoodProps) {
  const backdrop = getImageOrNull(listing, neighbourhood.backdropImageKey);
  const [firstPara, ...restParas] = neighbourhood.paragraphs;
  const useCards = neighbourhood.cards.length > 0;

  return (
    <section id="neighbourhood" className="bg-[#F8EFE9]">
      {backdrop && (
        <div className="relative h-[440px] sm:h-[500px] md:h-[600px] overflow-hidden">
          <img
            src={backdrop.hero}
            alt={neighbourhood.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-10 md:pb-14">
              <div className="max-w-3xl text-white">
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <DoodleHouses className="text-white/80 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                  <div className="min-w-0">
                    <span
                      className="block text-xl sm:text-2xl md:text-3xl font-medium text-[#FAF6E8]"
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontWeight: 500,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                      }}
                    >
                      the neighbourhood
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium tracking-tight leading-tight"
                      style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
                    >
                      {neighbourhood.title}
                    </h2>
                  </div>
                </div>
                <p
                  className="font-light leading-relaxed text-sm sm:text-base md:text-lg text-white/95 max-w-2xl line-clamp-4 sm:line-clamp-none"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55)' }}
                >
                  {firstPara}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {useCards
              ? neighbourhood.cards.map((card, i) => (
                  <NarrativeCard
                    key={`${i}-${card.label}`}
                    icon={card.icon}
                    label={card.label}
                    body={card.body}
                  />
                ))
              : (backdrop ? restParas : neighbourhood.paragraphs).map((para, i) => (
                  <p
                    key={i}
                    className="text-foreground/75 font-light leading-relaxed text-base md:text-lg"
                  >
                    {para}
                  </p>
                ))}
          </div>

          <aside>
            <div className="bg-white/70 border-l-4 border-primary p-5 lg:sticky lg:top-6">
              <div
                className="text-xl font-medium text-primary mb-3"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                why it matters
              </div>
              <ul className="space-y-3">
                {neighbourhood.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-light text-sm md:text-base">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
