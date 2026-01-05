import { cookies } from "next/headers";
import { AddProjectForm } from "@/components/AddProjectForm";

export const dynamic = "force-dynamic";

export default async function AjoutProjetPage() {
  const cookieStore = await cookies();
  const unlocked = cookieStore.get("project_admin")?.value === "true";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Ajouter un projet
        </h1>
        <p className="mt-2 text-indigo-100/80">
          Accès protégé par mot de passe. Les projets sont enregistrés dans
          Supabase.
        </p>
        <div className="mt-8">
          <AddProjectForm unlocked={unlocked} />
        </div>
      </div>
    </div>
  );
}
