import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.SITE_URL || "https://fybre.me";

export const metadata: Metadata = {
  title: {
    default: "Fybre",
    template: "%s | Fybre",
  },
  description: "Notes, projects, and experiments – a minimalist dev hub.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FybreWorks",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100">
      <body className="min-h-full antialiased">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Fybre
              </span>
              <span className="text-sm text-slate-400">
                Notes, projects, and experiments.
              </span>
            </div>
            <nav className="flex gap-4 text-sm text-slate-300">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a
                href="/projects"
                className="hover:text-white transition-colors"
              >
                Projects
              </a>
              <a href="/blog" className="hover:text-white transition-colors">
                Blog
              </a>
              <a href="/gaming" className="hover:text-white transition-colors">
                Gaming
              </a>
              <a href="/links" className="hover:text-white transition-colors">
                Links
              </a>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Fybre.</span>
            <a
              href="/feed.xml"
              className="hover:text-slate-300 transition-colors"
              title="RSS Feed"
            >
              RSS
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
