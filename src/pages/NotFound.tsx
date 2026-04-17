import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLayoutContext } from '@/App';

export default function NotFound() {
  const { onNavigate } = useLayoutContext();
  return (
    <main className="pt-40 pb-32 bg-background min-h-screen flex items-center">
      <SEO
        title="Page not found (404)"
        description="The page you're looking for doesn't exist. Return home to explore our properties."
        path="/404"
        noindex
      />
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <span className="text-[10px] font-sans font-semibold tracking-[0.5em] uppercase text-primary block mb-8">
          404 — Page not found
        </span>
        <h1 className="text-5xl md:text-7xl font-heading font-medium leading-tight mb-6">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-lg text-muted-foreground font-light mb-10">
          The link may be outdated, or the page may have moved. Return home to explore our current collection.
        </p>
        <Button
          onClick={() => onNavigate('home')}
          className="bg-primary hover:bg-primary/90 text-white py-6 px-10 rounded-none"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
      </div>
    </main>
  );
}
