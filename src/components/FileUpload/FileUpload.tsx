import type { InputHTMLAttributes } from "react";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
}

export function FileUpload({ id, name, label, hint, error, className = "", ...props }: FileUploadProps) {
  const formGroupClasses = ["govuk-form-group", error ? "govuk-form-group--error" : ""].filter(Boolean).join(" ");
  const inputClasses = ["govuk-file-upload", error ? "govuk-file-upload--error" : "", className].filter(Boolean).join(" ");
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {hint ? <div id={`${id}-hint`} className="govuk-hint">{hint}</div> : null}
      {error ? <p id={`${id}-error`} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {error}</p> : null}
      <input id={id} name={name} type="file" className={inputClasses} aria-describedby={describedBy} {...props} />
    </div>
  );
}
