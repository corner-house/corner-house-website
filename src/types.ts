export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  beds: number;
  baths: number;
  area: string;
  images: string[];
  floorPlan: string;
  description: string;
  amenities: string[];
  highlights: string[];
  details: Record<string, string>;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  fullDescription: string;
  features: string[];
  process?: { title: string; description: string }[];
}

export interface Locality {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}
