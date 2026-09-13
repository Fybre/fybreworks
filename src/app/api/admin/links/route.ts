import { NextRequest, NextResponse } from "next/server";
import {
  getLinkCategories,
  saveLinkCategories,
  type LinkCategory,
} from "@/lib/content-store";

export async function GET() {
  const linkCategories = await getLinkCategories();
  return NextResponse.json({ linkCategories });
}

function isValidCategory(value: unknown): value is LinkCategory {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  if (typeof c.title !== "string" || !Array.isArray(c.links)) return false;
  return c.links.every(
    (l) =>
      l &&
      typeof l === "object" &&
      typeof (l as Record<string, unknown>).name === "string" &&
      typeof (l as Record<string, unknown>).url === "string",
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const linkCategories = body?.linkCategories;

  if (!Array.isArray(linkCategories) || !linkCategories.every(isValidCategory)) {
    return NextResponse.json(
      { error: "Invalid link categories payload" },
      { status: 400 },
    );
  }

  await saveLinkCategories(linkCategories);
  return NextResponse.json({ ok: true });
}
