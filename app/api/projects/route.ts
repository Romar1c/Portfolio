import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServer } from "@/lib/supabase/server";

const unauthorized = NextResponse.json({ error: "Non autorisé." }, { status: 401 });

type ProjectContext = "Cours" | "Pro" | "Perso";

type ProjectPayload = {
  name?: string;
  slug?: string;
  language?: string;
  summary?: string;
  context?: unknown;

  image_url?: unknown;
  image_caption?: unknown;

  github_url?: unknown;
  live_url?: unknown;

  end_date?: unknown; 
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cleanNullableString = (v: unknown): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
};

const isProjectContext = (v: unknown): v is ProjectContext =>
  v === "Cours" || v === "Pro" || v === "Perso";

const getPostgresErrorCode = (err: unknown): string | null => {
  if (typeof err !== "object" || err === null) return null;
  if (!("code" in err)) return null;
  const code = (err as { code?: unknown }).code;
  return typeof code === "string" ? code : null;
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const unlocked = cookieStore.get("project_admin")?.value === "true";
  if (!unlocked) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as ProjectPayload;

  const name = body.name?.trim();
  const language = body.language?.trim();
  const summary = body.summary?.trim();

  if (!name) {
    return NextResponse.json({ error: "Le nom du projet est obligatoire." }, { status: 400 });
  }
  if (!language) {
    return NextResponse.json({ error: "Le champ langage/stack est obligatoire." }, { status: 400 });
  }
  if (!summary) {
    return NextResponse.json({ error: "Le résumé est obligatoire." }, { status: 400 });
  }

  const slugRaw = body.slug?.trim();
  if (!slugRaw) {
    return NextResponse.json({ error: "Le slug est obligatoire." }, { status: 400 });
  }
  const slug = slugify(slugRaw);
  if (!slug) {
    return NextResponse.json({ error: "Slug invalide." }, { status: 400 });
  }

  const context: ProjectContext = isProjectContext(body.context) ? body.context : "Perso";

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name,
      slug,
      language,
      summary,
      context,

      image_url: cleanNullableString(body.image_url),
      image_caption: cleanNullableString(body.image_caption),

      github_url: cleanNullableString(body.github_url),
      live_url: cleanNullableString(body.live_url),

      end_date: cleanNullableString(body.end_date),
    })
    .select()
    .single();

  if (error) {
    if (getPostgresErrorCode(error) === "23505") {
      return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
    }

    console.error("Insertion projet :", error.message);
    return NextResponse.json({ error: "Impossible d'ajouter le projet." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
