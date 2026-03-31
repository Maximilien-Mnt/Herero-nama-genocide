"use client";

import { useMemo, useState } from "react";
import type { EventTag, TimelineEvent } from "@/lib/types";
import { FilterPill } from "@/components/FilterPill";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { TimelineEventCard } from "@/components/timeline/TimelineEvent";

const TAG_LABELS: Record<EventTag, string> = {
  herero: "Héréro",
  nama: "Nama",
  colonial: "Colonisation / administration",
  military: "Militaire",
  aftermath: "Après 1908",
  memory: "Mémoire",
};

const ALL_TAGS = Object.keys(TAG_LABELS) as EventTag[];

function tagColor(t: EventTag): string {
  switch (t) {
    case "herero":
      return "var(--color-herero)";
    case "nama":
      return "var(--color-nama)";
    case "colonial":
      return "var(--color-colonial)";
    case "military":
      return "var(--color-military)";
    case "aftermath":
      return "var(--accent-rust)";
    case "memory":
      return "var(--color-memory)";
  }
}

function primaryBorderColor(e: TimelineEvent): string {
  const priority: EventTag[] = ["herero", "nama", "colonial", "military", "aftermath", "memory"];
  const found = priority.find((t) => e.tags.includes(t));
  return found ? tagColor(found) : "var(--accent-gold)";
}

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
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem" }}>
        Filtres (aucun = tout afficher). Combinez plusieurs thèmes pour affiner la frise.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0 1.5rem" }}>
        {ALL_TAGS.map((t) => (
          <FilterPill key={t} active={activeTags.has(t)} onClick={() => toggleTag(t)}>
            {TAG_LABELS[t]}
          </FilterPill>
        ))}

        <Button variant="secondary" onClick={() => setActiveTags(new Set())} style={{ marginLeft: "0.25rem" }}>
          Réinitialiser
        </Button>
      </div>

      <div className="timeline-list" aria-label="Frise chronologique">
        <div className="timeline-spine" aria-hidden />
        {filtered.map((e, idx) => (
          <div className="timeline-row" key={e.id}>
            <div aria-hidden style={{ paddingTop: "0.35rem" }}>
              {/* Marker dot, purely decorative; color comes from the event’s primary category. */}
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: primaryBorderColor(e),
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.18)",
                }}
              />
            </div>

            <Reveal delayMs={idx * 60}>
              <span id={e.id} style={{ display: "block", scrollMarginTop: "6.5rem" }} />
              <TimelineEventCard event={e} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
