import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  rows?: number;
}

export function Textarea({ id, name, label, hint, error, rows = 5, className = "", ...props }: TextareaProps) {
  const formGroupClasses = ["govuk-form-group", error ? "govuk-form-group--error" : ""].filter(Boolean).join(" ");
  const textareaClasses = ["govuk-textarea", error ? "govuk-textarea--error" : "", className].filter(Boolean).join(" ");
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {hint ? <div id={`${id}-hint`} className="govuk-hint">{hint}</div> : null}
      {error ? <p id={`${id}-error`} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {error}</p> : null}
      <textarea id={id} name={name} rows={rows} className={textareaClasses} aria-describedby={describedBy} {...props} />
    </div>
  );
}
