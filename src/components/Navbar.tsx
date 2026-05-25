import React from 'react';
import { Menu, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  onNavigate: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

// Two link kinds:
//   - anchor → scrolls/navigates to a section on the home page (uses onNavigate)
//   - route  → client-side route navigation via React Router <Link>
type NavLink =
  | { name: string; href: string; type: 'anchor' }
  | { name: string; to: string; type: 'route' };

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Properties', to: '/properties', type: 'route' },
    { name: 'Services', to: '/services', type: 'route' },
    // Localities homepage section was removed; nav link points to /blog as an interim
    // destination until dedicated sector guide posts are written.
    { name: 'Localities', to: '/blog', type: 'route' },
    { name: 'Journal', to: '/blog', type: 'route' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b py-4 shadow-sm' 
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          className="cursor-pointer group text-left flex-shrink-0"
          aria-label="The Corner House Home"
          onClick={() => onNavigate('home')}
        >
          <img
            src="/logos/corner-house-horizontal-transparent.svg"
            alt="The Corner House"
            className={`w-auto transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'}`}
            width={1800}
            height={520}
            decoding="async"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => {
            const className = `text-sm font-medium transition-colors tracking-wide uppercase ${
              isScrolled
                ? 'text-foreground/70 hover:text-primary'
                : 'text-white/90 hover:text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]'
            }`;
            if (link.type === 'route') {
              return (
                <Link key={link.name} to={link.to} className={className}>
                  {link.name}
                </Link>
              );
            }
            return (
              <button
                key={link.name}
                onClick={() => onNavigate('home', link.href)}
                className={className}
              >
                {link.name}
              </button>
            );
          })}
          <Button 
            variant={isScrolled ? "outline" : "default"} 
            onClick={() => onNavigate('home', '#contact')}
            className={`px-8 transition-all duration-300 ${
              isScrolled 
                ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                : 'bg-white text-black hover:bg-white/90 border-none'
            }`}
          >
            CONTACT US
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center space-x-4">
          <Sheet>
            <SheetTrigger 
              render={
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" className={isScrolled ? 'text-foreground' : 'text-white'}>
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex flex-col space-y-8 mt-12">
                {navLinks.map((link) => {
                  const className = 'text-2xl font-heading font-medium hover:text-primary transition-colors text-left';
                  if (link.type === 'route') {
                    return (
                      <Link key={link.name} to={link.to} className={className}>
                        {link.name}
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={link.name}
                      onClick={() => onNavigate('home', link.href)}
                      className={className}
                    >
                      {link.name}
                    </button>
                  );
                })}
                <div className="pt-8 space-y-4">
                  <Button 
                    className="w-full bg-primary text-white py-6"
                    onClick={() => onNavigate('home', '#contact')}
                  >
                    ENQUIRE NOW
                  </Button>
                  <div className="flex justify-center space-x-6 pt-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
