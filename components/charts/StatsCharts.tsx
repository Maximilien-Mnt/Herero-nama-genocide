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
import { getEventById } from "@/lib/content";
import { CrossLinkTag } from "@/components/CrossLink";
import { Reveal } from "@/components/Reveal";

// Custom tooltip with clear formatting and unit display
const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0]?.value;
  const formattedValue = value !== undefined && value !== null
    ? (typeof value === 'number' ? value.toLocaleString() : value)
    : '—';
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: "0.5rem 0.75rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontSize: "0.85rem",
        lineHeight: 1.4,
        color: "var(--text-primary)",
      }}
    >
      <strong style={{ display: "block", marginBottom: "0.25rem" }}>{label}</strong>
      <span style={{ color: "var(--accent-gold)" }}>
        {formattedValue} {unit ? unit : ""}
      </span>
    </div>
  );
};

function ChartForDataset({ ds }: { ds: Dataset }) {
  const unitLabel = ds.unit ?? "valeur";
  const legendName = ds.legendName ?? unitLabel;

  const commonFooter = (
    <div style={{ marginTop: "0.75rem" }}>
      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
        <strong style={{ color: "var(--text-primary)" }}>Source :</strong> {ds.sourceCitation}
      </div>
      {ds.notes && (
        <div style={{ marginTop: "0.35rem", fontSize: "0.875rem", color: "var(--text-body)" }}>
          <strong style={{ color: "var(--text-primary)" }}>Note :</strong> {ds.notes}
        </div>
      )}
    </div>
  );

  const crosslinks = ds.relatedEventIds.length > 0 && (
    <div className="crosslink-tags" aria-label="Liens croisés vers la chronologie">
      {ds.relatedEventIds.map((id) => {
        const ev = getEventById(id);
        if (!ev) return null;
        return (
          <CrossLinkTag key={id} href={`/chronologie#${id}`} icon="📅" label={ev.title} sectionId={id} />
        );
      })}
    </div>
  );

  const chartProps = {
    margin: { top: 10, right: 10, left: 0, bottom: 5 },
  };

  if (ds.chartType === "bar") {
    return (
      <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
        <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500 }}>
          {ds.title}
        </h3>
        <div style={{ width: "100%", minWidth: 0, height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ds.points} {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#7D6E5D", fontSize: 11 }}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <Tooltip
                content={<CustomTooltip unit={unitLabel} />}
                cursor={{ fill: "rgba(185, 147, 90, 0.1)" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                formatter={() => legendName}
              />
              <Bar
                dataKey="value"
                fill="#4D6B58"
                name={legendName}
                animationDuration={800}
                animationEasing="ease-out"
                radius={[4, 4, 0, 0]}
                // Subtle hover feedback
                onMouseEnter={(e) => (e.target.style.filter = "brightness(1.2)")}
                onMouseLeave={(e) => (e.target.style.filter = "brightness(1)")}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {commonFooter}
        {crosslinks}
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
            <AreaChart data={ds.points} {...chartProps}>
              <defs>
                <linearGradient id={`g-${ds.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B8935A" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#B8935A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
              <XAxis dataKey="label" tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip unit={unitLabel} />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#B8935A"
                fillOpacity={1}
                fill={`url(#g-${ds.id})`}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {commonFooter}
        {crosslinks}
      </div>
    );
  }

  // Default: LineChart
  return (
    <div className="card" style={{ marginBottom: "1.5rem" }} id={ds.id}>
      <h3 style={{ marginTop: 0, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500 }}>
        {ds.title}
      </h3>
      <div style={{ width: "100%", minWidth: 0, height: 280 }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={ds.points} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3D342A" />
            <XAxis dataKey="label" tick={{ fill: "#7D6E5D", fontSize: 11 }} />
            <YAxis tick={{ fill: "#7D6E5D", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip unit={unitLabel} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#B8935A"
              strokeWidth={2}
              dot={{ fill: "#B8935A", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#D4A96A", stroke: "var(--bg-surface)" }}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {commonFooter}
      {crosslinks}
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