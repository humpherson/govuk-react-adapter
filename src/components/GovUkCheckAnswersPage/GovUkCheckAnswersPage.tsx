import type { FormHTMLAttributes, ReactNode } from "react";
import {
  GovUkPageTemplate,
  type GovUkPageTemplateProps,
} from "../GovUkPageTemplate";
import { BackLink } from "../BackLink";
import { Button, ButtonGroup } from "../Button";
import {
  SummaryList,
  type SummaryListCard,
  type SummaryListRow,
} from "../SummaryList";

export interface GovUkCheckAnswersSection {
  title?: ReactNode;
  rows: SummaryListRow[];
  summaryListClassName?: string;
  noBorder?: boolean;
  card?: SummaryListCard;
}

export interface GovUkCheckAnswersSecondaryAction {
  text: ReactNode;
  href: string;
}

export interface GovUkCheckAnswersPageProps {
  title: ReactNode;
  intro?: ReactNode;

  backLinkHref?: string;
  backLinkText?: ReactNode;

  sections: GovUkCheckAnswersSection[];

  submitHeading?: ReactNode;
  submitHint?: ReactNode;

  primaryActionText?: ReactNode;
  primaryActionType?: "submit" | "button" | "reset";
  primaryActionDisabled?: boolean;

  secondaryActions?: GovUkCheckAnswersSecondaryAction[];

  formProps?: Omit<FormHTMLAttributes<HTMLFormElement>, "children">;

  pageTemplateProps?: Omit<
    Partial<GovUkPageTemplateProps>,
    "children" | "pageTitle" | "containerStart"
  >;
}

export function GovUkCheckAnswersPage({
  title,
  intro,
  backLinkHref,
  backLinkText = "Back",
  sections,
  submitHeading = "Now send your application",
  submitHint,
  primaryActionText = "Accept and send",
  primaryActionType = "submit",
  primaryActionDisabled = false,
  secondaryActions = [],
  formProps,
  pageTemplateProps,
}: GovUkCheckAnswersPageProps) {
  const { className, ...restFormProps } = formProps ?? {};

  return (
    <GovUkPageTemplate
      containerStart={
        backLinkHref ? (
          <BackLink href={backLinkHref}>{backLinkText}</BackLink>
        ) : undefined
      }
      {...pageTemplateProps}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h1 className="govuk-heading-l">{title}</h1>

          {intro ? <div className="govuk-body">{intro}</div> : null}

          {sections.map((section, index) => {
            const summaryListClasses = [
              "govuk-!-margin-bottom-9",
              section.summaryListClassName,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={index}>
                {section.title ? (
                  <h2 className="govuk-heading-m">{section.title}</h2>
                ) : null}

                <SummaryList
                  rows={section.rows}
                  noBorder={section.noBorder}
                  card={section.card}
                  className={summaryListClasses}
                />
              </div>
            );
          })}

          <form noValidate {...restFormProps} className={className}>
            {submitHeading ? (
              <h2 className="govuk-heading-m">{submitHeading}</h2>
            ) : null}

            {submitHint ? <div className="govuk-body">{submitHint}</div> : null}

            {secondaryActions.length > 0 ? (
              <ButtonGroup>
                <Button
                  type={primaryActionType}
                  disabled={primaryActionDisabled}
                >
                  {primaryActionText}
                </Button>

                {secondaryActions.map((action, index) => (
                  <a key={index} href={action.href} className="govuk-link">
                    {action.text}
                  </a>
                ))}
              </ButtonGroup>
            ) : (
              <Button type={primaryActionType} disabled={primaryActionDisabled}>
                {primaryActionText}
              </Button>
            )}
          </form>
        </div>
      </div>
    </GovUkPageTemplate>
  );
}
