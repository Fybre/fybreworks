# FybreWorks

A minimalist personal homepage built with Next.js, MDX, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build
npm run start   # Start production server
```

## Using as a Template

If you've forked or cloned this repo for your own site, replace/delete the following personal content:

| Path                      | What to do                               |
| ------------------------- | ---------------------------------------- |
| `content/blog/*.mdx`      | Delete all posts, add your own           |
| `data/projects.ts`        | Replace with your own projects           |
| `src/app/about/page.tsx`  | Update with your own bio                 |
| `src/app/uses/page.tsx`   | Update with your own tools/setup         |
| `src/app/gaming/page.tsx` | Update or delete if not needed           |
| `src/app/layout.tsx`      | Update site name, tagline, and nav links |
| `public/projects/*`       | Delete and add your own images           |

Also update `.env.local` with your own values (see [Environment Variables](#environment-variables)).

---

## Project Structure

```
fybreworks/
├── content/
│   └── blog/              # Blog posts (MDX files)
│       └── *.mdx
├── data/
│   └── projects.ts        # Projects data
├── public/
│   └── projects/          # Project images (create as needed)
├── scripts/
│   └── new-post.ts        # Post scaffolding script
├── src/
│   ├── app/
│   │   ├── about/         # /about page
│   │   ├── api/
│   │   │   └── steam/     # Steam API routes
│   │   │       ├── games/ # Game library API
│   │   │       └── route.ts # Player status API
│   │   ├── blog/          # /blog and /blog/[slug] pages
│   │   ├── feed.xml/      # RSS feed
│   │   ├── gaming/        # /gaming page with Steam integration
│   │   ├── projects/      # /projects page
│   │   ├── uses/          # /uses page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout with nav/footer
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── image-gallery.tsx  # Expandable image thumbnails
│   │   ├── steam-games.tsx    # Steam games display component
│   │   └── steam-status.tsx   # Steam status display component
│   └── lib/
│       ├── posts.ts       # Blog post utilities
│       └── steam.ts       # Steam API utilities
└── next.config.ts
```

---

## Blog Posts

### Add a New Post

**Option 1: Use the scaffold script**

```bash
npm run new:post my-post-slug "My Post Title"
```

This creates `content/blog/my-post-slug.mdx` with frontmatter template.

**Option 2: Create manually**

Create a new `.mdx` file in `content/blog/`:

````mdx
---
title: "Your Post Title"
date: "2024-01-15"
description: "A brief description for SEO and previews"
tags: ["tag1", "tag2"]
draft: true
---

Your content here. Supports **Markdown** and code blocks:

```ts
const example = "highlighted code";
```
````

````

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `description` | No | SEO description, shown in OG images |
| `tags` | No | Array of tag strings |
| `draft` | No | Set `true` to hide from listings |

### Edit a Post

Edit the `.mdx` file directly in `content/blog/`.

### Delete a Post

Delete the `.mdx` file from `content/blog/`.

---

## Projects

Projects are defined in `data/projects.ts`.

### Add a Project

```ts
// data/projects.ts
export const projects: Project[] = [
  {
    slug: "my-project",
    name: "My Project",
    description: "What this project does.",
    github: "https://github.com/user/repo",      // optional
    appStore: "https://apps.apple.com/app/...",  // optional
    playStore: "https://play.google.com/...",    // optional
    images: [                                     // optional
      { src: "/projects/screenshot1.png", alt: "Home screen" },
      { src: "/projects/screenshot2.png", alt: "Settings" },
    ],
  },
  // ... other projects
];
````

### Project Fields

| Field         | Required | Description                     |
| ------------- | -------- | ------------------------------- |
| `slug`        | Yes      | Unique identifier               |
| `name`        | Yes      | Display name                    |
| `description` | Yes      | Project description             |
| `github`      | No       | GitHub repository URL           |
| `appStore`    | No       | App Store URL                   |
| `playStore`   | No       | Play Store URL                  |
| `images`      | No       | Array of `{ src, alt }` objects |

### Project Images

Images appear as thumbnails and expand to a lightbox on click. Supports keyboard navigation (← → Esc).

**Local images:**

1. Add images to `public/projects/`
2. Reference as `/projects/filename.png`

**Remote images:**

Any HTTPS image URL is supported:

```ts
images: [{ src: "https://example.com/screenshot.png", alt: "Screenshot" }];
```

**GitHub images:**

Use `raw.githubusercontent.com` URLs, not regular GitHub blob URLs:

```
# Wrong (serves HTML page, not the image)
https://github.com/user/repo/blob/main/assets/screenshot.png

# Correct (serves raw image)
https://raw.githubusercontent.com/user/repo/main/assets/screenshot.png
```

To convert: replace `github.com` with `raw.githubusercontent.com` and remove `/blob`.

### Edit a Project

Modify the project object in `data/projects.ts`.

### Delete a Project

Remove the project object from the `projects` array.

---

## Uses Page

The `/uses` page lists your tools and setup. Edit `src/app/uses/page.tsx`.

### Structure

```ts
const uses: UsesCategory[] = [
  {
    title: "Category Name",
    items: [
      {
        name: "Tool Name",
        description: "What you use it for",
        url: "https://example.com", // optional
      },
    ],
  },
];
```

### Add a Category

Add a new object to the `uses` array with `title` and `items`.

### Add an Item

Add an object to a category's `items` array.

### Remove

Delete the category or item object.

---

## Gaming Page

The `/gaming` page shows your gaming setup with live Steam status integration.

### Steam Integration

To show your current game status, add these environment variables:

```bash
STEAM_API_KEY=your_api_key_here
STEAM_ID=your_steam_id_here
```

**Get your Steam API key:**

1. Go to https://steamcommunity.com/dev/apikey
2. Sign in and register for a key

**Find your Steam ID:**

1. Go to your Steam profile
2. The ID is in the URL: `steamcommunity.com/id/YOUR_ID` or `steamcommunity.com/profiles/YOUR_NUMERIC_ID`
3. For custom URLs, use https://steamid.io to find your numeric ID

The status updates every 60 seconds and shows:

- Your Steam avatar and name
- Online/Offline status (blue/gray dot)
- Currently playing game (green dot + game name)

### Customize Content

Edit `src/app/gaming/page.tsx` to update:

- The intro blurb
- Platform cards (Gaming PC, Legion Go, etc.)
- Genre tags

---

## About Page

Edit `src/app/about/page.tsx` directly.

---

## Navigation

To add/remove nav links, edit `src/app/layout.tsx`:

```tsx
<nav className="flex gap-4 text-sm text-slate-300">
  <a href="/" className="hover:text-white transition-colors">Home</a>
  <a href="/about" className="hover:text-white transition-colors">About</a>
  <!-- Add or remove links here -->
</nav>
```

---

## RSS Feed

Available at `/feed.xml`. Automatically includes all published blog posts.

---

## Features

- **Animations**: Fade-in effects on page load
- **Syntax Highlighting**: Code blocks use GitHub Dark Dimmed theme
- **Reading Time**: Auto-calculated for blog posts
- **Tags**: Display on blog posts with pill styling
- **Draft Mode**: Posts with `draft: true` are hidden in production
- **OG Images**: Auto-generated for homepage and blog posts
- **View Transitions**: Smooth page transitions (experimental)
- **Image Gallery**: Expandable thumbnails for project screenshots
- **Steam Integration**: Live "now playing" status on gaming page

---

## Environment Variables

Environment variables are stored in `.env.local` in the project root:

```
fybreworks/
├── .env.local      ← create this file
├── package.json
├── next.config.ts
└── ...
```

Example `.env.local` contents:

```bash
# Site URL (used for RSS feed and OG images)
SITE_URL=https://fybre.me

# Steam integration (optional - for gaming page)
STEAM_API_KEY=your_api_key_here
STEAM_ID=your_steam_id_here
STEAM_DISPLAY_LIMIT=6
```

| Variable              | Default            | Description                                                                         |
| --------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| `SITE_URL`            | `https://fybre.me` | Used for RSS feed and OG images                                                     |
| `STEAM_API_KEY`       | –                  | Steam Web API key for gaming page                                                   |
| `STEAM_ID`            | –                  | Your Steam numeric ID (64-bit)                                                      |
| `STEAM_DISPLAY_LIMIT` | `6`                | Number of games to display in "Recently Played" and "Most Played" sections (max 50) |

> **Note:** `.env.local` is gitignored by default, so your keys won't be committed.

---

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run new:post   # Scaffold a new blog post
```
