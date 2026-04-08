// 12
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Methodik",
  description: "Quellenauswahl, Umgang mit sensiblen Bildern und Grenzen der präsentierten Zahlen.",
  openGraph: { title: "Methodik — Projekt Herero & Nama" },
};

export default function MethodologiePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Methodik" }]} />
      <article className="prose" style={{ maxWidth: "none" }}>
        <h1>Methodik</h1>
        <p>
          Diese Website strebt eine <strong>vollständige Autonomie für die Jury</strong> an: Jeder Abschnitt erinnert von der Einleitung an an seinen Zweck und verweist explizit auf die{" "}
          <Link href="/ressourcen">Ressourcen</Link>. Die Autoren unterscheiden:
        </p>
        <ul>
          <li>
            <strong>Gesicherte Fakten</strong> gemäß historiografischem Konsens (mit Hinweis auf Debatten);
          </li>
          <li>
            <strong>Umstrittene Elemente</strong> (Sterblichkeitszahlen, juristische Interpretationen);
          </li>
          <li>
            <strong>Didaktische Schemata</strong> im Statistikbereich, die klar als solche gekennzeichnet sind.
          </li>
        </ul>
        <h2>Umgang mit visuellen Quellen</h2>
        <p>
          Kolonialarchive und Presse erzeugen Bilder mit hoher ideologischer Aufladung.
          Wenn Reproduktionen erlaubt sind, werden sie mit Quellenangabe, ungefährem Datum und einem kontextualisierenden Kommentar versehen. Als sensibel gekennzeichnete Vorschaubilder sind unscharf, bis sie im Betrachter geöffnet werden – passen Sie dies entsprechend den Protokollen Ihrer Einrichtung an.
        </p>
        <h2>Datenmodell und Nachvollziehbarkeit</h2>
        <p>
          Die JSON-Dateien im Ordner <code>content/</code> enthalten stabile Kennungen (
          <code>evt-…</code>, <code>place-…</code>, <code>doc-…</code>), um Chronologie,
          Karten und Dokumente miteinander zu verknüpfen. Versionieren Sie das Git-Repository des Projekts und konsultieren Sie die Datei{" "}
          <code>docs/CONTENT_MODEL.md</code> im Workspace.
        </p>
        <h2>Zusammenarbeit Notion → Website</h2>
        <p>
          Längere Entwürfe werden in Notion verfasst und nach Überprüfung in MDX oder JSON übertragen.
          Die Datei <code>docs/NOTION_WORKFLOW.md</code> beschreibt die Checkliste der minimalen Metadaten für jedes neue Dokument (Quellenangabe, Lizenz, Datum, Querverweise).
        </p>
      </article>
    </PageShell>
  );
}