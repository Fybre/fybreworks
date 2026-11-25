import { repositoryLinkCategories, type LinkCategory } from "@/../data/links";

// Include repository additions even when the site has an existing Blob list.
// Stored descriptions and custom links take precedence and retain their order.
export function includeRepositoryLinks(categories: LinkCategory[]): LinkCategory[] {
  const result = categories.map((category) => ({ ...category, links: [...category.links] }));
  for (const repositoryCategory of repositoryLinkCategories) {
    const existing = result.find((category) => category.title.trim().toLowerCase() === repositoryCategory.title.toLowerCase());
    if (!existing) {
      result.unshift({ ...repositoryCategory, links: [...repositoryCategory.links] });
      continue;
    }
    const existingUrls = new Set(existing.links.map((link) => link.url.replace(/\/+$/, "")));
    for (const link of repositoryCategory.links) {
      const key = link.url.replace(/\/+$/, "");
      if (!existingUrls.has(key)) {
        existing.links.push(link);
        existingUrls.add(key);
      }
    }
  }
  return result;
}
