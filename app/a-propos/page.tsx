import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Allgemeine Informationen, rechtliche Hinweise, technischer Stack und Projektstruktur.",
};

export default function AProposPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Über uns" }]} />

      <h1>Allgemeine Informationen</h1>

      <h3>Kontext</h3>
      <p>
        Diese Website entstand im Rahmen eines Schulprojekts. Sie dient ausschließlich Bildungs- und
        Informationszwecken.
      </p>

      <h3>Autoren</h3>
      <p>
        <strong>Recherche, Redaktion, Archivbearbeitung, Synthese :</strong> Daniel Liberge
      </p>
      <p>
        <strong>Entwicklung, Debugging, Bereitstellung, Verwaltung, Organisation, Koordination :</strong>{" "}
        Maximilien Montant
      </p>

      <h1>Rechtliche Hinweise</h1>

      <h3>Lizenz</h3>
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

      <h3>Externe Links</h3>
      <p>
        Diese Website enthält Links zu externen Ressourcen. Die erwähnten, dargestellten oder
        verwendeten Medien, Quellen und Ressourcen gehören ihren jeweiligen Eigentümern. Die Autoren
        übernehmen keine Verantwortung für den Inhalt oder die Verfügbarkeit dieser externen
        Ressourcen.
      </p>

      <h3>Kontakt</h3>
      <p>Bei Anfragen (Korrekturen, Entfernung von Inhalten oder sonstige Fragen) wenden Sie sich bitte an:</p>
      <ul>
        <li>daniel.liberge09@gmail.com</li>
        <li>maximilien.montant@gmail.com</li>
      </ul>

      <h3>Aktualisierungen</h3>
      <p>
        Diese Informationen und Hinweise können im Zuge der Weiterentwicklung des Projekts aktualisiert
        werden.
      </p>

      <h1>Programmierinformationen</h1>

      <h3>GitHub Projekt</h3>
      <p>
        <a
          href="https://github.com/LeMaximilien/Projet-histoire"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/LeMaximilien/Projet-histoire
        </a>
      </p>

      <h3>Stack</h3>
      <ul>
        <li>Next.js + React</li>
        <li>Leaflet + Recharts</li>
        <li>Vercel</li>
        <li>INWX</li>
        <li>GitHub</li>
      </ul>

      <h3>Programmiersprachen</h3>
      <ul>
        <li>TypeScript (47.8 %)</li>
        <li>MDX (38.7 %)</li>
        <li>CSS (13.1 %)</li>
        <li>JavaScript (0.4 %)</li>
      </ul>

      <h3>Struktur</h3>
      <pre>
        <code>{`Projet-histoire
├── README.md
├── app
│   ├── a-propos
│   │   └── page.tsx
│   ├── carte
│   │   └── page.tsx
│   ├── chronologie
│   │   └── page.tsx
│   ├── citer
│   │   └── page.tsx
│   ├── documents
│   │   └── page.tsx
│   ├── globals.css
│   ├── histoire
│   │   ├── apres-1908
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── camps-extermination
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── contexte
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── herero-aufstand-1904
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── koloniale-herrschaft
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── langzeitfolgen
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── memoire-reparation
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── nama-widerstand
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── omaheke-vertreibung
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── prelude-revolte
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── rassenideologie
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── waterberg-vernichtungsbefehl
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── prelude-revolte
│   │       ├── chapter.mdx
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── methodologie
│   │   └── page.tsx
│   ├── page.tsx
│   ├── ressources
│   │   └── page.tsx
│   └── statistiken
│       └── page.tsx
├── assets
│   └── genocide-herero+nama.png
├── components
│   ├── Breadcrumb.tsx
│   ├── Button.tsx
│   ├── CrossLink.tsx
│   ├── CrossLinks.tsx
│   ├── FilterPill.tsx
│   ├── PageShell.tsx
│   ├── PageTransition.tsx
│   ├── Reveal.tsx
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
│   ├── charts
│   │   └── StatsCharts.tsx
│   ├── documents
│   │   ├── DocumentCard.tsx
│   │   ├── DocumentsFiltersClient.tsx
│   │   └── DocumentsGallery.tsx
│   ├── histoire
│   │   └── HistoireChapterLayout.tsx
│   ├── map
│   │   ├── MapClient.tsx
│   │   └── MapDynamic.tsx
│   └── timeline
│       ├── TimelineClient.tsx
│       └── TimelineUtils.tsx
├── content
│   ├── datasets.json
│   ├── documents.json
│   ├── events.json
│   ├── places.json
│   └── resources.json
├── docs
│   ├── CONTENT_MODEL.md
│   ├── JURY_CHECKLIST.md
│   └── NOTION_WORKFLOW.md
├── lib
│   ├── content.ts
│   └── types.ts
├── public
│   ├── assets
│   │   ├── documents-images
│   │   ├── startpage-images
│   │   ├── favicon_black.png
│   │   └── favicon_white.png
│   └── media
│       └── placeholder.svg
└── types
    ├── mdx.d.ts
    └── vendor.d.ts`}</code>
      </pre>
    </PageShell>
  );
}