"use client";

//Le cœur de la carte interactive.
// Il utilise react-leaflet pour afficher une carte OpenStreetMap avec des marqueurs pour les lieux historiques.
// Il gère le filtrage des lieux par période (PlacePeriod) et l'affichage des détails d'un lieu sélectionné. 
// Les marqueurs sont stylisés avec des DivIcon personnalisés et colorés selon leur période.

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place, PlacePeriod, EventType } from "@/lib/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterPill } from "@/components/FilterPill";
import { CrossLinkTag } from "@/components/CrossLink";
import { getEventById } from "@/lib/content";

// --- 8 catégories d'événements avec leurs libellés et couleurs ---
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

// --- Composants utilitaires Leaflet ---
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

// Crée une icône carrée – la couleur sera appliquée via useEffect
function markerIcon() {
  return L.divIcon({
    className: "map-marker",
    html: `<div class="map-marker-shape"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
    tooltipAnchor: [0, -14],
  });
}

// --- Composant principal ---
export function MapClient({ places }: { places: Place[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("place");

  const [activeFilters, setActiveFilters] = useState<Set<EventType>>(new Set());
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const selectedPlace = useMemo(
    () => (highlightId ? places.find((p) => p.id === highlightId) ?? null : null),
    [highlightId, places]
  );

  // Filtrage par type d'événement
  const filteredPlaces = useMemo(() => {
    if (activeFilters.size === 0) return places;
    return places.filter((place) => activeFilters.has(place.eventType));
  }, [places, activeFilters]);

  // Compteurs pour la légende
  const categoryCounts = useMemo(() => {
    const counts: Record<EventType, number> = {} as any;
    EVENT_CATEGORIES.forEach((cat) => (counts[cat] = 0));
    places.forEach((place) => {
      const cat = place.eventType;
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, [places]);

  // Applique la couleur de fond après que les marqueurs sont ajoutés
  useEffect(() => {
    const timeout = setTimeout(() => {
      Object.entries(markerRefs.current).forEach(([id, marker]) => {
        const el = marker.getElement();
        if (!el) return;
        const shape = el.querySelector(".map-marker-shape") as HTMLElement | null;
        if (!shape) return;
        const place = places.find((p) => p.id === id);
        if (!place) return;
        const color = CATEGORY_COLORS[place.eventType];
        shape.style.backgroundColor = color;
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [filteredPlaces, places]);

  // Ouvre la popup du lieu sélectionné après le zoom
  useEffect(() => {
    if (selectedPlace && markerRefs.current[selectedPlace.id]) {
      setTimeout(() => {
        markerRefs.current[selectedPlace.id].openPopup();
      }, 800);
    }
  }, [selectedPlace]);

  const handleMarkerClick = (place: Place) => {
    router.push(`/carte?place=${place.id}`, { scroll: false });
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

  return (
    <div>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem" }}>
        Didaktische Karte. Die Farben zeigen den Ereignistyp des Ortes.
      </p>

      <div className="map-layout" style={{ gap: "1rem", alignItems: "stretch", marginTop: "1.5rem" }}>
        {/* Carte */}
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
                key={place.id}
                position={[place.lat, place.lng]}
                icon={markerIcon()}
                ref={(ref) => {
                  if (ref) markerRefs.current[place.id] = ref;
                }}
                eventHandlers={{
                  click: () => handleMarkerClick(place),
                  mouseover: (e) => e.target.openTooltip(),
                  mouseout: (e) => e.target.closeTooltip(),
                }}
              >
                <Tooltip permanent={false} direction="top" offset={[0, -14]}>
                  <strong>{place.name}</strong>
                </Tooltip>
                <Popup>
                  <strong>{place.name}</strong>
                  <div style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>
                    {place.description.length > 80
                      ? place.description.slice(0, 80) + "…"
                      : place.description}
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Link href={`/carte?place=${place.id}`}>Details anzeigen →</Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Légende interactive */}
        <aside
          className="card map-legend"
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h3 style={{ margin: 0 }}>Legende</h3>
            {activeFilters.size > 0 && (
              <button
                onClick={clearFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent-warm)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textDecoration: "underline",
                }}
              >
                Alle anzeigen
              </button>
            )}
          </div>

          {/* Conteneur responsive pour les filtres */}
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
                      borderRadius: 0, // carré
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

      {/* Boîte de détails */}
      {selectedPlace && (
        <div
          className="card"
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1.75rem" }}>
            {selectedPlace.name}
          </h2>
          <p style={{ marginBottom: "1rem", color: "var(--text-body)" }}>{selectedPlace.description}</p>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
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
      )}
    </div>
  );
}