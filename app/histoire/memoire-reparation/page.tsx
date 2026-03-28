import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import Chapter from "./chapter.mdx";

export const metadata: Metadata = {
  title: "Mémoire et réparation",
  description: "Reconnaissance diplomatique, débats sur réparations et lecture critique des indicateurs.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/histoire", label: "Histoire" },
          { label: "Mémoire et réparation" },
        ]}
      />
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Mémoire, reconnaissance et débats internationaux</h1>
      <Chapter />
    </>
  );
}
