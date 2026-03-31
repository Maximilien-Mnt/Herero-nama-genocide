import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Mémoire et réparation",
  description: "Reconnaissance diplomatique, débats sur réparations et lecture critique des indicateurs.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Mémoire et réparation" },
        ]}
      />
      <HistoireChapterLayout
        slug="memoire-reparation"
        title="Mémoire, reconnaissance et débats internationaux"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}
