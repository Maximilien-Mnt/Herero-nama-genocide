// app/histoire/layout.tsx
import Link from "next/link";
import { historyChapters } from "@/lib/content";
import { PageShell } from "@/components/PageShell";

export const dynamic = 'force-static';

export default function HistoireLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <aside
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
        aria-label="Sommaire Histoire"
      >
        <strong style={{ display: "block", marginBottom: "0.5rem" }}>Sommaire</strong>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: "0.25rem" }}>
          {historyChapters.map((c) => (
            <li key={c.slug}>
              <Link href={`/histoire/${c.slug}`}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Add maxWidth: "none" to override the global .prose constraint */}
      <article className="prose" style={{ maxWidth: "none" }}>
        {children}
      </article>
    </PageShell>
  );
}