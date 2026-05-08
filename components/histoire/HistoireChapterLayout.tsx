// ./components/histoire/HistoireChapterLayout.tsx

// Il gère la structure de chaque chapitre MDX, y compris la génération d'une table des matières (TOC) et l'affichage des liens croisés vers d'autres sections du site.
// Génération de la TOC: Le useEffect scanne les titres h2 et h3 du contenu MDX (children) pour construire dynamiquement une table des matières. Il attribue des id aux titres s'ils n'en ont pas déjà, ce qui est une excellente pratique pour les ancres de navigation.
// Liens croisés (related): Le useMemo filtre les données globales (getEvents()) pour trouver les éléments (événements, lieux, documents, datasets) qui sont liés au chapitre actuel via relatedHistorySlugs. Ces liens sont ensuite affichés dans une barre latérale et en bas du chapitre.
// Navigation entre chapitres (prevNext): Détermine les chapitres précédent et suivant en se basant sur la liste historyChapters définie dans lib/content.ts, facilitant la lecture séquentielle.
// Styling: Utilise des styles inline et des classes CSS (chapter-layout, chapter-sidebar, prose, crosslink-tags) pour la mise en page.

// Chaque page de chapitre importe son contenu MDX (Chapter from './chapter.mdx') et l'enveloppe dans le composant HistoireChapterLayout.

"use client";

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

type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="history-panel">
      <button
        type="button"
        className="history-panel-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="history-panel-title">{title}</span>
        <span
          className={`history-panel-chevron ${open ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? <div className="history-panel-body">{children}</div> : null}
    </section>
  );
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

    const firstH1 = root.querySelector("h1");
    if (firstH1) firstH1.remove();

    const headings = Array.from(
      root.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const items: TocItem[] = [];

    headings.forEach((h) => {
      const level: 2 | 3 = h.tagName.toLowerCase() === "h2" ? 2 : 3;
      const raw = h.textContent ?? "";
      const id = h.id || slugify(raw);

      if (!h.id) h.id = id;
      h.style.scrollMarginTop = "6.5rem";

      items.push({ id, label: raw.trim(), level });
    });

    queueMicrotask(() => setToc(items));
  }, []);

  const related = useMemo(() => {
    const events = getEvents().filter((e) =>
      e.relatedHistorySlugs.includes(slug)
    );
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
    return {
      prev: idx > 0 ? historyChapters[idx - 1] : null,
      next:
        idx >= 0 && idx < historyChapters.length - 1
          ? historyChapters[idx + 1]
          : null,
    };
  }, [slug]);

  return (
    <div className="history-page-layout">
      <aside className="history-sidebar" aria-label="Histoire Sidebar">
        <div className="history-sidebar-inner">
          <SidebarSection title="Kapitelübersicht" defaultOpen>
            <ul className="history-link-list">
              {historyChapters.map((c) => (
                <li key={c.slug}>
                  <Link href={`/histoire/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Inhaltsverzeichnis" defaultOpen>
            <ul className="history-link-list history-link-list--toc">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? "is-subitem" : ""}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Querverweise" defaultOpen={false}>
            <div className="history-crosslinks">
              {related.events.map((ev: TimelineEvent) => (
                <CrossLinkTag
                  key={ev.id}
                  href={`/chronologie#${ev.id}`}
                  icon="📅" // Icône pour la chronologie
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
                    icon="📄" // Icône pour les documents
                    label={d.title}
                    sectionId={d.id}
                  />
                );
              })}

              {Array.from(related.placeIds).map((id) => {
                const p = getPlaceById(id);
                if (!p) return null;
                return (
                  <CrossLinkTag
                    key={id}
                    href={`/carte?place=${p.id}`}
                    icon="📍" // Icône pour les lieux
                    label={p.name}
                    sectionId={p.id}
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
                    icon="📊" // Icône pour les statistiques
                    label={ds.title}
                    sectionId={ds.id}
                  />
                );
              })}
            </div>
          </SidebarSection>
        </div>
      </aside>

      <main className="history-main">
        <h1 className="history-title">{title}</h1>

        <div ref={articleRef} className="prose history-article">
          {children}
        </div>

        <div className="history-nav">
          {prevNext.prev ? (
            <Link
              href={`/histoire/${prevNext.prev.slug}`}
              className="button"
              style={{ textDecoration: "none" }}
            >
              ← {prevNext.prev.title}
            </Link>
          ) : null}
          {prevNext.next ? (
            <Link
              href={`/histoire/${prevNext.next.slug}`}
              className="button"
              style={{ textDecoration: "none" }}
            >
              {prevNext.next.title} →
            </Link>
          ) : null}
        </div>
      </main>
    </div>
  );
}