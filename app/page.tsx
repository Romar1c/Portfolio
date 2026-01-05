import Link from "next/link";
import React from "react";
import cvData from "@/CV/CV.json";
import { ContactList } from "@/components/ContactList";
import { InfoCard } from "@/components/InfoCard";
import { PillList } from "@/components/PillList";
import { Section } from "@/components/Section";
import { CVData } from "@/types/project";

export default function Home() {
  const data = cvData as CVData;
  const fullName = `${data.Prenom} ${data.Nom}`;
  const currentFormation =
    data.Formations.find((formation) =>
      formation.Date.toLowerCase().includes("depuis"),
    ) ?? data.Formations[0];
  const recentExperience = data.Experiences[0];
  const techSnapshot = data.Langages_Technique.slice(0, 4);
  const toolSnapshot = data.Outils_Technique.slice(0, 4);
  const softSnapshot = data.Competences.slice(0, 6);
  const contactItems = [
    { label: "Mail", value: data.Mail, href: `mailto:${data.Mail}` },
    { label: "Téléphone", value: data.Numero, href: `tel:${data.Numero}` },
    { label: "Adresse", value: data.Adress },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12 md:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Étudiant en 4e année · Cybersécurité
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {fullName}
              </h1>
              <p className="text-lg text-indigo-50/80">{data.Intro}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/cv"
                className="rounded-full border border-indigo-400/60 bg-indigo-500/20 px-5 py-3 text-sm font-semibold text-indigo-50 shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:border-indigo-300/80 hover:bg-indigo-500/30"
              >
                Voir mon CV complet
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300/40 hover:text-white"
              >
                Découvrir mes projets
              </Link>
              <a
                href={`mailto:${data.Mail}`}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-indigo-100 underline-offset-4 transition hover:-translate-y-0.5 hover:border-indigo-300/40 hover:text-white hover:underline"
              >
                Me contacter
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-indigo-100/80">
              <span className="rounded-full border border-indigo-300/30 px-3 py-1 text-sm text-indigo-100/80">
                {data.Langues.length} langue(s)
              </span>
              <span className="rounded-full border border-indigo-300/30 px-3 py-1 text-sm text-indigo-100/80">
                {data.Experiences.length} expérience(s)
              </span>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-indigo-500/10">
            <InfoCard
              eyebrow="Disponibilité"
              title="Stage dès avril 2026"
              subtitle="Durée idéale : 5 mois"
            >
              <p>
                Cybersécurité, réseau, tests d&apos;intrusion. Prêt à rejoindre une
                équipe pour apprendre et apporter de la valeur rapidement.
              </p>
            </InfoCard>
            {currentFormation && (
              <InfoCard
                eyebrow="Formation actuelle"
                title={currentFormation.Nom}
                subtitle={currentFormation.Date}
              >
                <p>{currentFormation.Lieu}</p>
              </InfoCard>
            )}
            <InfoCard eyebrow="Contact" title="Coordonnées">
              <ContactList items={contactItems} />
            </InfoCard>
          </div>
        </section>

        <Section title="En bref">
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Cybersécurité & réseau">
              <p>
                Sensibilisé aux tests d&apos;intrusion, à la protection des systèmes
                et à l&apos;administration réseau. Curieux de mettre ces
                connaissances en pratique sur des environnements réels.
              </p>
            </InfoCard>
            <InfoCard title="Esprit d&apos;équipe">
              <p>
                Expérience de management chez McDonald&apos;s : gestion des équipes,
                montée en cadence et résolution de litiges au quotidien.
              </p>
            </InfoCard>
            <InfoCard title="International">
              <p>
                Semestre en Corée du Sud et ouverture aux langues : anglais,
                espagnol et coréen. À l&apos;aise pour collaborer dans des contextes
                multiculturels.
              </p>
            </InfoCard>
          </div>
        </Section>

        <Section title="Aperçu du parcours">
          <div className="grid gap-4 md:grid-cols-2">
            {recentExperience && (
              <InfoCard
                eyebrow="Dernière expérience"
                title={recentExperience.Titre}
                subtitle={`${recentExperience.Lieu} · ${recentExperience.Date}`}
              >
                <ul className="space-y-1 text-sm text-indigo-100/90">
                  {recentExperience.Missions.slice(0, 3).map((mission) => (
                    <li key={mission} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            )}

            {currentFormation && (
              <InfoCard
                eyebrow="Formation"
                title={currentFormation.Nom_Diplome ?? currentFormation.Nom}
                subtitle={`${currentFormation.Nom} · ${currentFormation.Date}`}
              >
                <p className="text-sm text-indigo-100/80">
                  {currentFormation.Lieu}
                </p>
                {currentFormation.Projet_Realise.length > 0 && (
                  <div className="mt-3 space-y-1 text-sm text-indigo-100/90">
                    {currentFormation.Projet_Realise.slice(0, 2).map((projet) => (
                      <p key={projet.Nom_Projet} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
                        <span>{projet.Nom_Projet}</span>
                      </p>
                    ))}
                  </div>
                )}
              </InfoCard>
            )}
          </div>
        </Section>

        <Section title="Compétences clés">
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Soft skills">
              <PillList
                items={softSnapshot}
                emptyLabel="Pas encore de compétences listées."
              />
            </InfoCard>
            <InfoCard title="Langages techniques">
              <PillList
                items={techSnapshot}
                emptyLabel="Aucun langage renseigné pour l'instant."
              />
            </InfoCard>
            <InfoCard title="Outils">
              <PillList
                items={toolSnapshot}
                emptyLabel="Aucun outil renseigné pour l'instant."
              />
            </InfoCard>
          </div>
        </Section>
      </div>
    </div>
  );
}
