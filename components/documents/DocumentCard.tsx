// ./components/documents/DocumentCard.tsx
import type { HistoricalDocument, DocumentType } from "@/lib/types";
import { CrossLinkTag } from "@/components/CrossLink";
import {
  getEventById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";

function documentTypeLabel(t: DocumentType): string {
  switch (t) {
    case "photograph":
      return "Foto";
    case "map":
      return "Karte";
    case "newspaper":
      return "Presse";
    case "artifact":
      return "Artefakt";
    case "text":
      return "Text";
    case "other":
      return "Sonstiges";
  }
}

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

export function DocumentCard({
  document,
  viewMode = "grid",
  onOpen,
}: {
  document: HistoricalDocument;
  viewMode?: "grid" | "gallery" | "list";
  onOpen: () => void;
}) {
  const isList = viewMode === "list";
  const isGallery = viewMode === "gallery";
  const isGrid = viewMode === "grid";

  // Thumbnail element (reused) – inline style removed, CSS handles sizing
  const thumbnail = (
    <div
      className={[
        "document-thumb",
        document.sensitive ? "document-thumb--sensitive" : "",
        isList ? "document-thumb--list" : "",
        isGallery ? "document-thumb--gallery" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={document.thumbPath}
        alt={document.sensitive ? "Sensibler Inhalt – zum Vergrößern klicken" : document.title}
      />
      <div className="document-thumb-overlay" aria-hidden>
        Ansehen →
      </div>
    </div>
  );

  const meta = (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: isList ? 0 : "0.75rem" }}>
        <span
          className="theme-tag"
          style={{
            borderColor: "var(--border-strong)",
            color: "var(--text-body)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {documentTypeLabel(document.type)}
        </span>
        {document.sensitive ? (
          <span
            className="theme-tag"
            style={{
              borderColor: "var(--accent-rust)",
              color: "var(--text-primary)",
              background: "rgba(155, 90, 60, 0.15)",
            }}
          >
            Sensibel
          </span>
        ) : null}
      </div>

      <h3
        style={{
          margin: isList ? "0 0 0.25rem" : "0.75rem 0 0.35rem",
          fontFamily: "var(--font-sans)",
          fontSize: isGallery ? "1.15rem" : "1rem",
          fontWeight: 500,
          lineHeight: "1.25",
          color: "var(--text-primary)",
        }}
      >
        {document.title}
      </h3>

      <p style={{ margin: "0 0 0.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
        {document.year ? `${document.year} · ` : null}
        {document.blurb}
      </p>

      <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-body)" }}>
        <span style={{ color: "var(--text-muted)" }}>Credit:</span> {document.credit}.{" "}
        <span style={{ color: "var(--text-muted)" }}>Lizenz:</span> {document.licenseNote}
      </p>

      <div className="crosslink-tags" aria-label="Querverweise des Dokuments">
        {document.relatedEventIds.map((id) => {
          const ev = getEventById(id);
          if (!ev) return null;
          return (
            <CrossLinkTag
              key={id}
              href={`/chronologie#${id}`}
              icon="📅"
              label={ev.title}
              sectionId={id}
            />
          );
        })}
        {document.relatedPlaceIds.map((id) => {
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
        {document.relatedHistorySlugs.map((slug) => {
          const sectionId = `histoire-${slug}`;
          return (
            <CrossLinkTag
              key={slug}
              href={`/histoire/${slug}#${sectionId}`}
              icon="📚"
              label={chapterTitle(slug)}
              sectionId={sectionId}
            />
          );
        })}
      </div>
    </>
  );

  // List layout: horizontal
  if (isList) {
    return (
      <article className="card document-card document-card--list" id={document.id} style={{ scrollMarginTop: "6rem" }}>
        <button
          type="button"
          onClick={onOpen}
          style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
          aria-label={`Ansehen: ${document.title}`}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "stretch" }}>
            {thumbnail}
            <div style={{ flex: 1 }}>{meta}</div>
          </div>
        </button>
      </article>
    );
  }

  // Grid or Gallery: vertical card
  return (
    <article
      className={`card document-card ${isGallery ? "document-card--gallery" : ""}`}
      id={document.id}
      style={{ scrollMarginTop: "6rem" }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
        aria-label={`Ansehen: ${document.title}`}
      >
        {thumbnail}
        {meta}
      </button>
    </article>
  );
}