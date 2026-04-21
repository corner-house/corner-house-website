import { MessageSquare, Phone, Mail } from 'lucide-react';
import { SITE_CONTACT, phoneLink, whatsappLink } from '@/site-contact';
import { DoodleChat } from '../Doodles';

interface ContactBlockProps {
  projectName: string;
  locality: string;
}

export default function ContactBlock({ projectName, locality }: ContactBlockProps) {
  const message = `Hi, I'd like to schedule a viewing for ${projectName} in ${locality}.`;

  return (
    <section id="contact" className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="bg-luxury-charcoal text-white bg-[#1c1c1c] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <DoodleChat className="text-primary/70 w-10 h-10" />
              <div>
                <span
                  className="block text-2xl md:text-3xl font-medium text-primary"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  let's talk
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight">
                  Speak to an advisor
                </h2>
              </div>
            </div>
            <p className="text-white/70 font-light max-w-md">
              Our team handles every viewing personally. Tell us a good time to meet and we'll
              arrange a private visit, typically within 48 hours.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-5 transition-colors"
            >
              <MessageSquare className="mr-3 h-5 w-5" /> WhatsApp us
            </a>
            <a
              href={phoneLink()}
              className="flex items-center justify-start rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white font-medium px-6 py-5 transition-colors"
            >
              <Phone className="mr-3 h-5 w-5" /> Call {SITE_CONTACT.phone}
            </a>
            <a
              href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${projectName}`)}`}
              className="flex items-center justify-start rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white font-medium px-6 py-5 transition-colors"
            >
              <Mail className="mr-3 h-5 w-5" /> Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
