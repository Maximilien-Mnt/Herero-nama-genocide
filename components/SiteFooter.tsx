import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: "3rem",
        padding: "2rem 1.25rem",
        color: "var(--muted)",
        fontSize: "0.9rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0 }}>
          Projet pédagogique : génocide des Héréros et des Namas (1904–1908).{" "}
          <Link href="/citer">Comment citer</Link>
        </p>
        <p style={{ margin: 0 }}>À usage éducatif — voir mentions légales des médias utilisés.</p>
      </div>
    </footer>
  );
}
