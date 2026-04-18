import type { ReactNode } from "react";

export interface ErrorSummaryItem {
  href: string;
  text: ReactNode;
}

export interface ErrorSummaryProps {
  title?: ReactNode;
  description?: ReactNode;
  errors: ErrorSummaryItem[];
}

export function ErrorSummary({
  title = "There is a problem",
  description,
  errors,
}: ErrorSummaryProps) {
  if (!errors.length) {
    return null;
  }

  return (
    <div
      className="govuk-error-summary"
      data-module="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
    >
      <div className="govuk-error-summary__body">
        <h2 className="govuk-error-summary__title" id="error-summary-title">
          {title}
        </h2>

        {description ? <p className="govuk-body">{description}</p> : null}

        <ul className="govuk-list govuk-error-summary__list">
          {errors.map((error, index) => (
            <li key={index}>
              <a href={error.href}>{error.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
