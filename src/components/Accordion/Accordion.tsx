import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionSection {
  heading: ReactNode;
  summary?: ReactNode;
  content: ReactNode;
  expanded?: boolean;
  id?: string;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  id: string;
  sections: AccordionSection[];
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export function Accordion({ id, sections, headingLevel = 2, className = "", ...props }: AccordionProps) {
  const HeadingTag = `h${headingLevel}` as const;
  const classes = ["govuk-accordion", className].filter(Boolean).join(" ");

  return (
    <div className={classes} data-module="govuk-accordion" id={id} {...props}>
      {sections.map((section, index) => {
        const sectionId = section.id ?? `${id}-section-${index + 1}`;
        return (
          <div className="govuk-accordion__section" key={sectionId}>
            <div className="govuk-accordion__section-header">
              <HeadingTag className="govuk-accordion__section-heading">
                <span className="govuk-accordion__section-button" id={`${sectionId}-heading`}>
                  {section.heading}
                </span>
              </HeadingTag>
              {section.summary ? (
                <div className="govuk-accordion__section-summary govuk-body" id={`${sectionId}-summary`}>
                  {section.summary}
                </div>
              ) : null}
            </div>
            <div
              id={sectionId}
              className={`govuk-accordion__section-content${section.expanded ? "" : " govuk-accordion__section-content--hidden"}`}
              aria-labelledby={`${sectionId}-heading`}
            >
              {section.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
