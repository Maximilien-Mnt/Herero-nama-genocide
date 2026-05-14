import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Über das Projekt",
  description: "Allgemeine Informationen, Autoren, technischer Stack und Projektstruktur.",
};

export default function AProposPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Über das Projekt" }]} />

      <div className="prose">
        <h1>Über das Projekt</h1>
    <p>Allgemeine Informationen, Autoren, technischer Stack und Projektstruktur.</p>
        <h2>Kontext</h2>
        <p>
          Diese Website entstand im Rahmen eines Schulprojekts bei der EEL-2 in Luxemburg. Sie dient ausschließlich Bildungs- und
          Informationszwecken.
        </p>

        <h2>Autoren</h2>
        <p>
          <strong>Recherche, Redaktion, Archivbearbeitung, Synthese :</strong> Daniel Liberge
        </p>
        <p>
          <strong>Entwicklung, Debugging, Bereitstellung, Verwaltung, Organisation, Koordination :</strong>{" "}
          Maximilien Montant
        </p>

        

        <h2>Technische Informationen</h2>

        <h3>GitHub-Projekt</h3>
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
│   ├── a-propos
│   │   └── page.tsx
│   ├── carte
│   │   └── page.tsx
│   ├── chronologie
│   │   └── page.tsx
│   ├── citer
│   │   └── page.tsx
│   ├── documents
│   │   └── page.tsx
│   ├── globals.css
│   ├── histoire
│   │   ├── apres-1908
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── camps-extermination
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── contexte
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── herero-aufstand-1904
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── koloniale-herrschaft
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── langzeitfolgen
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── memoire-reparation
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── nama-widerstand
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── omaheke-vertreibung
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── prelude-revolte
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── rassenideologie
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── waterberg-vernichtungsbefehl
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── memoire-reparation
│   │   │   ├── chapter.mdx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── prelude-revolte
│   │       ├── chapter.mdx
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── methodologie
│   │   └── page.tsx
│   ├── page.tsx
│   ├── rechtliches
│   │   └── page.tsx
│   ├── ressources
│   │   └── page.tsx
│   └── statistiques
│       └── page.tsx
├── assets
│   └── genocide-herero+nama.png
├── components
│   ├── Breadcrumb.tsx
│   ├── Button.tsx
│   ├── CrossLink.tsx
│   ├── CrossLinks.tsx
│   ├── FilterPill.tsx
│   ├── PageShell.tsx
│   ├── PageTransition.tsx
│   ├── Reveal.tsx
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
│   ├── charts
│   │   └── StatsCharts.tsx
│   ├── documents
│   │   ├── DocumentCard.tsx
│   │   ├── DocumentsFiltersClient.tsx
│   │   └── DocumentsGallery.tsx
│   ├── histoire
│   │   └── HistoireChapterLayout.tsx
│   ├── map
│   │   ├── MapClient.tsx
│   │   └── MapDynamic.tsx
│   └── timeline
│       ├── TimelineClient.tsx
│       ├── TimelineUtils.tsx
├── content
│   ├── datasets.json
│   ├── documents.json
│   ├── events.json
│   ├── places.json
│   └── resources.json
├── desktop.ini
├── docs
│   ├── CONTENT_MODEL.md
│   ├── JURY_CHECKLIST.md
│   └── NOTION_WORKFLOW.md
├── eslint.config.mjs
├── lib
│   ├── content.ts
│   └── types.ts
├── mdx-components.tsx
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── public
│   ├── assets
│   │   ├── documents-images
│   │   │   ├── dimg1.jpg
│   │   │   └── ...
│   │   ├── startpage-images
│   │   │   ├── simg1.jpg
│   │   │   └── ...
│   │   ├── favicon_black.png
│   │   └── favicon_white.png
│   └── media
│       └── placeholder.svg
├── tsconfig.json
└── types
├── mdx.d.ts
└── vendor.d.ts`}</code>
        </pre>
      </div>
    </PageShell>
  );
}