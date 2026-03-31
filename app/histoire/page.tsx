import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { historyChapters } from "@/lib/content";

export const metadata: Metadata = {
  title: "Histoire",
  description: "Chapitres structurés sur le contexte, le déroulement et les héritages du génocide.",
};

export default function HistoireIndexPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Histoire" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Histoire
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginTop: "0.75rem" }}>
        Cinq chapitres enchaînent contexte colonial, escalade militaire, camps et exile forcé, puis
        mémoire et débats contemporains. Chaque chapitre peut être lu indépendamment mais renvoie
        vers la chronologie, la carte et les documents.
      </p>
      <ul style={{ maxWidth: "42rem" }}>
        {historyChapters.map((c) => (
          <li key={c.slug} style={{ marginBottom: "0.6rem" }}>
            <Link href={`/histoire/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
