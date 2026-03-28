"use client";

import { useMemo, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import type { EventTag, TimelineEvent } from "@/lib/types";
import Link from "next/link";
import { CrossLinksForEvent } from "@/components/CrossLinks";

const TAG_LABELS: Record<EventTag, string> = {
  herero: "Héréro",
  nama: "Nama",
  colonial: "Colonisation / administration",
  military: "Militaire",
  aftermath: "Après 1908",
  memory: "Mémoire",
};

const ALL_TAGS = Object.keys(TAG_LABELS) as EventTag[];

function dateLabel(e: TimelineEvent): string {
  if (e.endDate) return `${e.date} — ${e.endDate}`;
  return e.date;
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
      <p style={{ color: "var(--muted)", maxWidth: "42rem" }}>
        Filtres (aucun = tout afficher) : combine plusieurs thèmes pour affiner la frise.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0 1.5rem" }}>
        {ALL_TAGS.map((t) => {
          const on = activeTags.has(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              style={{
                cursor: "pointer",
                borderRadius: 999,
                border: `1px solid ${on ? "var(--accent)" : "var(--border)"}`,
                background: on ? "rgba(201,162,39,0.15)" : "var(--surface)",
                color: "var(--text)",
                padding: "0.35rem 0.75rem",
                fontSize: "0.85rem",
              }}
            >
              {TAG_LABELS[t]}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setActiveTags(new Set())}
          style={{
            cursor: "pointer",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--muted)",
            padding: "0.35rem 0.75rem",
            fontSize: "0.85rem",
          }}
        >
          Réinitialiser
        </button>
      </div>

      <VerticalTimeline lineColor="var(--border)">
        {filtered.map((e) => (
          <VerticalTimelineElement
            key={e.id}
            contentStyle={{
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "7px solid var(--border)" }}
            date={dateLabel(e)}
            iconStyle={{ background: "var(--accent2)", color: "#fff" }}
          >
            <span id={e.id} style={{ scrollMarginTop: "6rem" }} />
            <h3 style={{ marginTop: 0, fontSize: "1.05rem" }}>{e.title}</h3>
            <p style={{ marginBottom: "0.75rem" }}>{e.summary}</p>
            <div style={{ marginBottom: "0.5rem" }}>
              {e.tags.map((t) => (
                <span key={t} className="tag">
                  {TAG_LABELS[t]}
                </span>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              <Link href={`/chronologie#${e.id}`}>Lien direct</Link>
              {" · "}
              <Link href={`/ressources`}>Sources (bibliographie)</Link>
            </p>
            <CrossLinksForEvent eventId={e.id} />
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
