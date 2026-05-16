export const SITE_CONTACT = {
  phone: '+91 98719 50051',
  phoneE164: '+919871950051',
  whatsapp: '+91 98719 50051',
  whatsappE164: '919871950051',
  email: 'thecornerhouserealty@gmail.com',
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE_CONTACT.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function phoneLink(): string {
  return `tel:${SITE_CONTACT.phoneE164}`;
}
