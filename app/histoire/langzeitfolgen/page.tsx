import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Langzeitfolgen des Völkermords: Demografie, Enteignung und koloniales Erbe bis zur Unabhängigkeit",
  description: "Die langfristigen demografischen, sozialen und wirtschaftlichen Folgen des Genozids für die Herero und Nama, die Kontinuität kolonialer Ungleichheit unter südafrikanischer Verwaltung und bis zur namibischen Unabhängigkeit 1990.",
  openGraph: {
    title: "Langzeitfolgen des Völkermords — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Langzeitfolgen des Völkermords" },
        ]}
      />
      <HistoireChapterLayout
        slug="langzeitfolgen"
        title="Langzeitfolgen des Völkermords: Demografie, Enteignung und koloniales Erbe bis zur Unabhängigkeit"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}