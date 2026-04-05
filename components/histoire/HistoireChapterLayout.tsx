"use client";

// Il gère la structure de chaque chapitre MDX, y compris la génération d'une table des matières (TOC) et l'affichage des liens croisés vers d'autres sections du site.
// Génération de la TOC: Le useEffect scanne les titres h2 et h3 du contenu MDX (children) pour construire dynamiquement une table des matières. Il attribue des id aux titres s'ils n'en ont pas déjà, ce qui est une excellente pratique pour les ancres de navigation.
// Liens croisés (related): Le useMemo filtre les données globales (getEvents()) pour trouver les éléments (événements, lieux, documents, datasets) qui sont liés au chapitre actuel via relatedHistorySlugs. Ces liens sont ensuite affichés dans une barre latérale et en bas du chapitre.
// Navigation entre chapitres (prevNext): Détermine les chapitres précédent et suivant en se basant sur la liste historyChapters définie dans lib/content.ts, facilitant la lecture séquentielle.
// Styling: Utilise des styles inline et des classes CSS (chapter-layout, chapter-sidebar, prose, crosslink-tags) pour la mise en page.

// Chaque page de chapitre importe son contenu MDX (Chapter from './chapter.mdx') et l'enveloppe dans le composant HistoireChapterLayout.

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  getDatasetById,
  getDocumentById,
  getEvents,
  getPlaceById,
  historyChapters,
} from "@/lib/content";
import type { TimelineEvent } from "@/lib/types";
import { CrossLinkTag } from "@/components/CrossLink";

type TocItem = { id: string; label: string; level: 2 | 3 };

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function HistoireChapterLayout({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: ReactNode;
}) {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;

    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const items: TocItem[] = [];

    headings.forEach((h) => {
      const level: 2 | 3 = (h.tagName.toLowerCase() === "h2" ? 2 : 3) as 2 | 3;
      const raw = h.textContent ?? "";
      const id = h.id || slugify(raw);
      if (!h.id) h.id = id;
      h.style.scrollMarginTop = "6.5rem";
      items.push({ id, label: raw.trim(), level });
    });

    // Defer to avoid cascading renders when effects fire.
    queueMicrotask(() => setToc(items));
  }, []);

  const related = useMemo(() => {
    const events = getEvents().filter((e) => e.relatedHistorySlugs.includes(slug));
    const placeIds = new Set<string>();
    const documentIds = new Set<string>();
    const datasetIds = new Set<string>();

    events.forEach((ev) => {
      ev.relatedPlaceIds.forEach((id) => placeIds.add(id));
      ev.relatedDocumentIds.forEach((id) => documentIds.add(id));
      ev.relatedDatasetIds.forEach((id) => datasetIds.add(id));
    });

    return { events, placeIds, documentIds, datasetIds };
  }, [slug]);

  const prevNext = useMemo(() => {
    const idx = historyChapters.findIndex((c) => c.slug === slug);
    const prev = idx > 0 ? historyChapters[idx - 1] : null;
    const next = idx >= 0 && idx < historyChapters.length - 1 ? historyChapters[idx + 1] : null;
    return { prev, next };
  }, [slug]);

  return (
    <div
      className="chapter-layout"
      style={{
        gap: "1.5rem",
        alignItems: "start",
      }}
    >
      <aside
        className="chapter-sidebar"
        style={{
          alignSelf: "start",
        }}
      >
        <div className="card" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
            Table des matières
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {toc.slice(0, 12).map((item) => (
              <li key={item.id} style={{ marginLeft: item.level === 3 ? "0.5rem" : 0 }}>
                <a
                  href={`#${item.id}`}
                  style={{ color: "var(--text-body)", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
              Liens liés
            </div>

            <div className="crosslink-tags" style={{ marginTop: "0.75rem" }}>
              {related.events.slice(0, 4).map((ev: TimelineEvent) => (
                <CrossLinkTag
                  key={ev.id}
                  href={`/chronologie#${ev.id}`}
                  icon="📅"
                  label={ev.title}
                  sectionId={ev.id}
                />
              ))}
              {Array.from(related.documentIds).slice(0, 3).map((id) => {
                const d = getDocumentById(id);
                if (!d) return null;
                return (
                  <CrossLinkTag
                    key={id}
                    href={`/documents#${d.id}`}
                    icon="📖"
                    label={d.title}
                    sectionId={d.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <section>
        <div id={`histoire-${slug}`} style={{ scrollMarginTop: "6.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: "44px", fontWeight: 600, margin: 0 }}>
            {title}
          </h1>
        </div>

        <div ref={articleRef} className="prose" style={{ marginTop: "1rem" }}>
          {children}
        </div>

        <div className="crosslink-tags" aria-label="Liens croisés du chapitre" style={{ marginTop: "1.25rem" }}>
          {related.events.map((ev) => (
            <CrossLinkTag
              key={ev.id}
              href={`/chronologie#${ev.id}`}
              icon="📅"
              label={ev.title}
              sectionId={ev.id}
            />
          ))}

          {Array.from(related.documentIds).map((id) => {
            const d = getDocumentById(id);
            if (!d) return null;
            return (
              <CrossLinkTag
                key={id}
                href={`/documents#${d.id}`}
                icon="📖"
                label={d.title}
                sectionId={d.id}
              />
            );
          })}

          {Array.from(related.placeIds).map((id) => {
            const p = getPlaceById(id);
            if (!p) return null;
            const sectionId = `place-${p.id}`;
            return (
              <CrossLinkTag
                key={id}
                href={`/carte?place=${p.id}#${sectionId}`}
                icon="📍"
                label={p.name}
                sectionId={sectionId}
              />
            );
          })}

          {Array.from(related.datasetIds).map((id) => {
            const ds = getDatasetById(id);
            if (!ds) return null;
            return (
              <CrossLinkTag
                key={id}
                href={`/statistiques#${ds.id}`}
                icon="📊"
                label={ds.title}
                sectionId={ds.id}
              />
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          {prevNext.prev ? (
            <Link href={`/histoire/${prevNext.prev.slug}`} className="button" style={{ textDecoration: "none" }}>
              ← {prevNext.prev.title}
            </Link>
          ) : null}
          {prevNext.next ? (
            <Link href={`/histoire/${prevNext.next.slug}`} className="button" style={{ textDecoration: "none" }}>
              {prevNext.next.title} →
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

