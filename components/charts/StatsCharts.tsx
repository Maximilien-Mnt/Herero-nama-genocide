"use client";

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
import Link from "next/link";
import { getEventById } from "@/lib/content";

function ChartForDataset({ ds }: { ds: Dataset }) {
  const common = (
    <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
      <strong>Source :</strong> {ds.sourceCitation}
      {ds.notes ? (
        <>
          {" "}
          — <em>{ds.notes}</em>
        </>
      ) : null}
    </div>
  );

  const links = (
    <div style={{ fontSize: "0.8rem", marginTop: "0.35rem" }}>
      {ds.relatedEventIds.map((id) => {
        const ev = getEventById(id);
        if (!ev) return null;
        return (
          <span key={id} style={{ marginRight: "0.75rem" }}>
            <Link href={`/chronologie#${id}`}>{ev.title}</Link>
          </span>
        );
      })}
    </div>
  );

  if (ds.chartType === "bar") {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
        <h3 style={{ marginTop: 0 }}>{ds.title}</h3>
        <div style={{ width: "100%", minWidth: 0, height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ds.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="label" tick={{ fill: "#9aa3b2", fontSize: 11 }} />
              <YAxis tick={{ fill: "#9aa3b2", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#171b22", border: "1px solid #2a3140" }}
                labelStyle={{ color: "#e8eaef" }}
              />
              <Legend />
              <Bar dataKey="value" fill="#4f8cbf" name={ds.unit ?? "valeur"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {common}
        {links}
      </div>
    );
  }

  if (ds.chartType === "area") {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
        <h3 style={{ marginTop: 0 }}>{ds.title}</h3>
        <div style={{ width: "100%", minWidth: 0, height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ds.points}>
              <defs>
                <linearGradient id={`g-${ds.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a227" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#c9a227" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="label" tick={{ fill: "#9aa3b2", fontSize: 11 }} />
              <YAxis tick={{ fill: "#9aa3b2", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#171b22", border: "1px solid #2a3140" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#c9a227"
                fillOpacity={1}
                fill={`url(#g-${ds.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {common}
        {links}
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
      <h3 style={{ marginTop: 0 }}>{ds.title}</h3>
      <div style={{ width: "100%", minWidth: 0, height: 280 }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={ds.points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="label" tick={{ fill: "#9aa3b2", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9aa3b2", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#171b22", border: "1px solid #2a3140" }} />
            <Line type="monotone" dataKey="value" stroke="#4f8cbf" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {common}
      {links}
    </div>
  );
}

export function StatsCharts({ datasets }: { datasets: Dataset[] }) {
  return (
    <div>
      <p style={{ color: "var(--muted)", maxWidth: "44rem" }}>
        Les graphiques ci-dessous incluent des <strong>valeurs pédagogiques</strong> (placeholders) en
        attendant le tableau sourcé final. Chaque visuel cite une piste de référence : substituer par
        données validées par votre recherche (voir <Link href="/methodologie">Méthodologie</Link>).
      </p>
      {datasets.map((ds) => (
        <ChartForDataset key={ds.id} ds={ds} />
      ))}
    </div>
  );
}
