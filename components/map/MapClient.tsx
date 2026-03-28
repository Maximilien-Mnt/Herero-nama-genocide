"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place, PlacePeriod } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CrossLinksForPlace } from "@/components/CrossLinks";

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

function filterBtnStyle(active: boolean): CSSProperties {
  return {
    cursor: "pointer",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    background: active ? "rgba(201,162,39,0.15)" : "var(--surface)",
    color: "var(--text)",
    padding: "0.35rem 0.75rem",
    fontSize: "0.85rem",
  };
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
      <p style={{ color: "var(--muted)", maxWidth: "44rem" }}>
        Carte pédagogique : fond OpenStreetMap. Les points sont filtrables par période ; le partage
        d’URL avec <code>?place=…</code> ouvre le lieu correspondant (ex. lien depuis la chronologie).
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
        <button
          type="button"
          onClick={() => setPeriodFilter("all")}
          style={filterBtnStyle(periodFilter === "all")}
        >
          Toutes périodes
        </button>
        {PERIOD_ORDER.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriodFilter(p)}
            style={filterBtnStyle(periodFilter === p)}
          >
            {PERIOD_LABEL[p]}
          </button>
        ))}
      </div>

      <div
        style={{
          height: "min(70vh, 560px)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          border: "1px solid var(--border)",
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
            <Marker key={p.id} position={[p.lat, p.lng]}>
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
                <CrossLinksForPlace placeId={p.id} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {highlighted ? (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>Lieu mis en avant</h3>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>{highlighted.name}</strong> — {highlighted.description}
          </p>
          <CrossLinksForPlace placeId={highlighted.id} />
        </div>
      ) : null}
    </div>
  );
}
