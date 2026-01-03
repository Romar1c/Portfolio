import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-indigo-100">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
