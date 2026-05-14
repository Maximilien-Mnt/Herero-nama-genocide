// 4 (app/citer/page.tsx) – unverändert
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Zitierweise",
  description: "Zitiervorlage für den schriftlichen Bericht und die Präsentation.",
};

export default function CiterPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Zitierweise" }]} />
      <article className="prose" style={{ maxWidth: "none" }}>
        <h1>Wie wird diese Website zitiert ?</h1>
        <p>Beispiel (Datum des Abrufs anpassen):</p>
        <blockquote>
          <b>Daniel Liberge und Maximilien Montant</b>, <em>Völkermord an den Herero und Nama (1904–1908)</em>,
          pädagogische Website, <code>herero-und-nama-genozid.de</code>, abgerufen am [TT Monat JJJJ].
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
        <p>
  Die Inhalte dieser Website wurden für ein schulisches Bildungsprojekt erstellt
  und besitzen keinen offiziellen institutionellen Status.
</p>
      </article>
    </PageShell>
  );
}