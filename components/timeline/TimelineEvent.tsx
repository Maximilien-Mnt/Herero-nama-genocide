import type { EventTag, TimelineEvent } from "@/lib/types";
import type { CSSProperties } from "react";
import {
  getDatasetById,
  getDocumentById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";
import { CrossLinkTag } from "@/components/CrossLink";

const TAG_LABELS: Record<EventTag, string> = {
  herero: "Héréro",
  nama: "Nama",
  colonial: "Colonisation / administration",
  military: "Militaire",
  aftermath: "Après 1908",
  memory: "Mémoire",
};

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

function dateLabel(e: TimelineEvent): string {
  if (e.endDate) return `${e.date} — ${e.endDate}`;
  return e.date;
}

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
  // Prioritize the four semantic categories.
  const priority: EventTag[] = ["herero", "nama", "colonial", "military", "aftermath", "memory"];
  const found = priority.find((t) => e.tags.includes(t));
  return found ? tagColor(found) : "var(--accent-gold)";
}

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const borderColor = primaryBorderColor(event);

  return (
    <article
      className="timeline-card"
      style={
        { ["--timeline-border" as string]: borderColor } as CSSProperties
      }
      aria-labelledby={`event-${event.id}-title`}
    >
      <div className="timeline-date">{dateLabel(event)}</div>
      <div className="timeline-meta" aria-label="Thèmes">
        {event.tags.map((t) => (
          <span
            key={t}
            className="tag"
            style={{
              borderColor: tagColor(t),
              background: "rgba(255,255,255,0.02)",
              color: "var(--text-body)",
            }}
          >
            {TAG_LABELS[t]}
          </span>
        ))}
      </div>

      <h3
        id={`event-${event.id}-title`}
        style={{
          margin: "0 0 0.5rem",
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          fontWeight: 500,
          lineHeight: "1.25",
          color: "var(--text-primary)",
        }}
      >
        {event.title}
      </h3>

      <p style={{ margin: 0, color: "var(--text-body)" }}>{event.summary}</p>

      <div className="crosslink-tags" aria-label="Liens croisés">
        {event.relatedPlaceIds.map((id) => {
          const p = getPlaceById(id);
          if (!p) return null;
          const sectionId = `place-${p.id}`;
          return (
            <CrossLinkTag
              key={id}
              href={`/carte?place=${p.id}#${sectionId}`}
              icon="📍"
              label={p.name}
              sectionId={sectionId}
            />
          );
        })}

        {event.relatedDocumentIds.map((id) => {
          const d = getDocumentById(id);
          if (!d) return null;
          return (
            <CrossLinkTag
              key={id}
              href={`/documents#${d.id}`}
              icon="📖"
              label={d.title}
              sectionId={d.id}
            />
          );
        })}

        {event.relatedHistorySlugs.map((slug) => (
          <CrossLinkTag
            key={slug}
            href={`/histoire/${slug}#histoire-${slug}`}
            icon="📚"
            label={chapterTitle(slug)}
            sectionId={`histoire-${slug}`}
          />
        ))}

        {event.relatedDatasetIds.map((id) => {
          const ds = getDatasetById(id);
          if (!ds) return null;
          return (
            <CrossLinkTag
              key={id}
              href={`/statistiques#${ds.id}`}
              icon="📊"
              label={ds.title}
              sectionId={ds.id}
            />
          );
        })}
      </div>
    </article>
  );
}

