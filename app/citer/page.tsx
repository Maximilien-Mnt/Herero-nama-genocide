import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Citer le projet",
  description: "Modèle de citation pour le rapport écrit et la présentation devant jury.",
};

export default function CiterPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Comment citer" }]} />
      <article className="prose">
        <h1>Comment citer ce site</h1>
        <p>Exemple (adapter la date de consultation) :</p>
        <blockquote>
          Daniel Liberge et Maximilien Montant, <em>Génocide des Héréros et des Namas (1904–1908)</em>,
          site web pédagogique, [URL publique], consulté le [jj mois aaaa].
        </blockquote>
        <p>
          Pour citer une page précise, ajoutez le chemin (ex.{" "}
          <code>/histoire/camps-extermination</code>
          ) après l’URL.
        </p>
        <p>
          Pour les documents d’archive en ligne, citez toujours <strong>l’institution dépositaire</strong>{" "}
          et le cote, même si la vignette apparaît sur ce site.
        </p>
      </article>
    </PageShell>
  );
}