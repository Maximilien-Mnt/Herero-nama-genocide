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
        <p>
          <strong>Recherche, Redaktion, Archivbearbeitung, Synthese :</strong> Daniel Liberge
        </p>
        <p>
          <strong>Entwicklung, Debugging, Bereitstellung, Verwaltung, Organisation, Koordination :</strong> Maximilien Montant
        </p>
        <p>
          Diese Website entstand im Rahmen eines Schulprojekts.
        </p>
        <p>
          Sie dient ausschließlich Bildungs- und Informationszwecken.
        </p>
        <p>
          <strong>Stack :</strong> Next.js, React Leaflet, Recharts, MDX — hébergement recommandé sur Vercel relié à
          GitHub pour des déploiements continus.
        </p>
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
      <p>daniel.liberge09@gmail.com</p>
      <p>maximilien.montant@gmail.com</p>
      <h3>Aktualisierungen</h3>
      <p>Diese Nutzungsbedingungen können im Zuge der Weiterentwicklung des Projekts aktualisiert werden.</p>
    </PageShell>
  );
}

// article classname = "prose"