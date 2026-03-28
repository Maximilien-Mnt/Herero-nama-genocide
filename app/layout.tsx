import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const siteTitle = "Génocide des Héréros et des Namas (1904–1908)";
const description =
  "Ressource pédagogique autosuffisante : histoire, chronologie, carte, statistiques (schémas), documents et bibliographie.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: siteTitle,
    template: `%s — ${siteTitle}`,
  },
  description,
  openGraph: {
    title: siteTitle,
    description,
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu-principal">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu-principal">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
