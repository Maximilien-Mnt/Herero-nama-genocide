"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CrossLinksForEvent } from "@/components/CrossLinks";
import type { TimelineEvent } from "@/lib/types";

interface TimelineModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  color?: string;
}

export function TimelineModal({ event, onClose, color }: TimelineModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [event, onClose]);

  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!event) return null;

  // Correction : utiliser summary (toujours présent) et éventuellement description si elle existe
  const descriptionText = (event as any).description || event.summary;

  const modalContent = (
    <div
      ref={overlayRef}
      className="timeline-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="timeline-modal-content" style={{ borderTopColor: color }}>
        <button className="timeline-modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        <h2 id="modal-title" className="timeline-modal-title">
          {event.title}
        </h2>
        <div className="timeline-modal-date">
          {event.date}
          {event.endDate && ` – ${event.endDate}`}
        </div>
        <div className="timeline-modal-description">
          <p>{descriptionText}</p>
        </div>
        <div className="timeline-modal-crosslinks">
          <CrossLinksForEvent eventId={event.id} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}