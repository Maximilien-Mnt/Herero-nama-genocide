// ./components/documents/DocumentsFiltersClient.tsx
"use client";

import { useMemo, useState } from "react";
import type { DocumentType, HistoricalDocument } from "@/lib/types";
import { FilterPill } from "@/components/FilterPill";
import { DocumentsGallery } from "@/components/documents/DocumentsGallery";
import { Grid, LayoutGrid, List, ArrowUpDown } from "lucide-react";

type ViewMode = "grid" | "gallery" | "list";
type SortOrder = "none" | "asc" | "desc";

const FILTERS: Array<{ value: DocumentType | "all"; label: string }> = [
  { value: "all", label: "Alle" },
  { value: "photograph", label: "Foto" },
  { value: "map", label: "Karte" },
  { value: "text", label: "Text" },
  { value: "other", label: "Sonstiges" }, // changed from "Artefakt" (artifact) to "Sonstiges" (other)
];

export function DocumentsFiltersClient({ documents }: { documents: HistoricalDocument[] }) {
  const [activeFilter, setActiveFilter] = useState<DocumentType | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  // Cycle through sort orders
  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  const filtered = useMemo(() => {
    if (activeFilter === "all") return documents;
    return documents.filter((d) => d.type === activeFilter);
  }, [documents, activeFilter]);

  const sorted = useMemo(() => {
    if (sortOrder === "none") return filtered;
    return [...filtered].sort((a, b) => {
      // Explicitly guard against year being undefined
      const ya = parseInt(a.year ?? "", 10);
      const yb = parseInt(b.year ?? "", 10);
      const aIsNaN = isNaN(ya);
      const bIsNaN = isNaN(yb);
      if (aIsNaN && bIsNaN) return 0;
      if (aIsNaN) return 1; // push invalid years to end
      if (bIsNaN) return -1;
      return sortOrder === "asc" ? ya - yb : yb - ya;
    });
  }, [filtered, sortOrder]);

  // Label and icon for the sort button
  const sortLabel =
    sortOrder === "asc"
      ? "Date ↑"
      : sortOrder === "desc"
      ? "Date ↓"
      : "Date";

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
          {/* Sort button */}
          <button
            onClick={toggleSortOrder}
            className={`view-switch-btn ${sortOrder !== "none" ? "view-switch-btn--active" : ""}`}
            aria-label={`Dokumente sortieren (aktuell: ${sortLabel})`}
            title={`Sortierung: ${sortLabel}`}
          >
            <ArrowUpDown size={18} />
            <span style={{ marginLeft: "0.25rem", fontSize: "0.85rem" }}>{sortLabel}</span>
          </button>

          {/* View mode buttons */}
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
        filteredDocuments={sorted}
        viewMode={viewMode}
      />
    </div>
  );
}