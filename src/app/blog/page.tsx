import { getAllPosts } from "@/lib/posts";
import { BlogSearch } from "@/components/blog-search";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
          Notes &amp; Blog
        </h1>
        <p className="text-slate-300 animate-fade-in-up stagger-1">
          Mostly programming‑related notes, debugging stories, and things I might
          want to refer back to later.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-slate-500 animate-fade-in-up stagger-2">
          No posts yet. Once I add some MDX files under{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5">content/blog</code>, they&apos;ll show up here.
        </p>
      ) : (
        <div className="animate-fade-in-up stagger-2">
          <BlogSearch posts={posts} />
        </div>
      )}
    </section>
  );
}
