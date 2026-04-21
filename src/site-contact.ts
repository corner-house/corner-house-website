export const SITE_CONTACT = {
  phone: '+91 98765 43210',
  phoneE164: '+919876543210',
  whatsapp: '+91 98765 43210',
  whatsappE164: '919876543210',
  email: 'thecornerhouserealty@gmail.com',
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE_CONTACT.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function phoneLink(): string {
  return `tel:${SITE_CONTACT.phoneE164}`;
}
