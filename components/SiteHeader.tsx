"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const nav = [
  { href: "/histoire", label: "Histoire" },
  { href: "/chronologie", label: "Chronologie" },
  { href: "/statistiques", label: "Statistiques" },
  { href: "/documents", label: "Documents" },
  { href: "/carte", label: "Carte" },
  { href: "/ressources", label: "Ressources" },
  { href: "/methodologie", label: "Methodologie" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/histoire") return pathname.startsWith("/histoire");
  return pathname === href;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 860px)");
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close when clicking outside the drawer content
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleMenu = () => setOpen((v) => !v);

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

        {/* Desktop navigation (visible only on non-mobile) */}
        {!isMobile && (
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
            >
              {nav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.4rem 0.6rem",
                        borderRadius: "0.375rem",
                        color: active ? "var(--text-primary)" : "var(--text-muted)",
                        textDecoration: "none",
                        fontWeight: active ? 500 : 400,
                        transition: "background-color 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Mobile burger button (visible only on mobile) */}
        {isMobile && (
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={toggleMenu}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              background: "rgba(255,255,255,0.02)",
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "var(--accent-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "var(--border-subtle)";
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", lineHeight: 1 }}>
              ≡
            </span>
          </button>
        )}
      </div>

      {/* Mobile drawer – rendered via portal to avoid stacking context issues */}
      {isMobile &&
        open &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              transition: "opacity 0.25s ease",
            }}
          >
            <div
              ref={drawerRef}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: "min(20rem, 85vw)",
                background: "var(--bg-surface)",
                borderLeft: "1px solid var(--border-subtle)",
                padding: "0.75rem 0.75rem 1rem",
                boxShadow: "-8px 0 24px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
              }}
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
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  ×
                </button>
              </div>

              <nav aria-label="Navigation mobile" style={{ flex: 1, overflowY: "auto" }}>
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
                          onClick={() => setOpen(false)}
                          style={{
                            display: "block",
                            padding: "0.7rem 0.8rem",
                            borderRadius: "var(--radius-md)",
                            border: `1px solid ${active ? "rgba(185,147,90,0.6)" : "var(--border-subtle)"}`,
                            background: active ? "rgba(185,147,90,0.15)" : "transparent",
                            color: active ? "var(--text-primary)" : "var(--text-body)",
                            textDecoration: "none",
                            fontWeight: active ? 500 : 400,
                            transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(185, 147, 90, 0.2)";
                            e.currentTarget.style.borderColor = "rgba(185, 147, 90, 0.8)";
                            e.currentTarget.style.transform = "translateX(4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = active ? "rgba(185,147,90,0.15)" : "transparent";
                            e.currentTarget.style.borderColor = active ? "rgba(185,147,90,0.6)" : "var(--border-subtle)";
                            e.currentTarget.style.transform = "translateX(0)";
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}