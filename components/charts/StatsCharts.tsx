"use client";
// Responsable du rendu des graphiques statistiques à l'aide de la bibliothèque recharts.
// Il itère sur les datasets et, pour chaque dataset, rend un graphique (LineChart, BarChart ou AreaChart) en fonction du chartType spécifié dans les données.
// Il inclut également des liens croisés vers les événements liés.
import type { Dataset } from "@/lib/types";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getEventById } from "@/lib/content";
import { CrossLinkTag } from "@/components/CrossLink";
import { Reveal } from "@/components/Reveal";

function ChartForDataset({ ds }: { ds: Dataset }) {
  const common = (
    <div style={{ marginTop: "0.75rem" }}>
      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <strong style={{ color: "var(--text-primary)" }}>Source :</strong> {ds.sourceCitation}
      </div>
      {ds.notes ? (
        <div style={{ marginTop: "0.35rem", fontSize: "0.875rem", color: "var(--text-body)" }}>
          <strong style={{ color: "var(--text-primary)" }}>Note :</strong> {ds.notes}
        </div>
      ) : null}
    </div>
  );

  if (ds.chartType === "bar") {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
        <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500 }}>
          {ds.title}
        </h3>
        <div style={{ width: "100%", minWidth: 0, height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ds.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
              <XAxis dataKey="label" tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1A1815", border: "1px solid #3D342A" }}
                labelStyle={{ color: "#EBE3D5" }}
              />
              <Legend />
              <Bar dataKey="value" fill="#4D6B58" name={ds.unit ?? "valeur"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {common}

        <div className="crosslink-tags" aria-label="Liens croisés vers la chronologie">
          {ds.relatedEventIds.map((id) => {
            const ev = getEventById(id);
            if (!ev) return null;
            return (
              <CrossLinkTag key={id} href={`/chronologie#${id}`} icon="📅" label={ev.title} sectionId={id} />
            );
          })}
        </div>
      </div>
    );
  }

  if (ds.chartType === "area") {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
        <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500 }}>
          {ds.title}
        </h3>
        <div style={{ width: "100%", minWidth: 0, height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ds.points}>
              <defs>
                <linearGradient id={`g-${ds.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B8935A" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#B8935A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
              <XAxis dataKey="label" tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1A1815", border: "1px solid #3D342A" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#B8935A"
                fillOpacity={1}
                fill={`url(#g-${ds.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {common}

        <div className="crosslink-tags" aria-label="Liens croisés vers la chronologie">
          {ds.relatedEventIds.map((id) => {
            const ev = getEventById(id);
            if (!ev) return null;
            return (
              <CrossLinkTag key={id} href={`/chronologie#${id}`} icon="📅" label={ev.title} sectionId={id} />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
      <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500 }}>
        {ds.title}
      </h3>
      <div style={{ width: "100%", minWidth: 0, height: 280 }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={ds.points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
            <XAxis dataKey="label" tick={{ fill: "#7D6E5D", fontSize: 11 }} />
            <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#1A1815", border: "1px solid #3D342A" }} />
            <Line type="monotone" dataKey="value" stroke="#B8935A" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {common}

      <div className="crosslink-tags" aria-label="Liens croisés vers la chronologie">
        {ds.relatedEventIds.map((id) => {
          const ev = getEventById(id);
          if (!ev) return null;
          return (
            <CrossLinkTag key={id} href={`/chronologie#${id}`} icon="📅" label={ev.title} sectionId={id} />
          );
        })}
      </div>
    </div>
  );
}

export function StatsCharts({ datasets }: { datasets: Dataset[] }) {
  return (
    <div>
      <p style={{ color: "var(--text-muted)", maxWidth: "44rem" }}>
        Les graphiques ci-dessous incluent des <strong>valeurs pédagogiques</strong> (à compléter avec un tableau sourcé).
        Les visuels citent une piste de référence ; pour les limites méthodologiques, voir{" "}
        <a href="/methodologie">Méthodologie</a>.
      </p>
      {datasets.map((ds, i) => (
        <Reveal key={ds.id} delayMs={i * 80}>
          <ChartForDataset ds={ds} />
        </Reveal>
      ))}
    </div>
  );
}
