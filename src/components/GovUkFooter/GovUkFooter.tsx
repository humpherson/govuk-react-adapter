import type { ReactNode } from "react";
import { GovUkFooterCrown } from "./GovUkFooterCrown";
import { GovUkFooterLicenceLogo } from "./GovUkFooterLicenceLogo";

export interface GovUkFooterLinkItem {
  text: ReactNode;
  href: string;
}

export interface GovUkFooterNavigationSection {
  title: ReactNode;
  items: GovUkFooterLinkItem[];
  columns?: number;
  width?: "full" | "one-half" | "one-third" | "two-thirds";
}

export interface GovUkFooterMeta {
  visuallyHiddenTitle?: string;
  items?: GovUkFooterLinkItem[];
  text?: ReactNode;
}

export interface GovUkFooterProps {
  navigation?: GovUkFooterNavigationSection[];
  meta?: GovUkFooterMeta;
  showDefaultLicence?: boolean;
  licenceText?: ReactNode;
  licenceUrl?: string;
  showDefaultCopyright?: boolean;
  copyrightText?: ReactNode;
  copyrightUrl?: string;
  className?: string;
  containerClassName?: string;
}

function getNavigationWidthClass(width: GovUkFooterNavigationSection["width"]) {
  switch (width) {
    case "one-half":
      return "govuk-grid-column-one-half";
    case "one-third":
      return "govuk-grid-column-one-third";
    case "two-thirds":
      return "govuk-grid-column-two-thirds";
    case "full":
    default:
      return "govuk-grid-column-full";
  }
}

export function GovUkFooter({
  navigation = [],
  meta,
  showDefaultLicence = true,
  licenceText,
  licenceUrl = "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  showDefaultCopyright = true,
  copyrightText = "© Crown copyright",
  copyrightUrl = "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",
  className = "",
  containerClassName = "",
}: GovUkFooterProps) {
  const footerClasses = ["govuk-footer", className].filter(Boolean).join(" ");
  const containerClasses = ["govuk-width-container", containerClassName]
    .filter(Boolean)
    .join(" ");

  const hasNavigation = navigation.length > 0;
  const hasMetaItems = Boolean(meta?.items?.length);
  const hasMetaText = Boolean(meta?.text);
  const showMetaBlock =
    hasMetaItems || hasMetaText || showDefaultLicence || showDefaultCopyright;

  return (
    <footer className={footerClasses}>
      <div className={containerClasses}>
        <GovUkFooterCrown />

        {hasNavigation ? (
          <>
            <div className="govuk-grid-row">
              {navigation.map((section, index) => (
                <div
                  key={index}
                  className={getNavigationWidthClass(section.width)}
                >
                  <div className="govuk-footer__section">
                    <h2 className="govuk-footer__heading govuk-heading-m">
                      {section.title}
                    </h2>

                    <ul
                      className={`govuk-footer__list${
                        section.columns
                          ? ` govuk-footer__list--columns-${section.columns}`
                          : ""
                      }`}
                    >
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="govuk-footer__list-item">
                          <a className="govuk-footer__link" href={item.href}>
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <hr className="govuk-footer__section-break" />
          </>
        ) : null}

        {showMetaBlock ? (
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
              {hasMetaItems ? (
                <>
                  <h2 className="govuk-visually-hidden">
                    {meta?.visuallyHiddenTitle ?? "Support links"}
                  </h2>

                  <ul className="govuk-footer__inline-list">
                    {meta?.items?.map((item, index) => (
                      <li
                        key={index}
                        className="govuk-footer__inline-list-item"
                      >
                        <a className="govuk-footer__link" href={item.href}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {hasMetaText ? (
                <div className="govuk-footer__meta-custom">{meta?.text}</div>
              ) : null}

              {showDefaultLicence ? (
                <>
                  <GovUkFooterLicenceLogo />

                  <span className="govuk-footer__licence-description">
                    {licenceText ?? (
                      <>
                        All content is available under the{" "}
                        <a
                          className="govuk-footer__link"
                          href={licenceUrl}
                          rel="license"
                        >
                          Open Government Licence v3.0
                        </a>
                        , except where otherwise stated
                      </>
                    )}
                  </span>
                </>
              ) : null}
            </div>

            {showDefaultCopyright ? (
              <div className="govuk-footer__meta-item">
                <a
                  className="govuk-footer__link govuk-footer__copyright-logo"
                  href={copyrightUrl}
                >
                  {copyrightText}
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
