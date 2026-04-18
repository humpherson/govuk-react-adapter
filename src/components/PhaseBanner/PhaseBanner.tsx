import type { HTMLAttributes, ReactNode } from "react";

export interface PhaseBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  phase: string;
  children: ReactNode;
}

export function PhaseBanner({ phase, children, className = "", ...props }: PhaseBannerProps) {
  const classes = ["govuk-phase-banner", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">{phase}</strong>
        <span className="govuk-phase-banner__text">{children}</span>
      </p>
    </div>
  );
}
