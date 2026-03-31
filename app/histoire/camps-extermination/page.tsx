import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Camps et exile",
  description: "Refoulement, camps côtiers, ordre de von Trotha, sensibilité des sources visuelles.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Camps et exile" },
        ]}
      />
      <HistoireChapterLayout
        slug="camps-extermination"
        title="Guerre, ordres de refoulement et camps"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}
