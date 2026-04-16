import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

interface InquiryFormProps {
  propertyTitle?: string;
  className?: string;
}

export default function InquiryForm({ propertyTitle, className }: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className={`bg-white p-6 md:p-12 shadow-2xl border border-border/50 ${className}`}>
      {isSubmitted ? (
        <div className="text-center py-12 space-y-6">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Send className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-3xl font-heading font-medium">Thank You</h3>
          <p className="text-muted-foreground font-light">
            Your inquiry has been received. Our luxury advisory team will contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-heading font-medium">
              {propertyTitle ? `Enquire about ${propertyTitle}` : 'Personal Advisory'}
            </h3>
            <p className="text-muted-foreground font-light">
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">Full Name</Label>
              <Input id="name" placeholder="John Doe" className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs tracking-widest uppercase text-muted-foreground">Phone Number</Label>
              <Input id="phone" placeholder="+91 98765 43210" className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">Message</Label>
            <Textarea id="message" placeholder="I am interested in..." className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent min-h-[100px] resize-none" />
          </div>

          <Button type="submit" className="w-full bg-primary text-white py-8 text-lg font-medium tracking-widest uppercase hover:bg-primary/90">
            SEND INQUIRY
          </Button>
        </form>
      )}
    </div>
  );
}
