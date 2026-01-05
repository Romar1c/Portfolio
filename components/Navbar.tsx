"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projets" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-indigo-100">
          Romaric Barbaud
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/projects"
                ? pathname?.startsWith("/projects")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border border-indigo-400/50 bg-indigo-500/20 text-indigo-50 shadow-lg shadow-indigo-500/20"
                    : "border border-white/10 bg-white/5 text-indigo-100 hover:border-indigo-300/40 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
