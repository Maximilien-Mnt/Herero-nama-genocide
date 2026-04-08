"use client";

import { useMemo, useState } from "react";
import type { EventTag, TimelineEvent } from "@/lib/types";
import { FilterPill } from "@/components/FilterPill";
import { Button } from "@/components/Button";
import { HorizontalTimeline } from "./HorizontalTimeline";

const TAG_LABELS: Record<EventTag, string> = {
  herero: "Herero",
  nama: "Nama",
  colonial: "Kolonisation / Verwaltung",
  military: "Militär",
  aftermath: "Nach 1908",
  memory: "Erinnerung",
};

const ALL_TAGS = Object.keys(TAG_LABELS) as EventTag[];

export function TimelineClient({ events }: { events: TimelineEvent[] }) {
  const [activeTags, setActiveTags] = useState<Set<EventTag>>(new Set());

  const filtered = useMemo(() => {
    if (activeTags.size === 0) return events;
    return events.filter((e) => e.tags.some((t) => activeTags.has(t)));
  }, [events, activeTags]);

  function toggleTag(t: EventTag) {
    setActiveTags((prev) => {
      const n = new Set(prev);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 1.5rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {ALL_TAGS.map((t) => (
            <FilterPill key={t} active={activeTags.has(t)} onClick={() => toggleTag(t)}>
              {TAG_LABELS[t]}
            </FilterPill>
          ))}
          <Button variant="secondary" onClick={() => setActiveTags(new Set())}>
            Zurücksetzen
          </Button>
        </div>
      </div>

      <HorizontalTimeline events={filtered} />
    </div>
  );
}