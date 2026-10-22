"use client";

import type { ReactNode } from "react";
import { ApprovalCard, type ApprovalState } from "@/components/workbench/approval-card";
import { AppIcon } from "@/components/workbench/icons";
import { ModeSwitcher, type Mode } from "@/components/workbench/mode-switcher";
import { agentThread, askThread, demoHost, planItems, roles, scopeSummary } from "@/lib/demo-data";

export type RailTab = "findings" | "plan" | "agent" | "context";

function Message({ who, children, copy = false }: { who: "You" | "Assistant"; children: ReactNode; copy?: boolean }) {
  return (
    <div className="mb-5">
      <p className="mb-1 text-[10px] font-semibold text-ink">{who}</p>
      <div className="text-[13px] leading-[1.6] text-ink">{children}</div>
      {copy ? (
        <span className="mt-2 inline-block rounded border border-line px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-ink-muted">
          Copy
        </span>
      ) : null}
    </div>
  );
}

export function AskThread() {
  return (
    <div>
      <Message who="You">{askThread[0].text}</Message>
      <Message who="Assistant" copy>
        {askThread[1].text}
      </Message>
    </div>
  );
}

const severityBadge: Record<string, string> = {
  High: "bg-danger/[0.18] text-danger",
  Medium: "bg-warn/[0.18] text-warn",
  Low: "bg-success/[0.18] text-success",
};

export function PlanList() {
  return (
    <ol className="space-y-1.5">
      {planItems.map((item, index) => (
        <li key={item.title} className="rounded-md border border-line bg-surface px-2.5 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[12px] text-ink">
              <span className="mr-1.5 font-mono text-[10px] text-ink-muted">{index + 1}.</span>
              {item.title}
            </p>
            <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${severityBadge[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          <p className="mt-1 truncate font-mono text-[10.5px] text-hl-path">{item.target}</p>
        </li>
      ))}
    </ol>
  );
}

export function AgentTrace({ running = true }: { running?: boolean }) {
  return (
    <div>
      <Message who="You">{agentThread.goal}</Message>
      <Message who="Assistant" copy>
        {agentThread.intro}
      </Message>
      {running ? <ActivityLine label="Waiting for your Allow" /> : null}
    </div>
  );
}

function ActivityLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
      <span className="chat-spinner" aria-hidden="true" />
      <span className="chat-shimmer">{label}</span>
      <span className="chat-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

function ToolTrace({ status }: { status: "ok" | "skipped" }) {
  return (
    <div className="mb-4 rounded-md border border-line bg-canvas px-2.5 py-1.5 font-mono text-[10.5px]">
      <span className={status === "ok" ? "text-success" : "text-ink-muted"}>{status === "ok" ? "✓" : "–"}</span>{" "}
      <span className="text-ink">http_send</span> <span className="text-ink-muted">·</span>{" "}
      <span className="text-method-patch">PATCH</span> <span className="text-hl-path">/api/orders/4812/status</span>{" "}
      {status === "ok" ? <span className="text-success">200</span> : <span className="text-ink-muted">not sent</span>}
    </div>
  );
}

export function AssistantRail({
  mode,
  onModeChange,
  tab,
  onTabChange,
  approval,
  busy,
  armed,
  onAllow,
  onDeny,
  onReplay,
  onStop,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  tab: RailTab;
  onTabChange: (tab: RailTab) => void;
  approval: ApprovalState;
  busy: boolean;
  armed: boolean;
  onAllow: () => void;
  onDeny: () => void;
  onReplay: () => void;
  onStop: () => void;
}) {
  const tabs: { value: RailTab; label: string }[] = [
    { value: "findings", label: "Findings" },
    { value: "plan", label: "Plan" },
    { value: "agent", label: "Agent" },
    { value: "context", label: "Context" },
  ];

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-surface">
      <header className="flex h-10 shrink-0 items-center gap-2 border-b border-line px-2">
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-ink">
          <AppIcon name="sparkle" size={14} className="text-accent-fg" />
          AI Assistant
        </span>
        {armed ? (
          <span className="shrink-0 rounded bg-accent/[0.12] px-1.5 py-0.5 text-[9px] uppercase text-accent-fg">Armed</span>
        ) : null}
        <div className="ml-auto flex items-center gap-1">
          <ModeSwitcher value={mode} onChange={onModeChange} />
          <span className="flex size-7 items-center justify-center text-ink-muted">
            <AppIcon name="sliders" size={13} />
          </span>
          <span className="rounded px-1.5 py-0.5 text-[11px] text-ink-muted">Chats</span>
          <span className="flex size-7 items-center justify-center text-[15px] text-ink-muted">+</span>
          <span className="flex size-6 items-center justify-center text-ink-muted">
            <AppIcon name="expand" size={12} />
          </span>
          <span className="flex size-6 items-center justify-center text-[14px] text-ink-muted">×</span>
        </div>
      </header>

      <div role="tablist" aria-label="Assistant" className="flex shrink-0 border-b border-line px-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => onTabChange(t.value)}
            className={`tab-underline ${tab === t.value ? "tab-underline-active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="thin-scroll min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {tab === "findings" ? (
          approval === "allowed" ? (
            <div className="rounded-md border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-danger/[0.18] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-danger">
                  High
                </span>
                <span className="text-[12px] text-ink">Order status changed by a non-owner</span>
              </div>
              <p className="mt-1.5 font-mono text-[10.5px] text-hl-path">PATCH /api/orders/:id/status</p>
            </div>
          ) : (
            <p className="text-[12px] text-ink-muted">No findings yet.</p>
          )
        ) : null}

        {tab === "context" ? (
          <dl className="space-y-2 text-[11px]">
            <Row k="Target" v={demoHost} mono />
            <Row k="Scope" v={scopeSummary.replace("Scope: ", "")} />
            <Row k="Principals" v={roles.map((r) => r.name).join(", ")} />
            <Row k="Model" v="Your own key or a local model" />
          </dl>
        ) : null}

        {tab === "plan" ? (
          <div>
            <Message who="You">Plan tests for the order endpoints.</Message>
            <p className="mb-1 text-[10px] font-semibold text-ink">Assistant</p>
            <p className="mb-2.5 text-[13px] leading-[1.6] text-ink">Three tests, highest risk first. Nothing runs until you switch to Agent and Allow it.</p>
            <PlanList />
          </div>
        ) : null}

        {tab === "agent" && mode === "ask" ? <AskThread /> : null}

        {tab === "agent" && mode !== "ask" ? (
          <div>
            <Message who="You">{agentThread.goal}</Message>
            <Message who="Assistant" copy>
              {agentThread.intro}
            </Message>
            {mode === "agent" && approval === "pending" ? <ActivityLine label="Waiting for your Allow" /> : null}
            {mode === "agent" && approval === "idle" && busy ? <ActivityLine label="Preparing request" /> : null}
            {approval === "allowed" ? (
              <>
                <ToolTrace status="ok" />
                <Message who="Assistant" copy>
                  {agentThread.allowed}
                </Message>
              </>
            ) : null}
            {approval === "denied" || approval === "stopped" ? (
              <>
                <ToolTrace status="skipped" />
                <Message who="Assistant">{approval === "denied" ? agentThread.denied : agentThread.stopped}</Message>
              </>
            ) : null}
            {approval === "allowed" || approval === "denied" || approval === "stopped" ? (
              <button type="button" onClick={onReplay} className="app-btn text-[11px] text-ink-muted">
                Run again
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-line p-2">
        <div className="relative rounded-lg border border-line bg-canvas">
          <div className="min-h-[60px] px-3 py-2.5 pr-10 text-[13px] text-ink-muted">
            {mode === "agent" ? "Ask the agent to run the plan…" : "Ask a question or give a command…"}
          </div>
          <div className="absolute bottom-2 right-2">
            {busy ? (
              <button
                type="button"
                onClick={onStop}
                title="Stop"
                aria-label="Stop"
                className="flex size-8 items-center justify-center rounded-full border border-line text-[11px] text-ink-muted transition-colors hover:border-danger/50 hover:text-danger"
              >
                ■
              </button>
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-ink opacity-90">
                <AppIcon name="send" size={14} />
              </span>
            )}
          </div>
        </div>
      </div>

      {mode === "agent" && approval === "pending" ? (
        <div className="approval-in absolute inset-0 z-10 flex items-end justify-center bg-black/[0.72] p-3">
          <ApprovalCard state="pending" onAllow={onAllow} onDeny={onDeny} />
        </div>
      ) : null}
    </div>
  );
}

function Row({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt className="w-20 shrink-0 text-ink-muted">{k}</dt>
      <dd className={`min-w-0 text-ink ${mono ? "font-mono" : ""}`}>{v}</dd>
    </div>
  );
}

export type { ApprovalState };
