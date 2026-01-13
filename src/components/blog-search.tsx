"use client";

import { useState, useMemo } from "react";
import type { PostMeta } from "@/lib/posts";

type BlogSearchProps = {
  posts: PostMeta[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;

    const lowerQuery = query.toLowerCase();

    return posts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(lowerQuery);
      const matchesDescription = post.description
        ?.toLowerCase()
        .includes(lowerQuery);
      const matchesTags = post.tags?.some((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      );

      return matchesTitle || matchesDescription || matchesTags;
    });
  }, [posts, query]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-slate-400">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
        </p>
      )}

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <article
              key={post.slug}
              className={`card-hover space-y-2 rounded-lg border border-slate-800 bg-slate-900/40 p-4 animate-fade-in-up stagger-${Math.min(
                index + 1,
                4
              )}`}
            >
              <h2 className="text-lg font-medium">
                <a
                  href={`/blog/${post.slug}`}
                  className="link-glow text-slate-100 hover:text-white transition-colors"
                >
                  {post.title}
                </a>
              </h2>
              {post.description && (
                <p className="text-sm text-slate-400">{post.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-slate-700">·</span>
                <span>{post.readingTime} min read</span>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="text-slate-700">·</span>
                    <div className="flex gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-slate-500">
            No posts found matching &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
