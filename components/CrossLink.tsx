// components/CrossLink.tsx
import Link from "next/link";

export function CrossLinkTag({
  href,
  icon,
  label,
  sectionId, // kept for potential future use, but no longer displayed
}: {
  href: string;
  icon: string;
  label: string;
  sectionId?: string;
}) {
  return (
    <Link href={href} className="crosslink-tag">
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}