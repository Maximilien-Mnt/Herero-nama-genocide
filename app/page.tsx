// 15 (app/page.tsx) – Startseite
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const sections = [
  {
    href: "/histoire",
    title: "Geschichte",
    text: "Strukturierte und kontextualisierte Erzählung: Gesellschaften, Kolonisation, Massengewalt, Erbe.",
  },
  {
    href: "/chronologie",
    title: "Chronologie",
    text: "Interaktive, filterbare Zeitleiste (Herero, Nama, Verwaltung, Erinnerung…).",
  },
  {
    href: "/statistiques",
    title: "Statistiken",
    text: "Diagramme mit Quellenangaben und Warnhinweisen zu Schätzungen.",
  },
  {
    href: "/documents",
    title: "Dokumente",
    text: "Quellenkorpus in Karteikartenform (durch Ihre genehmigten Archive zu ergänzen).",
  },
  {
    href: "/carte",
    title: "Karte",
    text: "Schlüsselorte auf OpenStreetMap-Hintergrund, mit Zeitfilter und Querverweisen.",
  },
  {
    href: "/ressources",
    title: "Ressourcen",
    text: "Bibliografie, Archive und Vertiefungsmöglichkeiten.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <p
        style={{
          padding: "1rem 1.15rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(155, 90, 60, 0.35)",
          background: "rgba(155, 90, 60, 0.12)",
          color: "var(--text-primary)",
          fontSize: "0.95rem",
        }}
        role="note"
      >
        <strong>Warnhinweis:</strong> Diese Website behandelt Massengewalt, Deportation und Gefangenschaft. Einige Bilder oder Beschreibungen können verstörend wirken; sie werden mit methodischen Einordnungen und genauen Quellenangaben versehen.
      </p>

      <header style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.75rem",
            lineHeight: "44px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Völkermord an den Herero und Nama
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 0 }}>
          Schulprojekt, konzipiert für eine Jury: eigenständige Navigation, explizite Texte, identifizierbare Quellen und Verknüpfungen zwischen den Abschnitten (Ereignisse, Orte, Dokumente, Diagramme).
        </p>
      </header>

      <section aria-labelledby="guide-titre" style={{ marginBottom: "2rem" }}>
        <h2
          id="guide-titre"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.85rem",
            lineHeight: "30px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Wie man diese Website ohne mündliche Führung liest
        </h2>
        <ol style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
          <li>
            Beginnen Sie mit <Link href="/histoire/contexte">Geschichte — Kolonialer Kontext</Link> oder mit
            der <Link href="/chronologie">Chronologie</Link>, wenn Sie einen ereignisorientierten Zugang bevorzugen.
          </li>
          <li>
            Nutzen Sie die <Link href="/carte">Karte</Link>, um Daten und historische Artikel geografisch zu verorten.
          </li>
          <li>
            Prüfen Sie die <Link href="/methodologie">Methoden und Grenzen der Zahlen</Link>, bevor Sie die Diagramme interpretieren.
          </li>
        </ol>
      </section>

      <div
        className="home-nav-grid"
        aria-label="Hauptnavigation"
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <h2 style={{ marginTop: 0, fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 600 }}>
              {s.title}
            </h2>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>{s.text}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}