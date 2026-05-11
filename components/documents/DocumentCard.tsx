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

  // Map image position string to CSS object-position value
  const getObjectPosition = (pos?: string): string => {
    switch (pos) {
      case "top": return "top";
      case "bottom": return "bottom";
      case "left": return "left";
      case "right": return "right";
      case "center":
      default: return "center";
    }
  };

  const imagePosition = getObjectPosition(document.imagePosition);

  // Shared thumbnail image with dynamic object-position
  const thumbnailImage = (
    <img
      src={resolveImagePath(document.thumbPath)}
      alt={document.title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: imagePosition,
      }}
    />
  );

  // Thumbnail container with overlay (type+year at bottom-left)
  const thumbnailWithOverlay = (
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
          ? { height: "100px", width: "100px", flexShrink: 0, position: "relative" }
          : isGallery
          ? { aspectRatio: "16 / 9", width: "100%", position: "relative" }
          : { aspectRatio: "4 / 3", width: "100%", position: "relative" }
      }
    >
      {thumbnailImage}
      <div className="document-thumb-overlay" aria-hidden>
        Ansehen →
      </div>
      {/* Type and year overlay at bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "6px",
          left: "6px",
          display: "flex",
          gap: "6px",
          background: "rgba(0,0,0,0.7)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: isList ? "0.65rem" : "0.75rem",
          fontWeight: 500,
          color: "white",
          backdropFilter: "blur(2px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span>{documentTypeLabel(document.type)}</span>
        {document.year && <span>{document.year}</span>}
      </div>
    </div>
  );

  const truncatedBlurb = truncateBlurb(document.blurb, 100);

  // List layout: horizontal with thumbnail on left
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
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            {thumbnailWithOverlay}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  margin: "0 0 0.25rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
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
                {truncatedBlurb}
              </p>
              <div style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-body)" }}>
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <span style={{ color: "var(--text-muted)" }}>Credit:</span> {document.credit}
                </div>
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <span style={{ color: "var(--text-muted)" }}>Lizenz:</span> {document.licenseNote}
                </div>
              </div>
            </div>
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
        {thumbnailWithOverlay}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "0.5rem" }}>
          <h3
            style={{
              margin: "0 0 0.35rem",
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
            {truncatedBlurb}
          </p>
          <div style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-body)" }}>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <span style={{ color: "var(--text-muted)" }}>Credit:</span> {document.credit}
            </div>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <span style={{ color: "var(--text-muted)" }}>Lizenz:</span> {document.licenseNote}
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}