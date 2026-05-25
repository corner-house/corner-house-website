export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  beds: number;
  baths: number;
  area: string;
  configuration: string;
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
  imageAlt: string;
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

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  // ISO-8601 date used in structured data and sitemap lastmod.
  // `date` remains the human-readable display string.
  datePublished: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  heroQuote?: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  tags: string[];
}
