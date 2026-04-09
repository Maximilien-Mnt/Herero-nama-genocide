// ./components/timeline/HorizontalTimeline.tsx

"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import type { TimelineEvent } from "@/lib/types";
import { TimelineEventCard } from "./TimelineEvent";
import { parse, differenceInDays, startOfYear } from "date-fns";
import { de } from "date-fns/locale";

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

// Constantes
const CARD_WIDTH = 300;
const CARD_MIN_HEIGHT = 120;
const CARD_EXPANDED_EXTRA = 140; // hauteur supplémentaire en mode étendu
const LANE_HEIGHT = 180; // espace vertical réservé par voie
const TIMELINE_Y = 60; // position Y de la ligne centrale
const DOT_RADIUS = 8;
const CARD_TOP_MARGIN = 30; // distance entre la ligne et le haut des cartes

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

  // Fusion des segments trop courts
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

function buildYearToX(segments: ScalingSegment[]): Map<number, number> {
  const map = new Map<number, number>();
  let x = 200;
  for (const seg of segments) {
    for (let y = seg.startYear; y <= seg.endYear; y++) {
      map.set(y, x);
      x += seg.pxPerYear;
    }
  }
  const lastYear = segments[segments.length-1]?.endYear || 1900;
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

interface HorizontalTimelineProps {
  events: TimelineEvent[];
}

export function HorizontalTimeline({ events }: HorizontalTimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Plage d'années
  const { minYear, maxYear } = useMemo(() => {
    if (events.length === 0) {
      const now = new Date();
      return { minYear: now.getFullYear(), maxYear: now.getFullYear() };
    }
    const years = events.map(e => parseEventDate(e.date).getFullYear());
    return { minYear: Math.min(...years), maxYear: Math.max(...years) };
  }, [events]);

  // Échelle horizontale
  const { segments, yearToX, pxPerYearAtYear, totalWidth } = useMemo(() => {
    if (events.length === 0) {
      const dummySeg = [{ startYear: minYear, endYear: maxYear, pxPerYear: 60 }];
      const dummyMap = new Map<number, number>();
      dummyMap.set(minYear, 200);
      return { segments: dummySeg, yearToX: dummyMap, pxPerYearAtYear: () => 60, totalWidth: 800 };
    }
    const segs = computeScalingSegments(events, minYear, maxYear);
    const y2x = buildYearToX(segs);
    const getPx = (year: number) => {
      const seg = segs.find(s => year >= s.startYear && year <= s.endYear);
      return seg ? seg.pxPerYear : 60;
    };
    const lastYear = segs[segs.length-1]?.endYear || maxYear;
    const lastX = y2x.get(lastYear) || 200;
    const total = lastX + (getPx(lastYear) * 2) + 200;
    return { segments: segs, yearToX: y2x, pxPerYearAtYear: getPx, totalWidth: total };
  }, [events, minYear, maxYear]);

  // Marqueurs d'années (lignes pointillées)
  const yearMarkers = useMemo(() => {
    const markers = [];
    for (let y = minYear; y <= maxYear; y++) {
      const x = yearToX.get(y);
      if (x !== undefined) markers.push({ year: y, x });
    }
    return markers;
  }, [minYear, maxYear, yearToX]);

  // Graduations majeures
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

  // Calcul des positions X des points
  const eventsWithX = useMemo(() => {
    return events.map(event => ({
      event,
      dotX: getXForDate(parseEventDate(event.date), yearToX, pxPerYearAtYear),
    }));
  }, [events, yearToX, pxPerYearAtYear]);

  // Placement des cartes dans des voies (toutes en dessous de la ligne)
  const positionedEvents = useMemo(() => {
    const sorted = [...eventsWithX].sort((a, b) => a.dotX - b.dotX);
    const lanes: { x: number; width: number; eventId: string }[][] = [];
    
    const result: {
      event: TimelineEvent;
      dotX: number;
      cardX: number;
      lane: number;
      yOffset: number;
    }[] = [];

    for (const { event, dotX } of sorted) {
      const cardHalf = CARD_WIDTH / 2;
      let placed = false;
      
      // Chercher une voie existante où la carte peut être placée sans chevauchement
      for (let laneIdx = 0; laneIdx < lanes.length; laneIdx++) {
        const lane = lanes[laneIdx];
        // Vérifier le chevauchement avec les cartes déjà dans cette voie
        const overlap = lane.some(card => 
          Math.abs(card.x - dotX) < (card.width/2 + cardHalf + 20) // marge de 20px
        );
        if (!overlap) {
          lane.push({ x: dotX, width: CARD_WIDTH, eventId: event.id });
          result.push({
            event,
            dotX,
            cardX: dotX,
            lane: laneIdx,
            yOffset: TIMELINE_Y + CARD_TOP_MARGIN + laneIdx * LANE_HEIGHT,
          });
          placed = true;
          break;
        }
      }
      
      // Si aucune voie ne convient, en créer une nouvelle
      if (!placed) {
        const newLane = [{ x: dotX, width: CARD_WIDTH, eventId: event.id }];
        lanes.push(newLane);
        result.push({
          event,
          dotX,
          cardX: dotX,
          lane: lanes.length - 1,
          yOffset: TIMELINE_Y + CARD_TOP_MARGIN + (lanes.length - 1) * LANE_HEIGHT,
        });
      }
    }

    return result;
  }, [eventsWithX]);

  const totalHeight = TIMELINE_Y + CARD_TOP_MARGIN + (positionedEvents.length > 0 
    ? Math.max(...positionedEvents.map(p => p.lane)) * LANE_HEIGHT + 200 
    : 200);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const scrollToStart = () => scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  const scrollToEnd = () => scrollContainerRef.current?.scrollTo({ left: totalWidth, behavior: "smooth" });

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
            height: totalHeight,
            margin: "0 auto",
          }}
        >
          {/* Ligne centrale */}
          <svg
            style={{ position: "absolute", top: TIMELINE_Y, left: 0, width: "100%", height: "2px", pointerEvents: "none" }}
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

          {/* Lignes pointillées verticales par année */}
          {yearMarkers.map(({ year, x }) => (
            <div key={`year-${year}`}>
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
            </div>
          ))}

          {/* Graduations majeures */}
          {majorTicks.map(({ year, x }) => (
            <div
              key={`major-${year}`}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: TIMELINE_Y - 8,
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

          {/* Points et connecteurs */}
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
            {positionedEvents.map(({ event, dotX, cardX, yOffset }) => {
              const color = getTagColor(event.tags[0] || "colonial");
              const cardTopY = yOffset;
              // Ligne droite simple (point -> haut de la carte)
              return (
                <g key={event.id}>
                  <circle
                    cx={dotX}
                    cy={TIMELINE_Y}
                    r={DOT_RADIUS}
                    fill={color}
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
                  <line
                    x1={dotX}
                    y1={TIMELINE_Y}
                    x2={cardX}
                    y2={cardTopY}
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
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
                      e.currentTarget.style.stroke = color;
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Cartes (HTML) */}
          {positionedEvents.map(({ event, cardX, yOffset }) => {
            const isExpanded = expandedId === event.id;
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
                  top: `${yOffset}px`,
                }}
              >
                <TimelineEventCard
                  event={event}
                  isExpanded={isExpanded}
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