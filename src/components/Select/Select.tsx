import type { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

export interface SelectItem {
  value: string;
  text: string;
  disabled?: boolean;
  selected?: boolean;
  attributes?: Omit<OptionHTMLAttributes<HTMLOptionElement>, "value" | "disabled" | "selected">;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  items: SelectItem[];
}

export function Select({ id, name, label, hint, error, items, className = "", ...props }: SelectProps) {
  const formGroupClasses = ["govuk-form-group", error ? "govuk-form-group--error" : ""].filter(Boolean).join(" ");
  const selectClasses = ["govuk-select", error ? "govuk-select--error" : "", className].filter(Boolean).join(" ");
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {hint ? <div id={`${id}-hint`} className="govuk-hint">{hint}</div> : null}
      {error ? <p id={`${id}-error`} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span> {error}</p> : null}
      <select id={id} name={name} className={selectClasses} aria-describedby={describedBy} {...props}>
        {items.map((item, index) => (
          <option key={`${item.value}-${index}`} value={item.value} disabled={item.disabled} selected={item.selected} {...item.attributes}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}
