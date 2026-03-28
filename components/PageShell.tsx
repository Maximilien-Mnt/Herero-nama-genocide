import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "1.75rem 1.25rem 0" }}>
      {children}
    </div>
  );
}
