import type { HTMLAttributes, ReactNode } from "react";

export type TagColour = "grey" | "green" | "turquoise" | "blue" | "light-blue" | "purple" | "pink" | "red" | "orange" | "yellow";

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  colour?: TagColour;
}

export function Tag({ children, colour = "grey", className = "", ...props }: TagProps) {
  const modifier = colour === "grey" ? "" : `govuk-tag--${colour}`;
  const classes = ["govuk-tag", modifier, className].filter(Boolean).join(" ");
  return <strong className={classes} {...props}>{children}</strong>;
}
