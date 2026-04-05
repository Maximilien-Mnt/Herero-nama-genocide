// Représente une fiche individuelle pour un document historique.
// Elle affiche une miniature, le titre, une description courte, les crédits et, comme les événements de la frise, des liens croisés vers les événements, lieux et chapitres d'histoire liés.
// Un aspect important est la gestion des images sensibles (sensitive: true) qui peuvent être floutées par défaut.

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
      return "Photo";
    case "map":
      return "Carte";
    case "newspaper":
      return "Presse";
    case "artifact":
      return "Artefact";
    case "text":
      return "Texte";
    case "other":
      return "Autre";
  }
}

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

export function DocumentCard({
  document,
  onOpen,
}: {
  document: HistoricalDocument;
  onOpen: () => void;
}) {
  return (
    <article
      className="card document-card"
      id={document.id}
      style={{ scrollMarginTop: "6rem" }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          width: "100%",
        }}
        aria-label={`Voir : ${document.title}`}
      >
        <div className={["document-thumb", document.sensitive ? "document-thumb--sensitive" : ""].filter(Boolean).join(" ")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={document.thumbPath}
            alt={document.sensitive ? "Contenu sensible — cliquer pour révéler agrandi" : document.title}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="document-thumb-overlay" aria-hidden>
            Voir →
          </div>
        </div>
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
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
            Sensible
          </span>
        ) : null}
      </div>

      <h3 style={{ margin: "0.75rem 0 0.35rem", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500, lineHeight: "1.25", color: "var(--text-primary)" }}>
        {document.title}
      </h3>
      <p style={{ margin: "0 0 0.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
        {document.year ? `${document.year} · ` : null}
        {document.blurb}
      </p>

      <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-body)" }}>
        <span style={{ color: "var(--text-muted)" }}>
          Crédit :
        </span>{" "}
        {document.credit}.{" "}
        <span style={{ color: "var(--text-muted)" }}>
          Licence :
        </span>{" "}
        {document.licenseNote}
      </p>

      <div className="crosslink-tags" aria-label="Liens croisés du document">
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
    </article>
  );
}

