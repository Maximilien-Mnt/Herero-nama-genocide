import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Contexte colonial",
  description: "Colonisation allemande, sociétés héréro et nama, tensions pré-1904.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Contexte colonial" },
        ]}
      />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Contexte colonial et sociétés du Sud-Ouest africain</h1>
      <Chapter />
    </>
  );
}
