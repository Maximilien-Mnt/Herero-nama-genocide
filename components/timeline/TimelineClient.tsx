"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { CrossLinkTag } from "@/components/CrossLink";
import {
  getPlaceById,
  getDocumentById,
  getDatasetById,
  historyChapters,
} from "@/lib/content";
import type { EventType } from "@/lib/types";
import {
  EventData,
  dateToX,
  LABEL_VISIBLE_ZOOM_THRESHOLD,
  MIN_ZOOM,
  MAX_ZOOM,
  generateTicks,
} from "./TimelineUtils";

// ---------- GERMAN DATE & HELPERS ----------
const GERMAN_MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const day = parseInt(d, 10);
  const month = GERMAN_MONTHS[parseInt(m, 10) - 1];
  return `${day}. ${month} ${y}`;
}

function formatDateRange(start: string, end?: string): string {
  const startStr = formatDisplayDate(start);
  if (!end) return startStr;
  return `${startStr} – ${formatDisplayDate(end)}`;
}

function chapterTitle(slug: string) {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

function isMultiDayEvent(start: string, end?: string): boolean {
  if (!end) return false;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const day = 24 * 60 * 60 * 1000;
  return endTime - startTime > day;
}

// ---------- COLOR MAPPINGS ----------
const CATEGORY_COLORS: Record<EventType, string> = {
  battle: "#B85C5C",
  massacre: "#B8935A",
  camp: "#6A4E9E",
  political: "#4A7A9E",
  resistance: "#4D9E6A",
  testimony: "#4A7A9E",
  memorial: "#C9ABBC",
  other: "#7D6E5D",
};

const CATEGORY_LABELS: Record<EventType, string> = {
  battle: "Schlacht / Krieg",
  massacre: "Massaker / Vertreibung",
  camp: "Konzentrationslager",
  political: "Politische Entscheidung",
  resistance: "Widerstand / Aufstand",
  testimony: "Zeugnis / Bericht",
  memorial: "Gedenken / Erinnerung",
  other: "Anderes",
};

function getEventColor(event: EventData): string {
  return CATEGORY_COLORS[event.eventType as EventType] || CATEGORY_COLORS.other;
}

function splitTitle(title: string, maxChars = 25): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur.length > 0) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += (cur ? " " : "") + w;
    }
  }
  if (cur) lines.push(cur.trim());
  return lines.length ? lines : [title];
}

// ---------- COMPONENT ----------
export default function TimelineClient({ events }: { events: EventData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerHeight, setContainerHeight] = useState(600);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartMouseX, setDragStartMouseX] = useState(0);
  const [dragStartPanX, setDragStartPanX] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  // Touch gestures state
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1);
  const [touchStartPanX, setTouchStartPanX] = useState<number>(0);
  const [touchStartClientX, setTouchStartClientX] = useState<number>(0);
  const [isTouchPanning, setIsTouchPanning] = useState(false);

  const [tooltipData, setTooltipData] = useState<{
    id: string;
    title: string;
    screenX: number;
  } | null>(null);

  const eventsRef = useRef(events);
  eventsRef.current = events;

  // ----- resize observer -----
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // ----- initial viewport -----
  const initViewport = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const start1900X = dateToX("1900-01-01");
    const end1910X = dateToX("1910-01-01");
    const midX = (start1900X + end1910X) / 2;
    setZoom(1);
    setPanX(w / 2 - midX);
  }, []);

  useEffect(() => { initViewport(); }, []); // eslint-disable-line

  // ----- hash deep‑link listener -----
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const ev = eventsRef.current.find((e) => e.id === hash);
      if (!ev) return;
      const targetX = dateToX(ev.date);
      const targetZoom = LABEL_VISIBLE_ZOOM_THRESHOLD;
      const w = containerRef.current?.clientWidth ?? 800;
      setAnimated(true);
      setZoom(targetZoom);
      setPanX(w / 2 - targetX * targetZoom);
      setSelectedEventId(ev.id);
      setTimeout(() => setAnimated(false), 600);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // ----- wheel listener (desktop zoom) -----
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (selectedEventId) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const worldX = (mouseX - panX) / zoom;
      const factor = 1.1;
      let newZoom = e.deltaY < 0 ? zoom * factor : zoom / factor;
      newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
      setZoom(newZoom);
      setPanX(mouseX - worldX * newZoom);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoom, panX, selectedEventId]);

  // ----- panning (mouse drag) -----
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".timeline-event")) return;
      setDragging(true);
      setDragStartMouseX(e.clientX);
      setDragStartPanX(panX);
    },
    [panX]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPanX(dragStartPanX + (e.clientX - dragStartMouseX));
    };
    const onMouseUp = () => setDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, dragStartMouseX, dragStartPanX]);

  // ----- TOUCH GESTURES (pinch zoom + pan) -----
  

  // Remove the getDistance function entirely (lines ~210-215)

// Replace onTouchStart, onTouchMove, onTouchEnd with:

const onTouchStart = (e: React.TouchEvent) => {
  // If touching on an event element, do nothing (allow click)
  if ((e.target as HTMLElement).closest(".timeline-event")) {
    return;
  }
  // Only prevent default and handle gestures for background touches
  e.preventDefault();
  const touches = e.touches;
  if (touches.length === 2) {
    // Pinch start
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    if (touch1 && touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      const distance = Math.hypot(dx, dy);
      setTouchStartDistance(distance);
      setTouchStartZoom(zoom);
      setTouchStartPanX(panX);
      setIsTouchPanning(false);
    }
  } else if (touches.length === 1) {
    // One-finger pan start
    const touch = touches.item(0);
    if (touch) {
      setTouchStartClientX(touch.clientX);
      setTouchStartPanX(panX);
      setIsTouchPanning(true);
    }
  }
};

const onTouchMove = (e: React.TouchEvent) => {
  const touches = e.touches;
  // Only prevent default if we are actually panning or pinching
  if (touches.length === 2 && touchStartDistance !== null) {
    e.preventDefault(); // prevent page scroll while pinching
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    if (touch1 && touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      const newDistance = Math.hypot(dx, dy);
      const delta = newDistance / touchStartDistance;
      let newZoom = touchStartZoom * delta;
      newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
        const worldX = (centerX - touchStartPanX) / touchStartZoom;
        setZoom(newZoom);
        setPanX(centerX - worldX * newZoom);
      } else {
        setZoom(newZoom);
      }
    }
  } else if (touches.length === 1 && isTouchPanning) {
    e.preventDefault(); // prevent page scroll while panning
    const touch = touches.item(0);
    if (touch) {
      const deltaX = touch.clientX - touchStartClientX;
      setPanX(touchStartPanX + deltaX);
    }
  }
};

const onTouchEnd = (e: React.TouchEvent) => {
  setTouchStartDistance(null);
  setIsTouchPanning(false);
  // No preventDefault here – allows click events to fire
};

  // ----- event handlers -----
  const handleEventClick = (id: string) => setSelectedEventId(id);
  const closeModal = () => setSelectedEventId(null);

  // ----- screen coordinates -----
  const axisY = containerHeight * 0.6;
  const dotRadius = 10;
  const ribbonHeight = 22;
  const laneSpacingRibbon = 30;
  const labelLineHeight = 18;

  const toScreenX = useCallback(
    (worldX: number) => worldX * zoom + panX,
    [zoom, panX]
  );

  const ribbonEvents = useMemo(() => events.filter(e => isMultiDayEvent(e.date, e.endDate)), [events]);
  const pointEvents = useMemo(() => events.filter(e => !isMultiDayEvent(e.date, e.endDate)), [events]);

  // RIBBON LANES
  const ribbonWorldData = useMemo(() => {
    return ribbonEvents.map(ev => ({
      ...ev,
      worldStart: dateToX(ev.date),
      worldEnd: dateToX(ev.endDate!),
    }));
  }, [ribbonEvents]);

  const ribbonLanes = useMemo(() => {
    const sorted = [...ribbonWorldData].sort((a, b) => a.worldStart - b.worldStart);
    const lanes: number[] = [];
    const assignment = new Map<string, number>();
    const gap = 2;
    for (const ev of sorted) {
      let lane = 0;
      while (lanes[lane] !== undefined && lanes[lane] + gap > ev.worldStart) {
        lane++;
      }
      lanes[lane] = Math.max(lanes[lane] || 0, ev.worldEnd);
      assignment.set(ev.id, lane);
    }
    return assignment;
  }, [ribbonWorldData]);

  const ribbonRenderData = useMemo(() => {
    return ribbonWorldData.map(ev => ({
      ...ev,
      screenStartX: toScreenX(ev.worldStart),
      screenEndX: toScreenX(ev.worldEnd),
      lane: ribbonLanes.get(ev.id) ?? 0,
    }));
  }, [ribbonWorldData, ribbonLanes, toScreenX]);

  // POINT LABELS
  const pointScreenData = useMemo(() => {
    return pointEvents
      .map(ev => ({ ...ev, worldX: dateToX(ev.date) }))
      .sort((a, b) => a.worldX - b.worldX);
  }, [pointEvents]);

  const pointScreenWithX = useMemo(() => {
    return pointScreenData.map(ev => ({
      ...ev,
      screenX: toScreenX(ev.worldX),
    }));
  }, [pointScreenData, toScreenX]);

  const labelVisible = zoom >= LABEL_VISIBLE_ZOOM_THRESHOLD;
  const maxLabelLanes = useMemo(() => Math.floor(zoom * 1.5), [zoom]);
  const pointLabelWidth = useCallback((title: string) => title.length * 8 + 12, []);

  const pointLabelLayout = useMemo(() => {
    if (!labelVisible) return new Map<string, { lane: number; visible: boolean }>();
    const gap = 10;
    const lanes: number[] = [];
    const layout = new Map<string, { lane: number; visible: boolean }>();
    for (const ev of pointScreenWithX) {
      const w = pointLabelWidth(ev.title);
      const xLeft = ev.screenX - w / 2;
      let lane = 0;
      while (lane < lanes.length && lanes[lane] + gap > xLeft) {
        lane++;
      }
      const visible = lane < maxLabelLanes;
      layout.set(ev.id, { lane, visible });
      if (lane >= lanes.length) {
        lanes.push(ev.screenX + w / 2);
      } else {
        lanes[lane] = Math.max(lanes[lane], ev.screenX + w / 2);
      }
    }
    return layout;
  }, [labelVisible, pointScreenWithX, maxLabelLanes, pointLabelWidth]);

  const pointLabelOffset = (lane: number, title: string) => {
    const lines = splitTitle(title, 25).length;
    const totalHeight = lines * labelLineHeight;
    const direction = lane % 2 === 0 ? -1 : 1;
    const row = Math.floor(lane / 2) + 1;
    const baseOffset = 12 + dotRadius;
    return direction * (baseOffset + (row - 1) * (totalHeight + 6));
  };

  const ticksWorld = useMemo(
    () => generateTicks(panX, zoom, containerWidth),
    [panX, zoom, containerWidth]
  );
  const ticksScreen = useMemo(
    () => ticksWorld.map(t => ({ screenX: toScreenX(t.x), label: t.label })),
    [ticksWorld, toScreenX]
  );

  const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) : null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
        background: "var(--bg-page)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        style={{ display: "block", userSelect: "none", WebkitUserSelect: "none" }}
      >
        {/* Tick lines */}
        {ticksScreen.map((tick, i) => (
          <line
            key={`tl-${i}`}
            x1={tick.screenX}
            y1={0}
            x2={tick.screenX}
            y2={containerHeight}
            stroke="var(--border-subtle)"
            strokeWidth={0.5}
            strokeDasharray="3 4"
            opacity={0.6}
          />
        ))}
        {/* Tick labels */}
        {ticksScreen.map((tick, i) => (
          <text
            key={`tlt-${i}`}
            x={tick.screenX}
            y={16}
            textAnchor="middle"
            fontSize={13}
            fill="var(--text-muted)"
            fontFamily="var(--font-mono)"
          >
            {tick.label}
          </text>
        ))}
        {/* Axis */}
        <line
          x1={0}
          y1={axisY}
          x2={containerWidth}
          y2={axisY}
          stroke="var(--border-default)"
          strokeWidth={1.5}
        />

        {/* RIBBONS */}
        {ribbonRenderData.map(ev => {
          const lane = ev.lane;
          const offset = (lane % 2 === 0 ? 1 : -1) * (Math.floor(lane / 2) + 1) * laneSpacingRibbon;
          const y = axisY + offset;
          const color = getEventColor(ev);
          const ribbonWidth = Math.max(ev.screenEndX - ev.screenStartX, 2);
          const titleWidthEstimate = ev.title.length * 8 + 10;
          const showInnerLabel = labelVisible && ribbonWidth > titleWidthEstimate;

          return (
            <g
              key={`ribbon-${ev.id}`}
              className="timeline-event ribbon"
              onMouseEnter={() =>
                setTooltipData({ id: ev.id, title: ev.title, screenX: (ev.screenStartX + ev.screenEndX) / 2 })
              }
              onMouseLeave={() => setTooltipData(null)}
              onClick={() => handleEventClick(ev.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={ev.screenStartX}
                y={y - ribbonHeight / 2}
                width={ribbonWidth}
                height={ribbonHeight}
                rx={ribbonHeight / 2}
                fill={color}
                stroke="var(--bg-page)"
                strokeWidth={2}
              />
              {showInnerLabel && (
                <text
                  x={ev.screenStartX + ribbonWidth / 2}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={11}
                  fill="var(--text-primary)"
                  fontFamily="var(--font-sans)"
                  fontWeight={600}
                  style={{ pointerEvents: "none" }}
                >
                  {ev.title}
                </text>
              )}
            </g>
          );
        })}

        {/* POINTS */}
        {pointScreenWithX.map(ev => {
          const color = getEventColor(ev);
          const layout = pointLabelLayout.get(ev.id);
          const showLabel = layout?.visible ?? false;
          const lane = layout?.lane ?? 0;
          const labelOffsetY = showLabel ? pointLabelOffset(lane, ev.title) : 0;
          const lines = showLabel ? splitTitle(ev.title, 25) : [];

          return (
            <g
              key={`point-${ev.id}`}
              className="timeline-event"
              onClick={() => handleEventClick(ev.id)}
              onMouseEnter={() =>
                setTooltipData({ id: ev.id, title: ev.title, screenX: ev.screenX })
              }
              onMouseLeave={() => setTooltipData(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={ev.screenX}
                cy={axisY}
                r={dotRadius}
                fill={color}
                stroke="var(--bg-page)"
                strokeWidth={2}
              />
              {showLabel && (
                <text
                  x={ev.screenX}
                  y={axisY + labelOffsetY}
                  textAnchor="middle"
                  fontSize={13}
                  fill="var(--text-primary)"
                  fontFamily="var(--font-sans)"
                  fontWeight={500}
                >
                  {lines.map((line, i) => (
                    <tspan key={i} x={ev.screenX} dy={i === 0 ? 0 : labelLineHeight}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {tooltipData && (
        <div
          style={{
            position: "absolute",
            left: tooltipData.screenX,
            top: axisY - 30,
            transform: "translate(-50%, -100%)",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
            padding: "0.4rem 0.75rem",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 50,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {tooltipData.title}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedEvent && (
        <div className="timeline-modal-overlay" onClick={closeModal}>
          <div
            className="timeline-modal-content"
            onClick={e => e.stopPropagation()}
            style={{ borderTopColor: getEventColor(selectedEvent) }}
          >
            <button className="timeline-modal-close" onClick={closeModal} aria-label="Schließen">
              ✕
            </button>
            <h2 className="timeline-modal-title">{selectedEvent.title}</h2>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.75rem",
            }}>
              <span style={{ margin: 0, border: "none", padding: 0, color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                {formatDateRange(selectedEvent.date, selectedEvent.endDate)}
              </span>
              <span style={{
                display: "inline-block",
                padding: "0.25rem 0.7rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: `${getEventColor(selectedEvent)}22`,
                border: `1px solid ${getEventColor(selectedEvent)}`,
                color: getEventColor(selectedEvent),
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                lineHeight: 1.2,
              }}>
                {CATEGORY_LABELS[selectedEvent.eventType as EventType]}
              </span>
            </div>
            <div
              className="timeline-modal-description"
              dangerouslySetInnerHTML={{ __html: selectedEvent.summary.replace(/\n/g, "<br/>") }}
            />
            <div className="crosslink-tags" style={{ marginTop: "1.5rem" }}>
              {selectedEvent.relatedPlaceIds?.map(pid => {
                const place = getPlaceById(pid);
                return place ? (
                  <CrossLinkTag key={`place-${pid}`} href={`/carte?place=${pid}`} icon="📍" label={place.name} />
                ) : null;
              })}
              {selectedEvent.relatedDocumentIds?.map(did => {
                const doc = getDocumentById(did);
                return doc ? (
                  <CrossLinkTag key={`doc-${did}`} href={`/documents#${did}`} icon="📄" label={doc.title} />
                ) : null;
              })}
              {selectedEvent.relatedHistorySlugs?.map(slug => (
                <CrossLinkTag key={`hist-${slug}`} href={`/histoire/${slug}`} icon="📖" label={chapterTitle(slug)} />
              ))}
              {selectedEvent.relatedDatasetIds?.map(dsid => {
                const ds = getDatasetById(dsid);
                return ds ? (
                  <CrossLinkTag key={`data-${dsid}`} href={`/statistiques#${dsid}`} icon="📊" label={ds.title} />
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .timeline-event circle {
          transition: r 0.2s ease, fill 0.2s ease;
        }
        .timeline-event:hover circle {
          r: 13;
        }
        .timeline-event.ribbon rect {
          transition: transform 0.2s ease, filter 0.2s ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .timeline-event.ribbon:hover rect {
          transform: scale(1, 1.7);
          filter: brightness(1.2);
        }
        .timeline-modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 14, 12, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .timeline-modal-content {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-top-width: 6px;
          border-radius: var(--radius-md);
          max-width: 700px;
          width: 100%;
          max-height: 85%;
          overflow-y: auto;
          padding: 2rem;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .timeline-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 1.5rem;
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
        }
        .timeline-modal-close:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
        .timeline-modal-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: var(--text-primary);
          padding-right: 2rem;
        }
        .timeline-modal-description {
          color: var(--text-body);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}