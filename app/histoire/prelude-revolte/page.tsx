import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Prélude et soulèvements",
  description: "1904 : escalade militaire, retrait forcé, débats de vocabulaire.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Prélude — 1904" },
        ]}
      />
      <HistoireChapterLayout
        slug="prelude-revolte"
        title="Prélude : tensions et soulèvements de 1904"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}
