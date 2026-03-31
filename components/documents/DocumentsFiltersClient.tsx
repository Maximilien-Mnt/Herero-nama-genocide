"use client";

import { useMemo, useState } from "react";
import type { DocumentType, HistoricalDocument } from "@/lib/types";
import { FilterPill } from "@/components/FilterPill";
import { DocumentsGallery } from "@/components/documents/DocumentsGallery";

const FILTERS: Array<{ value: DocumentType | "all"; label: string }> = [
  { value: "all", label: "Tout" },
  { value: "photograph", label: "Photo" },
  { value: "map", label: "Carte" },
  { value: "text", label: "Texte" },
  { value: "artifact", label: "Artefact" },
];

export function DocumentsFiltersClient({ documents }: { documents: HistoricalDocument[] }) {
  const [active, setActive] = useState<DocumentType | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return documents;
    return documents.filter((d) => d.type === active);
  }, [documents, active]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
        {FILTERS.map((f) => (
          <FilterPill key={f.value} active={active === f.value} onClick={() => setActive(f.value)}>
            {f.label}
          </FilterPill>
        ))}
      </div>

      <DocumentsGallery documents={filtered} />
    </div>
  );
}

