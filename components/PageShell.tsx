// PageShell est le conteneur principal de la page, qui encapsule le contenu principal et les éléments de navigation.

import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-container">{children}</div>
  );
}
