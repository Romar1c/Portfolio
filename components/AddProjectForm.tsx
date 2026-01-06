"use client";

import { useState } from "react";

type AddProjectFormProps = {
  unlocked: boolean;
};

type ProjectContext = "Cours" | "Pro" | "Perso";

type FormState = {
  name: string;
  slug: string;
  language: string;
  summary: string;
  context: ProjectContext;
  image_url: string;
  image_caption: string;
  github_url: string;
  live_url: string;
  end_date: string;
};

const initialForm: FormState = {
  name: "",
  slug: "",
  language: "",
  summary: "",
  context: "Perso",
  image_url: "",
  image_caption: "",
  github_url: "",
  live_url: "",
  end_date: "",
};

export function AddProjectForm({ unlocked: initialUnlocked }: AddProjectFormProps) {
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnlocking(true);
    setUnlockError(null);

    const res = await fetch("/api/admin/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setUnlocking(false);
    if (res.ok) {
      setUnlocked(true);
      setPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setUnlockError(data?.error ?? "Mot de passe invalide.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      ...form,
      image_url: form.image_url.trim() ? form.image_url.trim() : null,
      image_caption: form.image_caption.trim() ? form.image_caption.trim() : null,
      github_url: form.github_url.trim() ? form.github_url.trim() : null,
      live_url: form.live_url.trim() ? form.live_url.trim() : null,
      end_date: form.end_date.trim() ? form.end_date.trim() : null,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMessage("Projet ajouté avec succès !");
      setForm(initialForm);
    } else {
      setError(data?.error ?? "Impossible d'ajouter le projet.");
      if (res.status === 401) setUnlocked(false);
    }
  };

  return (
    <div className="relative">
      {!unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <form
            onSubmit={handleUnlock}
            className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white">Accès restreint</h2>
            <p className="text-sm text-indigo-100/80">
              Entrez le mot de passe pour ajouter un projet.
            </p>

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-400"
              required
              minLength={4}
            />

            {unlockError && <p className="text-sm text-red-300">{unlockError}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={unlocking}
            >
              {unlocking ? "Vérification..." : "Déverrouiller"}
            </button>
          </form>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="name">
              Nom du projet *
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: Dashboard sécurité"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="slug">
              Slug *
            </label>
            <input
              id="slug"
              name="slug"
              required
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: dashboard-securite"
            />
            <p className="text-xs text-indigo-100/60">
              Format conseillé : minuscules, tirets, pas d’accents.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="language">
              Langage / Stack *
            </label>
            <input
              id="language"
              name="language"
              required
              value={form.language}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: Next.js / TypeScript / Supabase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="context">
              Contexte *
            </label>
            <select
              id="context"
              name="context"
              value={form.context}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
            >
              <option value="Cours">Cours</option>
              <option value="Pro">Pro</option>
              <option value="Perso">Perso</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-indigo-100/90" htmlFor="summary">
            Résumé *
          </label>
          <textarea
            id="summary"
            name="summary"
            required
            value={form.summary}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
            placeholder="Quelques lignes de résumé..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="image_url">
              Image (URL)
            </label>
            <input
              id="image_url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="URL Supabase bucket"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="image_caption">
              Texte sous l’image
            </label>
            <input
              id="image_caption"
              name="image_caption"
              value={form.image_caption}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: Page d’accueil du projet"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="github_url">
              Lien GitHub
            </label>
            <input
              id="github_url"
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="live_url">
              Lien du site / démo
            </label>
            <input
              id="live_url"
              name="live_url"
              value={form.live_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-indigo-100/90" htmlFor="end_date">
            Date de fin (vide = en cours)
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
          />
        </div>

        {message && <p className="text-sm text-green-300">{message}</p>}
        {error && <p className="text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={!unlocked || submitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Ajout en cours..." : "Ajouter le projet"}
        </button>
      </form>
    </div>
  );
}
