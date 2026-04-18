import type { HTMLAttributes, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  panel: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title?: string;
  items: TabItem[];
}

export function Tabs({ title = "Contents", items, className = "", ...props }: TabsProps) {
  const classes = ["govuk-tabs", className].filter(Boolean).join(" ");
  return (
    <div className={classes} data-module="govuk-tabs" {...props}>
      <h2 className="govuk-tabs__title">{title}</h2>
      <ul className="govuk-tabs__list">
        {items.map((item, index) => (
          <li key={item.id} className={`govuk-tabs__list-item${index === 0 ? " govuk-tabs__list-item--selected" : ""}`}>
            <a className="govuk-tabs__tab" href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
      {items.map((item, index) => (
        <div key={item.id} className="govuk-tabs__panel" id={item.id} hidden={index !== 0}>
          {item.panel}
        </div>
      ))}
    </div>
  );
}
