import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: LeadData) => void;
  title: string;
}

export interface LeadData {
  name: string;
  phone: string;
  email: string;
}

export default function LeadCaptureModal({ isOpen, onClose, onSuccess, title }: LeadCaptureModalProps) {
  const [formData, setFormData] = React.useState<LeadData>({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSuccess(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Left Side - Visual/Context */}
            <div className="hidden md:block w-2/5 relative bg-luxury-charcoal overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Interior"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
                <Lock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-medium leading-tight mb-2">Exclusive Access</h3>
                <p className="text-xs text-white/60 font-light tracking-wide leading-relaxed">
                  Please provide your contact details to view the full brochure and pricing for this residence.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-10">
                <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-primary block mb-2">
                  Premium Inquiry
                </span>
                <h2 className="text-3xl font-heading font-medium text-foreground leading-tight">
                  Unlock Details for <br />
                  <span className="italic text-primary/80">{title}</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      required
                      placeholder="Enter your name"
                      className="pl-12 h-14 bg-secondary/30 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      required
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="pl-12 h-14 bg-secondary/30 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      required
                      type="email"
                      placeholder="email@example.com"
                      className="pl-12 h-14 bg-secondary/30 border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-white text-lg font-medium rounded-none hover:bg-primary/90 transition-all group"
                >
                  {isSubmitting ? 'VERIFYING...' : 'VIEW DETAILS'}
                  {!isSubmitting && <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />}
                </Button>

                <p className="text-[10px] text-center text-muted-foreground font-light tracking-wide">
                  By clicking, you agree to our <span className="underline cursor-pointer">Privacy Policy</span> and consent to be contacted by our luxury advisors.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
