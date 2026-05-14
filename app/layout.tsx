// Ce fichier définit le layout global de l'application, qui enveloppe toutes les pages.
// Il inclut la structure HTML de base, les balises <head> (via metadata), et les composants de navigation principaux.
// Métadonnées (metadata): Définies de manière statique, elles incluent le titre du site, la description, les informations Open Graph et les robots d'indexation.
// Composants globaux: SiteHeader, SiteFooter, PageTransition (pour les animations de page), et les outils d'analyse de Vercel (Analytics, SpeedInsights) sont inclus ici, garantissant leur présence sur toutes les pages.
// Accessibilité: Un lien "skip-link" est présent pour l'accessibilité, permettant de sauter directement au contenu principal.

import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteTitle = "Völkermord an den Herero und Nama";
const description =
  "Interaktive Bildungswebsite über den Völkermord an den Herero und Nama (1904–1908).";

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
  icons: {
    icon: "/assets/favicon_black.png",
  },
  openGraph: {
    title: siteTitle,
    description,
    type: "website",
    locale: "de_DE",
    siteName: siteTitle,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main-content">
          Zum Hauptinhalt springen
        </a>
        <SiteHeader />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}