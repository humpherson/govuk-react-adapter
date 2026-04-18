import type { ReactNode } from "react";
import { GovUkHeader, type GovUkHeaderProps } from "../GovUkHeader";
import {
  GovUkServiceNavigation,
  type GovUkServiceNavigationProps,
  type ServiceNavigationItem,
} from "../GovUkServiceNavigation";
import { GovUkFooter, type GovUkFooterProps } from "../GovUkFooter";

export interface GovUkPageTemplateProps {
  children: ReactNode;
  pageTitle?: ReactNode;
  containerStart?: ReactNode;
  mainId?: string;

  homepageUrl?: string;
  serviceName?: ReactNode;
  serviceUrl?: string;
  serviceNavigationLabel?: string;
  navigationItems?: ServiceNavigationItem[];

  headerProps?: GovUkHeaderProps;
  serviceNavigationProps?: Partial<GovUkServiceNavigationProps>;
  footerProps?: GovUkFooterProps;
}

export function GovUkPageTemplate({
  children,
  pageTitle,
  containerStart,
  mainId = "main-content",

  homepageUrl = "https://www.gov.uk",
  serviceName,
  serviceUrl = "/",
  serviceNavigationLabel = "Service information",
  navigationItems = [],

  headerProps,
  serviceNavigationProps,
  footerProps,
}: GovUkPageTemplateProps) {
  const resolvedHeaderProps: GovUkHeaderProps = {
    homepageUrl,
    ...headerProps,
  };

  const shouldShowServiceNavigation =
    Boolean(serviceName) || Boolean(serviceNavigationProps?.serviceName);

  const resolvedServiceNavigationProps: GovUkServiceNavigationProps | null =
    shouldShowServiceNavigation
      ? {
          serviceName: serviceNavigationProps?.serviceName ?? serviceName ?? "",
          serviceUrl: serviceNavigationProps?.serviceUrl ?? serviceUrl,
          navigationItems:
            serviceNavigationProps?.navigationItems ?? navigationItems,
          ariaLabel:
            serviceNavigationProps?.ariaLabel ?? serviceNavigationLabel,
        }
      : null;

  return (
    <>
      <a href={`#${mainId}`} className="govuk-skip-link">
        Skip to main content
      </a>

      <GovUkHeader {...resolvedHeaderProps} />

      {resolvedServiceNavigationProps ? (
        <GovUkServiceNavigation {...resolvedServiceNavigationProps} />
      ) : null}

      <div className="govuk-width-container">
        {containerStart}
        <main className="govuk-main-wrapper" id={mainId} role="main">
          {pageTitle ? <h1 className="govuk-heading-l">{pageTitle}</h1> : null}
          {children}
        </main>
      </div>

      <GovUkFooter {...footerProps} />
    </>
  );
}
