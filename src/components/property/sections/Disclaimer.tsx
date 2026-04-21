interface DisclaimerProps {
  addendum?: string;
}

const DEFAULT_DISCLAIMER =
  'The information, images, and artistic renderings on this page are illustrative and for marketing purposes only. Specifications, amenities, and pricing are subject to change and final confirmation by the developer. Actual product may vary from visualisations shown. This page does not constitute an offer or contract. Prospective purchasers should verify all information, including RERA registration, construction progress, and specifications, directly with the developer before making any commitment.';

export default function Disclaimer({ addendum }: DisclaimerProps) {
  return (
    <section className="py-6 border-t border-border/40 bg-background">
      <div className="container mx-auto px-6">
        <div
          className="text-xl font-medium text-muted-foreground mb-1"
          style={{ fontFamily: 'var(--font-accent)' }}
        >
          the fine print
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
          {DEFAULT_DISCLAIMER}
        </p>
        {addendum && (
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-4xl">{addendum}</p>
        )}
      </div>
    </section>
  );
}
