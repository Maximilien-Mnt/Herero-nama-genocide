// 3
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { TimelineClient } from "@/components/timeline/TimelineClient";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chronologie",
  description: "Interaktive Zeitleiste des Völkermords an den Herero und Nama und seines Kontexts.",
  openGraph: { title: "Chronologie — Völkermord an den Herero und Nama" },
};

export default function ChronologiePage() {
  const events = getEvents();
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Chronologie" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Chronologie
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginTop: "0.75rem" }}>
        Zwanzig Meilensteine verbinden die koloniale Aufteilung, die Eskalation von 1904, die Internierung, das Erbe unter südafrikanischem Mandat und die Anerkennungsdebatten im 21. Jahrhundert. Die Filter ermöglichen die Fokussierung auf eine bestimmte Perspektive (Herero, Nama, Verwaltung…).
      </p>
      <TimelineClient events={events} />
    </PageShell>
  );
}