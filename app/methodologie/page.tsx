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
        <p>Es sei darauf hingewiesen, dass der Großteil dieser Seite sowie viele andere Seiten der Website aus dem Französischen ins Deutsche übersetzt wurden.</p>
        <SectionTitle title="Projektablauf" owners={["Daniel", "Maximilien"]} />
        <p>
          Zu Beginn recherchierten wir das Thema und sammelten allgemeine Informationen zum
          Völkermord, um uns einen ersten Überblick zu verschaffen. Danach teilten wir die Arbeit
          entsprechend unserer Stärken, unserer Verfügbarkeit und unserer jeweiligen Aufgaben auf.
          So legten wir die Grundlage für unsere Zusammenarbeit und begannen, gemeinsame
          Kollaborationstools zu nutzen.
        </p>
        <p>
          Einer von uns erstellte die grundlegende Website-Architektur, die Dateistruktur, die
          erste Version, die Einrichtung sowie die Bereitstellung auf Vercel und GitHub. Der andere
          konzentrierte sich zunächst auf die Recherche, die Auswahl von Quellen, die Suche nach
          Bildern und das vertiefte Verständnis des historischen Themas.
        </p>
        <p>
          Im Verlauf des Projekts arbeiteten wir an Design, Struktur und Code-Logik. Dazu gehörten
          unter anderem die Gestaltung des visuellen Stils sowie die Verwendung von MDX für die
          Geschichtsseiten. Die Zusammenarbeit verlief regelmäßig über mehrere Wochen hinweg, und
          wir überprüften die Quellen erneut, passten Inhalte an und lasen die Texte mehrfach
          Korrektur.
        </p>
        <p>
          In der letzten Phase behoben wir die verbleibenden Fehler, optimierten einzelne Seiten wie
          die Startseite und überprüften besonders die Zeitleiste und den Kartenbereich noch
          einmal. Außerdem recherchierten und integrierten wir Statistiken, reduzierten den Umfang
          einzelner Texte für mehr Übersichtlichkeit, wählten die Lizenz aus, fassten die
          Projektinformationen zusammen und erstellten diese Methodikseite.
        </p>

        <SectionTitle title="Zusammenarbeit" owners={["Daniel", "Maximilien"]} />
        <p>
          In unserem Projekt haben wir die Aufgaben klar aufgeteilt, damit jeder einen
          überschaubaren Arbeitsbereich hatte. Zu Beginn entschieden wir gemeinsam, wer welchen
          Teil übernimmt. So konnte jeder in seinem Bereich arbeiten, und wir kamen effizienter
          voran.
        </p>
        <p>
          Ich (Daniel) war vor allem für die inhaltliche Kontrolle und die Korrekturen zuständig,
          während Maximilien sich stärker um den technischen Teil und den Aufbau der Website
          kümmerte. Trotzdem trafen wir wichtige Entscheidungen gemeinsam, damit Inhalt und
          Umsetzung zusammenpassten.
        </p>
        <p>
          Für den Austausch unserer Inhalte sprachen wir regelmäßig miteinander und teilten unsere
          Texte. Zuerst schrieben und organisierten wir sie in Notion. Danach überführten wir sie je
          nach Bedarf in JSON, MDX oder direkt in den Code.
        </p>
        <p>
          Unser Ablauf war meist folgender: Text in Notion schreiben, Inhalte prüfen, in JSON, MDX
          oder Code übertragen, die Website aktualisieren und anschließend gemeinsam testen.
          Neben Notion nutzten wir auch Nachrichten, um Fragen schnell zu klären.
        </p>
        <p>
          Am Ende überprüften wir die Website noch einmal gemeinsam und nahmen kleinere Anpassungen
          vor, damit alles korrekt dargestellt wurde und zuverlässig funktionierte.
        </p>

        <SectionTitle title="Entwicklung und Programmierung" owners={["Maximilien"]} />
        <p>
          Die Entwicklungsphase der Website stützte sich stärker auf KI als der
          historische und inhaltliche Teil. Zunächst entstand eine einfache erste Version. Angaben
          zum Tech-Stack, zu Paketen, Laufzeitumgebung, Frameworks und Bibliotheken wurden in der
          Anfangsphase teilweise mithilfe von KI zusammengefasst und abgerufen.
        </p>
        <p>
          Im weiteren Verlauf passten wir die Website immer stärker an unsere konkreten Bedürfnisse
          an, und mein Bedarf an KI-Unterstützung nahm deutlich ab. Ich verwaltete den Großteil der
          Dateistruktur, der Code-Logik und der Funktionen und pflegte komplexe Elemente wie das
          Querverlinkungssystem.
        </p>
        <p>
          Für die interaktiven Bereiche der Website wählten wir JSON, weil das Format flexibel,
          leicht anpassbar und mit unserem Querverlinkungssystem gut kompatibel ist. Außerdem ließ
          es sich einfach warten und im Code umsetzen. Für die Geschichtsseiten nutzten wir MDX aus
          praktischen Gründen: Die Inhalte wurden in Notion bereits in Markdown verwaltet und
          konnten daher mit wenigen Anpassungen in das Projekt übernommen werden, auch wenn an
          einzelnen Stellen zusätzliche Formatierung nötig war.
        </p>
        <p>
          Ich war außerdem für das Hinzufügen von Bildern, die Pflege und Organisation der Inhalte
          in JSON und MDX, das CSS-Design, die Anpassung der Website, die Verbesserung der
          Benutzeroberfläche, die Definition der Projektstruktur, die UI- und UX-Entscheidungen,
          die Filter- und Sortiersysteme sowie zentrale Funktionen wie Karte, Suchstatistiken und
          wiederverwendbare React-Komponenten verantwortlich.
        </p>

        <SectionTitle title="Design" owners={["Maximilien"]} />
        <p>
          Das visuelle Design unserer Website orientiert sich an einer dunklen, ruhigen und
          seriösen Darstellung. Wir haben bewusst ein Farbsystem aus Schwarz-, Braun- und Goldtönen
          gewählt, um eine historische, archivartige Atmosphäre zu schaffen. Diese Farben passen
          zum Thema des Projekts und geben der Seite gleichzeitig einen klaren, wiedererkennbaren
          Stil.
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
          wurde so aufgebaut, dass sie auch auf kleineren Bildschirmen gut funktioniert.
          Besonders bei Karten, der Zeitleiste, den Dokumenten und den historischen Kapiteln war
          uns wichtig, dass das Design nicht nur schön aussieht, sondern auch praktisch, stabil und
          leicht verständlich bleibt.
        </p>

        <SectionTitle title="Nutzung von KI" owners={["Maximilien"]} />
        <p>
          Im Rahmen unserer Arbeit nutzten wir KI zur Korrektur, Verifizierung, Wiederholung
          einfacher Prozesse und zur Unterstützung beim Codieren und Programmieren. Wir
          verwendeten hauptsächlich die folgenden KIs in unseren verschiedenen Forschungsprojekten:
        </p>
        <ul>
          <li>Claude von Anthropic</li>
          <li>ChatGPT von OpenAI</li>
          <li>Manus</li>
          <li>DeepSeek R1</li>
        </ul>
        <p>
          Jede KI hatte eine andere Funktion und einen anderen Aufgabenbereich, die hier detailliert
          beschrieben werden:
        </p>

        <h3>Claude</h3>
        <p>
          Claude von Anthropic wurde hauptsächlich eingesetzt, um die von uns erstellten großen
          JSON- oder MDX-Dateien fehlerfrei zu bearbeiten. Musste beispielsweise jedes JSON-Objekt
          in einer JSON-Datei wiederholt geändert werden, war es praktischer, die KI zu nutzen, um
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
          Manus wurde nur wenig genutzt, hauptsächlich zum Parsen von Informationen aus den
          verschiedenen Dateien und zum Verständnis der Datei- und Ordnerstruktur sowie der
          Codelogik durch eine Verbindung zum GitHub-Repository.
        </p>

        <h3>DeepSeek</h3>
        <p>
          DeepSeek ist eine kostenlose, quelloffene und leistungsstarke KI. Wir haben sie für die
          meisten Aufgaben im Zusammenhang mit der Programmierung eingesetzt. Mehrere Projektdateien
          wurden hauptsächlich von dieser KI erstellt, darunter components/Breadcrumb.tsx,
          components/Reveal.tsx, components/PageTransition.tsx, app/histoire/layout.tsx und
          app/carte/page.tsx.
        </p>

        <SectionTitle title="Korrektur und Überprüfung" owners={["Daniel"]} />
        <p>
          In der letzten Phase unseres Projekts habe ich (Daniel) die gesamte Website noch einmal
          durchgelesen und überprüft. Dabei habe ich vor allem auf die Inhalte, die Verständlichkeit
          der Texte und die richtige Darstellung der Informationen geachtet. Wenn ich etwas gefunden
          habe, das nicht gut war oder verbessert werden konnte, habe ich es Maximilien mitgeteilt,
          damit wir es anpassen konnten.
        </p>
        <p>
          Danach hat mir Maximilien den Code der Website geschickt, damit ich die Fehler direkt im
          Skript korrigieren konnte. Ich habe die notwendigen Änderungen vorgenommen und den Code
          verbessert. Anschließend hat Maximilien den korrigierten Code wieder in die Website
          eingefügt. So konnten wir gut zusammenarbeiten und ein besseres Ergebnis erreichen.
        </p>

        <SectionTitle title="Quellenwahl und Verifikation" owners={["Daniel"]} />
        <p>
          Für dieses Projekt wählten wir unsere Quellen nach ihrer fachlichen Zuverlässigkeit und
          ihrem institutionellen Hintergrund aus. Vorrang hatten Veröffentlichungen von Archiven,
          Museen, Universitäten, Gedenkstätten und anderen wissenschaftlichen oder kulturellen
          Einrichtungen. Diese Quellen boten meist gut belegte Informationen und waren für ein
          historisches Thema besonders geeignet.
        </p>
        <p>
          Die Auswahl erfolgte in mehreren Schritten. Zuerst suchten wir nach allgemein
          vertrauenswürdigen Materialien, dann verglichen wir verschiedene Quellen miteinander und
          überprüften, ob die Angaben übereinstimmten. Wenn mehrere unabhängige und seriöse Quellen
          denselben Sachverhalt bestätigten, stieg unser Vertrauen in die Information. Bei
          widersprüchlichen Angaben bevorzugten wir in der Regel institutionelle oder fachliche
          Quellen.
        </p>
        <p>
          Die Seite <a href="/ressources">Ressourcen</a> enthält sowohl Quellen, die wir tatsächlich
          im Projekt verwendet haben, als auch zusätzliche Empfehlungen für Leserinnen und Leser, die
          das Thema weiter vertiefen möchten. Sie dient damit nicht nur als Bibliografie, sondern
          auch als Ausgangspunkt für weitere Recherche.
        </p>

        <SectionTitle title="Forschung" owners={["Daniel"]} />
        <p>
          Für die Erstellung unserer Internetseite über den Völkermord an den Herero und Nama habe
          ich (Daniel) zuerst ausführliche Recherchen im Internet durchgeführt. Zu Beginn nutzte ich
          verschiedene Suchbegriffe wie „Herero und Nama Genozid“, „deutsche Kolonialzeit in
          Namibia“ oder „Geschichte der Herero und Nama“, um möglichst viele Informationen zu
          finden. Alle Webseiten und Quellen, die mir relevant oder vertrauenswürdig erschienen,
          speicherte ich anschließend in Notion und ordnete sie dort. Dadurch konnte ich meine
          Recherche besser strukturieren und später schneller auf die Informationen zugreifen.
          Außerdem machte ich wichtige Notizen und schrieb interessante Fakten direkt auf.
        </p>
        <p>
          Danach las ich alle gesammelten Quellen genau und analysierte sie. Dabei war es mir
          wichtig, nur seriöse und zuverlässige Informationen zu verwenden. Deshalb nutzte ich vor
          allem Webseiten von Universitäten, Museen, historischen Archiven und bekannten
          Nachrichtenseiten. Ich verglich außerdem verschiedene Quellen miteinander, um sicherzugehen,
          dass die Informationen korrekt waren. Wenn mehrere Webseiten dieselben Fakten bestätigten,
          konnte ich davon ausgehen, dass die Angaben verlässlich waren. Auf diese Weise konnten wir
          falsche oder ungenaue Informationen vermeiden.
        </p>
        <p>
          Nachdem ich genügend Informationen gesammelt und ausgewertet hatte, schrieb ich in Notion
          eigene Texte und fasste die wichtigsten Ergebnisse zusammen. Danach arbeiteten wir die
          Inhalte gemeinsam weiter aus und übertrugen sie in die Website. So konnten wir die Inhalte
          Schritt für Schritt gut organisieren und verständlich darstellen.
        </p>
      </article>
    </PageShell>
  );
}