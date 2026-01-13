export type Link = {
  name: string;
  url: string;
  description?: string;
};

export type LinkCategory = {
  title: string;
  links: Link[];
};

export const linkCategories: LinkCategory[] = [
  {
    title: "Development",
    links: [
      {
        name: "GitHub",
        url: "https://github.com",
        description: "Code repositories and projects",
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        description: "Programming Q&A",
      },
      {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "Web development documentation",
      },
    ],
  },
  {
    title: "Tools & Services",
    links: [
      {
        name: "Vercel",
        url: "https://vercel.com",
        description: "Deployment and hosting",
      },
      {
        name: "npm",
        url: "https://www.npmjs.com",
        description: "Package registry",
      },
    ],
  },
  {
    title: "News & Learning",
    links: [
      {
        name: "Hacker News",
        url: "https://news.ycombinator.com",
        description: "Tech news and discussions",
      },
      {
        name: "Dev.to",
        url: "https://dev.to",
        description: "Developer community and articles",
      },
    ],
  },
];
