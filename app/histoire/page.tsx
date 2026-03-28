import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { historyChapters } from "@/lib/content";

export const metadata: Metadata = {
  title: "Histoire",
  description: "Chapitres structurés sur le contexte, le déroulement et les héritages du génocide.",
};

export default function HistoireIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Histoire" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Histoire</h1>
      <p style={{ color: "var(--muted)", maxWidth: "40rem" }}>
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
    </>
  );
}
