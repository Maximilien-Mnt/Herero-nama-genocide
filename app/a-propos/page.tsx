import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "À propos",
  description: "Auteurs, périmètre du projet et mention des droits.",
};

export default function AProposPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "À propos" }]} />
        <h1>Über den Projekt</h1>
        <h3>Autoren</h3>
        <p>
          <strong>Recherche, Redaktion, Archivbearbeitung, Synthese :</strong> Daniel Liberge
        </p>
        <p>
          <strong>Entwicklung, Debugging, Bereitstellung, Verwaltung, Organisation, Koordination :</strong> Maximilien Montant
        </p>
        <h3>Kontext</h3>
        <p>
          Diese Website entstand im Rahmen eines SchulprojektsSie dient ausschließlich Bildungs- und Informationszwecken.
        </p>
        <h3>Stack</h3>
        <ul>
          <li>Next.js</li>
          <li>React</li>
          <li>Leaflet</li>
          <li>Recharts</li>
          <li>Vercel</li>
          <li>GitHub</li>
        </ul>
        <h3>Programmiersprachen</h3>
        <ul>
          <li>TypeScript (95%)</li>
          <li>JavaScript (4,5%)</li>
          <li>MDX/JSON/Andere (0,5%)</li> 
        </ul>  
        <h1>Lizenz</h1>
        <p>MIT-Lizenz</p>
        <p>Copyright © 2026 Maximilien MONTANT, Daniel LIBERGE</p>
        <p>Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, unentgeltlich die Erlaubnis erteilt, die Software ohne Einschränkung zu nutzen, einschließlich, aber nicht beschränkt auf das Recht, Kopien der Software zu verwenden, zu kopieren, zu ändern, zusammenzuführen, zu veröffentlichen, zu verbreiten, unterzulizenzieren und/oder zu verkaufen, vorbehaltlich der folgenden Bedingungen:</p>
        <p>Der obige Urheberrechtshinweis und dieser Lizenzhinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.</p>
        <p>DIE SOFTWARE WIRD OHNE MÄNGELGEWÄHR UND OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG BEREITGESTELLT, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN DRITTER.</p>
        <p>Die Autoren und Urheberrechtsinhaber haften in keinem Fall für Ansprüche, Schäden oder sonstige Haftung, sei es aus Vertrag, unerlaubter Handlung oder anderweitig, die aus der Software oder deren Nutzung entstehen.</p>
      <h1>Rechtliche Hinweise</h1>
      <h3>Externe Links</h3>
      <p>Diese Website enthält Links zu externen Ressourcen. Die erwähnten, dargestellten oder verwendeten Medien, Quellen und Ressourcen gehören ihren jeweiligen Eigentümern. Die Autoren übernehmen keine Verantwortung für den Inhalt oder die Verfügbarkeit dieser externen 
        Ressourcen.</p>
      <h3>Kontakt</h3>
      <p>Bei Anfragen (Korrekturen, Entfernung von Inhalten oder sonstige Fragen) wenden Sie sich bitte an:</p>
      <ul>
        <li>daniel.liberge09@gmail.com</li>
        <li>maximilien.montant@gmail.com</li>
      </ul>
      <h3>Aktualisierungen</h3>
      <p>Diese Nutzungsbedingungen können im Zuge der Weiterentwicklung des Projekts aktualisiert werden.</p>
    </PageShell>
  );
}

// article classname = "prose"