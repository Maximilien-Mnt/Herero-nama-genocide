import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MapDynamic } from "@/components/map/MapDynamic";
import { PageShell } from "@/components/PageShell";
import { getPlaces } from "@/lib/content";

export const metadata: Metadata = {
  title: "Carte",
  description: "Carte interactive des lieux liés au génocide et à son contexte spatial.",
  openGraph: { title: "Carte — Génocide héréro et nama" },
};

export default function CartePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Carte" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Carte
      </h1>
      <Suspense fallback={<p style={{ color: "var(--muted)" }}>Chargement de la carte…</p>}>
        <MapDynamic places={getPlaces()} />
      </Suspense>
    </PageShell>
  );
}
