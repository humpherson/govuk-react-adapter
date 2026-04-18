import type { HTMLAttributes, ReactNode } from "react";

export interface ErrorMessageProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  children: ReactNode;
}

export function ErrorMessage({ children, className = "", ...props }: ErrorMessageProps) {
  const classes = ["govuk-error-message", className].filter(Boolean).join(" ");
  return (
    <p className={classes} {...props}>
      <span className="govuk-visually-hidden">Error:</span> {children}
    </p>
  );
}
