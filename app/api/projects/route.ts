import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServer } from "@/lib/supabase/server";

const unauthorized = NextResponse.json({ error: "Non autorisé." }, { status: 401 });

type ProjectPayload = {
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  tags?: string | string[];
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const unlocked = cookieStore.get("project_admin")?.value === "true";
  if (!unlocked) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as ProjectPayload;
  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json(
      { error: "Le titre est obligatoire." },
      { status: 400 },
    );
  }

  const slug =
    body.slug?.trim() && body.slug.trim().length > 0
      ? slugify(body.slug)
      : slugify(title);

  const tags = Array.isArray(body.tags)
    ? body.tags
    : typeof body.tags === "string"
      ? body.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      slug,
      summary: body.summary ?? null,
      description: body.description ?? null,
      github_url: body.github_url ?? null,
      live_url: body.live_url ?? null,
      tags: tags.length > 0 ? tags : null,
    })
    .select()
    .single();

  if (error) {
    console.error("Insertion projet :", error.message);
    return NextResponse.json(
      { error: "Impossible d'ajouter le projet." },
      { status: 500 },
    );
  }

  return NextResponse.json({ data });
}
