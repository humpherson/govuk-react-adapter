import type { DetailsHTMLAttributes, ReactNode } from "react";

export interface DetailsProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "children"> {
  summary: ReactNode;
  children: ReactNode;
}

export function Details({ summary, children, className = "", ...props }: DetailsProps) {
  const classes = ["govuk-details", className].filter(Boolean).join(" ");
  return (
    <details className={classes} data-module="govuk-details" {...props}>
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
}
