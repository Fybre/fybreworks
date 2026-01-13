#!/usr/bin/env npx tsx

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: npm run new:post <slug> [title]");
  console.error('Example: npm run new:post my-new-post "My New Post Title"');
  process.exit(1);
}

const slug = args[0]
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const title =
  args[1] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const date = new Date().toISOString().split("T")[0];

const template = `---
title: "${title}"
date: "${date}"
description: ""
tags: []
draft: true
---

Write your post here...
`;

const blogDir = path.join(process.cwd(), "content", "blog");
const filePath = path.join(blogDir, `${slug}.md`);

if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.error(`Error: Post already exists at ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);

console.log(`Created new post: ${filePath}`);
console.log(`\nFrontmatter:`);
console.log(`  title: "${title}"`);
console.log(`  date: "${date}"`);
console.log(`  draft: true (remove when ready to publish)`);
