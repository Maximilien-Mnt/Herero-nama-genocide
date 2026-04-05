import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Méthodologie",
  description: "Choix de sources, traitement des images sensibles et limites des chiffres présentés.",
  openGraph: { title: "Méthodologie — Projet Héréro & Nama" },
};

export default function MethodologiePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Méthodologie" }]} />
      <article className="prose">
        <h1>Méthodologie</h1>
        <p>
          Ce site vise une <strong>autonomie complète pour le jury</strong> : chaque section rappelle
          son objet dès l’introduction et renvoie explicitement aux{" "}
          <Link href="/ressources">Ressources</Link>. Les auteurs distinguent :
        </p>
        <ul>
          <li>
            <strong>Faits établis</strong> par le consensus historiographique (avec débats signalés) ;
          </li>
          <li>
            <strong>Éléments contestés</strong> (chiffres de mortalité, interprétations juridiques) ;
          </li>
          <li>
            <strong>Schémas pédagogiques</strong> dans Statistiques, clairement étiquetés comme tels.
          </li>
        </ul>
        <h2>Traitement des sources visuelles</h2>
        <p>
          Les archives coloniales et la presse produisent des images à charge idéologique élevée.
          Lorsque les reproductions sont autorisées, elles sont accompagnées d’un crédit, d’une date
          approximative et d’un commentaire de contextualisation. Les vignettes marquées sensibles sont
          floutées jusqu’à ouverture dans la visionneuse — ajuster en fonction des protocoles de votre
          établissement.
        </p>
        <h2>Modèle de données et traçabilité</h2>
        <p>
          Les fichiers JSON du dossier <code>content/</code> exposent des identifiants stables (
          <code>evt-…</code>, <code>place-…</code>, <code>doc-…</code>) pour relier chronologie,
          cartes et documents. Versionner le dépôt Git du projet et consulter le fichier{" "}
          <code>docs/CONTENT_MODEL.md</code> dans le workspace.
        </p>
        <h2>Collaboration Notion → site</h2>
        <p>
          Les brouillons longs sont rédigés dans Notion, puis transférés en MDX ou JSON après relecture.
          Le fichier <code>docs/NOTION_WORKFLOW.md</code> décrit la checklist des métadonnées
          minimales pour chaque nouveau document (crédit, licence, date, identifiants croisés).
        </p>
      </article>
    </PageShell>
  );
}