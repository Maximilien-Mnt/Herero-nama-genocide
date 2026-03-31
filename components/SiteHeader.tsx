"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/histoire", label: "Histoire" },
  { href: "/chronologie", label: "Chronologie" },
  { href: "/statistiques", label: "Statistiques" },
  { href: "/documents", label: "Documents" },
  { href: "/carte", label: "Carte" },
  { href: "/ressources", label: "Ressources" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/histoire") return pathname.startsWith("/histoire");
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Defer to avoid cascading renders when pathname updates.
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(15, 14, 12, 0.85)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 56,
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-layout)",
          margin: "0 auto",
          height: "100%",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 600,
            color: "var(--text-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            minWidth: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/genocide-herero+nama.png" alt="" width={32} height={32} />
          <span style={{ whiteSpace: "nowrap" }}>Héréro &amp; Nama — 1904–1908</span>
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
              alignItems: "center",
            }}
            className="site-header-nav"
          >
            {nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.9rem",
                      color: active ? "var(--text-primary)" : "var(--text-muted)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/methodologie"
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                Méthodologie
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="site-header-burger"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="site-header-drawer"
          onClick={() => setOpen((v) => !v)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            background: "rgba(255,255,255,0.02)",
            color: "var(--text-primary)",
            cursor: "pointer",
          }}
        >
          <span aria-hidden style={{ fontFamily: "var(--font-mono)" }}>
            ≡
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="site-header-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "min(20rem, 85vw)",
              background: "var(--bg-surface)",
              borderLeft: "1px solid var(--border-subtle)",
              padding: "0.75rem 0.75rem 1rem",
              backdropFilter: "blur(10px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  background: "transparent",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <nav aria-label="Navigation mobile">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1rem 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {nav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        style={{
                          padding: "0.7rem 0.8rem",
                          borderRadius: "var(--radius-md)",
                          border: `1px solid ${active ? "rgba(185,147,90,0.55)" : "var(--border-subtle)"}`,
                          background: active ? "rgba(185,147,90,0.12)" : "transparent",
                          color: active ? "var(--text-primary)" : "var(--text-body)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/a-propos"
                    style={{
                      padding: "0.7rem 0.8rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      background: "transparent",
                      color: "var(--text-body)",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    À propos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

