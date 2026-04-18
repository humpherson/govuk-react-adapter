import type { FieldsetHTMLAttributes, ReactNode } from "react";

export type FieldsetLegendSize = "s" | "m" | "l" | "xl";

export interface FieldsetProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "children"> {
  id: string;
  legend: ReactNode;
  children: ReactNode;

  hint?: ReactNode;
  error?: ReactNode;
  caption?: ReactNode;

  legendSize?: FieldsetLegendSize;
  isPageHeading?: boolean;

  formGroupClassName?: string;
  legendClassName?: string;
  captionClassName?: string;
}

export function Fieldset({
  id,
  legend,
  children,
  hint,
  error,
  caption,
  legendSize = "l",
  isPageHeading = false,
  formGroupClassName = "",
  legendClassName = "",
  captionClassName = "",
  className = "",
  ...props
}: FieldsetProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const formGroupClasses = [
    "govuk-form-group",
    error ? "govuk-form-group--error" : "",
    formGroupClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldsetClasses = ["govuk-fieldset", className]
    .filter(Boolean)
    .join(" ");

  const legendClasses = [
    "govuk-fieldset__legend",
    `govuk-fieldset__legend--${legendSize}`,
    legendClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedCaptionClassName = ["govuk-caption-l", captionClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={formGroupClasses}>
      <fieldset
        className={fieldsetClasses}
        aria-describedby={describedBy}
        {...props}
      >
        <legend className={legendClasses}>
          {caption ? (
            <span className={resolvedCaptionClassName}>{caption}</span>
          ) : null}

          {isPageHeading ? (
            <h1 className="govuk-fieldset__heading">{legend}</h1>
          ) : (
            <span className="govuk-fieldset__heading">{legend}</span>
          )}
        </legend>

        {hint ? (
          <div id={hintId} className="govuk-hint">
            {hint}
          </div>
        ) : null}

        {error ? (
          <p id={errorId} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        ) : null}

        {children}
      </fieldset>
    </div>
  );
}
