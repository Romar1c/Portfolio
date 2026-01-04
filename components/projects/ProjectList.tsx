import { SupabaseProject } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

type ProjectListProps = {
  projects: SupabaseProject[];
};

export function ProjectList({ projects }: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-indigo-100/80">
        Aucun projet n&apos;est disponible pour le moment.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id || project.slug} project={project} />
      ))}
    </div>
  );
}
