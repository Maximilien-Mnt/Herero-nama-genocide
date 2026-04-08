// ./components/documents/DocumentsFiltersClient.tsx
"use client";

import { useMemo, useState } from "react";
import type { DocumentType, HistoricalDocument } from "@/lib/types";
import { FilterPill } from "@/components/FilterPill";
import { DocumentsGallery } from "@/components/documents/DocumentsGallery";
import { Grid, LayoutGrid, List } from "lucide-react";

type ViewMode = "grid" | "gallery" | "list";

const FILTERS: Array<{ value: DocumentType | "all"; label: string }> = [
  { value: "all", label: "Alle" },
  { value: "photograph", label: "Foto" },
  { value: "map", label: "Karte" },
  { value: "text", label: "Text" },
  { value: "artifact", label: "Artefakt" },
];

export function DocumentsFiltersClient({ documents }: { documents: HistoricalDocument[] }) {
  const [activeFilter, setActiveFilter] = useState<DocumentType | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return documents;
    return documents.filter((d) => d.type === activeFilter);
  }, [documents, activeFilter]);

  return (
    <div>
      {/* Filter and view options */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          margin: "1rem 0",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {FILTERS.map((f) => (
            <FilterPill
              key={f.value}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </FilterPill>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setViewMode("grid")}
            className={`view-switch-btn ${viewMode === "grid" ? "view-switch-btn--active" : ""}`}
            aria-label="Kompakte Rasteransicht"
            title="Kompaktes Raster"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("gallery")}
            className={`view-switch-btn ${viewMode === "gallery" ? "view-switch-btn--active" : ""}`}
            aria-label="Luftige Galerieansicht"
            title="Luftige Galerie"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`view-switch-btn ${viewMode === "list" ? "view-switch-btn--active" : ""}`}
            aria-label="Listenansicht"
            title="Liste"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <DocumentsGallery
        allDocuments={documents}
        filteredDocuments={filtered}
        viewMode={viewMode}
      />
    </div>
  );
}