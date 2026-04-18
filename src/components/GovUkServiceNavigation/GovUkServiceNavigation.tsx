import type { ReactNode } from "react";

export interface ServiceNavigationItem {
  href: string;
  text: ReactNode;
  active?: boolean;
}

export interface GovUkServiceNavigationProps {
  serviceName: ReactNode;
  serviceUrl?: string;
  navigationItems?: ServiceNavigationItem[];
  ariaLabel?: string;
}

export function GovUkServiceNavigation({
  serviceName,
  serviceUrl = "/",
  navigationItems = [],
  ariaLabel = "Service information",
}: GovUkServiceNavigationProps) {
  return (
    <section
      className="govuk-service-navigation"
      aria-label={ariaLabel}
      data-module="govuk-service-navigation"
    >
      <div className="govuk-width-container">
        <div className="govuk-service-navigation__container">
          <span className="govuk-service-navigation__service-name">
            <a className="govuk-service-navigation__link" href={serviceUrl}>
              {serviceName}
            </a>
          </span>

          {navigationItems.length > 0 ? (
            <nav
              className="govuk-service-navigation__wrapper"
              aria-label="Menu"
            >
              <ul className="govuk-service-navigation__list">
                {navigationItems.map((item) => {
                  const key =
                    typeof item.text === "string"
                      ? `${item.href}-${item.text}`
                      : item.href;

                  return (
                    <li
                      key={key}
                      className={`govuk-service-navigation__item${
                        item.active
                          ? " govuk-service-navigation__item--active"
                          : ""
                      }`}
                    >
                      <a
                        className="govuk-service-navigation__link"
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                      >
                        {item.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}
