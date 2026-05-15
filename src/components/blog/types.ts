export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  lastUpdated: string;
  author: string;
  authorCredential: string;
  authorUrl: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  category: string;
  heroImage: string;
  heroImageAlt: string;
  ogImage: string;
  wordCount: number;
  readingTime: string;
  schema: string[];
  featured: boolean;
  relatedPosts: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
