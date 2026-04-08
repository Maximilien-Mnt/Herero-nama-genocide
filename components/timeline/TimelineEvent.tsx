import type { EventTag, TimelineEvent } from "@/lib/types";
import {
  getDatasetById,
  getDocumentById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";
import { CrossLinkTag } from "@/components/CrossLink";
import { parse, format } from "date-fns";
import { de } from "date-fns/locale";

const TAG_LABELS: Record<EventTag, string> = {
  herero: "Herero",
  nama: "Nama",
  colonial: "Koloniale Verwaltung",
  military: "Militär",
  aftermath: "Nach 1908",
  memory: "Erinnerung",
};

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

function formatGermanDate(dateStr: string): string {
  let d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    const germanPattern = /^(\d+)\.?\s*(\w+)\s+(\d{4})$/i;
    const match = dateStr.match(germanPattern);
    if (match) {
      const [, day, monthName, year] = match;
      d = parse(`${day} ${monthName} ${year}`, "d MMMM yyyy", new Date(), { locale: de });
    } else {
      return dateStr;
    }
  }
  if (isNaN(d.getTime())) return dateStr;
  return format(d, "d. MMMM yyyy", { locale: de });
}

function tagColor(t: EventTag): string {
  switch (t) {
    case "herero": return "var(--color-herero)";
    case "nama": return "var(--color-nama)";
    case "colonial": return "var(--color-colonial)";
    case "military": return "var(--color-military)";
    case "aftermath": return "var(--accent-rust)";
    case "memory": return "var(--color-memory)";
    default: return "var(--accent-gold)";
  }
}

function primaryTag(event: TimelineEvent): EventTag {
  const priority: EventTag[] = ["herero", "nama", "colonial", "military", "aftermath", "memory"];
  return priority.find((t) => event.tags.includes(t)) ?? event.tags[0] ?? "colonial";
}

interface TimelineEventCardProps {
  event: TimelineEvent;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TimelineEventCard({ event, isExpanded, onToggle }: TimelineEventCardProps) {
  const mainTag = primaryTag(event);
  const color = tagColor(mainTag);
  const dateLabel = formatGermanDate(event.date);
  const tagLabel = TAG_LABELS[mainTag] || "Ereignis";

  return (
    <article
      className="timeline-card-horizontal"
      style={{ "--card-accent": color } as React.CSSProperties}
      aria-labelledby={`event-${event.id}-title`}
    >
      {/* Clickable header: always visible */}
      <button
        onClick={onToggle}
        className="timeline-card-header-button"
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: color,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 0.75rem",
            borderTopLeftRadius: "var(--radius-md)",
            borderTopRightRadius: "var(--radius-md)",
            color: "#14110c",
            fontWeight: 500,
            fontSize: "0.85rem",
          }}
        >
          <span>{dateLabel}</span>
          <span style={{ background: "rgba(0,0,0,0.2)", padding: "0.15rem 0.4rem", borderRadius: "999px" }}>
            {tagLabel}
          </span>
        </div>
        <div style={{ padding: "0.75rem" }}>
          <h3
            id={`event-${event.id}-title`}
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: "1.25",
              color: "var(--text-primary)",
            }}
          >
            {event.title}
          </h3>
        </div>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div style={{ padding: "0 0.75rem 0.75rem 0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
          <p style={{ margin: "0.5rem 0 0.75rem", color: "var(--text-body)", fontSize: "0.9rem" }}>
            {event.summary}
          </p>
          <div className="crosslink-tags" aria-label="Querverweise">
            {event.relatedPlaceIds.map((id) => {
              const p = getPlaceById(id);
              if (!p) return null;
              return (
                <CrossLinkTag
                  key={id}
                  href={`/carte?place=${p.id}#place-${p.id}`}
                  icon="📍"
                  label={p.name}
                  sectionId={`place-${p.id}`}
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
                  href={`/statistiken#${ds.id}`}
                  icon="📊"
                  label={ds.title}
                  sectionId={ds.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}