import type { FormHTMLAttributes, ReactNode } from "react";
import {
  GovUkPageTemplate,
  type GovUkPageTemplateProps,
} from "../GovUkPageTemplate";
import { BackLink } from "../BackLink";
import { ErrorSummary, type ErrorSummaryProps } from "../ErrorSummary";
import { Button, ButtonGroup } from "../Button";

export interface GovUkQuestionPageSecondaryAction {
  text: ReactNode;
  href: string;
}

type SharedQuestionPageProps = {
  caption?: ReactNode;
  backLinkHref?: string;
  backLinkText?: ReactNode;
  errorSummary?: ErrorSummaryProps;
  children: ReactNode;
  primaryActionText?: ReactNode;
  primaryActionType?: "submit" | "button" | "reset";
  primaryActionDisabled?: boolean;
  secondaryActions?: GovUkQuestionPageSecondaryAction[];
  formProps?: Omit<FormHTMLAttributes<HTMLFormElement>, "children">;
  pageTemplateProps?: Omit<
    Partial<GovUkPageTemplateProps>,
    "children" | "pageTitle" | "containerStart"
  >;
};

type PageHeadingModeProps = SharedQuestionPageProps & {
  headingMode?: "page";
  title: ReactNode;
  hint?: ReactNode;
};

type ChildHeadingModeProps = SharedQuestionPageProps & {
  headingMode: "children";
  title?: never;
  hint?: never;
};

export type GovUkQuestionPageProps =
  | PageHeadingModeProps
  | ChildHeadingModeProps;

export function GovUkQuestionPage(props: GovUkQuestionPageProps) {
  const {
    caption,
    backLinkHref,
    backLinkText = "Back",
    errorSummary,
    children,
    primaryActionText = "Continue",
    primaryActionType = "submit",
    primaryActionDisabled = false,
    secondaryActions = [],
    formProps,
    pageTemplateProps,
  } = props;

  const { className, ...restFormProps } = formProps ?? {};

  const content = (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        {errorSummary ? <ErrorSummary {...errorSummary} /> : null}

        <form noValidate {...restFormProps} className={className}>
          {props.headingMode !== "children" ? (
            <>
              {caption ? (
                <span className="govuk-caption-l">{caption}</span>
              ) : null}

              <h1 className="govuk-heading-l">{props.title}</h1>

              {props.hint ? (
                <div className="govuk-hint">{props.hint}</div>
              ) : null}
            </>
          ) : caption ? (
            <span className="govuk-caption-l">{caption}</span>
          ) : null}

          {children}

          {secondaryActions.length > 0 ? (
            <ButtonGroup>
              <Button type={primaryActionType} disabled={primaryActionDisabled}>
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
  );

  return (
    <GovUkPageTemplate
      containerStart={
        backLinkHref ? (
          <BackLink href={backLinkHref}>{backLinkText}</BackLink>
        ) : undefined
      }
      {...pageTemplateProps}
    >
      {content}
    </GovUkPageTemplate>
  );
}
