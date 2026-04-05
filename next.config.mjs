// Configure Next.js pour reconnaître les extensions .md et .mdx.
// La configuration des images est assez permissive (dangerouslyAllowSVG: true) et inclut des politiques de sécurité de contenu.
// Cela indique que le projet pourrait afficher des SVG ou des images provenant de sources variées.

import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
