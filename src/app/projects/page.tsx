import { projects } from "@/../data/projects";
import { ImageGallery } from "@/components/image-gallery";

export default function ProjectsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
        Projects - FybreWorks
      </h1>
      <p className="text-slate-300 animate-fade-in-up stagger-1">
        A small selection of software I&apos;ve built or worked on.
      </p>
      <div className="space-y-3">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={`card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4 animate-fade-in-up stagger-${Math.min(
              index + 1,
              4
            )}`}
          >
            <h2 className="text-sm font-semibold text-slate-100">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-300">
              {project.github && (
                <a
                  href={project.github}
                  className="link-glow hover:text-white transition-colors"
                  target="_blank"
                >
                  GitHub
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  className="link-glow hover:text-white transition-colors"
                  target="_blank"
                >
                  App Store
                </a>
              )}
              {project.playStore && (
                <a
                  href={project.playStore}
                  className="link-glow hover:text-white transition-colors"
                  target="_blank"
                >
                  Play Store
                </a>
              )}
            </div>
            {project.images && project.images.length > 0 && (
              <ImageGallery images={project.images} />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
