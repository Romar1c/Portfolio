import Link from "next/link";
import { SupabaseProject } from "@/types/project";

type ProjectCardProps = {
  project: SupabaseProject;
};

function formatMonthYear(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  const preview =
    project.summary || "Aucun résumé n'est disponible pour ce projet.";

  const isOngoing = project.end_date === null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md shadow-indigo-500/10 backdrop-blur transition hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/20"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-indigo-200/70">
              {project.created_at ? formatMonthYear(project.created_at) : "Projet"}
            </p>

            <h3 className="text-xl font-semibold text-white group-hover:text-indigo-100">
              {project.name}
            </h3>

            <p className="text-sm text-indigo-100/80 line-clamp-3">
              {preview}
            </p>
          </div>

          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
            Voir
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-indigo-50/90">
            {project.context}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-indigo-50/90">
            {project.language}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              isOngoing
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-50"
                : "border-indigo-400/30 bg-indigo-500/10 text-indigo-50"
            }`}
          >
            {isOngoing ? "En cours" : "Terminé"}
          </span>
        </div>
      </div>
    </Link>
  );
}
