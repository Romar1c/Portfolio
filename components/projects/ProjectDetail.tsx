import { SupabaseProject } from "@/types/project";
import { ProjectTags } from "./ProjectTags";

type ProjectDetailProps = {
  project: SupabaseProject;
};

const formatText = (text: string) =>
  text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export function ProjectDetail({ project }: ProjectDetailProps) {
  const detail =
    project.content ||
    project.description ||
    "Ce projet ne possède pas encore de description détaillée.";
  const summary = project.summary || project.description;

  return (
    <article className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur">
      <header className="space-y-3">
        {project.created_at && (
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
            {new Date(project.created_at).toLocaleDateString("fr-FR", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            {summary && (
              <p className="text-lg text-indigo-100/85">{summary}</p>
            )}
          </div>
          <div className="w-full min-w-[200px] max-w-sm">
            <ProjectTags tags={project.tags} />
          </div>
        </div>
        {(project.github_url || project.live_url) && (
          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-50 transition hover:border-indigo-300/60 hover:text-indigo-100"
              >
                Code source
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-300/60 hover:text-emerald-100"
              >
                Démo en ligne
              </a>
            )}
          </div>
        )}
      </header>

      <div className="space-y-4 text-sm leading-relaxed text-indigo-50/90 md:text-base">
        {formatText(detail).map((paragraph, idx) => (
          <p key={idx} className="text-pretty">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
