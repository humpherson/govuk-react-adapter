import type { HTMLAttributes, ReactNode } from "react";

export interface CookieBannerAction {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface CookieBannerMessage {
  heading?: ReactNode;
  children: ReactNode;
  actions?: CookieBannerAction[];
  hidden?: boolean;
}

export interface CookieBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  messages: CookieBannerMessage[];
  ariaLabel?: string;
}

export function CookieBanner({ messages, ariaLabel = "Cookies on this service", className = "", ...props }: CookieBannerProps) {
  const classes = ["govuk-cookie-banner", className].filter(Boolean).join(" ");

  return (
    <div className={classes} data-nosnippet role="region" aria-label={ariaLabel} {...props}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`govuk-cookie-banner__message govuk-width-container${message.hidden ? " govuk-cookie-banner__message--hidden" : ""}`}
          hidden={message.hidden}
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              {message.heading ? <h2 className="govuk-cookie-banner__heading govuk-heading-m">{message.heading}</h2> : null}
              <div className="govuk-cookie-banner__content">{message.children}</div>
            </div>
          </div>
          {message.actions?.length ? (
            <div className="govuk-button-group">
              {message.actions.map((action, actionIndex) =>
                action.href ? (
                  <a key={actionIndex} href={action.href} className="govuk-link">{action.text}</a>
                ) : (
                  <button key={actionIndex} type="button" className="govuk-button" data-module="govuk-button" onClick={action.onClick}>
                    {action.text}
                  </button>
                )
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
