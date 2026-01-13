import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
  readingTime: number;
  isMDX: boolean;
};

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getAllPosts(includeDrafts = false): PostMeta[] {
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const isMDX = file.endsWith(".mdx");
      const fullPath = path.join(blogDir, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string | undefined,
        tags: data.tags as string[] | undefined,
        draft: data.draft as boolean | undefined,
        readingTime: calculateReadingTime(content),
        isMDX,
      };
    })
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): {
  content: string;
  meta: PostMeta;
} {
  // Try .mdx first, then .md
  let fullPath = path.join(blogDir, `${slug}.mdx`);
  let isMDX = true;
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogDir, `${slug}.md`);
    isMDX = false;
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    content,
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string | undefined,
      tags: data.tags as string[] | undefined,
      draft: data.draft as boolean | undefined,
      readingTime: calculateReadingTime(content),
      isMDX,
    },
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
