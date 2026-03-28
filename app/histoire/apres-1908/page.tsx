import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Après 1908",
  description: "Héritages coloniaux, mémoires fragmentées, recompositions politiques.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Après 1908" },
        ]}
      />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Après 1908 : héritages de l’ordre colonial</h1>
      <Chapter />
    </>
  );
}
