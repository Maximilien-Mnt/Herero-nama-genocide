"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import type { TimelineEvent } from "@/lib/types";
import { TimelineEventCard } from "./TimelineEvent";
import { parse, differenceInDays, startOfYear } from "date-fns";
import { de } from "date-fns/locale";
import React from "react";

// ---------- helpers ----------
function parseEventDate(dateStr: string): Date {
  let d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  const germanPattern = /^(\d+)\.?\s*(\w+)\s+(\d{4})$/i;
  const match = dateStr.match(germanPattern);
  if (match) {
    const [, day, monthName, year] = match;
    const parsed = parse(`${day} ${monthName} ${year}`, "d MMMM yyyy", new Date(), { locale: de });
    if (!isNaN(parsed.getTime())) return parsed;
  }

  const monthYearPattern = /^(\w+)\s+(\d{4})$/i;
  const match2 = dateStr.match(monthYearPattern);
  if (match2) {
    const [, monthName, year] = match2;
    const parsed = parse(`1 ${monthName} ${year}`, "d MMMM yyyy", new Date(), { locale: de });
    if (!isNaN(parsed.getTime())) return parsed;
  }

  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) return new Date(parseInt(yearMatch[0]), 0, 1);

  return new Date(1900, 0, 1);
}

interface ScalingSegment {
  startYear: number;
  endYear: number;
  pxPerYear: number;
}

function computeScalingSegments(events: TimelineEvent[], minYear: number, maxYear: number): ScalingSegment[] {
  const eventCountPerYear: Record<number, number> = {};
  events.forEach(event => {
    const year = parseEventDate(event.date).getFullYear();
    eventCountPerYear[year] = (eventCountPerYear[year] || 0) + 1;
  });

  const getPxPerYear = (count: number): number => {
    if (count === 0) return 30;
    if (count <= 1) return 45;
    if (count <= 3) return 70;
    return 100;
  };

  const segments: ScalingSegment[] = [];
  let currentStart = minYear;
  let currentPx = getPxPerYear(eventCountPerYear[minYear] || 0);

  for (let year = minYear + 1; year <= maxYear; year++) {
    const px = getPxPerYear(eventCountPerYear[year] || 0);
    if (Math.abs(px - currentPx) > 20) {
      segments.push({ startYear: currentStart, endYear: year - 1, pxPerYear: currentPx });
      currentStart = year;
      currentPx = px;
    }
  }
  segments.push({ startYear: currentStart, endYear: maxYear, pxPerYear: currentPx });

  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i-1];
    const curr = segments[i];
    if ((curr.endYear - curr.startYear + 1) <= 3) {
      prev.endYear = curr.endYear;
      const prevLen = prev.endYear - prev.startYear + 1;
      const currLen = curr.endYear - curr.startYear + 1;
      prev.pxPerYear = (prev.pxPerYear * prevLen + curr.pxPerYear * currLen) / (prevLen + currLen);
      segments.splice(i, 1);
      i--;
    }
  }
  return segments;
}

function buildYearToX(segments: ScalingSegment[], startYear: number): Map<number, number> {
  const map = new Map<number, number>();
  let x = 200;
  for (const seg of segments) {
    for (let y = seg.startYear; y <= seg.endYear; y++) {
      map.set(y, x);
      x += seg.pxPerYear;
    }
  }
  const lastYear = segments[segments.length-1]?.endYear || startYear;
  map.set(lastYear + 1, x + 100);
  return map;
}

function getXForDate(date: Date, yearToX: Map<number, number>, pxPerYearAtYear: (year: number) => number): number {
  const year = date.getFullYear();
  const baseX = yearToX.get(year);
  if (baseX === undefined) return 200;
  const startOfYearDate = startOfYear(date);
  const daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  const dayOfYear = differenceInDays(date, startOfYearDate);
  const fraction = dayOfYear / daysInYear;
  const pxPerYear = pxPerYearAtYear(year);
  return baseX + fraction * pxPerYear;
}

function getMajorTickInterval(pxPerYear: number): number {
  if (pxPerYear >= 80) return 1;
  if (pxPerYear >= 50) return 2;
  if (pxPerYear >= 35) return 5;
  return 10;
}

// ---------- constants ----------
const CARD_WIDTH = 300;
const CARD_HALF = CARD_WIDTH / 2;
const MIN_DISTANCE = 20;
const MAX_SHIFT = 120;
const SHIFT_STEP = 20;
const LANE_HEIGHT = 140;

const LANES = [
  { id: 0, isAbove: true, yOffset: LANE_HEIGHT * 1 },
  { id: 1, isAbove: true, yOffset: LANE_HEIGHT * 2 },
  { id: 2, isAbove: false, yOffset: LANE_HEIGHT * 1 },
];

// ---------- main component ----------
interface HorizontalTimelineProps {
  events: TimelineEvent[];
}

export function HorizontalTimeline({ events }: HorizontalTimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [, forceUpdate] = useState({});

  // Date range
  const { minYear, maxYear } = useMemo(() => {
    if (events.length === 0) {
      const now = new Date();
      return { minYear: now.getFullYear(), maxYear: now.getFullYear() };
    }
    const years = events.map(e => parseEventDate(e.date).getFullYear());
    return { minYear: Math.min(...years), maxYear: Math.max(...years) };
  }, [events]);

  // Scaling segments and mapping
  const { segments, yearToX, pxPerYearAtYear, totalWidth } = useMemo(() => {
    if (events.length === 0) {
      const dummySeg = [{ startYear: minYear, endYear: maxYear, pxPerYear: 60 }];
      const dummyMap = new Map<number, number>();
      dummyMap.set(minYear, 200);
      return { segments: dummySeg, yearToX: dummyMap, pxPerYearAtYear: () => 60, totalWidth: 800 };
    }
    const segs = computeScalingSegments(events, minYear, maxYear);
    const y2x = buildYearToX(segs, minYear);
    const getPx = (year: number) => {
      const seg = segs.find(s => year >= s.startYear && year <= s.endYear);
      return seg ? seg.pxPerYear : 60;
    };
    const lastYear = segs[segs.length-1]?.endYear || maxYear;
    const lastX = y2x.get(lastYear) || 200;
    const total = lastX + (getPx(lastYear) * 2) + 200;
    return { segments: segs, yearToX: y2x, pxPerYearAtYear: getPx, totalWidth: total };
  }, [events, minYear, maxYear]);

  // Year markers (dotted vertical lines)
  const yearMarkers = useMemo(() => {
    const markers = [];
    for (let y = minYear; y <= maxYear; y++) {
      const x = yearToX.get(y);
      if (x !== undefined) markers.push({ year: y, x });
    }
    return markers;
  }, [minYear, maxYear, yearToX]);

  // Major ticks
  const majorTicks = useMemo(() => {
    const ticks: { year: number; x: number; label: string }[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      const px = pxPerYearAtYear(y);
      const interval = getMajorTickInterval(px);
      if (y % interval === 0 || y === minYear || y === maxYear) {
        const x = yearToX.get(y);
        if (x !== undefined) ticks.push({ year: y, x, label: y.toString() });
      }
    }
    return ticks.filter((t, i, arr) => arr.findIndex(a => a.year === t.year) === i);
  }, [minYear, maxYear, pxPerYearAtYear, yearToX]);

  // Position events with lane assignment and horizontal shifting
  const positionedEvents = useMemo(() => {
    const eventsWithX = events.map(event => ({
      event,
      dotX: getXForDate(parseEventDate(event.date), yearToX, pxPerYearAtYear),
    }));
    eventsWithX.sort((a, b) => a.dotX - b.dotX);

    const laneOccupancy: { [laneId: number]: { left: number; right: number; cardX: number }[] } = { 0: [], 1: [], 2: [] };
    const result: {
      event: TimelineEvent;
      dotX: number;
      cardX: number;
      laneId: number;
      isAbove: boolean;
      yOffset: number;
    }[] = [];

    for (const { event, dotX } of eventsWithX) {
      let bestLane = -1;
      let bestShift = 0;
      let bestOverlap = Infinity;

      for (const lane of LANES) {
        const existing = laneOccupancy[lane.id];
        for (let shift = -MAX_SHIFT; shift <= MAX_SHIFT; shift += SHIFT_STEP) {
          const cardLeft = dotX + shift - CARD_HALF;
          const cardRight = dotX + shift + CARD_HALF;
          let overlaps = false;
          for (const occ of existing) {
            if (cardRight + MIN_DISTANCE > occ.left && cardLeft - MIN_DISTANCE < occ.right) {
              overlaps = true;
              break;
            }
          }
          if (!overlaps) {
            bestLane = lane.id;
            bestShift = shift;
            bestOverlap = 0;
            break;
          } else {
            let totalOverlap = 0;
            for (const occ of existing) {
              const overlapLeft = Math.max(cardLeft, occ.left);
              const overlapRight = Math.min(cardRight, occ.right);
              if (overlapLeft < overlapRight) totalOverlap += overlapRight - overlapLeft;
            }
            if (totalOverlap < bestOverlap) {
              bestOverlap = totalOverlap;
              bestLane = lane.id;
              bestShift = shift;
            }
          }
        }
        if (bestOverlap === 0) break;
      }

      const lane = LANES.find(l => l.id === bestLane)!;
      const finalCardX = dotX + bestShift;
      laneOccupancy[bestLane].push({ left: finalCardX - CARD_HALF, right: finalCardX + CARD_HALF, cardX: finalCardX });
      result.push({
        event,
        dotX,
        cardX: finalCardX,
        laneId: bestLane,
        isAbove: lane.isAbove,
        yOffset: lane.yOffset,
      });
    }
    return result;
  }, [events, yearToX, pxPerYearAtYear]);

  const lineY = LANES.filter(l => l.isAbove).reduce((max, l) => Math.max(max, l.yOffset), 0) + 40;
  const trackHeight = lineY + LANES.filter(l => !l.isAbove).reduce((max, l) => Math.max(max, l.yOffset), 0) + 60;

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
    setTimeout(() => forceUpdate({}), 50);
  };

  useEffect(() => {
    const observers: ResizeObserver[] = [];
    positionedEvents.forEach(({ event }) => {
      const cardEl = cardRefs.current.get(event.id);
      if (cardEl) {
        const observer = new ResizeObserver(() => forceUpdate({}));
        observer.observe(cardEl);
        observers.push(observer);
      }
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, [positionedEvents, expandedId]);

  const scrollToStart = () => scrollContainerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  const scrollToEnd = () => scrollContainerRef.current?.scrollTo({ left: totalWidth, behavior: "auto" });

  if (events.length === 0) {
    return (
      <div className="full-width-timeline">
        <div className="horizontal-timeline-scroll" style={{ overflowX: "auto" }}>
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            Keine Ereignisse für die ausgewählten Filter.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="full-width-timeline">
      <div className="timeline-nav">
        <button className="timeline-nav-button" onClick={scrollToStart}>← Anfang</button>
        <button className="timeline-nav-button" onClick={scrollToEnd}>Ende →</button>
      </div>

      <div
        ref={scrollContainerRef}
        className="horizontal-timeline-scroll"
        style={{ overflowX: "auto", overflowY: "visible" }}
      >
        <div
          className="timeline-track"
          style={{
            position: "relative",
            width: totalWidth,
            height: trackHeight,
            margin: "0 auto",
          }}
        >
          {/* Central line with dotted transitions */}
          <svg
            style={{ position: "absolute", top: lineY, left: 0, width: "100%", height: "2px", pointerEvents: "none" }}
          >
            {segments.map((seg, idx) => {
              const startX = yearToX.get(seg.startYear) || 200;
              const endX = yearToX.get(seg.endYear) || startX + 100;
              const isDotted = (idx < segments.length - 1);
              return (
                <line
                  key={idx}
                  x1={startX}
                  y1={0}
                  x2={endX}
                  y2={0}
                  stroke="var(--accent-sage)"
                  strokeWidth={2}
                  strokeDasharray={isDotted ? "4 6" : "none"}
                />
              );
            })}
          </svg>

          {/* Vertical dotted year lines + labels at top */}
          {yearMarkers.map(({ year, x }) => (
            <React.Fragment key={`year-${year}`}>
              <div
                className="timeline-year-dotted-line"
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundImage: "linear-gradient(to bottom, var(--text-faint) 50%, transparent 50%)",
                  backgroundSize: "1px 6px",
                  backgroundRepeat: "repeat-y",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: "-20px",
                  transform: "translateX(-50%)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {year}
              </div>
            </React.Fragment>
          ))}

          {/* Major tick marks */}
          {majorTicks.map(({ year, x }) => (
            <div
              key={`major-${year}`}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: lineY - 8,
                transform: "translateX(-50%)",
                width: "1px",
                height: "16px",
                background: "var(--accent-gold)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.75rem",
                  color: "var(--accent-gold)",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {year}
              </span>
            </div>
          ))}

          {/* SVG container for dots and connectors (vertical+diagonal, no horizontal) */}
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {positionedEvents.map(({ event, dotX, cardX, isAbove, yOffset }) => {
              const dotColor = getTagColor(event.tags[0]);
              const cardTop = isAbove ? lineY - yOffset : lineY + yOffset;
              const cardEl = cardRefs.current.get(event.id);
              const cardHeight = cardEl?.offsetHeight || 100;
              const connectorEndY = isAbove ? cardTop + cardHeight : cardTop;

              // Build polyline: vertical then diagonal (max 45°), no horizontal segment
              const getConnectorPoints = (
                startX: number,
                startY: number,
                endX: number,
                endY: number,
                maxAngleDeg: number = 45
              ): string => {
                const dx = Math.abs(endX - startX);
                const dy = Math.abs(endY - startY);
                const angleRad = Math.atan2(dy, dx);
                const maxAngleRad = (maxAngleDeg * Math.PI) / 180;

                // If direct angle is ≤ max, draw straight diagonal
                if (angleRad <= maxAngleRad) {
                  return `${startX},${startY} ${endX},${endY}`;
                }

                // Otherwise add a vertical segment first, then diagonal
                const tanMax = Math.tan(maxAngleRad);
                let v = dy - dx * tanMax;
                if (v < 0) v = 0;
                v = Math.min(v, dy);

                const xDir = Math.sign(endX - startX);
                const yDir = Math.sign(endY - startY);
                const midY = startY + v * yDir;
                return `${startX},${startY} ${startX},${midY} ${endX},${endY}`;
              };

              const points = getConnectorPoints(dotX, lineY, cardX, connectorEndY, 45);

              return (
                <g key={event.id}>
                  <circle
                    cx={dotX}
                    cy={lineY}
                    r={8}
                    fill={dotColor}
                    stroke="var(--bg-page)"
                    strokeWidth={2}
                    style={{ cursor: "pointer", transition: "all 0.15s ease", pointerEvents: "visible" }}
                    onClick={() => toggleExpand(event.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.setAttribute("r", "10");
                      e.currentTarget.style.filter = "brightness(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.setAttribute("r", "8");
                      e.currentTarget.style.filter = "none";
                    }}
                  />
                  <polyline
                    points={points}
                    fill="none"
                    stroke={dotColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      cursor: "pointer",
                      opacity: 0.6,
                      transition: "opacity 0.15s ease, stroke 0.15s ease",
                      pointerEvents: "visible",
                    }}
                    onClick={() => toggleExpand(event.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.stroke = "var(--accent-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.6";
                      e.currentTarget.style.stroke = dotColor;
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Cards (HTML, positioned absolutely) */}
          {positionedEvents.map(({ event, cardX, isAbove, yOffset }) => {
            const cardTop = isAbove ? lineY - yOffset : lineY + yOffset;
            return (
              <div
                key={event.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(event.id, el);
                  else cardRefs.current.delete(event.id);
                }}
                className="timeline-card-wrapper"
                style={{
                  position: "absolute",
                  left: `${cardX}px`,
                  transform: "translateX(-50%)",
                  width: `${CARD_WIDTH}px`,
                  top: `${cardTop}px`,
                }}
              >
                <TimelineEventCard
                  event={event}
                  isExpanded={expandedId === event.id}
                  onToggle={() => toggleExpand(event.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getTagColor(tag: string): string {
  switch (tag) {
    case "herero": return "var(--color-herero)";
    case "nama": return "var(--color-nama)";
    case "colonial": return "var(--color-colonial)";
    case "military": return "var(--color-military)";
    case "aftermath": return "var(--accent-rust)";
    case "memory": return "var(--color-memory)";
    default: return "var(--accent-gold)";
  }
}