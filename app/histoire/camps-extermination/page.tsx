// 7
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Lager und Exil",
  description: "Vertreibung, Küstenlager, von Trotha-Befehl, sensible Bildquellen.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/geschichte", label: "Geschichte" },
          { label: "Lager und Exil" },
        ]}
      />
      <HistoireChapterLayout
        slug="camps-extermination"
        title="Krieg, Vertreibungsbefehle und Lager"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}