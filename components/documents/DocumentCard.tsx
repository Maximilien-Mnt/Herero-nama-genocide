// components/documents/DocumentCard.tsx
import type { HistoricalDocument, DocumentType } from "@/lib/types";

/** Ensures a relative image path gets the correct /assets/documents-images/ prefix */
function resolveImagePath(path: string): string {
  if (!path) return path;
  // Fix inadvertent "./public/" prefix
  if (path.startsWith("./public/")) {
    path = "/" + path.slice("./public/".length);
  }
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return `/assets/documents-images/${path}`;
}

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

function truncateBlurb(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
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

  // Thumbnail element – no sensitive class
  const thumbnail = (
    <div
      className={[
        "document-thumb",
        isList ? "document-thumb--list" : "",
        isGallery ? "document-thumb--gallery" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isList
          ? { height: "100px", width: "100px", flexShrink: 0 }
          : isGallery
          ? { aspectRatio: "16 / 9", width: "100%" }
          : { aspectRatio: "4 / 3", width: "100%" }
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveImagePath(document.thumbPath)}
        alt={document.title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div className="document-thumb-overlay" aria-hidden>
        Ansehen →
      </div>
    </div>
  );

  const truncatedBlurb = truncateBlurb(document.blurb, 100);

  const meta = (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: isList ? 0 : "0.75rem",
        }}
      >
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

      <p
        style={{
          margin: "0 0 0.5rem",
          color: "var(--text-muted)",
          fontSize: "0.95rem",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {document.year ? `${document.year} · ` : null}
        {truncatedBlurb}
      </p>

      {/* Credit and Lizenz: each on a single line with ellipsis */}
      <div style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-body)" }}>
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Credit:</span> {document.credit}
        </div>
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Lizenz:</span> {document.licenseNote}
        </div>
      </div>
    </>
  );

  // List layout: horizontal with fixed thumbnail height
  if (isList) {
    return (
      <article
        className="card document-card document-card--list"
        id={document.id}
        style={{ scrollMarginTop: "6rem" }}
      >
        <button
          type="button"
          onClick={onOpen}
          style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
          aria-label={`Ansehen: ${document.title}`}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {thumbnail}
            <div style={{ flex: 1, minWidth: 0 }}>{meta}</div>
          </div>
        </button>
      </article>
    );
  }

  // Grid or Gallery: vertical card with full height
  return (
    <article
      className={`card document-card ${isGallery ? "document-card--gallery" : ""}`}
      id={document.id}
      style={{
        scrollMarginTop: "6rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
        }}
        aria-label={`Ansehen: ${document.title}`}
      >
        {thumbnail}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {meta}
        </div>
      </button>
    </article>
  );
}