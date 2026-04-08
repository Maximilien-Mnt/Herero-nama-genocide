"use client";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { HistoricalDocument } from "@/lib/types";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { Reveal } from "@/components/Reveal";
import { CrossLinkTag } from "@/components/CrossLink";
import {
  getEventById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";

type ViewMode = "grid" | "gallery" | "list";

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

interface DocumentDetailModalProps {
  document: HistoricalDocument;
  isOpen: boolean;
  onClose: () => void;
  onImageClick: () => void;
}

function DocumentDetailModal({
  document,
  isOpen,
  onClose,
  onImageClick,
}: DocumentDetailModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className="modal-content card"
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-strong)",
          position: "relative",
        }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
        >
          ×
        </button>

        <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "1rem" }}>
          {document.title}
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ flex: "0 0 200px" }}>
            <button
              type="button"
              onClick={onImageClick}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "block",
                width: "100%",
              }}
              aria-label="Agrandir l'image"
            >
              <div
                className={`document-thumb ${
                  document.sensitive ? "document-thumb--sensitive" : ""
                }`}
                style={{ width: "100%", height: "auto" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={document.thumbPath}
                  alt={
                    document.sensitive
                      ? "Contenu sensible — cliquer pour révéler agrandi"
                      : document.title
                  }
                />
                <div className="document-thumb-overlay" aria-hidden>
                  Agrandir →
                </div>
              </div>
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <span className="theme-tag">{document.type}</span>
              {document.sensitive && (
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
              )}
              {document.year && <span className="theme-tag">{document.year}</span>}
            </div>

            <p style={{ margin: "0 0 1rem" }}>{document.blurb}</p>

            <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Crédit :</span> {document.credit}
              <br />
              <span style={{ color: "var(--text-muted)" }}>Licence :</span> {document.licenseNote}
            </p>

            <div className="crosslink-tags" style={{ marginTop: "1rem" }}>
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .modal-content {
          max-height: 90vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export function DocumentsGallery({
  allDocuments,
  filteredDocuments,
  viewMode,
}: {
  allDocuments: HistoricalDocument[];
  filteredDocuments: HistoricalDocument[];
  viewMode: ViewMode;
}) {
  const [modalDoc, setModalDoc] = useState<HistoricalDocument | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Open a document from the full list by its ID
  const openDocumentById = (id: string) => {
    const doc = allDocuments.find((d) => d.id === id);
    if (doc) {
      setModalDoc(doc);
    }
  };

  // Listen for hash changes and open the corresponding document
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        openDocumentById(hash);
      }
    };

    // Check on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [allDocuments]);

  const openLightboxForDoc = (doc: HistoricalDocument) => {
    const idx = allDocuments.findIndex((d) => d.id === doc.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  // Slides for the lightbox (from all documents)
  const slides = allDocuments.map((d) => ({
    src: d.fullPath ?? d.thumbPath,
    title: d.title,
    description: `${d.credit} — ${d.licenseNote}`,
  }));

  return (
    <div>
      <div className={`doc-view doc-view--${viewMode}`}>
        {filteredDocuments.map((d, i) => (
          <Reveal key={d.id} delayMs={i * 60}>
            <DocumentCard
              document={d}
              viewMode={viewMode}
              onOpen={() => {
                window.location.hash = d.id;
                setModalDoc(d);
              }}
            />
          </Reveal>
        ))}
      </div>

      {modalDoc && (
        <DocumentDetailModal
          document={modalDoc}
          isOpen={!!modalDoc}
          onClose={() => {
            setModalDoc(null);
            // Optionally clear hash when closing
            // window.location.hash = '';
          }}
          onImageClick={() => openLightboxForDoc(modalDoc)}
        />
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Fullscreen]}
        on={{ view: ({ index: i }) => setLightboxIndex(i) }}
      />
    </div>
  );
}