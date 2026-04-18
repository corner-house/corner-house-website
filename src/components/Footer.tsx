import React from 'react';
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { SERVICES } from '@/constants';

interface FooterProps {
  onNavigate?: (page: 'home' | 'detail' | 'service' | 'article', id?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-luxury-charcoal text-white pt-24 pb-12 bg-[#1c1c1c]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-heading font-semibold tracking-tighter mb-6 cursor-pointer" onClick={() => onNavigate?.('home')}>
              THE CORNER HOUSE
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-8">
              A boutique real estate brokerage specializing in luxury properties across Gurugram and Delhi NCR. We bring an editorial approach to real estate.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/thecornerhouserealty/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
              </a>
              <a href="#" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-5 w-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
              </a>
              <a href="#" aria-label="Follow us on Facebook">
                <Facebook className="h-5 w-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-sans font-semibold tracking-widest uppercase mb-8 text-white/40">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Properties', id: '#properties' },
                { name: 'Services', id: '#services' },
                { name: 'Localities', id: '#localities' },
                { name: 'Journal', id: '#insights' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => onNavigate?.('home', item.id)}
                    className="text-white/70 hover:text-white transition-colors font-light text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-sans font-semibold tracking-widest uppercase mb-8 text-white/40">Services</h4>
            <ul className="space-y-4">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button 
                    onClick={() => onNavigate?.('service', service.id)}
                    className="text-white/70 hover:text-white transition-colors font-light text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-sans font-semibold tracking-widest uppercase mb-8 text-white/40">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-white/70 font-light">
                  The Corner House, C3-151, Sobha Sector 108, Gurugram
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-white/70 font-light">+91 98719 50051</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-white/70 font-light">hello@cornerhouse.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs tracking-widest uppercase">
          <p>© 2026 THE CORNER HOUSE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 text-white/40">
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/saurabh-jain.webp" type="image/webp" />
              <img
                src="/saurabh-jain.png"
                alt="Saurabh Jain — website creator"
                width="36"
                height="36"
                className="h-9 w-9 rounded-full object-cover object-top border border-white/20"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </picture>
            <span className="text-[11px] tracking-[0.25em] uppercase">
              Website Created &amp; Managed by{' '}
              <span className="text-white/80 font-medium">Saurabh Jain</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
