import type { ChangeEvent, TextareaHTMLAttributes } from "react";

export interface CharacterCountProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children" | "onChange"> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  maxWords?: number;
  value?: string;
  rows?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function CharacterCount({
  id,
  name,
  label,
  hint,
  error,
  maxLength,
  maxWords,
  className = "",
  value,
  rows = 5,
  onChange,
  ...props
}: CharacterCountProps) {
  const formGroupClasses = ["govuk-form-group", error ? "govuk-form-group--error" : ""].filter(Boolean).join(" ");
  const textareaClasses = ["govuk-textarea", "govuk-js-character-count", error ? "govuk-textarea--error" : "", className].filter(Boolean).join(" ");
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null, `${id}-info`].filter(Boolean).join(" ");
  const message = maxWords ? `You can enter up to ${maxWords} words` : `You can enter up to ${maxLength ?? 0} characters`;

  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {hint ? <div id={`${id}-hint`} className="govuk-hint">{hint}</div> : null}
      {error ? <p id={`${id}-error`} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {error}</p> : null}
      <div className="govuk-character-count" data-module="govuk-character-count" data-maxlength={maxLength} data-maxwords={maxWords}>
        <textarea
          className={textareaClasses}
          id={id}
          name={name}
          rows={rows}
          aria-describedby={describedBy}
          value={value}
          onChange={onChange}
          {...props}
        />
        <div id={`${id}-info`} className="govuk-hint govuk-character-count__message">{message}</div>
      </div>
    </div>
  );
}
