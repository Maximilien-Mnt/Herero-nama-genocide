import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Methodik",
  description:
    "Arbeitsablauf, Zusammenarbeit, Entwicklung, Design, KI-Nutzung, Korrekturlesen und Forschung.",
  openGraph: { title: "Methodik — Projekt Herero & Nama" },
};

type Owner = "Daniel" | "Maximilien";

function OwnerBadge({ owner }: { owner: Owner }) {
  const isDaniel = owner === "Daniel";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.25rem 0.6rem",
        borderRadius: "4px",
        border: `1px solid ${isDaniel ? "#8b1e1e" : "#1f4f8c"}`,
        background: isDaniel ? "rgba(139, 30, 30, 0.18)" : "rgba(31, 79, 140, 0.18)",
        color: isDaniel ? "#f0b6b6" : "#b9d3ff",
        fontSize: "0.78rem",
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {owner}
    </span>
  );
}

function SectionTitle({
  title,
  owners,
}: {
  title: string;
  owners: Owner[];
}) {
  return (
    <h2
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        width: "100%",
      }}
    >
      <span>{title}</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {owners.map((owner) => (
          <OwnerBadge key={owner} owner={owner} />
        ))}
      </span>
    </h2>
  );
}

export default function MethodologiePage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "Startseite" }, { label: "Methodik" }]} />
      <article className="prose" style={{ maxWidth: "none" }}>
        <SectionTitle title="Arbeitsablauf" owners={["Daniel", "Maximilien"]} />
        <p>
          Zunächst recherchierten wir das Projekt und sammelten allgemeine Informationen zum
          Völkermord, um uns einen Überblick zu verschaffen. Wir teilten die Arbeit optimal auf,
          basierend auf den Stärken, Schwächen und der Verfügbarkeit jedes Einzelnen. Die
          Grundlagen unserer Arbeitsprozesse waren gelegt, und wir begannen, Kollaborationstools
          einzusetzen.
        </p>
        <p>
          Wir legten beide los: Einer von uns erstellte die grundlegende Website-Architektur, die
          Dateistruktur, Version 1 und die Einrichtung, die Bereitstellung auf Vercel und die
          Implementierung auf GitHub, während der andere erste Recherchen durchführte, Quellen
          auswählte, Bilder suchte und sein Verständnis des Völkermords vertiefte.
        </p>
        <p>
          Im Laufe des Projekts finalisierten wir Design, Einrichtung, Struktur und Code-Logik,
          beispielsweise die Farbwahl Schwarz/Braun/Gold und MDX für die Geschichtsseiten. Die
          Zusammenarbeit verlief gut, mit ein wenig Arbeit täglich und insgesamt mindestens mehreren
          Stunden pro Woche. Die Website näherte sich ihrer endgültigen Form, als wir die Quellen
          erneut überprüften, die Relevanz der Informationen sicherstellten und Korrektur lasen.
        </p>
        <p>
          Schließlich erreichten wir die finale Entwicklungsphase. Die letzten Fehler und Probleme
          wurden behoben, einige Seiten wie die Startseite optimiert und ein weiteres Korrekturlesen
          durchgeführt, insbesondere für die Zeitleiste und die Karten-Registerkarte. Statistiken
          wurden recherchiert und implementiert, wobei Qualität Vorrang vor Quantität hatte.
          Abschließend wurden letzte Prüfungen durchgeführt, eine Domain für unsere Website erworben
          und der Gesamtumfang an Text und Informationen für eine bessere Zugänglichkeit reduziert.
          Schließlich wurde die Lizenz ausgewählt, die Projektinformationen zusammengestellt und
          diese Methodikseite verfasst.
        </p>

        <SectionTitle title="Zusammenarbeit" owners={["Daniel"]} />
        <p>
          In unserem Projekt haben wir die Arbeit gut aufgeteilt, damit jeder klare Aufgaben hatte.
          Am Anfang haben wir gemeinsam entschieden, wer welchen Teil übernimmt. So konnte jeder an
          seinem Bereich arbeiten und wir waren schneller fertig.
        </p>
        <p>
          Ich (Daniel) war vor allem für das Überprüfen der Inhalte und die Korrekturen zuständig,
          während mein Klassenkamerad eher den technischen Teil und den Aufbau der Website gemacht
          hat. Trotzdem haben wir viele Entscheidungen zusammen getroffen, damit alles zusammenpasst.
        </p>
        <p>
          Für den Austausch unserer Inhalte haben wir regelmäßig miteinander gesprochen und unsere
          Texte geteilt. Wir haben die Texte zuerst in Notion geschrieben und organisiert. Danach
          haben wir sie je nach Bedarf in JSON/MDX umgewandelt und dann in den Code eingefügt.
        </p>
        <p>
          Unser Ablauf war meistens so: Text in Notion schreiben → Inhalte überprüfen → in JSON/MDX
          oder Code übertragen → Website aktualisieren → gemeinsam testen und noch einmal
          durchlesen. Als Tool haben wir vor allem Notion benutzt, aber auch Nachrichten, um schnell
          Fragen zu klären.
        </p>
        <p>
          Am Ende haben wir die Website noch einmal gemeinsam überprüft und kleine Änderungen
          gemacht, damit alles gut aussieht und richtig funktioniert.
        </p>

        <SectionTitle title="Entwicklung/Programmierung" owners={["Maximilien"]} />
        <p>
          Die Website-Entwicklungsphase setzte stärker auf KI als der akademische/Forschungsteil.
          Zunächst wurde eine einfache erste Version erstellt. Informationen zum Tech-Stack, den
          Paketen, der Laufzeitumgebung, den Frameworks und Bibliotheken wurden hauptsächlich
          mithilfe von KI zusammengefasst und abgerufen, die mich (Maximilien) in den frühen
          Entwicklungsphasen unterstützte.
        </p>
        <p>
          Im weiteren Projektverlauf gewannen die Anpassung an die Bedürfnisse unserer Website
          zunehmend an Bedeutung, und meine Abhängigkeit von KI nahm deutlich ab. Ich verwaltete den
          Großteil der Dateistruktur, der Code-Logik und der Funktionen und pflegte komplexe
          Features wie das Querverlinkungssystem.
        </p>
        <p>
          Für die interaktiven Bereiche der Website wählten wir das JSON-Format, da es flexibel,
          hochgradig kompatibel mit unserem Querverlinkungssystem, leicht modifizierbar und auch für
          Anfänger verständlich ist. Zudem waren Wartung und Fehlerbehebung sehr einfach, und die
          Implementierung im Code war unkompliziert. Für die Verlaufsseiten wählten wir aus
          praktischen Gründen das MDX-Format: In Notion werden Inhalte mit Markdown (.md) verwaltet.
          Daher konnten wir die gesamten Verlaufsseiten problemlos in Notion erstellen und
          anschließend ohne große Anpassungen, wie beispielsweise die Verwendung von HTML für
          Tabellen, in das Projekt einfügen.
        </p>
        <p>
          Letztendlich habe ich persönlich das Hinzufügen von Fotos, die Pflege, Organisation und
          Implementierung der Inhalte im JSON/MDX-Format, das CSS-Design, die Anpassung der
          Website, die Optimierung der Benutzeroberfläche, die Definition der Projektstruktur, die
          UI/UX-Entscheidungen, die Implementierung von Filter- und Sortiersystemen sowie die
          Entwicklung von Kernfunktionen wie Karte, Suchstatistiken und wiederverwendbaren React-
          Komponenten übernommen.
        </p>

        <SectionTitle title="Design" owners={["Maximilien"]} />
        <p>
          Das visuelle Design unserer Website orientiert sich an einer dunklen, ruhigen und
          seriösen Darstellung. Wir haben bewusst ein Farbsystem aus Schwarz-, Braun- und Goldtönen
          gewählt, um eine historische, archivartige Atmosphäre zu schaffen. Diese Farben passen zum
          Thema des Projekts und geben der Seite gleichzeitig einen klaren, wiedererkennbaren Stil.
        </p>
        <p>
          Bei der Typografie haben wir zwei Schriftarten kombiniert: eine Serifenschrift für
          längere Texte und Überschriften sowie eine moderne Sans-Serif-Schrift für Navigation,
          kleine Elemente und technische Inhalte. Dadurch bleibt die Seite gut lesbar, wirkt aber
          trotzdem nicht zu nüchtern. Auch die Abstände, Karten, Rahmen und Hover-Effekte wurden so
          gestaltet, dass die Inhalte geordnet und angenehm erfassbar bleiben.
        </p>
        <p>
          Ein weiterer wichtiger Punkt war die Übersichtlichkeit auf allen Geräten. Die Website
          wurde so aufgebaut, dass sie auch auf kleineren Bildschirmen gut funktioniert. Besonders
          bei Karten, Zeitleiste, Dokumenten und den historischen Kapiteln war uns wichtig, dass
          das Design nicht nur schön aussieht, sondern auch praktisch, stabil und leicht verständlich
          bleibt.
        </p>

        <SectionTitle title="KI Nutzung" owners={["Maximilien"]} />
        <p>
          Im Rahmen unserer Arbeit nutzten wir KI zur Korrektur, Verifizierung, Wiederholung
          einfacher Prozesse und zur Unterstützung beim Codieren und Programmieren. Wir verwendeten
          hauptsächlich die folgenden KIs in unseren verschiedenen Forschungsprojekten:
        </p>
        <ul>
          <li>Claude von Anthropic</li>
          <li>ChatGPT von OpenAI</li>
          <li>Manus von Meta</li>
          <li>DeepSeek R1</li>
        </ul>
        <p>
          Jede KI hatte eine andere Funktion und einen anderen Aufgabenbereich, die hier detailliert
          beschrieben werden:
        </p>

        <h3>Claude</h3>
        <p>
          Claude von Anthropic wurde hauptsächlich eingesetzt, um die von uns erstellten großen JSON-
          oder MDX-Dateien fehlerfrei zu bearbeiten. Musste beispielsweise jedes JSON-Objekt in
          einer JSON-Datei wiederholt geändert werden, war es praktischer, die KI zu nutzen, um
          dieselbe Aktion dutzende Male auszuführen, ohne den Rest der Datei zu beeinträchtigen.
          Dadurch konnten wir erheblich Zeit sparen, ohne die Qualität und Relevanz der Inhalte zu
          beeinträchtigen.
        </p>

        <h3>ChatGPT</h3>
        <p>
          ChatGPT wurde in erster Linie dazu genutzt, sich zu Beginn, noch vor der eigentlichen
          Recherche, einen Überblick über den Völkermord zu verschaffen und ein allgemeines
          Verständnis davon zu entwickeln. Darüber hinaus unterstützte es teilweise die Entwicklung
          und den Einsatz der ersten Website-Version sowie die frühen Programmierphasen, wie die
          Auswahl und Installation von Paketen und Bibliotheken.
        </p>

        <h3>Manus</h3>
        <p>
          Manus wurde nur wenig genutzt, hauptsächlich zum Parsen von Informationen aus die
          verschiedenen files und zum Verständnis der Datei/Filestruktur und der Codelogik durch
          eine Verbindung zum GitHub-Repository.
        </p>

        <h3>DeepSeek</h3>
        <p>
          DeepSeek ist eine kostenlose, quelloffene und leistungsstarke KI. Wir haben sie für die
          meisten Aufgaben im Zusammenhang mit der Programmierung eingesetzt. Mehrere Projektdateien
          wurden hauptsächlich von dieser KI erstellt, darunter components/Breadcrumb.tsx,
          components/Reveal.tsx, components/PageTransition.tsx, app/histoire/layout.tsx und
          app/carte/page.tsx.
        </p>

        <SectionTitle title="Korrekturlesen/Überprüfung" owners={["Daniel"]} />
        <p>
          In der letzten Phase unseres Projekts habe ich (Daniel) die gesamte Website noch einmal
          durchgelesen und überprüft. Dabei habe ich vor allem auf die Inhalte, die Verständlichkeit
          der Texte und die richtige Darstellung der Informationen geachtet. Wenn ich etwas gefunden
          habe, das nicht gut war oder verbessert werden konnte, habe ich es meinem Klassenkameraden
          gesagt, damit wir es ändern konnten.
        </p>
        <p>
          Danach hat mir mein Klassenkamerad den Code der Website geschickt, damit ich die Fehler
          direkt im Skript korrigieren konnte. Ich habe die notwendigen Änderungen vorgenommen und
          den Code verbessert. Anschließend hat mein Klassenkamerad den korrigierten Code wieder in
          die Website eingefügt. So konnten wir gut zusammenarbeiten und ein besseres Ergebnis
          erreichen.
        </p>

        <SectionTitle title="Forschung" owners={["Daniel"]} />
        <p>
          Für die Erstellung unserer Internetseite über den Völkermord an den Herero und Nama habe
          ich (Daniel) zuerst ausführliche Recherchen im Internet gemacht. Am Anfang habe ich
          verschiedene Suchbegriffe wie „Herero und Nama Genozid“, „deutsche Kolonialzeit in
          Namibia“ oder „Geschichte der Herero und Nama“ benutzt, um möglichst viele Informationen
          zu finden. Alle Webseiten und Quellen, die mir interessant oder vertrauenswürdig
          erschienen, habe ich anschließend in Notion gespeichert und geordnet. Dadurch konnte ich
          meine Recherche besser organisieren und später schneller auf die verschiedenen
          Informationen zugreifen. Außerdem habe ich wichtige Notizen gemacht und interessante
          Fakten direkt aufgeschrieben.
        </p>
        <p>
          Danach habe ich alle gesammelten Quellen genau gelesen und analysiert. Dabei war es mir
          wichtig, nur seriöse und zuverlässige Informationen zu benutzen. Deshalb habe ich vor
          allem Webseiten von Universitäten, Museen, historischen Archiven und bekannten
          Nachrichtenseiten verwendet. Ich habe außerdem verschiedene Quellen miteinander
          verglichen, um sicherzugehen, dass die Informationen korrekt sind. Wenn mehrere Webseiten
          dieselben Fakten bestätigt haben, konnte ich davon ausgehen, dass die Informationen
          stimmen. Auf diese Weise konnte ich falsche oder ungenaue Informationen vermeiden und nur
          gute Quellen für das Projekt benutzen.
        </p>
        <p>
          Nachdem ich genug Informationen gesammelt und analysiert hatte, habe ich in Notion eigene
          Texte geschrieben und die wichtigsten Ergebnisse zusammengefasst. Danach habe ich
          zusammen mit meinem Kameraden Texte auf Französisch geschrieben und anschließend die
          deutsche Übersetzung kopiert und angepasst. So konnten wir die Inhalte einfacher
          vorbereiten und gleichzeitig darauf achten, dass die Informationen verständlich bleiben.
          Anschließend hat mein Kamerad die fertigen Texte übernommen und sie in Code für die
          Internetseite eingefügt. Durch diese Arbeitsmethode konnten wir unsere Webseite Schritt
          für Schritt gut organisieren und gestalten.
        </p>
      </article>
    </PageShell>
  );
}