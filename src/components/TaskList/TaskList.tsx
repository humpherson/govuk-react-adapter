import type { HTMLAttributes, ReactNode } from "react";

export interface TaskListItem {
  id?: string;
  title: ReactNode;
  href?: string;
  hint?: ReactNode;
  status: ReactNode;
}

export interface TaskListProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: TaskListItem[];
}

export function TaskList({ items, className = "", ...props }: TaskListProps) {
  const classes = ["govuk-task-list", className].filter(Boolean).join(" ");
  return (
    <ul className={classes} {...props}>
      {items.map((item, index) => {
        const id = item.id ?? `task-list-item-${index + 1}`;
        return (
          <li key={id} className="govuk-task-list__item">
            <div className="govuk-task-list__name-and-hint">
              {item.href ? (
                <a className="govuk-link govuk-task-list__link" href={item.href} aria-describedby={`${id}-status`}>
                  {item.title}
                </a>
              ) : (
                <div className="govuk-task-list__name">{item.title}</div>
              )}
              {item.hint ? <div className="govuk-task-list__hint">{item.hint}</div> : null}
            </div>
            <div className="govuk-task-list__status" id={`${id}-status`}>{item.status}</div>
          </li>
        );
      })}
    </ul>
  );
}
