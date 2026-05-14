// 17 (components/SiteFooter.tsx)
// SiteFooter contient des liens vers les pages "Citer" et "À propos".

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "3rem",
        padding: "2rem 1.25rem",
        color: "var(--text-muted)",
        fontSize: "0.875rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-layout)",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "0px",
          justifyContent: "space-between",
        }}
      >
        <p>
  Diese Website dient ausschließlich Bildungszwecken.
  <br />
  Hinweise zur Zitierung finden Sie unter{" "}
  <Link href="/citer">Zitierweise</Link>.
  <br />
  Informationen zur Lizenz und zu rechtlichen Fragen finden Sie unter{" "}
  <Link href="/rechtliches">Rechtliche Hinweise</Link>.
  <br />
  Weitere Informationen zum Projekt finden Sie unter{" "}
  <Link href="/a-propos">Über das Projekt</Link>.
</p>
<p>© 2026 Maximilien Montant & Daniel Liberge</p>
      </div>
    </footer>
  );
}