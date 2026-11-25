export type Link = {
  name: string;
  url: string;
  description?: string;
};

export type LinkCategory = {
  title: string;
  links: Link[];
};

export const repositoryLinkCategories: LinkCategory[] = [
  {
    title: "Project Links",
    links: [
      {
        name: "CSV Server",
        url: "https://csv-server.fybre.me/",
        description: "Upload CSV files and serve their data through a simple REST API.",
      },
      {
        name: "DocServices Admin",
        url: "https://docservices.fybre.me/admin/",
        description: "Admin portal for the DocServices toolkit, including document redaction and splitting.",
      },
      {
        name: "eForm Versioner",
        url: "https://eform-versioner.fybre.me/",
        description: "Generate versions for Therefore eForms.",
      },
      {
        name: "JWT Creator",
        url: "https://jwt.fybre.me/",
        description: "Generate custom JWTs for client-side authentication with Therefore.",
      },
      {
        name: "Lnksnp",
        url: "https://lnksnp.com/",
        description: "Create short, shareable links from long URLs.",
      },
      {
        name: "Therefore Online Usage",
        url: "https://tfo-usage.fybre.me/",
        description: "View tenant usage for Therefore Online.",
      },
      {
        name: "Therefore Documentation Generator",
        url: "https://therefore-doc-generator.fybre.me/",
        description: "Create implementation documentation for Therefore tenants.",
      },
      {
        name: "Therefore Log Auditor",
        url: "https://log-auditor.fybre.me/",
        description: "Audit Therefore monitoring event messages in real time.",
      },
      {
        name: "Therefore Web Console",
        url: "https://webconsole.fybre.me/",
        description: "Access a web-based version of the Therefore Console.",
      },
    ],
  },
];

export const linkCategories: LinkCategory[] = [
  ...repositoryLinkCategories,
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
