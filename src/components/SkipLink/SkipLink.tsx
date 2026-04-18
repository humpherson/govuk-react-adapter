import type { AnchorHTMLAttributes } from "react";

export interface SkipLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  children?: string;
}

export function SkipLink({ href, children = "Skip to main content", className = "", ...props }: SkipLinkProps) {
  const classes = ["govuk-skip-link", className].filter(Boolean).join(" ");
  return (
    <a href={href} className={classes} data-module="govuk-skip-link" {...props}>
      {children}
    </a>
  );
}
