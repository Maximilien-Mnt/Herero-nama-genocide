import Link from "next/link";

const nav = [
  { href: "/histoire", label: "Histoire" },
  { href: "/chronologie", label: "Chronologie" },
  { href: "/statistiques", label: "Statistiques" },
  { href: "/documents", label: "Documents" },
  { href: "/carte", label: "Carte" },
  { href: "/ressources", label: "Ressources" },
  { href: "/methodologie", label: "Méthodologie" },
];

export function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(15,17,21,0.85)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0.75rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/genocide-herero+nama.png" alt="" width={32} height={32} />
          <span>Héréro &amp; Nama — 1904–1908</span>
        </Link>
        <nav aria-label="Navigation principale">
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.35rem 0.75rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              justifyContent: "flex-end",
            }}
          >
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/a-propos"
                style={{
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                À propos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
