// 11 (app/histoire/page.tsx)
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { historyChapters } from "@/lib/content";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Geschichte",
  description: "Strukturierte Kapitel über Kontext, Verlauf und Erbe des Völkermords.",
};

export default function HistoireIndexPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Geschichte" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Geschichte
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginTop: "0.75rem" }}>
        Fünf Kapitel verknüpfen den kolonialen Kontext, die militärische Eskalation, Lager und erzwungenes Exil sowie Erinnerung und zeitgenössische Debatten. Jedes Kapitel kann unabhängig gelesen werden, verweist jedoch auf die Chronologie, die Karte und die Dokumente.
      </p>
      <ul style={{ maxWidth: "42rem" }}>
        {historyChapters.map((c) => (
          <li key={c.slug} style={{ marginBottom: "0.6rem" }}>
            <Link href={`/histoire/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}