import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Das koloniale System: Verwaltung, Landenteignung und Ausbeutung (1894–1903)",
  description: "Analyse der deutschen Kolonialverwaltung in DSWA, der systematischen Landenteignung, wirtschaftlichen Ausbeutung und der strukturellen Ursachen des Völkermords.",
  openGraph: {
    title: "Das koloniale System (1894–1903) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Das koloniale System (1894–1903)" },
        ]}
      />
      <HistoireChapterLayout
        slug="koloniale-herrschaft"
        title="Das koloniale System: Verwaltung, Landenteignung und wirtschaftliche Ausbeutung (1894–1903)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}