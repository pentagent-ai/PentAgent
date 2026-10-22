"use client";

export type Mode = "ask" | "plan" | "agent";

export const modeLabels: Record<Mode, string> = { ask: "Ask", plan: "Plan", agent: "Agent" };

/** The app's mode control: a compact select (Ask / Plan / Agent). Static when no onChange. */
export function ModeSwitcher({ value, onChange }: { value: Mode; onChange?: (mode: Mode) => void }) {
  if (!onChange) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-line bg-canvas px-1.5 py-0.5 text-[11px] text-ink">
        {modeLabels[value]}
        <span aria-hidden="true" className="text-[8px] text-ink-muted">
          ▼
        </span>
      </span>
    );
  }
  return (
    <select
      aria-label="Mode"
      value={value}
      onChange={(e) => onChange(e.target.value as Mode)}
      className="cursor-pointer rounded border border-line bg-canvas px-1.5 py-0.5 text-[11px] text-ink outline-none focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-accent"
    >
      {(Object.keys(modeLabels) as Mode[]).map((m) => (
        <option key={m} value={m}>
          {modeLabels[m]}
        </option>
      ))}
    </select>
  );
}
