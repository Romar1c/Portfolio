import Link from "next/link";
import { SupabaseProject } from "@/types/project";
import { ProjectTags } from "./ProjectTags";

type ProjectCardProps = {
  project: SupabaseProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const preview =
    project.summary ||
    project.description ||
    "Aucun résumé n'est disponible pour ce projet pour le moment.";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md shadow-indigo-500/10 backdrop-blur transition hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-indigo-200/70">
            {project.created_at
              ? new Date(project.created_at).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                })
              : "Projet"}
          </p>
          <h3 className="text-xl font-semibold text-white group-hover:text-indigo-100">
            {project.title}
          </h3>
          <p className="text-sm text-indigo-100/80 line-clamp-3">{preview}</p>
        </div>
        <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
          Voir
        </span>
      </div>
      <div className="mt-4">
        <ProjectTags tags={project.tags} />
      </div>
    </Link>
  );
}
