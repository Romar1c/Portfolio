import { Langue } from "@/types/project";

type LanguageCardProps = {
  langue: Langue;
};

export function LanguageCard({ langue }: LanguageCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
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
  );
}
