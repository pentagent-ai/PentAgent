import { scopeText } from "@/lib/demo-data";

/** The app's Scope panel: Simple / Advanced, one origin per line, Save scope. */
export function ScopePanel() {
  return (
    <div className="rounded-md border border-line bg-surface p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink">Scope</p>
        <span className="rounded bg-success/[0.18] px-1.5 py-0.5 text-[9px] text-success">saved</span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 rounded-md border border-line p-0.5 text-[11px]">
        <span className="rounded bg-accent py-1 text-center font-medium text-accent-ink">Simple</span>
        <span className="py-1 text-center text-ink-muted">Advanced</span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-ink-muted">
        One origin per line. Repeater, Intruder and the agent only send to hosts listed here.
      </p>
      <div className="mt-2.5 rounded-md border border-line bg-canvas px-2.5 py-2 font-mono text-[11.5px] leading-[1.7] text-ink">
        {scopeText.map((line) => (
          <div key={line}>{line}</div>
        ))}
        <div className="text-disabled">cdn.demo-shop.test is out of scope</div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-md border border-line bg-canvas px-2.5 py-2">
        <div>
          <p className="text-[12px] text-ink">Model spend cap</p>
          <p className="mt-0.5 text-[10.5px] text-ink-muted">Optional. Set by you. Off by default.</p>
        </div>
        <span
          role="switch"
          aria-checked="false"
          aria-label="Model spend cap, off"
          className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full border border-line bg-raised"
        >
          <span className="ml-0.5 size-3 rounded-full bg-disabled" />
        </span>
      </div>
      <span className="mt-3 block rounded-md bg-accent py-1.5 text-center text-[12px] font-semibold text-accent-ink">
        Save scope
      </span>
    </div>
  );
}
