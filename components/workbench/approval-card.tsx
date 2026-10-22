"use client";

import { approval, demoHost } from "@/lib/demo-data";

export type ApprovalState = "idle" | "pending" | "allowed" | "denied" | "stopped";

const notes: Record<Exclude<ApprovalState, "pending">, { title: string; body: string; tone: string }> = {
  idle: { title: "Preparing", body: "The agent is preparing the next request.", tone: "text-ink-muted" },
  allowed: { title: "Allowed", body: "Sent once. The response is in HTTP history.", tone: "text-success" },
  denied: { title: "Denied", body: "Not sent. The run continues without it.", tone: "text-ink-muted" },
  stopped: { title: "Stopped", body: "Nothing else will be sent.", tone: "text-danger" },
};

/** The desktop app's approval card: "Allow this test?" with Deny / Allow. */
export function ApprovalCard({
  state,
  onAllow,
  onDeny,
  onReplay,
  className = "",
}: {
  state: ApprovalState;
  compact?: boolean;
  onAllow?: () => void;
  onDeny?: () => void;
  onReplay?: () => void;
  className?: string;
}) {
  const resolved = state === "pending" ? null : notes[state];
  return (
    <div
      role={state === "pending" ? "dialog" : undefined}
      aria-label={state === "pending" ? "Allow this test?" : undefined}
      className={`w-full rounded-md border border-line bg-surface p-4 text-sm ${state === "pending" ? "border-l-2 border-l-warn" : ""} ${className}`}
    >
      <div
        className={`mb-1 text-xs font-semibold uppercase tracking-wide ${resolved ? resolved.tone : "text-ink"}`}
      >
        {resolved ? resolved.title : "Allow this test?"}
      </div>
      <p className="mb-2 text-[13px] leading-relaxed text-ink">
        {approval.tool}: {approval.summary}
      </p>
      <p className="mb-3 text-[11px] text-ink-muted">
        {resolved ? resolved.body : `About ${approval.estimate} request(s) → ${demoHost}`}
      </p>
      <div className="flex justify-end gap-2">
        {state === "pending" ? (
          <>
            <button
              type="button"
              onClick={onDeny}
              className="rounded-md border border-line px-3 py-1 text-xs text-ink transition-colors hover:bg-canvas"
            >
              Deny
            </button>
            <button
              type="button"
              onClick={onAllow}
              className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-accent-ink transition-colors hover:bg-accent-strong"
            >
              Allow
            </button>
          </>
        ) : onReplay && state !== "idle" ? (
          <button
            type="button"
            onClick={onReplay}
            className="rounded-md border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            Run again
          </button>
        ) : null}
      </div>
    </div>
  );
}
