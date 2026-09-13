import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProjects, type Project } from "@/lib/content-store";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

function isValidProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return typeof p.slug === "string" && typeof p.name === "string";
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const projects = body?.projects;

  if (!Array.isArray(projects) || !projects.every(isValidProject)) {
    return NextResponse.json({ error: "Invalid projects payload" }, { status: 400 });
  }

  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) {
      return NextResponse.json(
        { error: `Duplicate slug: ${p.slug}` },
        { status: 400 },
      );
    }
    slugs.add(p.slug);
  }

  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
