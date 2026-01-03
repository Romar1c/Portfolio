import React from "react";
import { Formation } from "@/types/project";

type FormationCardProps = {
  formation: Formation;
};

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-indigo-500/5 p-4 shadow-md shadow-indigo-500/10 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
            {formation.Date}
          </p>
          <h3 className="text-lg font-semibold text-white">
            {formation.Nom}
          </h3>
          <p className="text-sm text-indigo-100/80">
            {formation.Nom_Diplome} • {formation.Lieu}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-indigo-200/70">
            Projets réalisés
          </p>
          {formation.Projet_Realise.length > 0 ? (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-indigo-50/90">
              {formation.Projet_Realise.map((projet) => (
                <React.Fragment key={projet.Nom_Projet}>
                  <li>{projet.Nom_Projet}</li>
                  {projet.Description.map((desc, descIndex) => (
                    <p
                      key={projet.Nom_Projet + "-desc-" + descIndex}
                      className="ml-6 text-indigo-100/70"
                    >
                      - {desc}
                    </p>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-indigo-100/70">
              Aucun projet renseigné.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
