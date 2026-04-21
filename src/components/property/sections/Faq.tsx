import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodleQuestion } from '../Doodles';

interface FaqProps {
  faqs: PropertyListing['faqs'];
}

export default function Faq({ faqs }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="good questions"
          title="Frequently asked"
          doodle={<DoodleQuestion />}
        />

        <ul className="max-w-3xl mx-auto bg-white border border-border/40 divide-y divide-dashed divide-border/50">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="w-full flex justify-between items-center gap-4 px-5 py-4 text-left hover:bg-secondary/20 transition-colors"
                >
                  <span className="font-heading font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary transition-transform flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-${i}`}
                    className="px-5 pb-5 text-muted-foreground font-light leading-relaxed"
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
