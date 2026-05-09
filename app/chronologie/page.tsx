// app/chronologie/page.tsx
"use client"; // <- now a client component

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { TimelinePro } from "@/components/timeline/TimelinePro";
import { getEvents } from "@/lib/content";

// Metadata must be exported from a server component; since this is a client component,
// we can't use the Next.js metadata object. However, the page will still work,
// and you can set metadata via layout or a separate head component if needed.
// (If you prefer to keep metadata, you'll need a server wrapper – see note below.)

export default function ChronologiePage() {
  const events = getEvents();
  const [highlightEventId, setHighlightEventId] = useState<string | null>(null);

  useEffect(() => {
    // Get the hash from the URL (e.g., #event-1890)
    const hash = window.location.hash.slice(1); // remove the '#'
    if (hash) {
      setHighlightEventId(hash);
      // Clean up the hash after reading, so that subsequent navigation doesn't re-trigger
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Chronologie" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: "0 0 0.5rem" }}>
        Chronologie
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginBottom: "2rem" }}>
        Chaque point est positionné précisément sur l'axe temporel. Les cartes sont reliées et ne se chevauchent jamais.
      </p>
      <TimelinePro events={events} highlightEventId={highlightEventId} />
    </PageShell>
  );
}