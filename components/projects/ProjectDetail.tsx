import { SupabaseProject } from "@/types/project";

type ProjectDetailProps = {
  project: SupabaseProject;
};

function formatDateFR(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const isOngoing = project.end_date === null;

  return (
    <article className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur">
      <header className="space-y-3">
        {project.created_at && (
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
            {formatDateFR(project.created_at)}
          </p>
        )}

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <p className="text-lg text-indigo-100/85">{project.summary}</p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
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
                {isOngoing ? "En cours" : `Terminé • ${formatDateFR(project.end_date!)}`}
              </span>
            </div>
          </div>

          {project.image_url && (
            <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <img
                src={project.image_url}
                alt={project.image_caption ?? project.name}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              {project.image_caption && (
                <p className="px-3 py-2 text-xs text-indigo-100/70">
                  {project.image_caption}
                </p>
              )}
            </div>
          )}
        </div>

        {(project.github_url || project.live_url) && (
          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-50 transition hover:border-indigo-300/60 hover:text-indigo-100"
              >
                Code source
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-300/60 hover:text-emerald-100"
              >
                Démo en ligne
              </a>
            )}
          </div>
        )}
      </header>
    </article>
  );
}
