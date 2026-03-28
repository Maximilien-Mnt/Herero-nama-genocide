import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Camps et exile",
  description: "Refoulement, camps côtiers, ordre de von Trotha, sensibilité des sources visuelles.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Camps et exile" },
        ]}
      />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Guerre, ordres de refoulement et camps</h1>
      <Chapter />
    </>
  );
}
