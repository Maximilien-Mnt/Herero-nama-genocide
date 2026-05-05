import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Der Krieg gegen die Nama (1904–1908): Widerstand, Guerillakrieg und Deportation",
  description: "Hendrik Witboois Entscheidung zum Widerstand, die Guerillataktiken der Nama, Jakob Morengos Kampf und die systematische Deportation der Nama in die Konzentrationslager.",
  openGraph: {
    title: "Der Nama-Krieg (1904–1908) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Der Krieg gegen die Nama (1904–1908)" },
        ]}
      />
      <HistoireChapterLayout
        slug="nama-widerstand"
        title="Der Krieg gegen die Nama (1904–1908): Widerstand, Guerillakrieg und Deportation"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}