import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Am Vorabend des Aufstands: Krisen, Eskalation und der Ausbruch des Krieges (1903–1904)",
  description: "Die unmittelbaren Ursachen des Herero-Aufstands, der Bondelswarts-Konflikt, Samuel Mahareros Entscheidung und der Beginn der Rebellion im Januar 1904.",
  openGraph: {
    title: "Am Vorabend des Aufstands (1903–1904) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Am Vorabend des Aufstands (1903–1904)" },
        ]}
      />
      <HistoireChapterLayout
        slug="prelude-revolte"
        title="Am Vorabend des Aufstands: Krisen, Eskalation und der Ausbruch des Krieges (1903–1904)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}