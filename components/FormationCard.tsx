import React from "react";
import { InfoCard } from "./InfoCard";
import { Formation } from "@/types/project";

type FormationCardProps = {
  formation: Formation;
};

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <InfoCard
      className="bg-gradient-to-br from-white/5 to-indigo-500/5"
      eyebrow={formation.Date}
      title={formation.Nom}
      subtitle={`${formation.Nom_Diplome} • ${formation.Lieu}`}
    >
      <p className="text-xs uppercase tracking-[0.15em] text-indigo-200/70">
        Projets réalisés
      </p>
      {formation.Projet_Realise.length > 0 ? (
        <ul className="mt-2 space-y-2 text-sm text-indigo-50/90">
          {formation.Projet_Realise.map((projet) => (
            <li key={projet.Nom_Projet}>
              <p className="font-semibold text-white">{projet.Nom_Projet}</p>
              {projet.Description.map((desc, descIndex) => (
                <p
                  key={projet.Nom_Projet + "-desc-" + descIndex}
                  className="text-indigo-100/70"
                >
                  - {desc}
                </p>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-indigo-100/70">
          Aucun projet renseigné.
        </p>
      )}
    </InfoCard>
  );
}
