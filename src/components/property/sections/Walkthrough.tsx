import { ExternalLink } from 'lucide-react';
import type { PropertyListing } from '../schema';
import SectionHeading from '../SectionHeading';
import { DoodlePlay } from '../Doodles';

interface WalkthroughProps {
  videos: PropertyListing['videos'];
}

function buildVideoEmbed(videos: NonNullable<PropertyListing['videos']>): {
  src: string;
  title: string;
  allow: string;
} | null {
  if (videos.vimeoId) {
    return {
      src: `https://player.vimeo.com/video/${videos.vimeoId}?title=0&byline=0&portrait=0`,
      title: 'Property walkthrough video',
      allow: 'autoplay; fullscreen; picture-in-picture; clipboard-write',
    };
  }
  if (videos.youtubeId) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${videos.youtubeId}?rel=0&modestbranding=1`,
      title: 'Property walkthrough video',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    };
  }
  return null;
}

export default function Walkthrough({ videos }: WalkthroughProps) {
  if (!videos || (!videos.vimeoId && !videos.youtubeId && !videos.virtualTourUrl)) return null;

  const embed = videos ? buildVideoEmbed(videos) : null;

  return (
    <section id="walkthrough" className="py-10 md:py-12 bg-[#FAF6E8]">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="press play"
          title="Walkthrough"
          description={videos.tagline}
          doodle={<DoodlePlay />}
        />

        {embed && (
          <div className="relative aspect-video bg-black max-w-5xl mx-auto overflow-hidden shadow-lg">
            <iframe
              src={embed.src}
              title={embed.title}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow={embed.allow}
              allowFullScreen
            />
          </div>
        )}

        {videos.virtualTourUrl && (
          <div className="mt-6 flex justify-center">
            <a
              href={videos.virtualTourUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-primary text-white px-6 py-3 font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Explore 360° virtual tour
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
