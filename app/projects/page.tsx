import { ProjectList } from "@/components/projects/ProjectList";
import { Section } from "@/components/Section";
import { createSupabaseServer } from "@/lib/supabase/server";
import { SupabaseProject } from "@/types/project";

export const revalidate = 0;

async function fetchProjects(): Promise<SupabaseProject[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    throw new Error("Impossible de récupérer les projets.");
  }

  return (data ?? []) as SupabaseProject[];
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-12 md:py-16">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Projets stockées sur Supabase
          </h1>
        </header>

        <Section title="Liste des projets">
          <ProjectList projects={projects} />
        </Section>
      </div>
    </div>
  );
}
