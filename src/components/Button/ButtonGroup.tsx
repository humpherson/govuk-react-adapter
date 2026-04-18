import type { ReactNode } from "react";

export interface ButtonGroupProps {
  children: ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="govuk-button-group">{children}</div>;
}
