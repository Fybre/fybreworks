import type { Metadata } from "next";
import { linkCategories } from "@/../data/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Commonly used links and resources I frequently visit.",
};

export default function LinksPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
          Links
        </h1>
        <p className="text-slate-300 animate-fade-in-up stagger-1">
          A collection of frequently visited sites and useful resources.
        </p>
      </header>

      <div className="space-y-8">
        {linkCategories.map((category, categoryIndex) => (
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
            <div className="space-y-2">
              {category.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-100 group-hover:text-white transition-colors">
                      {link.name}
                    </h3>
                    {link.description && (
                      <p className="mt-1 text-sm text-slate-400">
                        {link.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-600 truncate">
                      {link.url}
                    </p>
                  </div>
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
                    className="shrink-0 text-slate-500 group-hover:text-slate-300 transition-colors"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
