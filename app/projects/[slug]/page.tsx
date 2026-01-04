import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { createSupabaseServer } from "@/lib/supabase/server";
import { SupabaseProject } from "@/types/project";

export const revalidate = 0;

async function fetchProject(slug: string): Promise<SupabaseProject | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching project:", error.message);
    throw new Error("Impossible de récupérer le projet demandé.");
  }

  return (data as SupabaseProject | null) ?? null;
}

type ProjectPageProps = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await fetchProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 md:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-200 transition hover:text-indigo-100"
        >
          <span aria-hidden> </span> Retour aux projets
        </Link>
        <ProjectDetail project={project} />
      </div>
    </div>
  );
}
