export interface ProjectStats {
  configuration: string;
  startingPrice: string;
  hareraStatus: string;
  possession: string;
}

export interface ScoreRow {
  label: string;
  score: string;
  overall?: boolean;
}

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
  // Optional per-post enrichments displayed in the new layout. Project review posts use both;
  // other post types (developer track-record, buyer education, etc.) may omit them.
  badge?: string;
  stats?: ProjectStats;
  scorecard?: ScoreRow[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
