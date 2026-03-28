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
      <article className="prose">
        <h1>À propos</h1>
        <p>
          <strong>Recherche, contenu et documents :</strong> Daniel Liberge.
        </p>
        <p>
          <strong>Développement, déploiement et coordination :</strong> Maximilien Montant.
        </p>
        <p>
          Projet réalisé dans un cadre scolaire, sous licence d’usage éducationnel. Les médias externes
          restent la propriété de leurs titulaires ; seules les compositions originales du présent site
          sont sous la licence déclarée dans le dépôt.
        </p>
        <p>
          Stack : Next.js, React Leaflet, Recharts, MDX — hébergement recommandé sur Vercel relié à
          GitHub pour des déploiements continus.
        </p>
      </article>
    </PageShell>
  );
}
