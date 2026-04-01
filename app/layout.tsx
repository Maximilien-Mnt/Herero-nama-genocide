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
  openGraph: {
    title: siteTitle,
    description,
    type: "website",
    locale: "de_DE",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu-principal">
          Zur Hauptnavigation springen
        </a>
        <SiteHeader />
        <main id="contenu-principal">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>

  );
}
