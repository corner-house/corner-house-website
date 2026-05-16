import { useState } from 'react';
import { Link } from 'react-router-dom';

interface AuthorCardProps {
  name: string;
  credential: string;
  bio: string;
  // Optional. Defaults to the canonical Saurabh portrait at the apex domain so MDX authors
  // don't need to pass it for the common case. onError still triggers the initials disc if
  // the URL fails at runtime.
  photoUrl?: string;
  profileUrl: string;
  achievement?: string;
}

const DEFAULT_PHOTO_URL = 'https://www.cornerhouse.co.in/saurabh-jain.png';

function initialOf(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
}

export default function AuthorCard({
  name,
  credential,
  bio,
  photoUrl = DEFAULT_PHOTO_URL,
  profileUrl,
  achievement,
}: AuthorCardProps) {
  // onError fallback kept as a safety net; the live photo is confirmed working in production.
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const showFallback = imgFailed || !photoUrl;

  return (
    <section className="not-prose my-16 border border-border p-8 md:p-10 bg-card">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-6">
        About the Author
      </span>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {showFallback ? (
          <div
            role="img"
            aria-label={`${name}, ${credential}`}
            className="h-20 w-20 rounded-full shrink-0 flex items-center justify-center font-heading font-medium text-3xl select-none"
            style={{ backgroundColor: '#C9933A', color: '#0D1F3C' }}
          >
            {initialOf(name)}
          </div>
        ) : (
          <img
            src={photoUrl}
            alt={`${name}, ${credential}`}
            width={80}
            height={80}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-20 w-20 rounded-full object-cover object-top shrink-0 border border-border text-[0px] text-transparent"
          />
        )}
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-medium leading-tight">{name}</h3>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">{credential}</p>
          {achievement && (
            <p
              className="text-xs font-sans font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#C9933A' }}
            >
              {achievement}
            </p>
          )}
          <p className="text-base font-light leading-relaxed text-muted-foreground pt-2">{bio}</p>
          <Link
            to={profileUrl}
            className="inline-block mt-3 text-[11px] tracking-[0.3em] uppercase text-primary font-semibold hover:underline"
          >
            More about Saurabh →
          </Link>
        </div>
      </div>
    </section>
  );
}
