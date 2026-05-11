// components/timeline/TimelineUtils.tsx

export interface EventData {
    id: string;
    date: string;
    endDate?: string;
    title: string;
    summary: string;
    tags: string[];
    eventType: string;
    relatedPlaceIds?: string[];
    relatedDocumentIds?: string[];
    relatedHistorySlugs?: string[];
    relatedDatasetIds?: string[];
  }
  
  // ---------- TIME HELPERS ----------
  
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  export const BASE_PIXELS_PER_YEAR = 100;
  export const LABEL_VISIBLE_ZOOM_THRESHOLD = 2.0;
  export const MIN_ZOOM = 0.2;
  export const MAX_ZOOM = 50;                    // ← increased
  
  const GERMAN_MONTHS = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  
  /**
   * Formats a Date for the tick label based on the step size.
   */
  export function formatTickDate(date: Date, step: number): string {
    const year = date.getFullYear().toString();
    const month = GERMAN_MONTHS[date.getMonth()];
    const day = date.getDate().toString();
  
    if (step >= 1) return year;                         // only year
    if (step >= 0.5) return `${month} ${year}`;         // month + year
    if (step >= 0.25) return `${day}. ${month} ${year}`;// day.month year (quarter or smaller)
    if (step >= 0.1667) return `${day}. ${month} ${year}`; // 2 months
    return `${day}. ${month} ${year}`;                   // monthly
  }
  
  export function dateToX(dateStr: string, startDate = new Date("1880-01-01").getTime()): number {
    const target = new Date(dateStr).getTime();
    const years = (target - startDate) / MS_PER_YEAR;
    return years * BASE_PIXELS_PER_YEAR;
  }
  
  export function getTickStep(visibleWorldWidth: number, zoom: number): {
    step: number;
    format: (d: Date) => string;
  } {
    const visibleYears = visibleWorldWidth / BASE_PIXELS_PER_YEAR;
  
    let step: number;
    if (visibleYears > 30) {
      step = 5;
    } else if (visibleYears > 10) {
      step = 1;
    } else if (visibleYears > 2) {
      step = 0.5;
    } else if (visibleYears > 1) {
      step = 0.25;                   // quarterly (3 months)
    } else if (visibleYears > 0.5) {
      step = 0.1667;                 // ≈ 2 months
    } else {
      step = 0.0833;                 // ≈ 1 month
    }
    return {
      step,
      format: (d: Date) => formatTickDate(d, step),
    };
  }
  
  export function generateTicks(
    panX: number,
    zoom: number,
    containerWidth: number,
    startDateMs = new Date("1880-01-01").getTime(),
  ) {
    const viewLeft = -panX / zoom;
    const viewRight = (containerWidth - panX) / zoom;
    const viewStartDate = new Date(
      startDateMs + (viewLeft / BASE_PIXELS_PER_YEAR) * MS_PER_YEAR
    );
    const viewEndDate = new Date(
      startDateMs + (viewRight / BASE_PIXELS_PER_YEAR) * MS_PER_YEAR
    );
  
    const { step, format } = getTickStep(viewRight - viewLeft, zoom);
    const stepMs = step * MS_PER_YEAR;
    const firstTickMs = Math.ceil(viewStartDate.getTime() / stepMs) * stepMs;
  
    const ticks: { x: number; label: string }[] = [];
    for (let t = firstTickMs; t <= viewEndDate.getTime(); t += stepMs) {
      const d = new Date(t);
      const x = dateToX(d.toISOString(), startDateMs);
      ticks.push({ x, label: format(d) });
    }
    return ticks;
  }
  
  // ---------- SCREEN‑SPACE COLLISION DETECTION ----------
  
  export function detectLabelCollisions(
    events: { id: string; screenX: number; estimatedWidthPx: number }[],
  ): Map<string, boolean> {
    const showMap = new Map<string, boolean>();
    events.forEach((ev) => showMap.set(ev.id, true));
  
    let lastVisible: { id: string; screenX: number; halfWidth: number } | null = null;
    for (const ev of events) {
      if (
        lastVisible &&
        ev.screenX - lastVisible.screenX <
          lastVisible.halfWidth + ev.estimatedWidthPx / 2
      ) {
        showMap.set(ev.id, false);
      } else {
        showMap.set(ev.id, true);
        lastVisible = { id: ev.id, screenX: ev.screenX, halfWidth: ev.estimatedWidthPx / 2 };
      }
    }
    return showMap;
  }