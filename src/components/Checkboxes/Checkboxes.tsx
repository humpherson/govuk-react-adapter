import type { InputHTMLAttributes, ReactNode } from "react";
import { Fieldset, type FieldsetLegendSize } from "../Fieldset";

type CheckboxInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value" | "checked" | "defaultChecked" | "children"
>;

export interface CheckboxesItem {
  value?: string;
  text?: ReactNode;
  html?: ReactNode;
  id?: string;
  hint?: ReactNode;
  divider?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  conditional?: ReactNode;
  exclusive?: boolean;
  attributes?: CheckboxInputAttributes;
  labelClassName?: string;
  hintClassName?: string;
}

export interface CheckboxesProps {
  idPrefix?: string;
  name: string;
  legend: ReactNode;
  items: CheckboxesItem[];

  hint?: ReactNode;
  error?: ReactNode;
  caption?: ReactNode;

  legendSize?: FieldsetLegendSize;
  isPageHeading?: boolean;

  values?: string[];
  small?: boolean;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function getItemId(idPrefix: string, index: number, item?: CheckboxesItem) {
  if (item?.id) return item.id;
  return index === 0 ? idPrefix : `${idPrefix}-${index + 1}`;
}

export function Checkboxes({
  idPrefix,
  name,
  legend,
  items,
  hint,
  error,
  caption,
  legendSize = "l",
  isPageHeading = false,
  values,
  small = false,
  onChange,
}: CheckboxesProps) {
  const resolvedIdPrefix = idPrefix ?? name;

  const checkboxesClasses = [
    "govuk-checkboxes",
    small ? "govuk-checkboxes--small" : "",
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
      <div className={checkboxesClasses} data-module="govuk-checkboxes">
        {items.map((item, index) => {
          if (item.divider !== undefined) {
            return (
              <div
                className="govuk-checkboxes__divider"
                key={`divider-${index}`}
              >
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
              : values !== undefined && item.value !== undefined
              ? values.includes(item.value)
              : undefined;

          const {
            className: ignoredClassName,
            onChange: ignoredOnChange,
            ...restAttributes
          } = item.attributes ?? {};

          return (
            <div key={itemId}>
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id={itemId}
                  name={name}
                  type="checkbox"
                  value={item.value}
                  checked={checked}
                  disabled={item.disabled}
                  aria-describedby={describedBy}
                  data-aria-controls={conditionalId}
                  data-behaviour={item.exclusive ? "exclusive" : undefined}
                  onChange={onChange}
                  {...restAttributes}
                />

                <label
                  className={[
                    "govuk-label",
                    "govuk-checkboxes__label",
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
                      "govuk-checkboxes__hint",
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
                    "govuk-checkboxes__conditional",
                    checked ? "" : "govuk-checkboxes__conditional--hidden",
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
