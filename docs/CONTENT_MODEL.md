# Modèle de contenu (IDs stables)

Les fichiers du dossier `content/` relient les vues entre elles. Ne pas renommer un `id` sans mise à jour globale.

## `events.json` — `TimelineEvent`

| Champ               | Type        | Description                                      |
| ------------------- | ----------- | ------------------------------------------------ |
| `id`                | string      | Ex. `evt-006`                                    |
| `date`              | string      | ISO ou `YYYY-MM`                                 |
| `endDate`           | string?     | Optionnel                                        |
| `title`             | string      | Titre court                                      |
| `summary`           | string      | Résumé affiché sur la frise                      |
| `tags`              | EventTag[]  | Filtres thématiques                              |
| `relatedPlaceIds`   | string[]    | Liens carte                                      |
| `relatedDocumentIds`| string[]    | Fiches documents                                 |
| `relatedHistorySlugs` | string[]  | Chapitres `/histoire/[slug]`                     |
| `relatedDatasetIds` | string[]    | Sections `/statistiques#id`                      |

## `places.json` — `Place`

| Champ             | Type         | Description                          |
| ----------------- | ------------ | ------------------------------------ |
| `id`              | string       | Ex. `place-shark-island`             |
| `name`            | string       | Libellé carte                        |
| `lat` / `lng`     | number       | WGS84                                |
| `period`          | PlacePeriod  | `before` \| `1904-1908` \| `after`   |
| `yearLabel`       | string       | Texte pédagogique                    |
| `description`     | string       | Popup / encadré                      |
| `relatedEventIds` | string[]     | Lien chronologie                     |

## `documents.json` — `HistoricalDocument`

Inclure impérativement crédit, licence, et marquer `sensitive: true` si l’image nécessite un floutage par défaut.

## `datasets.json` — `Dataset`

Marquer explicitement les jeux **placeholder** dans `notes` jusqu’à validation par l’équipe recherche.

## `resources.json` — `Resource`

Bibliographie structurée ; URLs optionnelles mais recommandées pour le jury.
