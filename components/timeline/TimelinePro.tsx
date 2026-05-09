"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FilterPill } from "@/components/FilterPill";
import { TimelineModal } from "./TimelineModal";
import type { TimelineEvent, EventType } from "@/lib/types";

const eventTypeColors: Record<EventType, string> = {
  battle: "#B8935A",
  massacre: "#9B5A3C",
  camp: "#4D6B58",
  political: "#7D6E5D",
  resistance: "#D4A96A",
  testimony: "#3D5C7A",
  memorial: "#6B3A3A",
  other: "#554840",
};

const eventTypeLabels: Record<EventType, string> = {
  battle: "Bataille",
  massacre: "Massacre",
  camp: "Camp",
  political: "Politique",
  resistance: "Résistance",
  testimony: "Témoignage",
  memorial: "Mémorial",
  other: "Autre",
};

interface TimelineProProps {
  events: TimelineEvent[];
  highlightEventId?: string | null;
}

const YEAR_ROW_HEIGHT = 90;
const CARD_WIDTH = 260;
const DOT_SIZE = 10;
const MIN_CARD_GAP = 12;

export function TimelinePro({ events, highlightEventId }: TimelineProProps) {
  const [activeFilters, setActiveFilters] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  // Store refs for event cards so we can scroll to them
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth);
    return () => observer.disconnect();
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilters.length === 0) return events;
    return events.filter((ev) => activeFilters.includes(ev.eventType));
  }, [events, activeFilters]);

  const sortedEvents = useMemo(
    () => [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [filteredEvents]
  );

  const timeRange = useMemo(() => {
    if (sortedEvents.length === 0) return { min: 0, max: 0, span: 0 };
    const timestamps = sortedEvents.map((ev) => new Date(ev.date).getTime());
    let min = Math.min(...timestamps);
    let max = Math.max(...timestamps);
    if (min === max) {
      min -= 365 * 24 * 60 * 60 * 1000;
      max += 365 * 24 * 60 * 60 * 1000;
    }
    const margin = (max - min) * 0.05;
    return {
      min: min - margin,
      max: max + margin,
      span: max - min + 2 * margin,
    };
  }, [sortedEvents]);

  const getYPosition = useCallback(
    (dateStr: string): number => {
      const ts = new Date(dateStr).getTime();
      const progress = (ts - timeRange.min) / timeRange.span;
      const totalDays = timeRange.span / (1000 * 60 * 60 * 24);
      const totalHeight = totalDays * (YEAR_ROW_HEIGHT / 365);
      return progress * totalHeight;
    },
    [timeRange]
  );

  const yearMarkers = useMemo(() => {
    const years = new Set<number>();
    sortedEvents.forEach((ev) => {
      const y = new Date(ev.date).getFullYear();
      if (!isNaN(y)) years.add(y);
    });
    const sortedYears = Array.from(years).sort((a, b) => a - b);
    return sortedYears.map((year) => {
      const date = new Date(year, 0, 1).getTime();
      const yPos = getYPosition(new Date(date).toISOString());
      return { year, yPos };
    });
  }, [sortedEvents, getYPosition]);

  const positionedEvents = useMemo(() => {
    if (sortedEvents.length === 0 || containerWidth === 0) return [];
    const raw = sortedEvents.map((ev) => ({
      ...ev,
      y: getYPosition(ev.date),
    }));
    const sortedByY = [...raw].sort((a, b) => a.y - b.y);
    const adjusted: (TimelineEvent & { y: number; xOffset: number })[] = [];
    for (let i = 0; i < sortedByY.length; i++) {
      const current = sortedByY[i];
      let finalY = current.y;
      let xOffset = 0;
      for (let j = 0; j < adjusted.length; j++) {
        const placed = adjusted[j];
        const verticalGap = Math.abs(finalY - placed.y);
        if (verticalGap < MIN_CARD_GAP + 20) {
          xOffset = Math.max(xOffset, placed.xOffset + 1);
        }
      }
      xOffset = Math.min(xOffset, 3);
      adjusted.push({ ...current, y: finalY, xOffset });
    }
    return adjusted;
  }, [sortedEvents, containerWidth, getYPosition]);

  const totalHeight = useMemo(() => {
    if (positionedEvents.length === 0) return 200;
    const maxY = Math.max(...positionedEvents.map((ev) => ev.y));
    return maxY + 200;
  }, [positionedEvents]);

  // ---------- Highlight from URL hash ----------
  useEffect(() => {
    if (!highlightEventId) return;
    const event = events.find((e) => e.id === highlightEventId);
    if (event) {
      setSelectedEvent(event);
      // Wait for the card to be rendered, then scroll to it
      setTimeout(() => {
        const cardEl = cardRefs.current[event.id];
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [highlightEventId, events]);

  // ---------- Filters ----------
  const toggleFilter = (type: EventType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  if (events.length === 0) {
    return (
      <div className="timeline-pro-wrapper">
        <p style={{ color: "var(--text-muted)" }}>Aucun événement à afficher.</p>
      </div>
    );
  }

  return (
    <div className="timeline-pro-wrapper">
      {/* Filters */}
      <div style={{ marginBottom: "2rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {(Object.entries(eventTypeLabels) as [EventType, string][]).map(([type, label]) => (
          <FilterPill
            key={type}
            active={activeFilters.includes(type)}
            onClick={() => toggleFilter(type)}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                backgroundColor: eventTypeColors[type],
                marginRight: 6,
                borderRadius: 2,
              }}
            />
            {label}
          </FilterPill>
        ))}
      </div>

      {/* Main layout */}
      <div className="timeline-pro-grid" ref={containerRef}>
        {/* Year column */}
        <div className="timeline-pro-years" style={{ height: totalHeight }}>
          {yearMarkers.map(({ year, yPos }) => (
            <div key={year} className="timeline-pro-year" style={{ top: yPos }}>
              <span className="timeline-pro-year-label">{year}</span>
            </div>
          ))}
        </div>

        {/* Track */}
        <div className="timeline-pro-track" style={{ height: totalHeight }}>
          <div className="timeline-pro-line" style={{ height: totalHeight }} />

          {yearMarkers.map(({ year, yPos }) => (
            <div key={`dash-${year}`} className="timeline-pro-year-dash" style={{ top: yPos }} />
          ))}

          {/* SVG connectors */}
          <svg
            className="timeline-pro-svg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: totalHeight,
              pointerEvents: "none",
            }}
          >
            {positionedEvents.map((ev) => {
              const dotX = 30;
              const dotY = ev.y;
              const cardX = dotX + 40 + ev.xOffset * 15;
              const cardY = dotY - 12;
              const pathD = `M ${dotX} ${dotY} C ${dotX + 20} ${dotY}, ${cardX - 20} ${cardY + 15}, ${cardX} ${cardY + 15}`;
              return (
                <path
                  key={`conn-${ev.id}`}
                  d={pathD}
                  stroke={eventTypeColors[ev.eventType]}
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.6}
                />
              );
            })}
          </svg>

          {/* Dots */}
          {positionedEvents.map((ev) => (
            <div
              key={`dot-${ev.id}`}
              className="timeline-pro-dot"
              style={{
                backgroundColor: eventTypeColors[ev.eventType],
                top: ev.y,
                left: 30,
              }}
            />
          ))}

          {/* Cards */}
          {positionedEvents.map((ev) => {
            const dotX = 30;
            const cardLeft = dotX + 40 + ev.xOffset * 15;
            return (
              <div
                key={ev.id}
                ref={(el) => {
                  cardRefs.current[ev.id] = el;
                }}
                className="timeline-pro-card"
                style={{
                  top: ev.y - 20,
                  left: cardLeft,
                  borderColor: eventTypeColors[ev.eventType],
                  width: CARD_WIDTH,
                }}
                onClick={() => setSelectedEvent(ev)}
              >
                <div className="timeline-pro-card-year">{new Date(ev.date).getFullYear()}</div>
                <div className="timeline-pro-card-title">{ev.title}</div>
                <div className="timeline-pro-card-footer">
                  <span className="timeline-pro-card-date">
                    {ev.date}
                    {ev.endDate && ` – ${ev.endDate}`}
                  </span>
                  <span
                    className="timeline-pro-card-type"
                    style={{ color: eventTypeColors[ev.eventType] }}
                  >
                    {eventTypeLabels[ev.eventType]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TimelineModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        color={selectedEvent ? eventTypeColors[selectedEvent.eventType] : undefined}
      />
    </div>
  );
}