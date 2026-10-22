"use client";

import { clockFor, type HistoryEntry } from "@/lib/demo-data";
import { methodPillClass, statusDot, statusTone } from "@/components/workbench/tones";

export type HistoryColumn = "index" | "method" | "url" | "status" | "length" | "time" | "source";

const labels: Record<HistoryColumn, string> = {
  index: "#",
  method: "Method",
  url: "URL",
  status: "Status code",
  length: "Length",
  time: "Time ↓",
  source: "Source",
};

export const allColumns: HistoryColumn[] = ["index", "method", "url", "status", "length", "time", "source"];
export const compactColumns: HistoryColumn[] = ["index", "method", "url", "status"];

/** The app's HTTP history table: uppercase headers, method pills, status dots, source chips. */
export function HistoryList({
  rows,
  selectedId,
  onSelect,
  columns = compactColumns,
  animateIds,
  dense = false,
}: {
  rows: readonly HistoryEntry[];
  selectedId?: number;
  onSelect?: (id: number) => void;
  columns?: HistoryColumn[];
  animateIds?: ReadonlySet<number>;
  /** Narrow embeds: tighter method/status columns and a short "Status" header. */
  dense?: boolean;
}) {
  return (
    <table className="w-full table-fixed text-left text-[11px]">
      <colgroup>
        {columns.map((col) => (
          <col
            key={col}
            className={
              col === "index"
                ? "w-[28px]"
                : col === "method"
                  ? dense ? "w-[54px]" : "w-[62px]"
                  : col === "url"
                    ? ""
                    : col === "status"
                      ? dense ? "w-[54px]" : "w-[84px]"
                      : col === "length"
                        ? "w-[58px]"
                        : col === "time"
                          ? "w-[86px]"
                          : "w-[62px]"
            }
          />
        ))}
      </colgroup>
      <thead className="sticky top-0 z-[1] bg-surface text-ink-muted">
        <tr>
          {columns.map((col) => (
            <th key={col} className="whitespace-nowrap px-1.5 py-1 text-[9.5px] font-semibold uppercase tracking-wide">
              {dense && col === "status" ? "Status" : labels[col]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const selected = row.id === selectedId;
          return (
            <tr
              key={row.id}
              onClick={onSelect ? () => onSelect(row.id) : undefined}
              aria-selected={selected}
              className={`${onSelect ? "cursor-pointer" : ""} border-t border-line ${
                selected ? "bg-accent/[0.12]" : "hover:bg-canvas"
              } ${animateIds?.has(row.id) ? "row-in" : ""}`}
            >
              {columns.map((col) => (
                <Cell key={col} col={col} row={row} index={i + 1} />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Cell({ col, row, index }: { col: HistoryColumn; row: HistoryEntry; index: number }) {
  const pad = "px-1.5 py-[3px]";
  switch (col) {
    case "index":
      return <td className={`${pad} font-mono text-ink-muted`}>{index}</td>;
    case "method":
      return (
        <td className={pad}>
          <span className={methodPillClass(row.method)}>{row.method}</span>
        </td>
      );
    case "url":
      return <td className={`${pad} truncate font-mono text-ink`}>{row.path}</td>;
    case "status":
      return (
        <td className={`${pad} font-mono font-semibold ${statusTone(row.status)}`}>
          <span className={`status-dot ${statusDot(row.status)}`} />
          {row.status}
        </td>
      );
    case "length":
      return <td className={`${pad} font-mono text-ink-muted`}>{row.length}</td>;
    case "time":
      return <td className={`${pad} whitespace-nowrap font-mono text-ink-muted`}>{clockFor(row.at)}</td>;
    case "source":
      return (
        <td className={pad}>
          <span
            className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] uppercase ${
              row.source === "proxy" ? "chip-proxy" : "chip-repeater"
            }`}
          >
            {row.source}
          </span>
        </td>
      );
  }
}
