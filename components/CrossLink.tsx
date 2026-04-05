import Link from "next/link";

// Un petit composant utilitaire (CrossLinkTag) pour afficher des liens stylisés avec une icône et un libellé, utilisé pour les liens croisés à travers le site.

export function CrossLinkTag({
  href,
  icon,
  label,
  sectionId,
}: {
  href: string;
  icon: string;
  label: string;
  sectionId?: string;
}) {
  return (
    <Link href={href} className="crosslink-tag">
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
      {sectionId ? (
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
          #{sectionId}
        </span>
      ) : null}
    </Link>
  );
}

