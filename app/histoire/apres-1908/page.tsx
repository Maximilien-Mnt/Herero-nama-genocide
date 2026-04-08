// 6
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Nach 1908",
  description: "Koloniales Erbe, fragmentierte Erinnerungen, politische Neuordnungen.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/geschichte", label: "Geschichte" },
          { label: "Nach 1908" },
        ]}
      />
      <HistoireChapterLayout
        slug="apres-1908"
        title="Nach 1908: Erbe der kolonialen Ordnung"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}