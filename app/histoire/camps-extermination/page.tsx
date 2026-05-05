import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Das Lagersystem: Konzentrationslager, Zwangsarbeit und systematischer Tod (1904–1908)",
  description: "Die deutschen Konzentrationslager in DSWA — Shark Island, Swakopmund, Karibib, Aus — ihre Entstehung, ihre Bedingungen, die Sterblichkeit und ihre Rolle im Vernichtungsprozess.",
  openGraph: {
    title: "Das Lagersystem (1904–1908) — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Das Lagersystem (1904–1908)" },
        ]}
      />
      <HistoireChapterLayout
        slug="camps-extermination"
        title="Das Lagersystem: Konzentrationslager, Zwangsarbeit und systematischer Tod (1904–1908)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}