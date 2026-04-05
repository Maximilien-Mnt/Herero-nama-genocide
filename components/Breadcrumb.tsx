// Un composant réutilisable pour afficher le fil d'Ariane, améliorant la navigation et l'orientation de l'utilisateur dans le site.

import Link from "next/link";

export interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.35rem",
          fontSize: "0.85rem",
          color: "var(--muted)",
        }}
      >
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
            {i > 0 ? <span aria-hidden> / </span> : null}
            {c.href ? (
              <Link href={c.href} style={{ color: "var(--muted)" }}>
                {c.label}
              </Link>
            ) : (
              <span style={{ color: "var(--text)" }}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
