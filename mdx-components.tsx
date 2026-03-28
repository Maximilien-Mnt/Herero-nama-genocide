import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => {
      const h = href ?? "";
      if (h.startsWith("/")) {
        return (
          <Link href={h} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={h} rel="noopener noreferrer" target="_blank" {...props}>
          {children}
        </a>
      );
    },
  };
}
