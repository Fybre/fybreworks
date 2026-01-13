import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | FybreWorks",
  description:
    "The tools, software, and gear I use for development and daily work.",
};

type UsesItem = {
  name: string;
  description: string;
  url?: string;
};

type UsesCategory = {
  title: string;
  items: UsesItem[];
};

const uses: UsesCategory[] = [
  {
    title: "Development",
    items: [
      {
        name: "VS Code",
        description:
          "Primary code editor with extensive extensions and customization",
        url: "https://code.visualstudio.com",
      },
      {
        name: "Visual Studio",
        description: "IDE for .NET development and C# projects",
        url: "https://visualstudio.microsoft.com",
      },
      {
        name: "GitHub",
        description:
          "Code hosting, version control, and collaboration platform",
        url: "https://github.com",
      },
    ],
  },
  {
    title: "Tech Stack",
    items: [
      {
        name: "Javascript",
        description: "Versatile scripting language for web development",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Python",
        description: "High-level language for data processing and automation",
        url: "https://python.org",
      },
      {
        name: "C#",
        description: "Object-oriented language for enterprise applications",
        url: "https://learn.microsoft.com/en-us/dotnet/csharp",
      },
      {
        name: "React Native / Expo",
        description: "Cross-platform mobile app development framework",
        url: "https://expo.dev",
      },
      {
        name: "SQL Server",
        description: "Relational database management system",
        url: "https://www.microsoft.com/en-us/sql-server",
      },
    ],
  },
  {
    title: "Productivity",
    items: [
      {
        name: "Therefore Document Management System",
        description: "Enterprise document management and workflow solution",
        url: "https://www.therefore.com",
      },
      {
        name: "Claude Code",
        description: "AI coding assistant for development tasks",
        url: "https://claude.ai",
      },
      {
        name: "Cline",
        description: "AI-powered coding companion",
        url: "https://cline.bot",
      },
      {
        name: "Docker",
        description: "Containerization platform for development and deployment",
        url: "https://docker.com",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
          Uses
        </h1>
        <p className="text-slate-300 animate-fade-in-up stagger-1">
          The tools, software, and gear I use for development and daily work.
          Inspired by{" "}
          <a
            href="https://uses.tech"
            className="text-slate-100 underline underline-offset-2 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            uses.tech
          </a>
          .
        </p>
      </header>

      <div className="space-y-8">
        {uses.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`animate-fade-in-up stagger-${Math.min(
              categoryIndex + 2,
              4
            )}`}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              {category.title}
            </h2>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-100">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        className="shrink-0 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
