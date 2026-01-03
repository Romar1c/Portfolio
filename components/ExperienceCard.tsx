import { Experience } from "@/types/project";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-800/30 p-4 shadow-md shadow-indigo-500/10 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
            {experience.Date}
          </p>
          <h3 className="text-lg font-semibold text-white">
            {experience.Titre}
          </h3>
          <p className="text-sm text-indigo-100/80">{experience.Lieu}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.15em] text-indigo-200/70">
          Missions
        </p>
        {experience.Missions.length > 0 ? (
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-indigo-50/90">
            {experience.Missions.map((mission) => (
              <li key={mission}>{mission}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-indigo-100/70">
            Aucune mission renseignée.
          </p>
        )}
      </div>
    </article>
  );
}
