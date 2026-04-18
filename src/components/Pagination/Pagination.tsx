import type { HTMLAttributes } from "react";

export interface PaginationItem {
  number: number;
  href?: string;
  current?: boolean;
  ellipsis?: boolean;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  previous?: { href: string; label?: string };
  next?: { href: string; label?: string };
  items?: PaginationItem[];
  label?: string;
}

export function Pagination({ previous, next, items = [], label = "Pagination", className = "", ...props }: PaginationProps) {
  const classes = ["govuk-pagination", className].filter(Boolean).join(" ");
  return (
    <nav className={classes} aria-label={label} {...props}>
      {previous ? (
        <div className="govuk-pagination__prev">
          <a className="govuk-link govuk-pagination__link" href={previous.href} rel="prev">
            <span className="govuk-pagination__link-title">Previous</span>
            {previous.label ? <span className="govuk-visually-hidden"> page</span> : null}
            {previous.label ? <span className="govuk-pagination__link-label">{previous.label}</span> : null}
          </a>
        </div>
      ) : null}
      {items.length ? (
        <ul className="govuk-pagination__list">
          {items.map((item, index) => (
            <li key={index} className={`govuk-pagination__item${item.current ? " govuk-pagination__item--current" : ""}`}>
              {item.ellipsis ? (
                <span className="govuk-pagination__link govuk-pagination__link--ellipses">&ctdot;</span>
              ) : item.href ? (
                <a className="govuk-link govuk-pagination__link" href={item.href} aria-current={item.current ? "page" : undefined}>{item.number}</a>
              ) : (
                <span className="govuk-pagination__link" aria-current={item.current ? "page" : undefined}>{item.number}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {next ? (
        <div className="govuk-pagination__next">
          <a className="govuk-link govuk-pagination__link" href={next.href} rel="next">
            <span className="govuk-pagination__link-title">Next</span>
            {next.label ? <span className="govuk-visually-hidden"> page</span> : null}
            {next.label ? <span className="govuk-pagination__link-label">{next.label}</span> : null}
          </a>
        </div>
      ) : null}
    </nav>
  );
}
