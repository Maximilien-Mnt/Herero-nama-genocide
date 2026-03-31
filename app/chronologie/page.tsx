import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { TimelineClient } from "@/components/timeline/TimelineClient";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chronologie",
  description: "Frise chronologique interactive du génocide héréro et nama et de son contexte.",
  openGraph: { title: "Chronologie — Génocide héréro et nama" },
};

export default function ChronologiePage() {
  const events = getEvents();
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Chronologie" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Chronologie
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginTop: "0.75rem" }}>
        Vingt jalons relient le partage colonial, l’escalade de 1904, l’internement, les héritages
        sous mandat sud-africain et les débats de reconnaissance au XXIe siècle. Les filtres permettent
        de se concentrer sur une perspective (Héréros, Nama, administration…).
      </p>
      <TimelineClient events={events} />
    </PageShell>
  );
}
