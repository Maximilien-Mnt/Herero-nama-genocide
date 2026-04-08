// 13
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ressourcen",
  description: "Ausgewählte Bibliografie, Archive und multimediale Vertiefungen.",
  openGraph: { title: "Ressourcen — Völkermord an den Herero und Nama" },
};

const kindLabel = {
  book: "Monografie",
  article: "Artikel / Kapitel",
  film: "Film / Video",
  website: "Website",
  archive: "Archiv",
  other: "Sonstiges",
} as const;

export default function RessourcesPage() {
  const resources = getResources();
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Ressourcen" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Ressourcen und Bibliografie</h1>
      <p style={{ color: "var(--muted)" }}>
        Ausgangsliste, vom pädagogischen Team validiert: Ergänzen Sie institutionelle URLs, präzisieren Sie Ausgaben und vermerken Sie verfügbare Übersetzungen. Zur Zitierweise siehe{" "}
        <Link href="/zitierweise">Wie zitiere ich dieses Projekt?</Link>.
      </p>
      <ol style={{ paddingLeft: "1.2rem" }}>
        {resources.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>{kindLabel[r.kind]}</strong>
            {r.authors ? <> — {r.authors}.</> : null}{" "}
            <em>{r.title}</em>
            {r.year ? <>, {r.year}.</> : "."}{" "}
            {r.url ? (
              <a href={r.url} rel="noopener noreferrer" target="_blank">
                Link
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