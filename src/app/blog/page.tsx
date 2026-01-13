import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
        Notes &amp; Blog
      </h1>
      <p className="text-slate-300 animate-fade-in-up stagger-1">
        Mostly programming‑related notes, debugging stories, and things I might
        want to refer back to later.
      </p>
      <div className="space-y-2 animate-fade-in-up stagger-2">
        {posts.length === 0 && (
          <p className="text-sm text-slate-500">
            No posts yet. Once I add some MDX files under{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5">content/blog</code>, they&apos;ll show up here.
          </p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-baseline gap-3 text-sm py-1 -mx-2 px-2 rounded transition-colors hover:bg-slate-900/50"
            >
              <span className="text-slate-500 tabular-nums">
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="text-slate-100 group-hover:text-white transition-colors">
                {post.title}
              </span>
              {post.readingTime && (
                <span className="text-slate-600 text-xs">
                  {post.readingTime} min read
                </span>
              )}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
