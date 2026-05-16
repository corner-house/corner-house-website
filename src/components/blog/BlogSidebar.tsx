import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RecentPost {
  slug: string;
  title: string;
  category: string;
  href?: string;
  comingSoon?: boolean;
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
      <BrochureCard contactSlug={contactSlug} brochureUrl={brochureUrl} />
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

function CallbackCard({ projectName, contactSlug }: { projectName: string; contactSlug: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ project: contactSlug });
    if (name.trim()) params.set('name', name.trim());
    if (phone.trim()) params.set('phone', phone.trim());
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <div className="border border-primary/40 bg-primary/5 p-6">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-4">
        Request a Callback
      </span>
      <h4 className="text-xl font-heading font-medium leading-tight mb-2">
        Interested in {projectName}?
      </h4>
      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5">
        Talk to Saurabh directly. Site visits, price sheet, and honest answers — no spam.
      </p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          className="bg-white"
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          required
          inputMode="tel"
          className="bg-white"
        />
        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary/90 rounded-none py-5 text-[11px] tracking-[0.3em] uppercase font-semibold"
        >
          Request Callback
        </Button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground font-light">
        Your details go only to Saurabh directly.
      </p>
    </div>
  );
}

function BrochureCard({ contactSlug, brochureUrl }: { contactSlug: string; brochureUrl?: string }) {
  // When a direct PDF URL is provided, the card becomes a no-friction download (opens in a
  // new tab). When omitted, falls back to /contact?type=brochure for the lead-form path.
  const baseClass =
    'inline-flex items-center justify-center w-full border border-primary text-primary py-3 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-primary hover:text-white transition-colors gap-2';
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
        <a
          href={brochureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          <Download className="h-4 w-4" />
          Download Brochure PDF
        </a>
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
            <>
              <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-primary block mb-2">
                {p.category}
              </span>
              <span className="block text-base font-heading font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </span>
              {p.comingSoon && (
                <span className="mt-2 inline-block text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  Coming soon
                </span>
              )}
            </>
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
