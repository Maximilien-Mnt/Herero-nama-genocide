// 9 (app/histoire/memoire-reparation/page.tsx)
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Erinnerung und Wiedergutmachung",
  description: "Diplomatische Anerkennung, Debatten über Reparationen und kritische Lektüre von Indikatoren.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Erinnerung und Wiedergutmachung" },
        ]}
      />
      <HistoireChapterLayout
        slug="memoire-reparation"
        title="Erinnerung, Anerkennung und internationale Debatten"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}