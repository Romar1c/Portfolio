import React from "react";
import cvData from "@/CV/CV.json";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FormationCard } from "@/components/FormationCard";
import { LanguageCard } from "@/components/LanguageCard";
import { PillList } from "@/components/PillList";
import { Section } from "@/components/Section";
import { CVData } from "@/types/project";

export default function Home() {
  const data = cvData as CVData;
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
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-indigo-50/90">
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
                  Disponibilité
                </p>
                <p className="mt-1 text-base font-semibold">Stage avril 2026</p>
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
              <FormationCard
                key={formation.Nom + index}
                formation={formation}
              />
            ))}
          </div>
        </Section>

        <Section title="Expériences">
          <div className="space-y-4">
            {data.Experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.Titre + index}
                experience={experience}
              />
            ))}
          </div>
        </Section>

        <Section title="Langues">
          <div className="grid gap-3 sm:grid-cols-2">
            {data.Langues.map((langue, index) => (
              <LanguageCard key={langue.Nom + index} langue={langue} />
            ))}
            {data.Langues.length === 0 && (
              <p className="text-sm text-indigo-100/70">
                Aucune langue renseignée.
              </p>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
