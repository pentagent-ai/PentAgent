"use client";

import Image from "next/image";
import { withBase } from "@/lib/base-path";
import { AppIcon, type IconName } from "@/components/workbench/icons";
import { demoHost, demoProject, listenerLabel, scopeSummary } from "@/lib/demo-data";

export type NavKey =
  | "proxy"
  | "repeater"
  | "intruder"
  | "scanner"
  | "target"
  | "organizer"
  | "history"
  | "scope"
  | "sitemap"
  | "principals"
  | "plans"
  | "kits"
  | "findings"
  | "dashboard"
  | "decoder"
  | "comparer"
  | "sequencer"
  | "collaborator"
  | "ask"
  | "plan"
  | "agent";

type Entry = { key: NavKey; label: string; icon: IconName; live?: boolean };

// Same groups, order and labels as the app's left rail.
export const navGroups: { label: string; primary: Entry[]; secondary?: Entry[]; extras?: Entry[]; add?: boolean }[] = [
  {
    label: "Workbench",
    primary: [
      { key: "proxy", label: "Proxy", icon: "proxy", live: true },
      { key: "repeater", label: "Repeater", icon: "repeater", live: true },
      { key: "intruder", label: "Intruder", icon: "intruder" },
      { key: "scanner", label: "Scanner", icon: "scanner" },
    ],
    add: true,
    secondary: [
      { key: "target", label: "Target", icon: "target", live: true },
      { key: "organizer", label: "Organizer", icon: "organizer" },
      { key: "history", label: "History", icon: "history", live: true },
    ],
  },
  {
    label: "Project",
    primary: [
      { key: "scope", label: "Scope", icon: "scope", live: true },
      { key: "sitemap", label: "Sitemap", icon: "sitemap", live: true },
      { key: "principals", label: "Principals", icon: "principals" },
      { key: "plans", label: "Plans", icon: "plans", live: true },
      { key: "kits", label: "Kits", icon: "kits" },
      { key: "findings", label: "Findings", icon: "findings", live: true },
    ],
    extras: [
      { key: "dashboard", label: "Dashboard", icon: "dashboard" },
      { key: "decoder", label: "Decoder", icon: "decoder" },
      { key: "comparer", label: "Comparer", icon: "comparer" },
      { key: "sequencer", label: "Sequencer", icon: "sequencer" },
      { key: "collaborator", label: "Collaborator", icon: "collaborator" },
    ],
  },
  {
    label: "AI Agent",
    primary: [
      { key: "ask", label: "Ask", icon: "ask", live: true },
      { key: "plan", label: "Plan", icon: "plan", live: true },
      { key: "agent", label: "Agent", icon: "agent", live: true },
    ],
  },
];

export function TopBar({
  running,
  onToggleProxy,
  findings,
  narrow,
}: {
  running: boolean;
  onToggleProxy: () => void;
  findings: number;
  narrow?: boolean;
}) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-line bg-surface px-3">
      <span className="flex items-center gap-2.5 px-1">
        <Image src={withBase("/brand/pentagent-mark.png")} alt="" width={26} height={26} unoptimized className="shrink-0" />
        <span className="text-[15px] font-semibold tracking-tight text-ink">PentAgent</span>
      </span>

      {narrow ? null : (
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="font-medium">Project</span>
            <span className="app-field flex items-center gap-2 text-[11px] text-ink">
              {demoProject}
              <span className="text-[8px] text-ink-muted">▼</span>
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <AppIcon name="globe" size={14} />
            <span className="font-medium">Target</span>
            <span className="flex items-center gap-1 rounded-md border border-line bg-canvas px-2 py-1 font-mono text-[11px] text-ink">
              {demoHost}
              <span className="text-[9px] text-disabled">▾</span>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="app-field w-28 text-[11px] text-disabled">New project</span>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-accent/[0.55] px-2 text-[13px] font-semibold text-accent-ink">
              +
            </span>
          </span>
        </div>
      )}

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleProxy}
          title={running ? "Stop proxy (127.0.0.1:8080)" : "Start proxy listener"}
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
            running
              ? "border-accent/30 bg-accent/[0.12] text-success hover:border-danger hover:text-danger"
              : "border-line bg-raised text-ink-muted hover:border-accent/30 hover:text-accent-fg"
          }`}
        >
          <span className={`inline-block size-1.5 rounded-full ${running ? "bg-success" : "bg-disabled"}`} />
          {running ? "Proxy Active" : "Proxy Off"}
        </button>
        {narrow ? null : (
          <>
            <span className="flex size-8 items-center justify-center text-ink-muted">
              <AppIcon name="activity" />
            </span>
            <span className="relative flex size-8 items-center justify-center text-ink-muted">
              <AppIcon name="bell" />
              {findings > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-danger px-0.5 text-[8px] font-bold text-white">
                  {findings}
                </span>
              ) : null}
            </span>
            <span className="flex size-8 items-center justify-center text-ink-muted">
              <AppIcon name="settings" />
            </span>
          </>
        )}
        <span className="flex size-[34px] items-center justify-center rounded-full border border-line bg-raised text-[10px] font-semibold text-ink">
          CV
        </span>
      </div>
    </header>
  );
}

function NavButton({
  entry,
  active,
  muted,
  onSelect,
  badge,
}: {
  entry: Entry;
  active: boolean;
  muted?: boolean;
  onSelect: (key: NavKey) => void;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={entry.live ? () => onSelect(entry.key) : undefined}
      aria-current={active ? "page" : undefined}
      tabIndex={entry.live ? 0 : -1}
      className={`group relative flex w-full items-center gap-2 rounded-[5px] px-2 py-1.5 text-left text-[12px] transition-colors ${
        active
          ? "bg-accent/[0.12] text-ink"
          : muted
            ? "cursor-default text-disabled"
            : `${entry.live ? "" : "cursor-default"} text-ink-muted hover:bg-raised hover:text-ink`
      }`}
    >
      {active ? <span className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-r bg-accent" /> : null}
      <span className={active ? "text-accent-fg" : "text-disabled group-hover:text-ink-muted"}>
        <AppIcon name={entry.icon} />
      </span>
      <span className="min-w-0 flex-1 truncate">{entry.label}</span>
      {badge ? (
        <span className="ml-auto min-w-[1.1rem] rounded-full border border-accent/30 bg-accent/[0.12] px-1.5 text-center text-[9px] font-bold leading-[1.3] text-accent-fg">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function NavRail({
  active,
  onSelect,
  running,
  onStop,
  findings,
}: {
  active: NavKey;
  onSelect: (key: NavKey) => void;
  running: boolean;
  onStop: () => void;
  findings: number;
}) {
  return (
    <aside className="flex h-full w-[200px] shrink-0 flex-col border-r border-line bg-surface">
      <nav aria-label="Workbench" className="min-h-0 flex-1 overflow-hidden px-1.5 py-2.5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-3.5">
            <div className="mb-1 flex items-center justify-between px-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-disabled">{group.label}</span>
              {group.add ? <span className="text-[15px] leading-none text-disabled">×</span> : null}
            </div>
            <div className="flex flex-col gap-px">
              {group.primary.map((e) => (
                <NavButton
                  key={e.key}
                  entry={e}
                  active={active === e.key}
                  onSelect={onSelect}
                  badge={e.key === "findings" ? findings : undefined}
                />
              ))}
              {group.add ? <span className="px-2 py-1 text-[15px] leading-none text-disabled">+</span> : null}
              {group.secondary ? (
                <>
                  <div className="my-1.5 border-t border-line" />
                  {group.secondary.map((e) => (
                    <NavButton key={e.key} entry={e} active={active === e.key} onSelect={onSelect} />
                  ))}
                </>
              ) : null}
              {group.extras ? (
                <>
                  <div className="my-1.5 border-t border-line" />
                  {group.extras.map((e) => (
                    <NavButton key={e.key} entry={e} active={false} muted onSelect={onSelect} />
                  ))}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </nav>
      <div className="shrink-0 border-t border-line px-2 py-1.5">
        <div className="mb-2 space-y-1.5 rounded border border-line bg-canvas p-1.5">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className={`inline-block size-1.5 shrink-0 rounded-full ${running ? "bg-success" : "bg-disabled"}`} />
            <span className="min-w-0 flex-1 truncate text-ink-muted">{listenerLabel}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="rounded border border-line px-1.5 py-0.5 text-[9px] text-ink">Lab</span>
            <span className="rounded border border-line px-1.5 py-0.5 text-[9px] text-ink-muted">Settings</span>
            {running ? (
              <button
                type="button"
                onClick={onStop}
                className="rounded border border-danger/40 px-1.5 py-0.5 text-[9px] text-danger transition-colors hover:bg-danger/[0.1]"
              >
                Stop
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="inline-block size-1.5 rounded-full bg-success" />
          <span className="text-success">Connected</span>
        </div>
        <p className="mt-1 truncate text-[10px] text-disabled">{scopeSummary}</p>
      </div>
    </aside>
  );
}

/** The app's collapsed (44px) rail, used for the narrow mockup. */
export function NavRailCollapsed({
  active,
  onSelect,
  running,
  onStop,
}: {
  active: NavKey;
  onSelect: (key: NavKey) => void;
  running: boolean;
  onStop: () => void;
}) {
  const items: Entry[] = [
    navGroups[0].primary[0],
    navGroups[0].primary[1],
    navGroups[1].primary[1],
    navGroups[2].primary[0],
    navGroups[2].primary[1],
    navGroups[2].primary[2],
  ];
  return (
    <aside className="flex h-full w-11 shrink-0 flex-col items-center border-r border-line bg-surface py-2">
      <div className="flex min-h-0 flex-1 flex-col items-center">
        {items.map((e) => {
          const on = active === e.key;
          return (
            <button
              key={e.key}
              type="button"
              title={e.label}
              aria-label={e.label}
              onClick={() => onSelect(e.key)}
              className={`relative mb-0.5 flex size-9 items-center justify-center rounded-md ${
                on ? "bg-accent/[0.12] text-accent-fg" : "text-disabled hover:bg-raised hover:text-ink"
              }`}
            >
              {on ? <span className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-r bg-accent" /> : null}
              <AppIcon name={e.icon} />
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-1 border-t border-line pt-1.5">
        <span className={`inline-block size-2 rounded-full ${running ? "bg-success" : "bg-disabled"}`} />
        <span className="flex size-7 items-center justify-center text-[10px] text-ink-muted">Lab</span>
        {running ? (
          <button
            type="button"
            title="Stop listener"
            aria-label="Stop listener"
            onClick={onStop}
            className="flex size-7 items-center justify-center rounded text-[10px] text-danger hover:bg-raised"
          >
            ■
          </button>
        ) : null}
      </div>
    </aside>
  );
}
