"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place, PlacePeriod } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FilterPill } from "@/components/FilterPill";
import { CrossLinkTag } from "@/components/CrossLink";
import { getEventById } from "@/lib/content";

const PERIOD_LABEL: Record<PlacePeriod, string> = {
  before: "Avant 1904",
  "1904-1908": "1904–1908",
  after: "Après / contemporain",
};

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

const PERIOD_ORDER: PlacePeriod[] = ["before", "1904-1908", "after"];

function markerIcon(period: PlacePeriod) {
  return L.divIcon({
    className: "",
    html: `<div class="map-marker map-marker--${period}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -10],
  });
}

export function MapClient({ places }: { places: Place[] }) {
  const search = useSearchParams();
  const highlightId = search.get("place");
  const [periodFilter, setPeriodFilter] = useState<PlacePeriod | "all">("all");

  const filtered = useMemo(() => {
    if (periodFilter === "all") return places;
    return places.filter((p) => p.period === periodFilter);
  }, [places, periodFilter]);

  const highlighted = useMemo(
    () => (highlightId ? places.find((p) => p.id === highlightId) ?? null : null),
    [highlightId, places],
  );

  return (
    <div>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem" }}>
        Carte pédagogique : fond OpenStreetMap. Les points sont filtrables par période ; le partage
        d’URL avec <code>?place=…</code> ouvre le lieu correspondant (ex. lien depuis la chronologie).
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
        <FilterPill active={periodFilter === "all"} onClick={() => setPeriodFilter("all")}>
          Toutes périodes
        </FilterPill>
        {PERIOD_ORDER.map((p) => (
          <FilterPill key={p} active={periodFilter === p} onClick={() => setPeriodFilter(p)}>
            {PERIOD_LABEL[p]}
          </FilterPill>
        ))}
      </div>

      <div className="map-layout" style={{ gap: "1rem", alignItems: "start" }}>
        <div
          style={{
            minHeight: "70vh",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <MapContainer
            center={[-22.5, 17.5]}
            zoom={6}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FixLeafletDefaultIcons />
            <MapFlyTo place={highlighted} />
            {filtered.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={markerIcon(p.period)}>
                <Popup>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>{p.description}</div>
                  <div style={{ marginTop: "0.35rem", fontSize: "0.8rem", color: "#444" }}>
                    {PERIOD_LABEL[p.period]} — {p.yearLabel}
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Link href={`/carte?place=${p.id}`}>Lien</Link>
                    {" · "}
                    <Link href="/chronologie">Chronologie</Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="card" style={{ position: "sticky", top: 72 }}>
          <h3 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Légende & lieu</h3>

          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Périodes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.6rem" }}>
              {PERIOD_ORDER.map((p) => (
                <div key={p} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                  <span
                    aria-hidden
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background:
                        p === "before"
                          ? "var(--accent-sage)"
                          : p === "1904-1908"
                            ? "var(--accent-gold)"
                            : "var(--accent-rust)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  />
                  <span style={{ color: "var(--text-body)", fontSize: "0.9rem" }}>{PERIOD_LABEL[p]}</span>
                </div>
              ))}
            </div>
          </div>

          {highlighted ? (
            <div id={`place-${highlighted.id}`} style={{ scrollMarginTop: "6.5rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1rem", fontWeight: 500 }}>
                {highlighted.name}
              </h3>
              <p style={{ margin: "0 0 0.75rem", color: "var(--text-body)" }}>{highlighted.description}</p>

              <div className="crosslink-tags" style={{ marginTop: 0 }} aria-label="Liens croisés du lieu">
                {highlighted.relatedEventIds.map((id) => {
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
          ) : (
            <p style={{ margin: 0, color: "var(--text-muted)" }}>Sélectionnez un lieu via l’URL ou un marqueur.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
