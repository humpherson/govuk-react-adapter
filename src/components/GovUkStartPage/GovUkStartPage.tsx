import type { ReactNode } from "react";
import {
  GovUkPageTemplate,
  type GovUkPageTemplateProps,
} from "../GovUkPageTemplate";
import { Button } from "../Button";
import { InsetText } from "../InsetText";

export interface GovUkStartPageProps {
  title: ReactNode;
  description?: ReactNode;
  startButtonText?: ReactNode;
  startButtonHref: string;

  beforeYouStart?: ReactNode;
  children?: ReactNode;
  whatYouNeed?: ReactNode[];

  pageTemplateProps?: Omit<
    Partial<GovUkPageTemplateProps>,
    "children" | "pageTitle"
  >;
}

export function GovUkStartPage({
  title,
  description,
  startButtonText = "Start now",
  startButtonHref,
  beforeYouStart,
  children,
  whatYouNeed = [],
  pageTemplateProps,
}: GovUkStartPageProps) {
  return (
    <GovUkPageTemplate {...pageTemplateProps}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">{title}</h1>

          {description ? <p className="govuk-body-l">{description}</p> : null}

          {whatYouNeed.length > 0 ? (
            <>
              <h2 className="govuk-heading-m">Before you start</h2>
              <ul className="govuk-list govuk-list--bullet">
                {whatYouNeed.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}

          {beforeYouStart ? <InsetText>{beforeYouStart}</InsetText> : null}

          <Button href={startButtonHref} isStart>
            {startButtonText}
          </Button>

          {children ? (
            <div className="govuk-!-margin-top-6">{children}</div>
          ) : null}
        </div>
      </div>
    </GovUkPageTemplate>
  );
}
