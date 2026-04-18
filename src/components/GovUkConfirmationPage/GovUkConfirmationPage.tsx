import type { ReactNode } from "react";
import {
  GovUkPageTemplate,
  type GovUkPageTemplateProps,
} from "../GovUkPageTemplate";

export interface GovUkConfirmationPageProps {
  title: ReactNode;
  referenceNumber?: ReactNode;
  body?: ReactNode;
  nextSteps?: ReactNode;
  children?: ReactNode;
  pageTemplateProps?: Omit<
    Partial<GovUkPageTemplateProps>,
    "children" | "pageTitle"
  >;
}

export function GovUkConfirmationPage({
  title,
  referenceNumber,
  body,
  nextSteps,
  children,
  pageTemplateProps,
}: GovUkConfirmationPageProps) {
  return (
    <GovUkPageTemplate {...pageTemplateProps}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-panel govuk-panel--confirmation">
            <h1 className="govuk-panel__title">{title}</h1>

            {referenceNumber ? (
              <div className="govuk-panel__body">
                Your reference number
                <br />
                <strong>{referenceNumber}</strong>
              </div>
            ) : null}
          </div>

          {body ? <div className="govuk-body">{body}</div> : null}

          {nextSteps ? (
            <>
              <h2 className="govuk-heading-m">What happens next</h2>
              <div className="govuk-body">{nextSteps}</div>
            </>
          ) : null}

          {children ? (
            <div className="govuk-!-margin-top-6">{children}</div>
          ) : null}
        </div>
      </div>
    </GovUkPageTemplate>
  );
}
