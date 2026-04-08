// 2
import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MapDynamic } from "@/components/map/MapDynamic";
import { PageShell } from "@/components/PageShell";
import { getPlaces } from "@/lib/content";

export const metadata: Metadata = {
  title: "Karte",
  description: "Interaktive Karte der Orte im Zusammenhang mit dem Völkermord und seinem räumlichen Kontext.",
  openGraph: { title: "Karte — Völkermord an den Herero und Nama" },
};

export default function CartePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Karte" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Karte
      </h1>
      <Suspense fallback={<p style={{ color: "var(--muted)" }}>Karte wird geladen…</p>}>
        <MapDynamic places={getPlaces()} />
      </Suspense>
    </PageShell>
  );
}