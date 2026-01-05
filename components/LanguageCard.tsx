import { InfoCard } from "./InfoCard";
import { Langue } from "@/types/project";

type LanguageCardProps = {
  langue: Langue;
};

export function LanguageCard({ langue }: LanguageCardProps) {
  return (
    <InfoCard
      eyebrow="Niveau"
      title={langue.Nom}
      footer={
        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-100">
          {langue.Niveau}
        </span>
      }
    />
  );
}
