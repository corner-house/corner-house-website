import type { PropertyListing } from '../schema';

interface ReraProps {
  rera: PropertyListing['rera'];
}

export default function Rera({ rera }: ReraProps) {
  return (
    <section id="rera" className="py-8 bg-secondary/30 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          <div>
            <div
              className="text-xl font-medium text-primary mb-1"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              registration
            </div>
            <div className="font-mono text-sm break-all">{rera.number}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            <div>
              Issued by <span className="text-foreground font-medium">{rera.authority}</span>,{' '}
              {rera.state}
            </div>
            {rera.registeredDate && <div>Registered: {rera.registeredDate}</div>}
            {rera.validUpto && <div>Valid up to: {rera.validUpto}</div>}
          </div>
          {rera.verificationUrl && (
            <a
              href={rera.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase text-primary hover:underline justify-self-start md:justify-self-end"
            >
              Verify on {rera.authority} portal →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
