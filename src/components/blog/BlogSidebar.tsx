import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Download, Phone } from 'lucide-react';
import LeadCaptureModal, { type LeadData } from '@/components/LeadCaptureModal';
import { SITE_CONTACT, phoneLink, whatsappLink } from '@/site-contact';
import WhatsAppIcon from './WhatsAppIcon';

interface RecentPost {
  slug: string;
  title: string;
  category: string;
  href?: string;
  // Optional thumbnail (uses heroImage from frontmatter). Rendered as a 64x64 square.
  thumbUrl?: string;
  thumbAlt?: string;
  // Optional ISO publish date, formatted for display.
  publishDate?: string;
  comingSoon?: boolean;
}

function formatRecentDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

interface BlogSidebarProps {
  projectName: string;
  contactSlug: string;
  recentPosts: RecentPost[];
  // Optional direct-PDF brochure URL. When set, the Download Brochure card becomes a direct
  // download link opening in a new tab (no form). When omitted, falls back to the contact page.
  brochureUrl?: string;
}

// Sticky right sidebar — 4 stacked cards. Sticky positioning is on the wrapper in BlogPost.
export default function BlogSidebar({ projectName, contactSlug, recentPosts, brochureUrl }: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      <AboutCard />
      <CallbackCard projectName={projectName} contactSlug={contactSlug} />
      <BrochureCard projectName={projectName} contactSlug={contactSlug} brochureUrl={brochureUrl} />
      <RecentPostsCard posts={recentPosts} />
    </aside>
  );
}

function AboutCard() {
  return (
    <div className="border border-border bg-card p-6">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-4">
        About Corner House
      </span>
      <p className="text-sm font-light text-muted-foreground leading-relaxed">
        We are an RERA-registered channel partner specialising in verified luxury real estate in
        Gurugram. Every review is based on official HARERA certificates and signed builder
        agreements.
      </p>
      <Link
        to="/about"
        className="mt-4 inline-flex items-center text-[11px] tracking-[0.3em] uppercase text-primary font-semibold group"
      >
        Learn More
        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function CallbackCard({ projectName }: { projectName: string; contactSlug: string }) {
  // The previous name+phone form submitted to a placeholder webhook that silently discarded
  // every lead (known backlog). Until the webhook is wired up, we route enquiries directly to
  // Saurabh's WhatsApp with the project name pre-filled so no lead is lost.
  const waMessage = `Hi, I'm interested in ${projectName}. Please share details.`;
  return (
    <div className="border border-primary/40 bg-primary/5 p-6">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-4">
        Request a Callback
      </span>
      <h4 className="text-xl font-heading font-medium leading-tight mb-2">
        Interested in {projectName}?
      </h4>
      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5">
        Talk to Saurabh directly. Site visits, price sheet, and honest answers.
      </p>
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full text-white py-3.5 text-[12px] tracking-[0.25em] uppercase font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#25D366' }}
      >
        <WhatsAppIcon className="h-4 w-4" />
        Chat on WhatsApp
      </a>
      <p className="mt-3 text-xs text-muted-foreground font-light text-center">
        or call{' '}
        <a href={phoneLink()} className="text-primary hover:underline font-medium">
          <Phone className="inline h-3 w-3 mr-1 align-baseline" aria-hidden />
          {SITE_CONTACT.phone}
        </a>
      </p>
    </div>
  );
}

function BrochureCard({
  projectName,
  contactSlug,
  brochureUrl,
}: {
  projectName: string;
  contactSlug: string;
  brochureUrl?: string;
}) {
  // Lead-gated brochure download: clicking the button opens the same LeadCaptureModal used on
  // property listing pages. On successful submission, push a dataLayer event for analytics and
  // open the brochure PDF in a new tab. If no brochureUrl is configured, fall back to a plain
  // contact link.
  const [open, setOpen] = useState(false);
  const baseClass =
    'inline-flex items-center justify-center w-full border border-primary text-primary py-3 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-primary hover:text-white transition-colors gap-2';

  // LeadCaptureModal POSTs to /api/lead itself (using the source/message we
  // pass below). onSuccess fires AFTER that POST has succeeded, so we just
  // need to push analytics and open the PDF. No duplicate fetch here.
  const waMessage = `Hi, I'm interested in the ${projectName} brochure. Please share details.`;
  const waHref = whatsappLink(waMessage);
  const handleSuccess = (data: LeadData) => {
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
      w.dataLayer?.push({
        event: 'blog_brochure_request',
        project: projectName,
        projectSlug: contactSlug,
        requestType: 'brochure',
        leadName: data.name,
      });
    }
    setOpen(false);
    if (brochureUrl && typeof window !== 'undefined') {
      window.open(brochureUrl, '_blank', 'noopener,noreferrer');
    } else if (typeof window !== 'undefined') {
      // Surface a manual WhatsApp fallback in the unlikely case brochureUrl
      // somehow ends up empty by the time onSuccess fires.
      window.open(waHref, '_blank', 'noopener,noreferrer');
    }
  };
  const leadSource =
    typeof window !== 'undefined'
      ? `blog-sidebar:${contactSlug} ${window.location.pathname}`
      : `blog-sidebar:${contactSlug}`;

  return (
    <div className="border border-border bg-card p-6">
      <FileText className="h-5 w-5 text-primary mb-4" aria-hidden />
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-3">
        Download Brochure
      </span>
      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5">
        Get the official brochure with all floor plans, pricing, and amenities.
      </p>
      {brochureUrl ? (
        <>
          <button type="button" onClick={() => setOpen(true)} className={baseClass}>
            <Download className="h-4 w-4" />
            Download Brochure
          </button>
          <LeadCaptureModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onSuccess={handleSuccess}
            title={`${projectName} — Brochure Download`}
            source={leadSource}
            message="Brochure request"
          />
        </>
      ) : (
        <Link to={`/contact?project=${contactSlug}&type=brochure`} className={baseClass}>
          Request Brochure
        </Link>
      )}
    </div>
  );
}

function RecentPostsCard({ posts }: { posts: RecentPost[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="border border-border bg-card p-6">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-5">
        Recent Posts
      </span>
      <ul className="space-y-5">
        {posts.map((p) => {
          const inner = (
            <div className="flex gap-4">
              {p.thumbUrl && (
                <img
                  src={p.thumbUrl}
                  alt={p.thumbAlt ?? ''}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 shrink-0 object-cover bg-muted text-[0px] text-transparent"
                />
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-primary block mb-1.5">
                  {p.category}
                </span>
                <span className="block text-sm font-heading font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                  {truncate(p.title, 50)}
                </span>
                {p.publishDate && !p.comingSoon && (
                  <span className="mt-1.5 block text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {formatRecentDate(p.publishDate)}
                  </span>
                )}
                {p.comingSoon && (
                  <span className="mt-1.5 block text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          );
          if (p.comingSoon || !p.href) {
            return (
              <li key={p.slug} className="block opacity-70">
                {inner}
              </li>
            );
          }
          return (
            <li key={p.slug}>
              <Link to={p.href} className="group block">
                {inner}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
