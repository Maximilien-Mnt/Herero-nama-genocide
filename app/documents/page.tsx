// 5 (app/documents/page.tsx) – unverändert
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { DocumentsFiltersClient } from "@/components/documents/DocumentsFiltersClient";
import { getDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dokumente",
  description: "Quellenblätter historischer Quellen: Bilder, Karten, Texte und Rechtsreferenzen.",
  openGraph: { title: "Dokumente — Völkermord an den Herero und Nama" },
};

export default function DocumentsPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Dokumente" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Dokumente
      </h1>

      

      <DocumentsFiltersClient documents={getDocuments()} />
    </PageShell>
  );
}