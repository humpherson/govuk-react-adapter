import type { AnchorHTMLAttributes } from "react";

export interface BackLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function BackLink({
  href,
  className = "",
  children,
  ...props
}: BackLinkProps) {
  const classes = ["govuk-back-link", className].filter(Boolean).join(" ");

  return (
    <a href={href} className={classes} {...props}>
      {children ?? "Back"}
    </a>
  );
}
