import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "warning" | "inverse";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  isStart?: boolean;
  className?: string;
}

type ButtonAsButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function getClassNames({
  variant = "primary",
  isStart = false,
  className,
}: {
  variant?: ButtonVariant;
  isStart?: boolean;
  className?: string;
}) {
  const classes = ["govuk-button"];

  if (variant === "secondary") classes.push("govuk-button--secondary");
  if (variant === "warning") classes.push("govuk-button--warning");
  if (variant === "inverse") classes.push("govuk-button--inverse");
  if (isStart) classes.push("govuk-button--start");
  if (className) classes.push(className);

  return classes.join(" ");
}

function StartIcon() {
  return (
    <svg
      className="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", isStart = false, className } = props;

  const classes = getClassNames({ variant, isStart, className });

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <a
        href={href}
        role="button"
        draggable={false}
        className={classes}
        data-module="govuk-button"
        {...anchorProps}
      >
        {children}
        {isStart ? <StartIcon /> : null}
      </a>
    );
  }

  const buttonOnlyProps = props as ButtonAsButtonProps;
  const { type = "submit", disabled = false, ...buttonProps } = buttonOnlyProps;

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      data-module="govuk-button"
      {...buttonProps}
    >
      {children}
      {isStart ? <StartIcon /> : null}
    </button>
  );
}
