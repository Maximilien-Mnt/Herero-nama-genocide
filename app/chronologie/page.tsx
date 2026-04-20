// 3 (app/chronologie/page.tsx) – unverändert
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { TimelinePro } from "@/components/timeline/TimelinePro";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chronologie",
  description: "Frise chronologique interactive du génocide des Herero et Nama.",
  openGraph: { title: "Chronologie — Génocide des Herero et Nama" },
};

export default function ChronologiePage() {
  const events = getEvents();
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Chronologie" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: "0 0 0.5rem" }}>
        Chronologie
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginBottom: "2rem" }}>
        Chaque point est positionné précisément sur l'axe temporel. Les cartes sont reliées et ne se chevauchent jamais.
      </p>
      <TimelinePro events={events} />
    </PageShell>
  );
}