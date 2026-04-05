// Un composant réutilisable pour les filtres en forme de pillules, avec une variante active pour indiquer le filtre actif.

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function FilterPill({
  active,
  children,
  className,
  ...props
}: {
  active?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "filter-pill",
        active ? "filter-pill--active" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      type={props.type ?? "button"}
    >
      {children}
    </button>
  );
}

