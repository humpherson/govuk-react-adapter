import type { InputHTMLAttributes, ReactNode } from "react";
import { Fieldset, type FieldsetLegendSize } from "../Fieldset";

interface DatePartProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: string;
}

export interface DateInputProps {
  id: string;
  namePrefix: string;
  legend: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  caption?: ReactNode;
  day?: DatePartProps;
  month?: DatePartProps;
  year?: DatePartProps;
  legendSize?: FieldsetLegendSize;
  isPageHeading?: boolean;
}

function getDateInputClasses(widthClass: string, hasError: boolean) {
  return [
    "govuk-input",
    "govuk-date-input__input",
    widthClass,
    hasError ? "govuk-input--error" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function DateInput({
  id,
  namePrefix,
  legend,
  hint,
  error,
  caption,
  day,
  month,
  year,
  legendSize = "l",
  isPageHeading = true,
}: DateInputProps) {
  return (
    <Fieldset
      id={id}
      legend={legend}
      hint={hint}
      error={error}
      caption={caption}
      legendSize={legendSize}
      isPageHeading={isPageHeading}
      role="group"
    >
      <div className="govuk-date-input" id={id}>
        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${id}-day`}
            >
              Day
            </label>
            <input
              className={getDateInputClasses(
                "govuk-input--width-2",
                Boolean(error)
              )}
              id={`${id}-day`}
              name={`${namePrefix}-day`}
              type="text"
              inputMode="numeric"
              {...day}
            />
          </div>
        </div>

        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${id}-month`}
            >
              Month
            </label>
            <input
              className={getDateInputClasses(
                "govuk-input--width-2",
                Boolean(error)
              )}
              id={`${id}-month`}
              name={`${namePrefix}-month`}
              type="text"
              inputMode="numeric"
              {...month}
            />
          </div>
        </div>

        <div className="govuk-date-input__item">
          <div className="govuk-form-group">
            <label
              className="govuk-label govuk-date-input__label"
              htmlFor={`${id}-year`}
            >
              Year
            </label>
            <input
              className={getDateInputClasses(
                "govuk-input--width-4",
                Boolean(error)
              )}
              id={`${id}-year`}
              name={`${namePrefix}-year`}
              type="text"
              inputMode="numeric"
              {...year}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
}
