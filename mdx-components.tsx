// Ce fichier permet de personnaliser le rendu des éléments HTML dans les fichiers MDX.
// Actuellement, il surcharge la balise <a> pour utiliser next/link pour les liens internes et ajouter rel="noopener noreferrer" target="_blank" pour les liens externes.
// C'est une bonne pratique pour la sécurité et l'optimisation.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => {
      const h = href ?? "";
      if (h.startsWith("/")) {
        return (
          <Link href={h} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={h} rel="noopener noreferrer" target="_blank" {...props}>
          {children}
        </a>
      );
    },
  };
}
