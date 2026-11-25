import { repositoryProjects, type Project } from "@/../data/projects";

export function includeRepositoryProjects(projects: Project[]): Project[] {
  const existingSlugs = new Set(projects.map((project) => project.slug));
  return [
    ...repositoryProjects.filter((project) => !existingSlugs.has(project.slug)),
    ...projects,
  ];
}
