export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight gradient-text animate-fade-in">
        FybreHub
      </h1>
      <p className="text-slate-300 animate-fade-in-up stagger-1">
        A minimalist hub for notes, projects, and experiments. Built to be fast,
        focused, and easy to grow.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <a
          href="/about"
          className="card-hover group rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm animate-fade-in-up stagger-1 hover:bg-slate-900/60 transition-colors"
        >
          <h2 className="mb-1 font-medium text-slate-100">About</h2>
          <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
            Who I am, what I build, and what I care about.
          </p>
        </a>
        <a
          href="/projects"
          className="card-hover group rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm animate-fade-in-up stagger-2 hover:bg-slate-900/60 transition-colors"
        >
          <h2 className="mb-1 font-medium text-slate-100">Projects</h2>
          <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
            Apps, tools, and experiments – with links and screenshots.
          </p>
        </a>
        <a
          href="/blog"
          className="card-hover group rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm animate-fade-in-up stagger-3 hover:bg-slate-900/60 transition-colors"
        >
          <h2 className="mb-1 font-medium text-slate-100">Notes & Blog</h2>
          <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
            Programming notes, debugging write‑ups, and things worth
            remembering.
          </p>
        </a>
        <a
          href="/uses"
          className="card-hover group rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm animate-fade-in-up stagger-3 hover:bg-slate-900/60 transition-colors"
        >
          <h2 className="mb-1 font-medium text-slate-100">Uses</h2>
          <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
            Tools and gear I use to get things done.
          </p>
        </a>
        <a
          href="/gaming"
          className="card-hover group rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm animate-fade-in-up stagger-3 hover:bg-slate-900/60 transition-colors"
        >
          <h2 className="mb-1 font-medium text-slate-100">Gaming</h2>
          <p className="text-slate-500 group-hover:text-slate-300 transition-colors">
            My gaming setup, current games, and thoughts on the hobby.
          </p>
        </a>
      </div>
    </section>
  );
}
