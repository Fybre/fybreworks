import { get, put } from "@vercel/blob";
import { projects as defaultProjects, type Project } from "@/../data/projects";
import {
  linkCategories as defaultLinkCategories,
  type LinkCategory,
} from "@/../data/links";

const PROJECTS_PATH = "content/projects.json";
const LINKS_PATH = "content/links.json";

async function readJSON<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text) as T;
}

async function writeJSON(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getProjects(): Promise<Project[]> {
  const stored = await readJSON<Project[]>(PROJECTS_PATH);
  return stored ?? defaultProjects;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeJSON(PROJECTS_PATH, projects);
}

export async function getLinkCategories(): Promise<LinkCategory[]> {
  const stored = await readJSON<LinkCategory[]>(LINKS_PATH);
  return stored ?? defaultLinkCategories;
}

export async function saveLinkCategories(
  categories: LinkCategory[],
): Promise<void> {
  await writeJSON(LINKS_PATH, categories);
}

export type { Project, ProjectImage, ProjectLink } from "@/../data/projects";
export type { Link, LinkCategory } from "@/../data/links";
