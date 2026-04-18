import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SummaryListAction {
  href: string;
  text?: ReactNode;
  html?: ReactNode;
  visuallyHiddenText?: ReactNode;
  className?: string;
  attributes?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

export interface SummaryListRowContent {
  text?: ReactNode;
  html?: ReactNode;
  className?: string;
}

export interface SummaryListRowActions {
  items: SummaryListAction[];
  className?: string;
}

export interface SummaryListRow {
  key: SummaryListRowContent;
  value: SummaryListRowContent;
  actions?: SummaryListRowActions;
  className?: string;
  noBorder?: boolean;
  noActions?: boolean;
}

export interface SummaryListCardTitle {
  text?: ReactNode;
  html?: ReactNode;
  headingLevel?: HeadingLevel;
  className?: string;
}

export interface SummaryListCardActions {
  items: SummaryListAction[];
  className?: string;
}

export interface SummaryListCard {
  title?: SummaryListCardTitle;
  actions?: SummaryListCardActions;
  className?: string;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export interface SummaryListProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  rows: SummaryListRow[];
  noBorder?: boolean;
  card?: SummaryListCard;
}

function renderContent(
  content?: SummaryListRowContent | SummaryListCardTitle
): ReactNode {
  if (!content) return null;
  if (content.html !== undefined) return content.html;
  return content.text ?? null;
}

function SummaryListLink({
  href,
  text,
  html,
  visuallyHiddenText,
  className,
  attributes,
}: SummaryListAction) {
  const classes = ["govuk-link", className].filter(Boolean).join(" ");

  const {
    className: ignoredClassName,
    children: ignoredChildren,
    ...restAttributes
  } = attributes ?? {};

  return (
    <a href={href} className={classes} {...restAttributes}>
      {html !== undefined ? html : text}
      {visuallyHiddenText ? (
        <span className="govuk-visually-hidden"> {visuallyHiddenText}</span>
      ) : null}
    </a>
  );
}

function SummaryListRows({ rows }: { rows: SummaryListRow[] }) {
  return (
    <>
      {rows.map((row, index) => {
        const hasActions = Boolean(row.actions?.items?.length);
        const rowClasses = [
          "govuk-summary-list__row",
          row.noBorder ? "govuk-summary-list__row--no-border" : "",
          !hasActions || row.noActions
            ? "govuk-summary-list__row--no-actions"
            : "",
          row.className,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div className={rowClasses} key={index}>
            <dt
              className={["govuk-summary-list__key", row.key.className]
                .filter(Boolean)
                .join(" ")}
            >
              {renderContent(row.key)}
            </dt>

            <dd
              className={["govuk-summary-list__value", row.value.className]
                .filter(Boolean)
                .join(" ")}
            >
              {renderContent(row.value)}
            </dd>

            {hasActions ? (
              <dd
                className={[
                  "govuk-summary-list__actions",
                  row.actions?.className,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {row.actions!.items.length === 1 ? (
                  <SummaryListLink {...row.actions!.items[0]} />
                ) : (
                  <ul className="govuk-summary-list__actions-list">
                    {row.actions!.items.map((action, actionIndex) => (
                      <li
                        className="govuk-summary-list__actions-list-item"
                        key={actionIndex}
                      >
                        <SummaryListLink {...action} />
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function SummaryCard({
  card,
  rows,
  noBorder,
}: {
  card: SummaryListCard;
  rows: SummaryListRow[];
  noBorder?: boolean;
}) {
  const { className = "", attributes, title, actions } = card;

  const {
    className: ignoredClassName,
    children: ignoredChildren,
    ...restAttributes
  } = attributes ?? {};

  const cardClasses = ["govuk-summary-card", className]
    .filter(Boolean)
    .join(" ");

  const titleLevel = title?.headingLevel ?? 2;
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  return (
    <div className={cardClasses} {...restAttributes}>
      {title || actions?.items?.length ? (
        <div className="govuk-summary-card__title-wrapper">
          {title ? (
            <TitleTag
              className={["govuk-summary-card__title", title.className]
                .filter(Boolean)
                .join(" ")}
            >
              {renderContent(title)}
            </TitleTag>
          ) : null}

          {actions?.items?.length ? (
            <ul
              className={["govuk-summary-card__actions", actions.className]
                .filter(Boolean)
                .join(" ")}
            >
              {actions.items.map((action, index) => (
                <li className="govuk-summary-card__action" key={index}>
                  <SummaryListLink {...action} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="govuk-summary-card__content">
        <dl
          className={[
            "govuk-summary-list",
            noBorder ? "govuk-summary-list--no-border" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <SummaryListRows rows={rows} />
        </dl>
      </div>
    </div>
  );
}

export function SummaryList({
  rows,
  noBorder = false,
  card,
  className = "",
  ...props
}: SummaryListProps) {
  if (card) {
    return <SummaryCard card={card} rows={rows} noBorder={noBorder} />;
  }

  const classes = [
    "govuk-summary-list",
    noBorder ? "govuk-summary-list--no-border" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <dl className={classes} {...props}>
      <SummaryListRows rows={rows} />
    </dl>
  );
}
