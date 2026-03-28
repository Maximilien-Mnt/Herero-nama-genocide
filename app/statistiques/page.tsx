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
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Statistiques et représentations quantitatives</h1>
      <StatsCharts datasets={getDatasets()} />
    </PageShell>
  );
}
