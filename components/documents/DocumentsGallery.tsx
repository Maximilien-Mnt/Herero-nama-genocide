"use client";
import { useState, useEffect, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { HistoricalDocument, DocumentType } from "@/lib/types";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { Reveal } from "@/components/Reveal";
import { CrossLinkTag } from "@/components/CrossLink";
import {
  getEventById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";

/** Ensures a relative image path gets the correct /assets/documents-images/ prefix */
function resolveImagePath(path: string): string {
  if (!path) return path;
  if (path.startsWith("./public/")) {
    path = "/" + path.slice("./public/".length);
  }
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return `/assets/documents-images/${path}`;
}

function documentTypeLabel(t: DocumentType): string {
  switch (t) {
    case "photograph": return "Foto";
    case "map": return "Karte";
    case "newspaper": return "Presse";
    case "artifact": return "Artefakt";
    case "text": return "Text";
    case "other": return "Sonstiges";
  }
}

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
    if (e.target === e.currentTarget) onClose();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  // Combined label: "Type • Year" or just "Type" if no year
  const typeLabel = documentTypeLabel(document.type);
  const combinedLabel = document.year ? `${typeLabel} • ${document.year}` : typeLabel;

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
      <div className="modal-content card">
        <button className="modal-close" onClick={onClose} aria-label="Schließen">
          ×
        </button>

        <h2 id="modal-title" style={{ display: "none" }}>{document.title}</h2>

        <div className="modal-grid">
          {/* LEFT COLUMN */}
          <div className="modal-left">
            {/* Type + year in one centered box, full width */}
            <div className="type-year-box">{combinedLabel}</div>

            {/* Image */}
            <button
              type="button"
              onClick={onImageClick}
              className="modal-image-btn"
              aria-label="Bild vergrößern"
            >
              <div className="document-thumb">
                <img
                  src={resolveImagePath(document.thumbPath)}
                  alt={document.title}
                />
                <div className="document-thumb-overlay" aria-hidden>
                  Vergrößern →
                </div>
              </div>
            </button>

            {/* Credit + license below image */}
            <div className="credit-license">
              <div><span className="meta-label">Credit:</span> {document.credit}</div>
              <div><span className="meta-label">Lizenz:</span> {document.licenseNote}</div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="modal-right">
            <h3 className="modal-title">{document.title}</h3>
            <p className="modal-blurb">{document.blurb}</p>
            {/* Crosslinks – inside right column, responsive */}
            <div className="crosslinks-container">
              <div className="crosslink-tags">
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
          max-width: 800px;
          width: 100%;
          background: var(--bg-elevated);
          border: 1px solid var(--border-strong);
          border-radius: 12px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
          padding: 1.25rem;
        }
        .modal-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-muted);
          z-index: 10;
        }
        /* Two‑column grid */
        .modal-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .modal-left {
          flex: 0 0 200px;
        }
        .modal-right {
          flex: 1;
          min-width: 200px;
          display: flex;
          flex-direction: column;
        }
        /* Single box for type + year */
        .type-year-box {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.75rem;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }
        .modal-image-btn {
          all: unset;
          cursor: pointer;
          display: block;
          width: 100%;
        }
        .document-thumb {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        }
        .document-thumb img {
          width: 100%;
          height: auto;
          display: block;
        }
        .document-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .document-thumb:hover .document-thumb-overlay {
          opacity: 1;
        }
        .credit-license {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: var(--text-body);
          border-top: 1px solid var(--border-weak);
          padding-top: 0.75rem;
        }
        .credit-license div {
          margin-bottom: 0.25rem;
        }
        .credit-license div:last-child {
          margin-bottom: 0;
        }
        .meta-label {
          color: var(--text-muted);
        }
        .modal-title {
          margin: 0 0 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .modal-blurb {
          margin: 0 0 1rem;
          line-height: 1.5;
        }
        .crosslinks-container {
          margin-top: 1rem;
        }
        .crosslink-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* Responsive: on small screens, left column becomes full width */
        @media (max-width: 700px) {
          .modal-grid {
            flex-direction: column;
          }
          .modal-left {
            flex: auto;
            width: 100%;
          }
          .modal-right {
            width: 100%;
          }
          .crosslinks-container {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-weak);
          }
          .modal-blurb {
            margin-bottom: 0.75rem;
          }
        }

        /* Even tighter spacing for very small screens */
        @media (max-width: 480px) {
          .modal-content {
            padding: 1rem;
          }
          .type-year-box {
            margin-bottom: 0.5rem;
          }
          .credit-license {
            margin-top: 0.75rem;
          }
          .modal-title {
            margin-top: 0.5rem;
          }
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

  const openDocumentById = useCallback(
    (id: string) => {
      const doc = allDocuments.find((d) => d.id === id);
      if (doc) setModalDoc(doc);
    },
    [allDocuments]
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) openDocumentById(hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [openDocumentById]);

  const openLightboxForDoc = (doc: HistoricalDocument) => {
    const idx = allDocuments.findIndex((d) => d.id === doc.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const slides = allDocuments.map((d) => ({
    src: resolveImagePath(d.fullPath ?? d.thumbPath),
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
          onClose={() => setModalDoc(null)}
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