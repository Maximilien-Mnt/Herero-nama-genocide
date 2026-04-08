import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";
import { DocumentsFiltersClient } from "@/components/documents/DocumentsFiltersClient";
import { getDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Documents",
  description: "Fiches de sources historiques : images, cartes, textes et références de droit.",
  openGraph: { title: "Documents — Génocide héréro et nama" },
};

export default function DocumentsPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Accueil" }, { label: "Documents" }]} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
        Documents
      </h1>

      

      <DocumentsFiltersClient documents={getDocuments()} />
    </PageShell>
  );
}
