import type { HTMLAttributes, ReactNode } from "react";

export interface InsetTextProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
}

export function InsetText({
  children,
  className = "",
  ...props
}: InsetTextProps) {
  const classes = ["govuk-inset-text", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
