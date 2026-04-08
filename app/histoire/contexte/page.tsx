// 8 (app/histoire/contexte/page.tsx)
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Kolonialer Kontext",
  description: "Deutsche Kolonisation, Herero- und Nama-Gesellschaften, Spannungen vor 1904.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Kolonialer Kontext" },
        ]}
      />
      <HistoireChapterLayout
        slug="contexte"
        title="Kolonialer Kontext und Gesellschaften in Deutsch-Südwestafrika"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}