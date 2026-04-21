import type { PropertyListing } from '../schema';
import { getImageOrNull } from '../image-helpers';
import { DoodleTrendingUp } from '../Doodles';
import NarrativeCard from '../NarrativeCard';

interface InvestmentThesisProps {
  thesis: PropertyListing['investmentThesis'];
  listing: PropertyListing;
}

export default function InvestmentThesis({ thesis, listing }: InvestmentThesisProps) {
  const backdrop = getImageOrNull(listing, thesis.backdropImageKey);
  const [firstPara, ...restParas] = thesis.paragraphs;
  const useCards = thesis.cards.length > 0;

  return (
    <section id="thesis" className="bg-[#FAF6E8]">
      {backdrop && (
        <div className="relative h-[440px] sm:h-[500px] md:h-[600px] overflow-hidden">
          <img
            src={backdrop.gallery}
            srcSet={`${backdrop.gallery} 1200w, ${backdrop.hero} 2000w`}
            sizes="100vw"
            alt={thesis.headline}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={2000}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-10 md:pb-14">
              <div className="max-w-3xl text-white">
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <DoodleTrendingUp className="text-white/80 w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                  <div className="min-w-0">
                    <span
                      className="block text-xl sm:text-2xl md:text-3xl font-medium text-[#FAF6E8]"
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontWeight: 500,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                      }}
                    >
                      the thesis
                    </span>
                    <h2
                      className="text-xl sm:text-2xl md:text-4xl font-heading font-medium tracking-tight leading-tight"
                      style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
                    >
                      {thesis.headline}
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
              ? thesis.cards.map((card, i) => (
                  <NarrativeCard
                    key={`${i}-${card.label}`}
                    icon={card.icon}
                    label={card.label}
                    body={card.body}
                  />
                ))
              : (backdrop ? restParas : thesis.paragraphs).map((p, i) => (
                  <p
                    key={i}
                    className="text-foreground/75 font-light leading-relaxed text-base md:text-lg"
                  >
                    {p}
                  </p>
                ))}
          </div>

          {thesis.dataPoints.length > 0 && (
            <aside className="space-y-5 lg:border-l lg:border-border lg:pl-8 lg:sticky lg:top-6 self-start">
              {thesis.dataPoints.map((dp) => (
                <div key={dp.label}>
                  <div className="text-3xl md:text-4xl font-heading font-semibold text-primary">
                    {dp.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{dp.label}</div>
                  {dp.source && (
                    <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
                      Source: {dp.source}
                    </div>
                  )}
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
