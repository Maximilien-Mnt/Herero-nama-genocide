import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const sections = [
  {
    href: "/histoire",
    title: "Histoire",
    text: "Récit structuré et contextualisé : sociétés, colonisation, violence de masse, héritages.",
  },
  {
    href: "/chronologie",
    title: "Chronologie",
    text: "Frise interactive filtrable (Héréros, Nama, administration, mémoire…).",
  },
  {
    href: "/statistiques",
    title: "Statistiques",
    text: "Graphiques accompagnés de sources et mises en garde sur les estimations.",
  },
  {
    href: "/documents",
    title: "Documents",
    text: "Corpus de sources présentées en fiches (à compléter par vos archives autorisées).",
  },
  {
    href: "/carte",
    title: "Carte",
    text: "Lieux clés sur fond OpenStreetMap, avec filtre par période et liens transverses.",
  },
  {
    href: "/ressources",
    title: "Ressources",
    text: "Bibliographie, archives et prolongements pour aller plus loin.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <p
        style={{
          padding: "1rem 1.15rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(155, 90, 60, 0.35)",
          background: "rgba(155, 90, 60, 0.12)",
          color: "var(--text-primary)",
          fontSize: "0.95rem",
          maxWidth: "54rem",
        }}
        role="note"
      >
        <strong>Avertissement :</strong> ce site traite de violence de masse, de déportation et de
        captivité. Certaines images ou descriptions peuvent être perturbantes ; elles sont traitées
        avec des encadrés méthodologiques et des crédits rigoureux.
      </p>

      <header style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.75rem",
            lineHeight: "44px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Génocide des Héréros et des Namas
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "40rem", marginBottom: 0 }}>
          Projet scolaire pensé pour un jury : navigation autonome, textes explicites, sources
          identifiables et liens entre les sections (événements, lieux, documents, graphiques).
        </p>
      </header>

      <section aria-labelledby="guide-titre" style={{ marginBottom: "2rem" }}>
        <h2
          id="guide-titre"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.85rem",
            lineHeight: "30px",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Comment lire ce site sans guide oral
        </h2>
        <ol style={{ maxWidth: "42rem", color: "var(--text-muted)", marginTop: "1rem" }}>
          <li>
            Commencer par <Link href="/histoire/contexte">Histoire — Contexte colonial</Link> ou par
            la <Link href="/chronologie">Chronologie</Link> si vous préférez une logique événementielle.
          </li>
          <li>
            Utiliser la <Link href="/carte">Carte</Link> pour ancrer géographiquement les dates et les
            articles d’histoire.
          </li>
          <li>
            Vérifier les <Link href="/methodologie">méthodes et limites des chiffres</Link> avant
            d’interpréter les graphiques.
          </li>
        </ol>
      </section>

      <div
        className="home-nav-grid"
        aria-label="Navigation principale"
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <h2 style={{ marginTop: 0, fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 600 }}>
              {s.title}
            </h2>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>{s.text}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
