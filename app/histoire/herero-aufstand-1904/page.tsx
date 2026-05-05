import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Der Aufstand der Herero (Januar–Juli 1904): Kriegführung, Eskalation und deutsche Reaktion",
  description: "Der militärische Verlauf des Herero-Aufstands von Januar bis Juli 1904, die frühen deutschen Rückschläge, das Eintreffen von Verstärkungen und die Ernennung von Trothas.",
  openGraph: {
    title: "Der Herero-Aufstand (1904) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Der Herero-Aufstand (1904)" },
        ]}
      />
      <HistoireChapterLayout
        slug="herero-aufstand-1904"
        title="Der Aufstand der Herero (Januar–Juli 1904): Kriegführung, Eskalation und deutsche Reaktion"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}