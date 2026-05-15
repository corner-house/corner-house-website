import { Link } from 'react-router-dom';

interface AuthorCardProps {
  name: string;
  credential: string;
  bio: string;
  photoUrl: string;
  profileUrl: string;
}

export default function AuthorCard({ name, credential, bio, photoUrl, profileUrl }: AuthorCardProps) {
  return (
    <section className="my-16 border border-border p-8 md:p-10 bg-card">
      <span className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-primary block mb-6">
        About the Author
      </span>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={photoUrl}
          alt={`${name}, ${credential}`}
          width={128}
          height={128}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover object-top shrink-0 border border-border"
        />
        <div className="space-y-3">
          <h3 className="text-2xl font-heading font-medium leading-tight">{name}</h3>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">{credential}</p>
          <p className="text-base font-light leading-relaxed text-muted-foreground">{bio}</p>
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
