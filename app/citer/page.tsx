// 4 (app/citer/page.tsx) – unverändert
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Zitierweise",
  description: "Zitiervorlage für den schriftlichen Bericht und die Präsentation vor der Jury.",
};

export default function CiterPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Zitierweise" }]} />
      <article className="prose" style={{ maxWidth: "none" }}>
        <h1>Wie zitiere ich diese Website?</h1>
        <p>Beispiel (Datum des Abrufs anpassen):</p>
        <blockquote>
          Daniel Liberge und Maximilien Montant, <em>Völkermord an den Herero und Nama (1904–1908)</em>,
          pädagogische Website, [öffentliche URL], abgerufen am [TT Monat JJJJ].
        </blockquote>
        <p>
          Um eine bestimmte Seite zu zitieren, fügen Sie den Pfad (z. B.{" "}
          <code>/histoire/camps-extermination</code>
          ) nach der URL hinzu.
        </p>
        <p>
          Bei Online-Archivdokumenten zitieren Sie stets die <strong>besitzende Institution</strong>{" "}
          und die Signatur, auch wenn das Vorschaubild auf dieser Website erscheint.
        </p>
      </article>
    </PageShell>
  );
}