import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Rassenideologie und Kolonialwissenschaft: Pseudowissenschaftliche Grundlagen des Vernichtungskrieges",
  description: "Die Rassenideologie des Kaiserreichs, ihre Rolle bei der Legitimierung kolonialer Gewalt, Eugen Fischers pseudowissenschaftliche Studien in DSWA und die Debatte über Kontinuitäten zum Nationalsozialismus.",
  openGraph: {
    title: "Rassenideologie und Kolonialwissenschaft — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Rassenideologie und Kolonialwissenschaft" },
        ]}
      />
      <HistoireChapterLayout
        slug="rassenideologie"
        title="Rassenideologie und Kolonialwissenschaft: Pseudowissenschaftliche Grundlagen des Vernichtungskrieges"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}