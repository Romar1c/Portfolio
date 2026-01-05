import React from "react";

type InfoCardProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function InfoCard({
  title,
  subtitle,
  eyebrow,
  children,
  footer,
  className,
}: InfoCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 p-4 shadow-md shadow-indigo-500/10 md:p-5 ${className ?? ""}`}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">
          {eyebrow}
        </p>
      )}
      <div className={eyebrow ? "mt-1" : ""}>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && (
          <p className="text-sm text-indigo-100/80">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="mt-3 text-sm text-indigo-100/80">{children}</div>
      )}
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}
