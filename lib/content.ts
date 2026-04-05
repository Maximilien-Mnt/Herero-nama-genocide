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
    title: "Contexte colonial et sociétés du Sud-Ouest africain",
  },
  {
    slug: "prelude-revolte",
    title: "Prélude : tensions et soulèvements de 1904",
  },
  {
    slug: "camps-extermination",
    title: "Guerre, ordres de refoulement et camps",
  },
  {
    slug: "apres-1908",
    title: "Après 1908 : héritages de l’ordre colonial",
  },
  {
    slug: "memoire-reparation",
    title: "Mémoire, reconnaissance et débats internationaux",
  },
] as const;
