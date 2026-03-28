import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Bibliographie sélectionnée, archives et prolongements multimédia.",
  openGraph: { title: "Ressources — Génocide héréro et nama" },
};

const kindLabel = {
  book: "Ouvrage",
  article: "Article / chapitre",
  film: "Film / vidéo",
  website: "Site web",
  archive: "Archive",
  other: "Autre",
} as const;

export default function RessourcesPage() {
  const resources = getResources();
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Ressources" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Ressources et bibliographie</h1>
      <p style={{ color: "var(--muted)", maxWidth: "44rem" }}>
        Liste de départ validée par l’équipe pédagogique : compléter les URLs institutionnelles,
        préciser les éditions et noter les traductions disponibles. Pour la méthode de citation, voir{" "}
        <Link href="/citer">Comment citer ce projet</Link>.
      </p>
      <ol style={{ maxWidth: "48rem", paddingLeft: "1.2rem" }}>
        {resources.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>{kindLabel[r.kind]}</strong>
            {r.authors ? <> — {r.authors}.</> : null}{" "}
            <em>{r.title}</em>
            {r.year ? <>, {r.year}.</> : "."}{" "}
            {r.url ? (
              <a href={r.url} rel="noopener noreferrer" target="_blank">
                Lien
              </a>
            ) : null}
            {r.notes ? (
              <div style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {r.notes}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
