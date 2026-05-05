import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Die Wende: Die Schlacht am Waterberg und der Vernichtungsbefehl (August–Oktober 1904)",
  description: "Die entscheidende Konfrontation am Waterberg-Plateau am 11.–12. August 1904 und der Vernichtungsbefehl von Trothas vom 2. Oktober 1904 — Analyse, Text und historiografische Debatte.",
  openGraph: {
    title: "Waterberg und Vernichtungsbefehl (1904) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Waterberg und Vernichtungsbefehl (1904)" },
        ]}
      />
      <HistoireChapterLayout
        slug="waterberg-vernichtungsbefehl"
        title="Die Wende: Die Schlacht am Waterberg und der Vernichtungsbefehl (August–Oktober 1904)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}