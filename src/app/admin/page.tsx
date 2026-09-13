"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  Project,
  ProjectLink,
  ProjectImage,
  Link as SiteLink,
  LinkCategory,
} from "@/lib/content-store";

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs text-slate-400">
      {label}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-600"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-xs text-slate-400">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="mt-1 w-full rounded border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-600"
      />
    </label>
  );
}

// Keeps its own raw text while typing so a trailing "," or trailing space
// isn't immediately stripped by re-deriving the text from the parsed array.
function TagsInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [text, setText] = useState(() => value.join(", "));

  return (
    <label className="block text-xs text-slate-400">
      {label}
      <input
        type="text"
        value={text}
        placeholder="e.g. mobile, react-native, ios"
        onChange={(e) => {
          setText(e.target.value);
          onChange(
            e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          );
        }}
        onBlur={() => setText(value.join(", "))}
        className="mt-1 w-full rounded border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-600"
      />
    </label>
  );
}

function ReorderButtons({
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={disableUp}
        title="Move up"
        className="rounded bg-slate-800 px-1.5 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-30"
      >
        ▲
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={disableDown}
        title="Move down"
        className="rounded bg-slate-800 px-1.5 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-30"
      >
        ▼
      </button>
    </div>
  );
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = items.slice();
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function nextKey(): string {
  return crypto.randomUUID();
}

function ProjectEditor({
  project,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: {
  project: Project;
  onChange: (p: Project) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  const update = <K extends keyof Project>(key: K, value: Project[K]) =>
    onChange({ ...project, [key]: value });

  const links = project.links ?? [];
  const images = project.images ?? [];
  const tags = project.tags ?? [];

  const updateLink = (i: number, link: ProjectLink) =>
    update("links", links.map((l, idx) => (idx === i ? link : l)));
  const addLink = () =>
    update("links", [...links, { name: "", url: "" }]);
  const removeLink = (i: number) =>
    update("links", links.filter((_, idx) => idx !== i));
  const moveLink = (i: number, dir: -1 | 1) =>
    update("links", moveItem(links, i, dir));

  const updateImage = (i: number, image: ProjectImage) =>
    update("images", images.map((img, idx) => (idx === i ? image : img)));
  const addImage = () =>
    update("images", [...images, { src: "", alt: "" }]);
  const removeImage = (i: number) =>
    update("images", images.filter((_, idx) => idx !== i));
  const moveImage = (i: number, dir: -1 | 1) =>
    update("images", moveItem(images, i, dir));

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <ReorderButtons
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          disableUp={disableUp}
          disableDown={disableDown}
        />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <TextInput
            label="Slug (unique id, used in URLs)"
            value={project.slug}
            onChange={(v) => update("slug", v)}
          />
          <TextInput
            label="Name"
            value={project.name}
            onChange={(v) => update("name", v)}
          />
        </div>
        <button
          onClick={onDelete}
          className="mt-5 shrink-0 rounded bg-red-950/60 px-2 py-1 text-xs text-red-300 hover:bg-red-900/60"
        >
          Delete
        </button>
      </div>

      <TextArea
        label="Description"
        value={project.description}
        onChange={(v) => update("description", v)}
      />

      <TagsInput
        label="Tags (comma separated)"
        value={tags}
        onChange={(v) => update("tags", v)}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">Links</span>
          <button
            onClick={addLink}
            className="text-xs text-slate-400 hover:text-white"
          >
            + Add link
          </button>
        </div>
        {links.map((link, i) => (
          <div key={i} className="flex items-end gap-2">
            <ReorderButtons
              onMoveUp={() => moveLink(i, -1)}
              onMoveDown={() => moveLink(i, 1)}
              disableUp={i === 0}
              disableDown={i === links.length - 1}
            />
            <div className="flex-1">
              <TextInput
                label="Name"
                value={link.name}
                onChange={(v) => updateLink(i, { ...link, name: v })}
              />
            </div>
            <div className="flex-[2]">
              <TextInput
                label="URL"
                value={link.url}
                onChange={(v) => updateLink(i, { ...link, url: v })}
              />
            </div>
            <button
              onClick={() => removeLink(i)}
              className="mb-0.5 shrink-0 rounded bg-red-950/60 px-2 py-1.5 text-xs text-red-300 hover:bg-red-900/60"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">Images</span>
          <button
            onClick={addImage}
            className="text-xs text-slate-400 hover:text-white"
          >
            + Add image
          </button>
        </div>
        {images.map((image, i) => (
          <div key={i} className="flex items-end gap-2">
            <ReorderButtons
              onMoveUp={() => moveImage(i, -1)}
              onMoveDown={() => moveImage(i, 1)}
              disableUp={i === 0}
              disableDown={i === images.length - 1}
            />
            <div className="flex-[2]">
              <TextInput
                label="Image URL"
                value={image.src}
                onChange={(v) => updateImage(i, { ...image, src: v })}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Alt text"
                value={image.alt}
                onChange={(v) => updateImage(i, { ...image, alt: v })}
              />
            </div>
            <button
              onClick={() => removeImage(i)}
              className="mb-0.5 shrink-0 rounded bg-red-950/60 px-2 py-1.5 text-xs text-red-300 hover:bg-red-900/60"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

type KeyedProject = Project & { _key: string };

function ProjectsTab() {
  const [projects, setProjects] = useState<KeyedProject[] | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) =>
        setProjects(
          (d.projects as Project[]).map((p) => ({ ...p, _key: nextKey() })),
        ),
      );
  }, []);

  if (!projects) return <p className="text-sm text-slate-500">Loading...</p>;

  const update = (i: number, p: Project) =>
    setProjects(
      projects.map((old, idx) => (idx === i ? { ...p, _key: old._key } : old)),
    );
  const remove = (i: number) =>
    setProjects(projects.filter((_, idx) => idx !== i));
  const add = () =>
    setProjects([
      ...projects,
      { slug: "", name: "", description: "", tags: [], links: [], _key: nextKey() },
    ]);
  const move = (i: number, dir: -1 | 1) =>
    setProjects(moveItem(projects, i, dir));

  const save = async () => {
    setStatus("saving");
    setErrorMsg("");
    const payload = projects.map(({ _key, ...p }) => p);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: payload }),
    });
    if (res.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Failed to save");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={add}
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700"
        >
          + Add project
        </button>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-sm text-green-400">Saved</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400">{errorMsg}</span>
          )}
          <button
            onClick={save}
            disabled={status === "saving"}
            className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-900 hover:bg-white disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <ProjectEditor
            key={project._key}
            project={project}
            onChange={(p) => update(i, p)}
            onDelete={() => remove(i)}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
            disableUp={i === 0}
            disableDown={i === projects.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function LinkCategoryEditor({
  category,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: {
  category: LinkCategory;
  onChange: (c: LinkCategory) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  const updateLink = (i: number, link: SiteLink) =>
    onChange({
      ...category,
      links: category.links.map((l, idx) => (idx === i ? link : l)),
    });
  const addLink = () =>
    onChange({
      ...category,
      links: [...category.links, { name: "", url: "", description: "" }],
    });
  const removeLink = (i: number) =>
    onChange({
      ...category,
      links: category.links.filter((_, idx) => idx !== i),
    });
  const moveLink = (i: number, dir: -1 | 1) =>
    onChange({ ...category, links: moveItem(category.links, i, dir) });

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-end justify-between gap-4">
        <ReorderButtons
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          disableUp={disableUp}
          disableDown={disableDown}
        />
        <div className="flex-1">
          <TextInput
            label="Category title"
            value={category.title}
            onChange={(v) => onChange({ ...category, title: v })}
          />
        </div>
        <button
          onClick={onDelete}
          className="shrink-0 rounded bg-red-950/60 px-2 py-1.5 text-xs text-red-300 hover:bg-red-900/60"
        >
          Delete category
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">Links</span>
          <button
            onClick={addLink}
            className="text-xs text-slate-400 hover:text-white"
          >
            + Add link
          </button>
        </div>
        {category.links.map((link, i) => (
          <div key={i} className="flex items-end gap-2">
            <ReorderButtons
              onMoveUp={() => moveLink(i, -1)}
              onMoveDown={() => moveLink(i, 1)}
              disableUp={i === 0}
              disableDown={i === category.links.length - 1}
            />
            <div className="flex-1">
              <TextInput
                label="Name"
                value={link.name}
                onChange={(v) => updateLink(i, { ...link, name: v })}
              />
            </div>
            <div className="flex-[2]">
              <TextInput
                label="URL"
                value={link.url}
                onChange={(v) => updateLink(i, { ...link, url: v })}
              />
            </div>
            <div className="flex-[2]">
              <TextInput
                label="Description"
                value={link.description ?? ""}
                onChange={(v) => updateLink(i, { ...link, description: v })}
              />
            </div>
            <button
              onClick={() => removeLink(i)}
              className="mb-0.5 shrink-0 rounded bg-red-950/60 px-2 py-1.5 text-xs text-red-300 hover:bg-red-900/60"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

type KeyedLinkCategory = LinkCategory & { _key: string };

function LinksTab() {
  const [categories, setCategories] = useState<KeyedLinkCategory[] | null>(
    null,
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/links")
      .then((r) => r.json())
      .then((d) =>
        setCategories(
          (d.linkCategories as LinkCategory[]).map((c) => ({
            ...c,
            _key: nextKey(),
          })),
        ),
      );
  }, []);

  if (!categories) return <p className="text-sm text-slate-500">Loading...</p>;

  const update = (i: number, c: LinkCategory) =>
    setCategories(
      categories.map((old, idx) => (idx === i ? { ...c, _key: old._key } : old)),
    );
  const remove = (i: number) =>
    setCategories(categories.filter((_, idx) => idx !== i));
  const add = () =>
    setCategories([...categories, { title: "", links: [], _key: nextKey() }]);
  const move = (i: number, dir: -1 | 1) =>
    setCategories(moveItem(categories, i, dir));

  const save = async () => {
    setStatus("saving");
    setErrorMsg("");
    const payload = categories.map(({ _key, ...c }) => c);
    const res = await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkCategories: payload }),
    });
    if (res.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Failed to save");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={add}
          className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700"
        >
          + Add category
        </button>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-sm text-green-400">Saved</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400">{errorMsg}</span>
          )}
          <button
            onClick={save}
            disabled={status === "saving"}
            className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-900 hover:bg-white disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, i) => (
          <LinkCategoryEditor
            key={category._key}
            category={category}
            onChange={(c) => update(i, c)}
            onDelete={() => remove(i)}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
            disableUp={i === 0}
            disableDown={i === categories.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "links">("projects");

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight gradient-text">
          Admin
        </h1>
        <button
          onClick={logout}
          className="text-sm text-slate-400 hover:text-white"
        >
          Log out
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setTab("projects")}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            tab === "projects"
              ? "bg-slate-100 text-slate-900"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setTab("links")}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            tab === "links"
              ? "bg-slate-100 text-slate-900"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Links
        </button>
      </div>

      {tab === "projects" ? <ProjectsTab /> : <LinksTab />}
    </section>
  );
}
