// 19 (./components/map/MapClient.tsx)
//Le cœur de la carte interactive.
// Il utilise react-leaflet pour afficher une carte OpenStreetMap avec des marqueurs pour les lieux historiques.
// Il gère le filtrage des lieux par période (PlacePeriod) et l'affichage des détails d'un lieu sélectionné. 
// Les marqueurs sont stylisés avec des DivIcon personnalisés et colorés selon leur période.

// components/map/MapClient.tsx
// components/map/MapClient.tsx
// components/map/MapClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place, PlacePeriod, EventType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterPill } from "@/components/FilterPill";
import { CrossLinkTag } from "@/components/CrossLink";
import { getEventById } from "@/lib/content";

// --- Event categories (unchanged) ---
export const EVENT_CATEGORIES = [
  "battle",
  "massacre",
  "camp",
  "political",
  "resistance",
  "testimony",
  "memorial",
  "other",
] as const;

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

const CATEGORY_COLORS: Record<EventType, string> = {
  battle: "#B85C5C",
  massacre: "#C77D40",
  camp: "#6A4E9E",
  political: "#B8935A",
  resistance: "#4D9E6A",
  testimony: "#4A7A9E",
  memorial: "#9E6A9E",
  other: "#7D6E5D",
};

const PERIOD_LABEL: Record<PlacePeriod, string> = {
  before: "Vor 1904",
  "1904-1908": "1904–1908",
  after: "Nach / zeitgenössisch",
};

// --- Helper components ---
function MapFlyTo({ place }: { place: Place | null }) {
  const map = useMap();
  useEffect(() => {
    if (!place) return;
    map.flyTo([place.lat, place.lng], 8, { duration: 0.75 });
  }, [map, place]);
  return null;
}

function FixLeafletDefaultIcons() {
  useEffect(() => {
    const proto = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
    delete proto._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);
  return null;
}

function markerIcon(color: string, isSelected: boolean = false) {
  const className = `map-marker${isSelected ? ' map-marker--selected' : ''}`;
  return L.divIcon({
    className,
    html: `<div class="map-marker-shape" style="background-color: ${color};"></div>`,
    iconSize: isSelected ? [34, 34] : [28, 28],
    iconAnchor: isSelected ? [17, 17] : [14, 14],
    popupAnchor: [0, -14],
    tooltipAnchor: [0, -14],
  });
}

// --- Main component ---
export function MapClient({ places }: { places: Place[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("place");

  const [activeFilters, setActiveFilters] = useState<Set<EventType>>(new Set());
  const [showAllLabels, setShowAllLabels] = useState(false);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const selectedPlace = useMemo(
    () => (highlightId ? places.find((p) => p.id === highlightId) ?? null : null),
    [highlightId, places]
  );

  const filteredPlaces = useMemo(() => {
    if (activeFilters.size === 0) return places;
    return places.filter((place) => activeFilters.has(place.eventType));
  }, [places, activeFilters]);

  const categoryCounts = useMemo(() => {
    const counts: Record<EventType, number> = {} as any;
    EVENT_CATEGORIES.forEach((cat) => (counts[cat] = 0));
    places.forEach((place) => {
      const cat = place.eventType;
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, [places]);

  const closeModal = () => {
    router.push("/carte", { scroll: false });
  };

  // Tooltip management: when permanent labels are OFF, we close all and open the selected one.
  useEffect(() => {
    if (showAllLabels) return;
    Object.values(markerRefs.current).forEach((marker) => {
      marker.closeTooltip();
    });
    if (highlightId && markerRefs.current[highlightId]) {
      setTimeout(() => {
        markerRefs.current[highlightId]?.openTooltip();
      }, 100);
    }
  }, [showAllLabels, highlightId]);

  const handleMarkerClick = (place: Place) => {
    if (highlightId === place.id) {
      closeModal();
    } else {
      router.push(`/carte?place=${place.id}`, { scroll: false });
    }
  };

  const toggleFilter = (cat: EventType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const toggleLabels = () => setShowAllLabels((prev) => !prev);

  return (
    <div>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem" }}>
        Didaktische Karte. Die Farben zeigen den Ereignistyp des Ortes.
      </p>

      <div className="map-layout" style={{ gap: "1rem", alignItems: "stretch", marginTop: "1.5rem" }}>
        {/* Map container */}
        <div
          style={{
            height: "70vh",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <MapContainer center={[-22.5, 17.5]} zoom={6} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FixLeafletDefaultIcons />
            <MapFlyTo place={selectedPlace} />

            {filteredPlaces.map((place) => (
              <Marker
                key={`${place.id}-${showAllLabels}`}
                position={[place.lat, place.lng]}
                icon={markerIcon(CATEGORY_COLORS[place.eventType], highlightId === place.id)}
                ref={(ref) => {
                  if (ref) markerRefs.current[place.id] = ref;
                }}
                eventHandlers={{
                  click: () => handleMarkerClick(place),
                  ...(showAllLabels
                    ? {}
                    : {
                        mouseover: (e) => {
                          if (highlightId !== place.id) e.target.openTooltip();
                        },
                        mouseout: (e) => {
                          if (highlightId !== place.id) e.target.closeTooltip();
                        },
                      }),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -14]}
                  opacity={1}
                  permanent={showAllLabels}
                  sticky={!showAllLabels}
                >
                  <strong>{place.name}</strong>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend aside with responsive toggle button layout */}
        <aside
          className="card map-legend"
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="legend-header">
            <div className="legend-title-row">
              <h3 style={{ margin: 0 }}>Legende</h3>
              {activeFilters.size > 0 && (
                <button
                  onClick={clearFilters}
                  className="legend-clear-button"
                >
                  Alle anzeigen
                </button>
              )}
            </div>
            <button
              onClick={toggleLabels}
              className="button legend-toggle-button"
            >
              {showAllLabels ? "🏷️ Labels ausblenden" : "🏷️ Labels immer anzeigen"}
            </button>
          </div>

          <div className="legend-filters-container">
            {EVENT_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat];
              const isActive = activeFilters.has(cat);
              return (
                <FilterPill
                  key={cat}
                  active={isActive}
                  onClick={() => toggleFilter(cat)}
                  className="legend-filter-pill"
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      borderRadius: 0,
                      backgroundColor: CATEGORY_COLORS[cat],
                      border: "1px solid rgba(255,255,255,0.2)",
                      marginRight: "0.5rem",
                    }}
                  />
                  <span className="legend-filter-label">{CATEGORY_LABELS[cat]}</span>
                  <span className="legend-filter-count">({count})</span>
                </FilterPill>
              );
            })}
          </div>

          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
            Klicken Sie auf einen Filter, um die Karte einzuschränken.
          </p>
        </aside>
      </div>

      {/* Modal overlay (unchanged) */}
      {selectedPlace && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "600px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "1.5rem",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              aria-label="Schließen"
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--text-muted)",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h2 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1.75rem" }}>
              {selectedPlace.name}
            </h2>
            <p style={{ marginBottom: "1rem", color: "var(--text-body)" }}>
              {selectedPlace.description}
            </p>
            <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Zeitraum: </span>
                <span>{PERIOD_LABEL[selectedPlace.period]}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Jahr: </span>
                <span>{selectedPlace.yearLabel}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Kategorie: </span>
                <span>{CATEGORY_LABELS[selectedPlace.eventType]}</span>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Verknüpfte Ereignisse</h3>
              <div className="crosslink-tags">
                {selectedPlace.relatedEventIds.map((id) => {
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}