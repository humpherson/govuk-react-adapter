import type { AnchorHTMLAttributes } from "react";

export interface ExitThisPageProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  text?: string;
}

export function ExitThisPage({ href, text = "Emergency", className = "", ...props }: ExitThisPageProps) {
  const classes = ["govuk-exit-this-page", className].filter(Boolean).join(" ");
  return (
    <a href={href} className={classes} rel="nofollow noreferrer" data-module="govuk-exit-this-page" {...props}>
      <span className="govuk-visually-hidden">Emergency</span>
      <span className="govuk-exit-this-page__icon" aria-hidden="true"></span>
      <strong className="govuk-exit-this-page__text">{text}</strong>
    </a>
  );
}
