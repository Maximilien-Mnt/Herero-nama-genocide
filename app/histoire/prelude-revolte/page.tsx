// 10 (app/histoire/prelude-revolte/page.tsx)
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import Chapter from "./chapter.mdx";
import { HistoireChapterLayout } from "@/components/histoire/HistoireChapterLayout";

export const metadata: Metadata = {
  title: "Vorspiel und Aufstände",
  description: "1904: militärische Eskalation, erzwungener Rückzug, Wortschatzdebatten.",
};

export default function Page() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Startseite" },
          { href: "/histoire", label: "Geschichte" },
          { label: "Vorspiel — 1904" },
        ]}
      />
      <HistoireChapterLayout
        slug="prelude-revolte"
        title="Vorspiel: Spannungen und Aufstände von 1904"
      >
        <Chapter />
      </HistoireChapterLayout>
    </PageShell>
  );
}