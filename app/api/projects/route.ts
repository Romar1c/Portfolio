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
  context?: ProjectContext;

  image_url?: string | null;
  image_caption?: string | null;

  github_url?: string | null;
  live_url?: string | null;

  end_date?: string | null;
};


const cleanNullable = (v: unknown) => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
};

const isValidContext = (v: any): v is ProjectContext =>
  v === "Cours" || v === "Pro" || v === "Perso";

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

  const slug = body.slug?.trim();

  if (!slug) {
    return NextResponse.json({ error: "Impossible de générer le slug." }, { status: 400 });
  }

  const context: ProjectContext = isValidContext(body.context) ? body.context : "Perso";

  const end_date = cleanNullable(body.end_date);

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name,
      slug,
      language,
      summary,
      context,

      image_url: cleanNullable(body.image_url),
      image_caption: cleanNullable(body.image_caption),

      github_url: cleanNullable(body.github_url),
      live_url: cleanNullable(body.live_url),

      end_date: end_date,
    })
    .select()
    .single();

  if (error) {
    if ((error as any).code === "23505") {
      return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
    }

    console.error("Insertion projet :", error.message);
    return NextResponse.json({ error: "Impossible d'ajouter le projet." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
