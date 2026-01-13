import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { Pluggable } from "unified";

const prettyCodeOptions: Options = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions] as Pluggable],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: `${meta.title} | FybreWorks`,
    description: meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { content, meta } = getPostBySlug(slug);

  return (
    <article className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
          {meta.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-slate-400 animate-fade-in-up stagger-1">
          <time dateTime={meta.date}>
            {new Date(meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-slate-600">·</span>
          <span>{meta.readingTime} min read</span>
        </div>
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex gap-2 animate-fade-in-up stagger-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-invert prose-slate max-w-none animate-fade-in-up stagger-2">
        <MDXRemote source={content} options={mdxOptions} />
      </div>
    </article>
  );
}
