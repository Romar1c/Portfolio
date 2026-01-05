"use client";

import { useState } from "react";

type AddProjectFormProps = {
  unlocked: boolean;
};

type FormState = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  github_url: string;
  live_url: string;
  tags: string;
};

const initialForm: FormState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  github_url: "",
  live_url: "",
  tags: "",
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMessage("Projet ajouté avec succès !");
      setForm(initialForm);
    } else {
      setError(data?.error ?? "Impossible d'ajouter le projet.");
      if (res.status === 401) {
        setUnlocked(false);
      }
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
            <h2 className="text-xl font-semibold text-white">
              Accès restreint
            </h2>
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
            {unlockError && (
              <p className="text-sm text-red-300">{unlockError}</p>
            )}
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
            <label className="text-sm text-indigo-100/90" htmlFor="title">
              Titre *
            </label>
            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: Dashboard sécurité"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-indigo-100/90" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
              placeholder="Ex: dashboard-securite"
            />
            <p className="text-xs text-indigo-100/60">
              Si vide, le slug sera généré depuis le titre.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-indigo-100/90" htmlFor="summary">
            Résumé
          </label>
          <input
            id="summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
            placeholder="Quelques lignes de résumé"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-indigo-100/90" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
            placeholder="Détails du projet..."
          />
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
              Lien démo
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
          <label className="text-sm text-indigo-100/90" htmlFor="tags">
            Tags (séparés par des virgules)
          </label>
          <input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:border-indigo-400"
            placeholder="cyber, react, réseau"
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
