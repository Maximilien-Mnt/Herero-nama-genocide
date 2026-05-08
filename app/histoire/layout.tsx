// app/histoire/layout.tsx
import { PageShell } from "@/components/PageShell";

export default function HistoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}