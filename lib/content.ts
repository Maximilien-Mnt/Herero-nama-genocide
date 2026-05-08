// lib/content.ts

// Ce module est le point d'accès central pour toutes les données du site.
// Il importe les fichiers JSON et expose des fonctions utilitaires pour récupérer toutes les entités ou une entité spécifique par son id.

// Centralisation: Toutes les données sont chargées et exposées via ce fichier, ce qui facilite la maintenance et garantit une source unique de vérité.
// Typage: L'utilisation de TypeScript assure que les données sont conformes aux interfaces définies, réduisant les erreurs à l'exécution.
// historyChapters: Cette constante est cruciale pour la navigation séquentielle des chapitres d'histoire et pour la génération des liens précédent/suivant.



import eventsData from "@/content/events.json";
import placesData from "@/content/places.json";
import documentsData from "@/content/documents.json";
import datasetsData from "@/content/datasets.json";
import resourcesData from "@/content/resources.json";
import type {
  Dataset,
  HistoricalDocument,
  Place,
  Resource,
  TimelineEvent,
} from "@/lib/types";

export function getEvents(): TimelineEvent[] {
  return eventsData as TimelineEvent[];
}

export function getEventById(id: string): TimelineEvent | undefined {
  return getEvents().find((e) => e.id === id);
}

export function getPlaces(): Place[] {
  return placesData as Place[];
}

export function getPlaceById(id: string): Place | undefined {
  return getPlaces().find((p) => p.id === id);
}

export function getDocuments(): HistoricalDocument[] {
  return documentsData as HistoricalDocument[];
}

export function getDocumentById(id: string): HistoricalDocument | undefined {
  return getDocuments().find((d) => d.id === id);
}

export function getDatasets(): Dataset[] {
  return datasetsData as Dataset[];
}

export function getDatasetById(id: string): Dataset | undefined {
  return getDatasets().find((d) => d.id === id);
}

export function getResources(): Resource[] {
  return resourcesData as Resource[];
}

export const historyChapters = [
  {
    slug: "contexte",
    title: "Kolonialer Kontext (1884–1903)",
  },
  {
    slug: "rassenideologie",
    title: "Rassenideologie und koloniale Gewalt",
  },
  {
    slug: "koloniale-herrschaft",
    title: "Koloniale Herrschaft in Deutsch-Südwestafrika",
  },
  {
    slug: "prelude-revolte",
    title: "Vorgeschichte des Aufstands",
  },
  {
    slug: "herero-aufstand-1904",
    title: "Der Herero-Aufstand von 1904",
  },
  {
    slug: "waterberg-vernichtungsbefehl",
    title: "Waterberg und Vernichtungsbefehl",
  },
  {
    slug: "omaheke-vertreibung",
    title: "Vertreibung in die Omaheke",
  },
  {
    slug: "camps-extermination",
    title: "Das Lagersystem: Konzentrationslager, Zwangsarbeit und systematischer Tod",
  },
  {
    slug: "nama-widerstand",
    title: "Nama-Widerstand",
  },
  {
    slug: "apres-1908",
    title: "Nach 1908: Verfolgung, Enteignung und Fortwirkung",
  },
  {
    slug: "langzeitfolgen",
    title: "Langzeitfolgen",
  },
  {
    slug: "memoire-reparation",
    title: "Erinnerung, Anerkennung und Reparationen",
  },
] as const;