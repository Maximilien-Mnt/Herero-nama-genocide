import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Rechtliche Hinweise",
  description: "Allgemeine Informationen über die Lizenz, Kontakte, Aktualisierungen, usw.",
};

export default function RechtlichesPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Rechtliche Hinweise" }]} />

      <div className="prose">

        <h1>Rechtliche Hinweise</h1>
        <p>Allgemeine Informationen über die Lizenz, Kontakte, Aktualisierungen, usw.</p>
        <p>Letzte Aktualisierung: Mai 2026</p>
        <h2>Lizenz</h2>
        <p>MIT-Lizenz</p>
        <p>Copyright © 2026 Maximilien MONTANT, Daniel LIBERGE</p>
        <p>
          Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen
          Dokumentationsdateien (die „Software“) erhält, unentgeltlich die Erlaubnis erteilt, die
          Software ohne Einschränkung zu nutzen, einschließlich, aber nicht beschränkt auf das Recht,
          Kopien der Software zu verwenden, zu kopieren, zu ändern, zusammenzuführen, zu
          veröffentlichen, zu verbreiten, unterzulizenzieren und/oder zu verkaufen, vorbehaltlich der
          folgenden Bedingungen:
        </p>
        <p>
          Der obige Urheberrechtshinweis und dieser Lizenzhinweis müssen in allen Kopien oder
          wesentlichen Teilen der Software enthalten sein.
        </p>
        <p>
          DIE SOFTWARE WIRD OHNE MÄNGELGEWÄHR UND OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE
          GEWÄHRLEISTUNG BEREITGESTELLT, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG
          DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON
          RECHTEN DRITTER.
        </p>
        <p>
          Die Autoren und Urheberrechtsinhaber haften in keinem Fall für Ansprüche, Schäden oder
          sonstige Haftung, sei es aus Vertrag, unerlaubter Handlung oder anderweitig, die aus der
          Software oder deren Nutzung entstehen.
        </p>

        <h2>Externe Links</h2>
        <p>
          Diese Website enthält Links zu externen Ressourcen. Die erwähnten, dargestellten oder
          verwendeten Medien, Quellen und Ressourcen gehören ihren jeweiligen Eigentümern. Die Autoren
          übernehmen keine Verantwortung für den Inhalt oder die Verfügbarkeit dieser externen
          Ressourcen.
        </p>
        <h2>Datenschutz</h2>
<p>
  Diese Website verwendet keine Benutzerkonten und speichert keine personenbezogenen
  Daten zu kommerziellen Zwecken.
</p>
        <h2>Hosting</h2>
<p>
  Diese Website wird über Vercel Inc. gehostet.
</p>

        <h2>Kontakt</h2>
        <p>Bei Anfragen (Korrekturen, Entfernung von Inhalten oder sonstige Fragen) wenden Sie sich bitte an:</p>
        <ul>
          <li>daniel.liberge09@gmail.com</li>
          <li>maximilien.montant@gmail.com</li>
        </ul>

        <h2>Aktualisierungen</h2>
        <p>
          Diese Informationen und Hinweise können im Zuge der Weiterentwicklung des Projekts aktualisiert
          werden.
        </p>
      </div>
    </PageShell>
  );
}