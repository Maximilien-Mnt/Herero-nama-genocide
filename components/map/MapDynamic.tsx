// ./components/map/MapDynamic.tsx
"use client";
// Un composant dynamique qui charge MapClient côté client,
// souvent utilisé pour éviter le rendu côté serveur de composants qui dépendent de l'API du navigateur (comme Leaflet).

import dynamic from "next/dynamic";
import type { Place } from "@/lib/types";

const Inner = dynamic(() => import("./MapClient").then((m) => m.MapClient), {
  ssr: false,
  loading: () => <p style={{ color: "var(--muted)" }}>Karte wird geladen…</p>,
});

export function MapDynamic({ places }: { places: Place[] }) {
  return <Inner places={places} />;
}