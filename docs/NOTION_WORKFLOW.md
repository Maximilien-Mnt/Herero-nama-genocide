# Flux Notion → dépôt Git

1. **Brouillon** dans Notion (texte long, commentaires).
2. **Gel** après relecture croisée : exporter en Markdown propre ou copier-coller dans `app/histoire/*/chapter.mdx`.
3. Pour chaque nouveau document faisant partie du corpus web :
   - assigner un `doc-xxx` unique ;
   - remplir crédit, année approximative, URL d’archive, licence ;
   - lier aux `evt-*` et `place-*` pertinents ;
   - valider le droit de reproduction (capture d’écran de la politique d’utilisation si besoin).
4. **Checklist avant merge** :
   - [ ] Identifiants synchronisés (`events`, `documents`, `places`) ;
   - [ ] Pas d’image lourde non optimisée dans `public/` ;
   - [ ] Build local `npm run build` vert.
