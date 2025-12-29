import React from "react";
import cvData from "@/CV/CV.json";

type Projet = {
  Nom_Projet: string;
  Description: string[];
}

type Formation = {
  Nom: string;
  Lieu: string;
  Date: string;
  Nom_Diplome: string;
  Projet_Realise: Projet[];
};

type Experience = {
  Lieu: string;
  Date: string;
  Titre: string;
  Missions: string[];
};

type Langue = {
  Nom: string;
  Niveau: string;
};

type CVData = {
  Nom: string;
  Prenom: string;
  Mail: string;
  Numero: string;
  Adress: string;
  Intro: string;
  Competences: string[];
  Langages_Technique: string[];
  Outils_Technique: string[];
  Langues: Langue[];
  Formations: Formation[];
  Experiences: Experience[];
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-indigo-100">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

function PillList({ items, emptyLabel }: { items: string[]; emptyLabel: string }) {
  if (!items || items.length === 0) {
    return <p className="mt-2 text-sm text-indigo-100/70">{emptyLabel}</p>;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-indigo-500/20 bg-indigo-500/15 px-3 py-1 text-sm text-indigo-50"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const data: CVData = cvData;
  const fullName = `${data.Prenom} ${data.Nom}`;
  const contactItems = [
    { label: "Mail", value: data.Mail, href: `mailto:${data.Mail}` },
    { label: "Téléphone", value: data.Numero, href: `tel:${data.Numero}` },
    { label: "Adresse", value: data.Adress },
  ];
  const info = `${data.Intro}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12 md:py-16">
        <header className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {fullName}
            </h1>
            <p className="text-lg text-indigo-50/80">{data.Intro}</p>

            <div className="flex flex-wrap gap-3">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-50 shadow-lg shadow-indigo-500/10"
                >
                  <span className="font-semibold">{item.label} :</span>{" "}
                  {item.href ? (
                    <a
                      className="underline decoration-indigo-300 underline-offset-4 hover:text-indigo-200"
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-indigo-100/80">
              <span className="rounded-full border border-indigo-300/30 px-3 py-1">
                {data.Formations.length} formation(s)
              </span>
              <span className="rounded-full border border-indigo-300/30 px-3 py-1">
                {data.Experiences.length} expérience(s)
              </span>
              <span className="rounded-full border border-indigo-300/30 px-3 py-1">
                {data.Competences.length} soft skills
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-indigo-500/20 backdrop-blur">
            <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-indigo-100">
              Profil
            </h2>
            <p className="mt-3 text-sm text-indigo-50/80">
              {info}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-indigo-50/90">
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
                  Disponibilité
                </p>
                <p className="mt-1 text-base font-semibold">Stage avril 2026</p>
              </div>
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
                  Localisation
                </p>
                <p className="mt-1 text-base font-semibold">{data.Adress}</p>
              </div>
            </div>
          </div>
        </header>

        <Section title="Compétences">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-indigo-100/90">
                Soft skills
              </h3>
              <PillList
                items={data.Competences}
                emptyLabel="Pas encore de compétences listées."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-indigo-100/90">
                  Langages techniques
                </h3>
                <PillList
                  items={data.Langages_Technique}
                  emptyLabel="Aucun langage renseigné pour l'instant."
                />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-indigo-100/90">
                  Outils
                </h3>
                <PillList
                  items={data.Outils_Technique}
                  emptyLabel="Aucun outil renseigné pour l'instant."
                />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Formations">
          <div className="space-y-4">
            {data.Formations.map((formation, index) => (
              <article
                key={formation.Nom + index}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-indigo-500/5 p-4 shadow-md shadow-indigo-500/10 md:p-5"
              >
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
                                key={projet.Nom_Projet + '-desc-' + descIndex}
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
            ))}
          </div>
        </Section>

        <Section title="Expériences">
          <div className="space-y-4">
            {data.Experiences.map((experience, index) => (
              <article
                key={experience.Titre + index}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-800/30 p-4 shadow-md shadow-indigo-500/10 md:p-5"
              >
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
            ))}
          </div>
        </Section>

        <Section title="Langues">
          <div className="grid gap-3 sm:grid-cols-2">
            {data.Langues.map((langue, index) => (
              <div
                key={langue.Nom + index}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{langue.Nom}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-indigo-200/70">
                    Niveau
                  </p>
                </div>
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-100">
                  {langue.Niveau}
                </span>
              </div>
            ))}
            {data.Langues.length === 0 && (
              <p className="text-sm text-indigo-100/70">Aucune langue renseignée.</p>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
