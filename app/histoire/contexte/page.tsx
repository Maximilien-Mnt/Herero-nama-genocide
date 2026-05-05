import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Koloniales Erbe: Vorkoloniale Gesellschaften und die Anfänge der deutschen Herrschaft",
  description: "Überblick über die vorkolonialen Gesellschaften der Herero und Nama sowie die Anfänge der deutschen Kolonialherrschaft in Deutsch-Südwestafrika (1884–1894).",
  openGraph: {
    title: "Koloniales Erbe — Geschichte des Genozids an den Herero und Nama",
  },
};
export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Koloniales Erbe (1884–1894)" },
        ]}
      />
      <HistoireChapterLayout
        slug="contexte"
        title="Koloniales Erbe: Vorkoloniale Gesellschaften und die Anfänge der deutschen Herrschaft (1884–1894)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}