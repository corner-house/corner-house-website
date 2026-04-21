import SectionHeading from '../SectionHeading';

interface SimilarPropertiesProps {
  slugs: string[];
}

export default function SimilarProperties({ slugs }: SimilarPropertiesProps) {
  if (slugs.length === 0) return null;
  return (
    <section id="similar" className="py-10 md:py-12 bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="more like this" title="You may also like" />
        <div className="text-sm text-muted-foreground">
          ({slugs.length} related listings — render via registry once populated.)
        </div>
      </div>
    </section>
  );
}
