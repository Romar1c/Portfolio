import { InfoCard } from "./InfoCard";
import { Experience } from "@/types/project";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <InfoCard
      className="bg-gradient-to-br from-white/5 to-slate-800/30"
      eyebrow={experience.Date}
      title={experience.Titre}
      subtitle={experience.Lieu}
    >
      {experience.Missions.length > 0 ? (
        <ul className="space-y-1 text-sm text-indigo-50/90">
          {experience.Missions.map((mission) => (
            <li key={mission} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
              <span>{mission}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-indigo-100/70">
          Aucune mission renseignée.
        </p>
      )}
    </InfoCard>
  );
}
