import type { InputHTMLAttributes, ReactNode } from "react";

type WidthClass =
  | "govuk-input--width-2"
  | "govuk-input--width-3"
  | "govuk-input--width-4"
  | "govuk-input--width-5"
  | "govuk-input--width-10"
  | "govuk-input--width-20"
  | "govuk-input--width-30";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  widthClass?: WidthClass;
  labelClassName?: string;
}

export function TextInput({
  id,
  name,
  label,
  hint,
  error,
  widthClass,
  labelClassName = "",
  className = "",
  type = "text",
  ...props
}: TextInputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const inputClasses = [
    "govuk-input",
    widthClass,
    error ? "govuk-input--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedLabelClassName = ["govuk-label", labelClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`govuk-form-group${error ? " govuk-form-group--error" : ""}`}
    >
      <label className={resolvedLabelClassName} htmlFor={id}>
        {label}
      </label>

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

      <input
        id={id}
        name={name}
        type={type}
        className={inputClasses}
        aria-describedby={describedBy}
        {...props}
      />
    </div>
  );
}
