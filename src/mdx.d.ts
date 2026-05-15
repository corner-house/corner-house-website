declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { BlogFrontmatter } from '@/components/blog/types';

  export const frontmatter: BlogFrontmatter;
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
