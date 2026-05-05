import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Erinnerung, Anerkennung und Reparationen: Ein langer Weg zur Aufarbeitung (1915 bis heute)",
  description: "Die Geschichte der Erinnerung an den Herero-Nama-Genozid in Namibia und Deutschland, von der Verdrängung über den Whitaker-Bericht (1985) und die Entschuldigungsrede 2004 bis zur Gemeinsamen Erklärung 2021 und den anhaltenden Reparationsdebatten.",
  openGraph: {
    title: "Erinnerung, Anerkennung und Reparationen — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Erinnerung, Anerkennung und Reparationen" },
        ]}
      />
      <HistoireChapterLayout
        slug="memoire-reparation"
        title="Erinnerung, Anerkennung und Reparationen: Ein langer Weg zur Aufarbeitung (1915 bis heute)"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}