import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Contexte colonial",
  description: "Colonisation allemande, sociétés héréro et nama, tensions pré-1904.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Contexte colonial" },
        ]}
      />
      <HistoireChapterLayout
        slug="contexte"
        title="Contexte colonial et sociétés du Sud-Ouest africain"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}
