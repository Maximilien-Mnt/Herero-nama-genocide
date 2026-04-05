// Un composant réutilisable pour les boutons, avec deux variantes principales : "primary" (or) et "secondary" (gold).

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

export function Button({
  variant = "secondary",
  className,
  children,
  ...props
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClass = variant === "primary" ? "button-primary" : "";
  return (
    <button
      {...props}
      className={["button", variantClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}

