"use client";

/** Same treatment as the app's Stop controls: red hairline border, critical text. */
export function StopButton({
  running = true,
  onToggle,
  size = "md",
}: {
  running?: boolean;
  onToggle?: () => void;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={running ? "Stop" : "Resume"}
      className={`inline-flex items-center gap-1.5 rounded border transition-colors duration-150 ${
        sm ? "px-1.5 py-0.5 text-[9px]" : "h-7 rounded-md px-2.5 text-[11px] font-medium"
      } ${
        running
          ? "border-danger/40 text-danger hover:bg-danger/[0.08]"
          : "border-line text-ink-muted hover:border-accent/30 hover:text-accent-fg"
      }`}
    >
      {sm ? null : running ? (
        <span aria-hidden="true" className="size-2 rounded-[1px] bg-current" />
      ) : (
        <span aria-hidden="true" className="size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
      )}
      {running ? "Stop" : sm ? "Start" : "Start"}
    </button>
  );
}
