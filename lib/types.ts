// lib/types.ts

export type EventTag =
  | "herero"
  | "nama"
  | "colonial"
  | "military"
  | "aftermath"
  | "memory";

export type PlaceType =
  | "city"
  | "battlefield"
  | "camp"
  | "memorial"
  | "mountain"
  | "coastal"
  | "desert"
  | "other";

// Les 8 types d'événements unifiés
export type EventType =
  | "battle"
  | "massacre"
  | "camp"
  | "political"
  | "resistance"
  | "testimony"
  | "memorial"
  | "other";

export interface TimelineEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  summary: string;
  tags: EventTag[];
  eventType: EventType; // remplace "category"
  relatedPlaceIds: string[];
  relatedDocumentIds: string[];
  relatedHistorySlugs: string[];
  relatedDatasetIds: string[];
}

export type PlacePeriod = "before" | "1904-1908" | "after";

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  period: PlacePeriod;
  yearLabel: string;
  description: string;
  relatedEventIds: string[];
  eventType: EventType; // remplace "primaryCategory"
}

export type DocumentType =
  | "photograph"
  | "map"
  | "newspaper"
  | "artifact"
  | "text"
  | "other";

export interface HistoricalDocument {
  id: string;
  type: DocumentType;
  title: string;
  year?: string;
  credit: string;
  licenseNote: string;
  sourceUrl?: string;
  thumbPath: string;
  fullPath?: string;
  blurb: string;
  relatedEventIds: string[];
  relatedPlaceIds: string[];
  relatedHistorySlugs: string[];
  sensitive?: boolean;
}

export type ChartKind = "line" | "bar" | "area";

export interface Dataset {
  id: string;
  title: string;
  unit?: string;
  sourceCitation: string;
  notes?: string;
  chartType: ChartKind;
  relatedEventIds: string[];
  points: { label: string; value: number; note?: string }[];
}

export interface Resource {
  id: string;
  kind: "book" | "article" | "film" | "website" | "archive" | "other";
  authors?: string;
  title: string;
  year?: string;
  url?: string;
  notes?: string;
}