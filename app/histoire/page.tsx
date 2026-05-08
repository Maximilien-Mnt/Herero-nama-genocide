// app/histoire/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { historyChapters } from "@/lib/content";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Geschichte",
  description: "Völkermord an Herero und Nama: Kontext, Verlauf, Lager, Widerstand und Erinnerung (1884–2021).",
};

export default function HistoireIndexPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Geschichte" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Geschichte
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginTop: "0.75rem" }}>
        Zwölf Kapitel behandeln den kolonialen Kontext (1884–1903), den Aufstand und die Vernichtungspolitik (1904–1908), das Lagersystem, Langzeitfolgen und die Erinnerungspolitik bis heute. Jedes Kapitel kann unabhängig gelesen werden und ist mit der Chronologie, der Karte und den Dokumenten verknüpft.
      </p>
      <div style={{ marginTop: "1.5rem" }}>
        <strong style={{ display: "block", marginBottom: "0.75rem" }}>Alle Kapitel:</strong>
        <ul style={{ maxWidth: "42rem", margin: 0, paddingLeft: "1.1rem" }}>
          {historyChapters.map((c) => (
            <li key={c.slug} style={{ marginBottom: "0.5rem" }}>
              <Link href={`/histoire/${c.slug}`} style={{ textDecoration: "none" }}>
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}