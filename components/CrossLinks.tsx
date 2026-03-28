import Link from "next/link";
import {
  getDatasetById,
  getDocumentById,
  getEventById,
  getPlaceById,
  historyChapters,
} from "@/lib/content";

function chapterTitle(slug: string): string {
  const c = historyChapters.find((h) => h.slug === slug);
  return c?.title ?? slug;
}

export function CrossLinksForEvent({ eventId }: { eventId: string }) {
  const ev = getEventById(eventId);
  if (!ev) return null;
  return (
    <aside
      className="card"
      style={{ marginTop: "1rem", fontSize: "0.9rem" }}
      aria-label="Liens croisés"
    >
      <strong style={{ display: "block", marginBottom: "0.5rem" }}>Explorer en lien</strong>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {ev.relatedPlaceIds.map((id) => {
          const p = getPlaceById(id);
          if (!p) return null;
          return (
            <li key={id}>
              <Link href={`/carte?place=${id}`}>{p.name}</Link>
            </li>
          );
        })}
        {ev.relatedDocumentIds.map((id) => {
          const d = getDocumentById(id);
          if (!d) return null;
          return (
            <li key={id}>
              <Link href={`/documents#${id}`}>{d.title}</Link>
            </li>
          );
        })}
        {ev.relatedHistorySlugs.map((slug) => (
          <li key={slug}>
            <Link href={`/histoire/${slug}`}>{chapterTitle(slug)}</Link>
          </li>
        ))}
        {ev.relatedDatasetIds.map((id) => {
          const ds = getDatasetById(id);
          if (!ds) return null;
          return (
            <li key={id}>
              <Link href={`/statistiques#${id}`}>{ds.title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export function CrossLinksForPlace({ placeId }: { placeId: string }) {
  const place = getPlaceById(placeId);
  if (!place) return null;
  return (
    <aside className="card" style={{ marginTop: "1rem", fontSize: "0.9rem" }} aria-label="Liens croisés">
      <strong style={{ display: "block", marginBottom: "0.5rem" }}>Lié à ce lieu</strong>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {place.relatedEventIds.map((id) => {
          const ev = getEventById(id);
          if (!ev) return null;
          return (
            <li key={id}>
              <Link href={`/chronologie#${id}`}>{ev.title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export function CrossLinksForDocument({ documentId }: { documentId: string }) {
  const doc = getDocumentById(documentId);
  if (!doc) return null;
  return (
    <aside className="card" style={{ marginTop: "0.75rem", fontSize: "0.85rem" }} aria-label="Liens croisés">
      <strong style={{ display: "block", marginBottom: "0.35rem" }}>Voir aussi</strong>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {doc.relatedEventIds.map((id) => {
          const ev = getEventById(id);
          if (!ev) return null;
          return (
            <li key={id}>
              <Link href={`/chronologie#${id}`}>{ev.title}</Link>
            </li>
          );
        })}
        {doc.relatedPlaceIds.map((id) => {
          const p = getPlaceById(id);
          if (!p) return null;
          return (
            <li key={id}>
              <Link href={`/carte?place=${id}`}>{p.name}</Link>
            </li>
          );
        })}
        {doc.relatedHistorySlugs.map((slug) => (
          <li key={slug}>
            <Link href={`/histoire/${slug}`}>{chapterTitle(slug)}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
