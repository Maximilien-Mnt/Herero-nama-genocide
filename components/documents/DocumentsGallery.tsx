"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { HistoricalDocument } from "@/lib/types";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { Reveal } from "@/components/Reveal";

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
      <div className="card-grid" style={{ marginTop: "1rem" }}>
        {documents.map((d, i) => (
          <Reveal key={d.id} delayMs={i * 60}>
            <DocumentCard
              document={d}
              onOpen={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </Reveal>
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
