// Ce fichier permet de personnaliser le rendu des éléments HTML dans les fichiers MDX.
// Actuellement, il surcharge la balise <a> pour utiliser next/link pour les liens internes et ajouter rel="noopener noreferrer" target="_blank" pour les liens externes.
// C'est une bonne pratique pour la sécurité et l'optimisation.

// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // --- Gestion des liens (conservée telle quelle) ---
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

    // --- NOUVEAU : Gestion des tableaux ---
    table: ({ children }) => (
      <div className="mdx-table-container">
        <table className="mdx-table">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="mdx-th">{children}</th>,
    td: ({ children }) => <td className="mdx-td">{children}</td>,
    tr: ({ children }) => <tr className="mdx-tr">{children}</tr>,

    // --- Conserve les autres composants par défaut ---
    ...components,
  };
}
