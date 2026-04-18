import type { HTMLAttributes, ReactNode } from "react";

export interface TableCell {
  content: ReactNode;
  format?: "numeric";
  header?: boolean;
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableProps extends Omit<HTMLAttributes<HTMLTableElement>, "children"> {
  caption?: ReactNode;
  captionClassName?: string;
  head?: TableRow;
  rows: TableRow[];
  firstCellIsHeader?: boolean;
}

export function Table({ caption, captionClassName = "govuk-table__caption govuk-table__caption--m", head, rows, firstCellIsHeader = false, className = "", ...props }: TableProps) {
  const classes = ["govuk-table", className].filter(Boolean).join(" ");
  return (
    <table className={classes} {...props}>
      {caption ? <caption className={captionClassName}>{caption}</caption> : null}
      {head ? (
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {head.cells.map((cell, index) => (
              <th key={index} scope="col" className={`govuk-table__header${cell.format === "numeric" ? " govuk-table__header--numeric" : ""}`}>
                {cell.content}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody className="govuk-table__body">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="govuk-table__row">
            {row.cells.map((cell, cellIndex) => {
              const classes = `${cell.header || (firstCellIsHeader && cellIndex === 0) ? "govuk-table__header" : "govuk-table__cell"}${cell.format === "numeric" ? ` ${cell.header || (firstCellIsHeader && cellIndex === 0) ? "govuk-table__header--numeric" : "govuk-table__cell--numeric"}` : ""}`;
              if (cell.header || (firstCellIsHeader && cellIndex === 0)) {
                return <th key={cellIndex} scope="row" className={classes}>{cell.content}</th>;
              }
              return <td key={cellIndex} className={classes}>{cell.content}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
