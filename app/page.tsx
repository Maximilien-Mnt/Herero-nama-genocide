// 15 (app/page.tsx) – Startseite
// app/page.tsx — Neu gestaltete Startseite
// app/page.tsx — Neu gestaltete Startseite
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const sections = [
  {
    href: "/histoire",
    title: "Geschichte",
    text: "Strukturierte und kontextualisierte Erzählung: Gesellschaften, Kolonisation, Massengewalt, Erbe.",
  },
  {
    href: "/chronologie",
    title: "Chronologie",
    text: "Interaktive, filterbare Zeitleiste (Herero, Nama, Verwaltung, Erinnerung…).",
  },
  {
    href: "/statistiques",
    title: "Statistiken",
    text: "Diagramme mit Quellenangaben und Warnhinweisen zu Schätzungen.",
  },
  {
    href: "/documents",
    title: "Dokumente",
    text: "Quellenkorpus in Karteikartenform (durch Ihre genehmigten Archive zu ergänzen).",
  },
  {
    href: "/carte",
    title: "Karte",
    text: "Schlüsselorte auf OpenStreetMap-Hintergrund, mit Zeitfilter und Querverweisen.",
  },
  {
    href: "/ressources",
    title: "Ressourcen",
    text: "Bibliografie, Archive und Vertiefungsmöglichkeiten.",
  },
];

const startpageImages = [
  {
    src: "/assets/startpage-images/simg1.jpg",
    pos: "center",
    caption: "Deutsche Kolonialtruppen",
  },
  {
    src: "/assets/startpage-images/simg7.webp",
    pos: "20% 30%",
    caption: "Gedenkstätte des Konzentrationslagers Shark Island",
  },
  {
    src: "/assets/startpage-images/simg3.jpg",
    pos: "top",
    caption: "Gravur des Gedenkdenkmals in Windhoek",
  },
  {
    src: "/assets/startpage-images/simg13.jpg",
    pos: "bottom",
    caption: "Lothar von Trotha (1848‑1920), deutscher General",
  },
  {
    src: "/assets/startpage-images/simg12.webp",
    pos: "left",
    caption: "Gemälde von Richard Knötel (1857–1914) einer Schlacht zwischen Deutschen und Herero",
  },
  {
    src: "/assets/startpage-images/simg2.jpg",
    pos: "top",
    caption: "Samuel Maharero (1856–1923), Anführer des Herero‑Aufstands",
  },
  {
    src: "/assets/startpage-images/simg4.jpg",
    pos: "100% 0%",
    caption: "Herero‑Gefangene, die 1907 die Flucht in die Omaheke‑Wüste überlebten",
  },
  {
    src: "/assets/startpage-images/simg17.jpg",
    pos: "center top",
    caption: "Swakopmund‑Denkmal",
  },
  {
    src: "/assets/startpage-images/simg8.webp",
    pos: "center bottom",
    caption: "Gedenk‑Basrelief in Windhoek",
  },
  {
    src: "/assets/startpage-images/simg16.jpg",
    pos: "center",
    caption: "Hinrichtung der Herero und Nama durch Erhängen",
  },
  {
    src: "/assets/startpage-images/simg11.jpg",
    pos: "50% 20%",
    caption: "Völkermorddenkmal in Windhoek, vor dem Unabhängigkeitsmuseum",
  },
  {
    src: "/assets/startpage-images/simg5.jpg",
    pos: "center",
    caption: "Überwachung der lokalen Bevölkerung durch deutsche Militärtruppen",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Main title */}
      <header className="startpage-title" style={{ marginTop: "15px" }}>
        <h1>
          Völkermord an den <br /> Herero und Nama
        </h1>
      </header>

      {/* Full‑width historical image strip */}
      <div className="startpage-image-strip" aria-label="Historische Bildcollage">
        {startpageImages.map((img, i) => (
          <figure key={i} className="startpage-image-cell">
            <img
              src={img.src}
              alt={img.caption}
              loading={i < 4 ? "eager" : "lazy"}
              decoding="async"
              style={{ objectPosition: img.pos }}
            />
            <figcaption className="startpage-image-caption">
              <span>{img.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <PageShell>
        {/* Large citation */}
        <blockquote className="startpage-quote">
          <p>„Their blood waters our freedom.“</p>
        </blockquote>

        {/* Engaging, academic explanation */}
        <section className="startpage-explanation">
          <p>
            Zwischen 1904 und 1908 verübten deutsche Kolonialtruppen in Deutsch‑Südwestafrika
            (dem heutigen Namibia) den ersten Völkermord des 20. Jahrhunderts. Die Aufstände
            der Herero und später der Nama – geboren aus systematischer Enteignung und rassistischer
            Unterdrückung – beantwortete das Kaiserreich mit einer beispiellosen Vernichtungspolitik.
            General Lothar von Trotha erließ den „Vernichtungsbefehl“, der Jagd auf Zivilisten machte;
            Tausende wurden in die Omaheke‑Wüste getrieben oder in Konzentrationslager verschleppt.
            Bis zu 80 % der Herero und rund 50 % der Nama verloren ihr Leben. Die Spuren dieses
            Genozids wirken bis heute fort – in Namibia, in Deutschland und in der komplexen Frage
            nach Erinnerung, historischer Gerechtigkeit und Reparation. Diese Website zeigt auf einfache Weise
            die historischen Zusammenhänge, die beteiligten Akteure, die Schauplätze und die
            Nachwirkungen, um von diese Ereignisse zu bezeugen.
          </p>
        </section>

        {/* Section navigation */}
        <div className="home-nav-grid" aria-label="Hauptnavigation">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card"
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <h2
                style={{
                  marginTop: 0,
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {s.title}
              </h2>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                {s.text}
              </p>
            </Link>
          ))}
        </div>
      </PageShell>
    </>
  );
}