import type { HTMLAttributes, ReactNode } from "react";

export interface NotificationBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title?: string;
  heading?: ReactNode;
  children: ReactNode;
  success?: boolean;
  disableAutoFocus?: boolean;
}

export function NotificationBanner({ title = "Important", heading, children, success = false, disableAutoFocus = false, className = "", ...props }: NotificationBannerProps) {
  const classes = ["govuk-notification-banner", success ? "govuk-notification-banner--success" : "", className].filter(Boolean).join(" ");
  return (
    <div className={classes} role={success ? "alert" : "region"} aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner" data-disable-auto-focus={disableAutoFocus} {...props}>
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">{title}</h2>
      </div>
      <div className="govuk-notification-banner__content">
        {heading ? <h3 className="govuk-notification-banner__heading">{heading}</h3> : null}
        {children}
      </div>
    </div>
  );
}
