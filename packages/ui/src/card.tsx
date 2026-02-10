import type { ReactNode } from "react";

export function Card({
  className = "",
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/10 to-transparent opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <h2 className="flex items-center justify-between text-lg font-semibold text-foreground">
          {title}
          <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
            →
          </span>
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {children}
        </p>
      </div>
    </a>
  );
}
