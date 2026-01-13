"use client";

import { useState, useMemo } from "react";
import { projects } from "@/../data/projects";
import { ImageGallery } from "@/components/image-gallery";

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      project.tags?.some((tag) => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  const handleTagClick = (tag: string | null) => {
    if (tag === null) {
      // "All" button clicked - clear all filters
      setSelectedTags([]);
    } else {
      // Regular tag clicked
      setSelectedTags((prev) => {
        if (prev.includes(tag)) {
          // Remove tag if already selected
          return prev.filter((t) => t !== tag);
        } else {
          // Add tag to selection
          return [...prev, tag];
        }
      });
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight gradient-text animate-fade-in">
        Projects - FybreWorks
      </h1>
      <p className="text-slate-300 animate-fade-in-up stagger-1">
        A small selection of software I've built or worked on.
      </p>

      {/* Tag Filter */}
      <div className="animate-fade-in-up stagger-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTagClick(null)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              selectedTags.length === 0
                ? "bg-slate-100 text-slate-900"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredProjects.map((project, index) => (
          <article
            key={project.slug}
            className={`card-hover rounded-lg border border-slate-800 bg-slate-900/40 p-4 animate-fade-in-up stagger-${Math.min(
              index + 1,
              4
            )}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-slate-100">
                  {project.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {project.description}
                </p>

                {/* Project Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-col gap-1 text-xs text-slate-300">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="link-glow hover:text-white transition-colors"
                      target="_blank"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {project.images && project.images.length > 0 && (
              <ImageGallery images={project.images} />
            )}
          </article>
        ))}

        {filteredProjects.length === 0 && selectedTags.length > 0 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-8 text-center">
            <p className="text-slate-400">
              No projects found with the selected tags.
            </p>
            <button
              onClick={() => handleTagClick(null)}
              className="mt-2 text-sm text-slate-300 underline underline-offset-2 hover:text-white"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
