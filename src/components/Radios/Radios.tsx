import type { InputHTMLAttributes, ReactNode } from "react";
import { Fieldset, type FieldsetLegendSize } from "../Fieldset";

type RadioInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value" | "checked" | "defaultChecked" | "children"
>;

export interface RadiosItem {
  value?: string;
  text?: ReactNode;
  html?: ReactNode;
  id?: string;
  hint?: ReactNode;
  divider?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  conditional?: ReactNode;
  attributes?: RadioInputAttributes;
  labelClassName?: string;
  hintClassName?: string;
}

export interface RadiosProps {
  idPrefix?: string;
  name: string;
  legend: ReactNode;
  items: RadiosItem[];

  hint?: ReactNode;
  error?: ReactNode;
  caption?: ReactNode;

  legendSize?: FieldsetLegendSize;
  isPageHeading?: boolean;

  value?: string;
  inline?: boolean;
  small?: boolean;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function getItemId(idPrefix: string, index: number, item?: RadiosItem) {
  if (item?.id) return item.id;
  return index === 0 ? idPrefix : `${idPrefix}-${index + 1}`;
}

export function Radios({
  idPrefix,
  name,
  legend,
  items,
  hint,
  error,
  caption,
  legendSize = "l",
  isPageHeading = false,
  value,
  inline = false,
  small = false,
  onChange,
}: RadiosProps) {
  const resolvedIdPrefix = idPrefix ?? name;

  const radiosClasses = [
    "govuk-radios",
    inline ? "govuk-radios--inline" : "",
    small ? "govuk-radios--small" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Fieldset
      id={resolvedIdPrefix}
      legend={legend}
      hint={hint}
      error={error}
      caption={caption}
      legendSize={legendSize}
      isPageHeading={isPageHeading}
    >
      <div className={radiosClasses}>
        {items.map((item, index) => {
          if (item.divider !== undefined) {
            return (
              <div className="govuk-radios__divider" key={`divider-${index}`}>
                {item.divider}
              </div>
            );
          }

          const itemId = getItemId(resolvedIdPrefix, index, item);
          const itemHintId = item.hint ? `${itemId}-item-hint` : undefined;
          const conditionalId = item.conditional
            ? `conditional-${itemId}`
            : undefined;

          const describedBy =
            [itemHintId].filter(Boolean).join(" ") || undefined;

          const checked =
            item.checked !== undefined
              ? item.checked
              : value !== undefined
              ? value === item.value
              : undefined;

          const {
            className: ignoredClassName,
            onChange: ignoredOnChange,
            ...restAttributes
          } = item.attributes ?? {};

          return (
            <div key={itemId}>
              <div className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id={itemId}
                  name={name}
                  type="radio"
                  value={item.value}
                  checked={checked}
                  disabled={item.disabled}
                  aria-describedby={describedBy}
                  data-aria-controls={conditionalId}
                  onChange={onChange}
                  {...restAttributes}
                />

                <label
                  className={[
                    "govuk-label",
                    "govuk-radios__label",
                    item.labelClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  htmlFor={itemId}
                >
                  {item.html !== undefined ? item.html : item.text}
                </label>

                {item.hint ? (
                  <div
                    id={itemHintId}
                    className={[
                      "govuk-hint",
                      "govuk-radios__hint",
                      item.hintClassName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.hint}
                  </div>
                ) : null}
              </div>

              {item.conditional ? (
                <div
                  className={[
                    "govuk-radios__conditional",
                    checked ? "" : "govuk-radios__conditional--hidden",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  id={conditionalId}
                >
                  {item.conditional}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Fieldset>
  );
}
