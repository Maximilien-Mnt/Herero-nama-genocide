// 14 (app/statistiques/page.tsx)
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { StatsCharts } from "@/components/charts/StatsCharts";
import { getDatasets } from "@/lib/content";

export const metadata: Metadata = {
  title: "Statistiken",
  description: "Didaktische Diagramme mit Quellenangaben und methodischen Warnhinweisen.",
  openGraph: { title: "Statistiken — Völkermord an den Herero und Nama" },
};

export default function StatistiquesPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Statistiken" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Statistiken
      </h1>

      <p role="note" className="card" style={{ marginTop: "1rem", borderRadius: "var(--radius-md)" }}>
        <strong>Hinweis:</strong> Die verschiedenen Diagramme zeigen Werte, die hauptsächlich aus externen Quellen stammen oder aus externen Daten berechnet wurden. Es kann sich daher um Näherungswerte handeln. Siehe auch <a href="/methodologie">Methodik</a> für weitere Informationen.
      </p>
      <StatsCharts datasets={getDatasets()} />
    </PageShell>
  );
}