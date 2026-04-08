import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { StatsCharts } from "@/components/charts/StatsCharts";
import { getDatasets } from "@/lib/content";

export const metadata: Metadata = {
  title: "Statistiques",
  description: "Graphiques pédagogiques avec citations sources et mises en garde méthodologiques.",
  openGraph: { title: "Statistiques — Génocide héréro et nama" },
};

export default function StatistiquesPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Statistiques" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Statistiques
      </h1>

      <p role="note" className="card" style={{ marginTop: "1rem", borderRadius: "var(--radius-md)" }}>
        <strong>Hinweis :</strong> Die verschiedenen Diagramme zeigen Werte, die hauptsächlich aus externen Quellen stammen oder aus externen Daten berechnet wurden. Es kann sich daher um Näherungswerte handeln. Siehe auch <a href="/methodologie">Méthodologie</a> für mehr Informationen.
      </p>
      <StatsCharts datasets={getDatasets()} />
    </PageShell>
  );
}
