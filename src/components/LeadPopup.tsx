import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}

export default function LeadPopup({ isOpen, onClose, propertyTitle, onSubmit }: LeadPopupProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-charcoal/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] rounded-none"
          >
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-3 hover:bg-secondary rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>

            <div className="p-16">
              <div className="text-center mb-12">
                <span className="text-[10px] font-sans font-bold tracking-[0.5em] uppercase text-primary mb-6 block">
                  Exclusive Access
                </span>
                <h2 className="text-5xl font-heading font-medium leading-[1.1] mb-6 tracking-tight">
                  Inquire About <br />
                  <span className="italic text-primary/80">{propertyTitle}</span>
                </h2>
                <div className="w-16 h-[1px] bg-primary/20 mx-auto mb-6" />
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  Please provide your details to receive the full brochure and schedule a private viewing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground/60">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      className="pl-8 py-6 border-0 border-b border-border/60 focus:border-primary transition-all rounded-none bg-transparent focus:ring-0"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground/60">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="pl-8 py-6 border-0 border-b border-border/60 focus:border-primary transition-all rounded-none bg-transparent focus:ring-0"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground/60">
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="pl-8 py-6 border-0 border-b border-border/60 focus:border-primary transition-all rounded-none bg-transparent focus:ring-0"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full py-10 text-lg bg-primary hover:bg-primary/90 text-white transition-all duration-500 group rounded-none shadow-xl">
                  REQUEST DETAILS
                  <Send className="ml-3 h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </Button>
              </form>

              <p className="text-[9px] text-center text-muted-foreground mt-12 uppercase tracking-[0.3em] font-medium opacity-60">
                Your data is secure with The Corner House.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
