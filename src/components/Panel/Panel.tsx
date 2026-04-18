import type { HTMLAttributes, ReactNode } from "react";

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  children?: ReactNode;
}

export function Panel({ title, children, className = "", ...props }: PanelProps) {
  const classes = ["govuk-panel", "govuk-panel--confirmation", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      <h1 className="govuk-panel__title">{title}</h1>
      {children ? <div className="govuk-panel__body">{children}</div> : null}
    </div>
  );
}
