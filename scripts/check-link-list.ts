import assert from "node:assert/strict";
import { linkCategories, repositoryLinkCategories, type LinkCategory } from "../data/links";
import { includeRepositoryLinks } from "../src/lib/link-list";

const projectLinks = repositoryLinkCategories.find((category) => category.title === "Project Links");
assert.ok(projectLinks);
const expectedUrls = [
  "https://csv-server.fybre.me/", "https://docservices.fybre.me/admin/",
  "https://eform-versioner.fybre.me/", "https://jwt.fybre.me/", "https://lnksnp.com/",
  "https://tfo-usage.fybre.me/", "https://therefore-doc-generator.fybre.me/",
  "https://log-auditor.fybre.me/", "https://webconsole.fybre.me/",
];
assert.deepEqual(projectLinks.links.map((link) => link.url), expectedUrls);
assert.ok(projectLinks.links.every((link) => link.name && link.description));
assert.deepEqual(includeRepositoryLinks(linkCategories), linkCategories);
assert.deepEqual(includeRepositoryLinks([]), repositoryLinkCategories);
const saved: LinkCategory[] = [{ title: "Personal", links: [{ name: "Custom", url: "https://example.com/" }] }];
const before = JSON.stringify(saved);
const result = includeRepositoryLinks(saved);
assert.deepEqual(result, [projectLinks, ...saved]);
assert.equal(JSON.stringify(saved), before, "Reading must not modify the stored list");
const override = { ...projectLinks.links[0], url: "https://csv-server.fybre.me", description: "Custom description" };
const merged = includeRepositoryLinks([{ title: "project links", links: [override] }, ...saved]);
assert.equal(merged[0].links.length, 9);
assert.deepEqual(merged[0].links[0], override, "Admin edits take precedence, including URLs without trailing slashes");
assert.deepEqual(includeRepositoryLinks(merged), merged, "Repeated reads must not duplicate links");
assert.deepEqual(merged[1], saved[0], "Other categories must stay unchanged");
console.log("Link checks passed: all nine URLs, descriptions, defaults, saved categories, overrides, ordering, duplicates and non-mutation.");
