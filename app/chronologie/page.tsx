// app/chronologie/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import TimelineClient from "@/components/timeline/TimelineClient";
import { FilterPill } from "@/components/FilterPill";
import { getEvents } from "@/lib/content";
import type { EventType } from "@/lib/types";

const EVENT_CATEGORIES = [
  "battle",
  "massacre",
  "camp",
  "political",
  "resistance",
  "memorial",
  "other",
] as const;

const CATEGORY_LABELS: Record<EventType, string> = {
  battle: "Schlacht / Krieg",
  massacre: "Massaker / Vertreibung",
  camp: "Konzentrationslager",
  political: "Politische Entscheidung",
  resistance: "Widerstand / Aufstand",
  testimony: "Zeugnis / Bericht",
  memorial: "Gedenken / Erinnerung",
  other: "Anderes",
};

const CATEGORY_COLORS: Record<EventType, string> = {
  battle: "#B85C5C",
  massacre: "#B8935A",
  camp: "#6A4E9E",
  political: "#4A7A9E",
  resistance: "#4D9E6A",
  testimony: "#4A7A9E",
  memorial: "#c9abbc",
  other: "#7D6E5D",
};

export default function ChronologiePage() {
  const allEvents = getEvents();
  const [activeFilters, setActiveFilters] = useState<Set<EventType>>(new Set());

  const categoryCounts = useMemo(() => {
    const counts: Record<EventType, number> = {} as any;
    EVENT_CATEGORIES.forEach((cat) => (counts[cat] = 0));
    allEvents.forEach((ev) => {
      const cat = ev.eventType as EventType;
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, [allEvents]);

  const toggleFilter = (cat: EventType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const filteredEvents = useMemo(() => {
    if (activeFilters.size === 0) return allEvents;
    return allEvents.filter((ev) => activeFilters.has(ev.eventType as EventType));
  }, [allEvents, activeFilters]);

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { label: "Chronologie" },
        ]}
      />
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.75rem",
          lineHeight: "44px",
          fontWeight: 600,
          margin: "0 0 0.5rem",
        }}
      >
        Chronologie
      </h1>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem", marginBottom: "1rem" }}>
      Jeder Punkt ist präzise auf der Zeitleiste positioniert. Zoomen, navigieren und klicken Sie, um die einzelnen Ereignisse zu entdecken.
      </p>

      {/* ---- Filter Pills ---- */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {EVENT_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat];
          const isActive = activeFilters.has(cat);
          return (
            <FilterPill
              key={cat}
              active={isActive}
              onClick={() => toggleFilter(cat)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: 0,
                  backgroundColor: CATEGORY_COLORS[cat],
                  border: "1px solid rgba(255,255,255,0.2)",
                  marginRight: "0.35rem",
                  verticalAlign: "middle",
                }}
              />
              {CATEGORY_LABELS[cat]} ({count})
            </FilterPill>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            onClick={clearFilters}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-warm)",
              cursor: "pointer",
              fontSize: "0.875rem",
              textDecoration: "underline",
              padding: "0.45rem 0.75rem",
            }}
          >
            Alle anzeigen
          </button>
        )}
      </div>

      <TimelineClient events={filteredEvents} />
    </PageShell>
  );
}