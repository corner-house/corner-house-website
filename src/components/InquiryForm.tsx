import { Phone, Mail } from 'lucide-react';
import { SITE_CONTACT, phoneLink, whatsappLink } from '@/site-contact';
import WhatsAppIcon from '@/components/blog/WhatsAppIcon';

interface InquiryFormProps {
  propertyTitle?: string;
  className?: string;
}

// Previously this rendered a name/email/phone/message form whose submit was a
// fake setTimeout — leads were silently discarded. While the real lead-capture
// webhook is being implemented, the form is replaced with direct WhatsApp +
// call + email CTAs. Surrounding layout and heading preserved.
export default function InquiryForm({ propertyTitle, className }: InquiryFormProps) {
  const heading = propertyTitle ? `Enquire about ${propertyTitle}` : 'Personal Advisory';
  const message = propertyTitle
    ? `Hi, I'm interested in ${propertyTitle}. Please share details.`
    : "Hi, I'd like to speak with a Corner House advisor.";
  return (
    <div className={`bg-white p-6 md:p-12 shadow-2xl border border-border/50 ${className ?? ''}`}>
      <div className="space-y-3 mb-8">
        <h3 className="text-3xl font-heading font-medium">{heading}</h3>
        <p className="text-muted-foreground font-light">
          Reach Saurabh directly on WhatsApp for fastest response. Site visits, price sheets,
          and honest answers — no spam.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full text-white py-5 text-[12px] tracking-[0.3em] uppercase font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Chat on WhatsApp
        </a>
        <a
          href={phoneLink()}
          className="flex items-center justify-center gap-3 w-full border border-primary text-primary py-5 text-[12px] tracking-[0.3em] uppercase font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call {SITE_CONTACT.phone}
        </a>
        <a
          href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(
            propertyTitle ? `Enquiry: ${propertyTitle}` : 'Enquiry',
          )}`}
          className="flex items-center justify-center gap-3 w-full text-muted-foreground py-3 text-[11px] tracking-[0.3em] uppercase font-semibold hover:text-primary transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email instead
        </a>
      </div>
    </div>
  );
}
