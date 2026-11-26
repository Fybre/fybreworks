import assert from "node:assert/strict";
import { projects, repositoryProjects, type Project } from "../data/projects";
import { includeRepositoryProjects } from "../src/lib/project-list";

const launcher = repositoryProjects.find((project) => project.slug === "therefore-launcher");
assert.ok(launcher);
assert.ok(launcher.links?.some((link) => link.url.endsWith("/ThereforeLauncher-win-x64.exe")));
assert.ok(launcher.links?.some((link) => link.url.endsWith("/ThereforeLauncher-win-arm64.exe")));
assert.equal(projects.filter((project) => project.slug === launcher.slug).length, 1);
const patcher = repositoryProjects.find((project) => project.slug === "therefore-dialog-patcher");
assert.ok(patcher);
assert.ok(patcher.links?.some((link) => link.url === "https://github.com/Fybre/therefore-dialog-patcher"));
assert.ok(patcher.links?.some((link) => link.url.endsWith("/ThereforeDialogPatcherGUI.exe")));
assert.equal(projects.filter((project) => project.slug === patcher.slug).length, 1);
const saved: Project[] = [
  { slug: "custom-second", name: "Custom second", description: "Preserve this order" },
  { slug: "custom-first", name: "Custom first", description: "Do not resurrect removed defaults" },
];
const result = includeRepositoryProjects(saved);
assert.deepEqual(result, [...repositoryProjects, ...saved]);
assert.equal(saved.length, 2, "The stored list must not be mutated");
const override = { ...launcher, description: "Edited in admin", links: [{ name: "Download", url: "https://example.com/launcher.exe" }] };
assert.deepEqual(includeRepositoryProjects([saved[0], override]), [patcher, saved[0], override]);
assert.deepEqual(includeRepositoryProjects(result), result, "Repeated merging must not duplicate repository projects");
assert.deepEqual(includeRepositoryProjects([]), repositoryProjects);
console.log("Project checks passed: defaults, existing stored content, admin overrides, order, empty lists and duplicate prevention.");
