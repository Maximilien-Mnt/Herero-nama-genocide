import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Prélude et soulèvements",
  description: "1904 : escalade militaire, retrait forcé, débats de vocabulaire.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Prélude — 1904" },
        ]}
      />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Prélude : tensions et soulèvements de 1904</h1>
      <Chapter />
    </>
  );
}
