"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { HistoricalDocument } from "@/lib/types";
import { CrossLinksForDocument } from "@/components/CrossLinks";

export function DocumentsGallery({ documents }: { documents: HistoricalDocument[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = documents.map((d) => ({
    src: d.fullPath ?? d.thumbPath,
    title: d.title,
    description: `${d.credit} — ${d.licenseNote}`,
  }));

  return (
    <div>
      <p style={{ color: "var(--muted)", maxWidth: "44rem" }}>
        Les vignettes utilisent un <strong>placeholder</strong> jusqu’à intégration des fichiers
        autorisés. Les entrées sensibles peuvent être floutées ou masquées selon votre politique
        (voir Méthodologie).
      </p>
      <div className="card-grid" style={{ marginTop: "1rem" }}>
        {documents.map((d, i) => (
          <article key={d.id} className="card" id={d.id} style={{ scrollMarginTop: "5rem" }}>
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "block",
                width: "100%",
              }}
              aria-label={`Agrandir : ${d.title}`}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  marginBottom: "0.75rem",
                  filter: d.sensitive ? "blur(6px)" : undefined,
                }}
              >
                <Image
                  src={d.thumbPath}
                  alt={d.sensitive ? "Contenu sensible — cliquer pour révéler agrandi" : d.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </button>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1rem" }}>{d.title}</h3>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
              {d.year ? `${d.year} · ` : null}
              {d.type}
            </p>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem" }}>{d.blurb}</p>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)" }}>
              <strong>Crédit :</strong> {d.credit}. <strong>Licence :</strong> {d.licenseNote}
            </p>
            {d.sourceUrl ? (
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.85rem" }}>
                <a href={d.sourceUrl} rel="noopener noreferrer" target="_blank">
                  Voir la source
                </a>
              </p>
            ) : null}
            <CrossLinksForDocument documentId={d.id} />
          </article>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Fullscreen]}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </div>
  );
}
