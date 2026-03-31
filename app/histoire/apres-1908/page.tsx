import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Après 1908",
  description: "Héritages coloniaux, mémoires fragmentées, recompositions politiques.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Après 1908" },
        ]}
      />
      <HistoireChapterLayout
        slug="apres-1908"
        title="Après 1908 : héritages de l’ordre colonial"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}
