import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Die Omaheke: Massenflucht, Verdursten und der Tod in der Wüste",
  description: "Die Flucht der Herero in die Omaheke-Sandwüste, der deutsche Wasserkordon, das Massensterben durch Verdursten und Hunger sowie die Zeugnisse der Überlebenden.",
  openGraph: {
    title: "Die Omaheke: Tod in der Wüste — Geschichte des Genozids an den Herero und Nama",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Die Omaheke: Tod in der Wüste" },
        ]}
      />
      <HistoireChapterLayout
        slug="omaheke-vertreibung"
        title="Die Omaheke: Massenflucht, Verdursten und der Tod in der Wüste"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}