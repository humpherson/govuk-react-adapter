import type { InputHTMLAttributes } from "react";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  buttonText?: string;
}

export function PasswordInput({ id, name, label, hint, error, buttonText = "Show", className = "", ...props }: PasswordInputProps) {
  const formGroupClasses = ["govuk-form-group", error ? "govuk-form-group--error" : ""].filter(Boolean).join(" ");
  const wrapperClasses = ["govuk-password-input", className].filter(Boolean).join(" ");
  const inputClasses = ["govuk-input", error ? "govuk-input--error" : ""].filter(Boolean).join(" ");
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {hint ? <div id={`${id}-hint`} className="govuk-hint">{hint}</div> : null}
      {error ? <p id={`${id}-error`} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {error}</p> : null}
      <div className={wrapperClasses} data-module="govuk-password-input">
        <div className="govuk-input__wrapper govuk-password-input__wrapper">
          <input id={id} name={name} type="password" className={inputClasses} spellCheck={false} autoCapitalize="none" autoCorrect="off" aria-describedby={describedBy} {...props} />
          <button className="govuk-button govuk-button--secondary govuk-password-input__toggle" data-module="govuk-button" type="button" aria-controls={id} aria-label={`${buttonText} password`} hidden>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
