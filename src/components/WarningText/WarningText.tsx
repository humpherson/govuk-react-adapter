import type { HTMLAttributes, ReactNode } from "react";

export interface WarningTextProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  iconFallbackText?: string;
}

export function WarningText({
  children,
  iconFallbackText = "Warning",
  className = "",
  ...props
}: WarningTextProps) {
  const classes = ["govuk-warning-text", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>

      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{iconFallbackText}</span>
        {children}
      </strong>
    </div>
  );
}
