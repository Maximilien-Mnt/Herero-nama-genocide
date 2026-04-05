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
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0 }}>
          Sources &amp; citations : <Link href="/citer">Comment citer</Link>.
        </p>
        <p style={{ margin: 0 }}>
          À usage éducatif. Voir <Link href="/a-propos">mentions de droits</Link> et informations
          sur les contenus externes.
        </p>
      </div>
    </footer>
  );
}
