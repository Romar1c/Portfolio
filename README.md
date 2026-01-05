# Portfolio Next.js + Supabase

Ce projet est un portfolio personnel construit avec Next.js et Supabase. Il expose :
- Une page d’accueil de présentation.
- Un CV détaillé sur `/cv`.
- Une liste de projets issus de la table Supabase `projects` sur `/projects` avec pages détaillées `/projects/[slug]`.
- Une navigation commune (Navbar) et un footer.

## Prérequis

- Node.js 18+
- npm ou pnpm
- Un projet Supabase avec une table `projects`.
- Variables d’environnement Supabase (URL et clé anon) dans `.env`

## Installation

```bash
npm install
```

## Configuration de Supabase

Créer un fichier `.env` avec les mêmes informations que celles presentes dans le fichier `.env.example`.

### Schéma minimal de la table `projects`

Table : `projects`

| Colonne      | Type        | Notes                                 |
|--------------|-------------|---------------------------------------|
| id           | uuid        | primary key (ou bigint)               |
| title        | text        | requis                                |
| slug         | text        | requis, unique                        |
| summary      | text        | optionnel                             |
| description  | text        | optionnel                             |
| content      | text        | optionnel (détails longs)             |
| tags         | text[]      | optionnel (peut être text)            |
| github_url   | text        | optionnel                             |
| live_url     | text        | optionnel                             |
| cover_url    | text        | optionnel                             |
| created_at   | timestamptz | défaut `now()`                        |

## Scripts

- `npm run dev` : lance le serveur de dev Next.js.
- `npm run build` : build de production.

## Fonctionnement des pages

- `/` : page d’accueil orientée présentation rapide et CTA vers le CV et les projets.
- `/cv` : lit `CV.json`, utilise des composants, affiche formations, expériences, langues, etc.
- `/projects` : rendu avec `ProjectList`.
- `/projects/[slug]` : fetch du projet par `slug`, 404 via `notFound()` si absent, rendu avec `ProjectDetail`.

## Composants clés

- `Navbar` : liens CV (`/`) et Projets (`/projects`), état actif selon la route.
- `ProjectList` / `ProjectCard` : grille de projets avec résumé et tags.
- `ProjectDetail` : titre, dates, tags, liens code/démo, contenu détaillé.
- `ProjectTags` : normalise `tags` (array ou string) et affiche via `PillList`.
- `Section` : wrapper visuel commun.

## Développement

1) Copier `.env.example` vers `.env` et renseigner les clés Supabase.
2) Lancer `npm run dev`.
3) Remplir la table `projects` dans Supabase.
4) Visiter `/projects` et `/projects/<slug>` pour vérifier.

## Tests rapides

- Vérifier visuellement `/` et `/projects` en dev.
- Tester un slug inexistant : doit retourner une 404 via `notFound()`.
