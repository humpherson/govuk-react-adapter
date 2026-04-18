import type { HTMLAttributes } from "react";

export interface BreadcrumbItem {
  text: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  collapseOnMobile?: boolean;
  label?: string;
}

export function Breadcrumbs({ items, collapseOnMobile = false, label = "Breadcrumb", className = "", ...props }: BreadcrumbsProps) {
  const classes = ["govuk-breadcrumbs", collapseOnMobile ? "govuk-breadcrumbs--collapse-on-mobile" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label={label} {...props}>
      <ol className="govuk-breadcrumbs__list">
        {items.map((item, index) => (
          <li key={`${item.text}-${index}`} className="govuk-breadcrumbs__list-item">
            {item.href && !item.current ? (
              <a className="govuk-breadcrumbs__link" href={item.href}>
                {item.text}
              </a>
            ) : (
              <span aria-current={item.current ? "page" : undefined}>{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
