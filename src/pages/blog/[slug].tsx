import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import BlogPost from '@/components/blog/BlogPost';
import { getBlogPost } from '@/data/blogPosts';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogSlug() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <main className="pt-40 pb-32 bg-background min-h-screen">
        <SEO
          title="Post not found"
          description="The blog post you're looking for is no longer available."
          path={`/blog/${slug ?? ''}`}
          noindex
        />
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-heading font-medium mb-6">Post not found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // BlogPost wraps SEO + hero + BlogSchema and renders the MDX body. Per Section 5, the MDX
  // body itself authors <AuthorCard>, <CTAStrip>, and <RelatedPosts> — we don't double-render
  // those here.
  return <BlogPost frontmatter={post.frontmatter} Content={post.Component} />;
}
