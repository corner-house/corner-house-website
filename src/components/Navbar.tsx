import React from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  onNavigate: (page: 'home' | 'detail' | 'service', id?: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '#properties', type: 'anchor' },
    { name: 'Services', href: '#services', type: 'anchor' },
    { name: 'Localities', href: '#localities', type: 'anchor' },
    { name: 'Journal', href: '#insights', type: 'anchor' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.type === 'anchor') {
      // If we are not on home page, navigate home first then scroll
      // But for simplicity in this SPA-like state, we just scroll if on home
      // In a real app with routing, this would be more complex
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b py-4 shadow-sm' 
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <h1 className="text-2xl font-heading font-semibold tracking-tighter flex flex-col leading-none">
            <span className={`transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>THE CORNER</span>
            <span className={`text-sm font-sans font-medium tracking-widest transition-colors ${isScrolled ? 'text-foreground/60' : 'text-white/70'}`}>HOUSE</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate('home', link.href)}
              className={`text-sm font-medium transition-colors tracking-wide uppercase ${
                isScrolled 
                  ? 'text-foreground/70 hover:text-primary' 
                  : 'text-white/90 hover:text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]'
              }`}
            >
              {link.name}
            </button>
          ))}
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
                <Button variant="ghost" size="icon" className={isScrolled ? 'text-foreground' : 'text-white'}>
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex flex-col space-y-8 mt-12">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => onNavigate('home', link.href)}
                    className="text-2xl font-heading font-medium hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ))}
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
