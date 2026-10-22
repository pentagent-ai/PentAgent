"use client";

import type { ReactNode } from "react";
import { AppIcon, type IconName } from "@/components/workbench/icons";
import { allColumns, compactColumns, HistoryList } from "@/components/workbench/history-list";
import { CodeBox } from "@/components/workbench/raw-block";
import { methodPillClass, statusDot, statusTone } from "@/components/workbench/tones";
import {
  demoHost,
  type HistoryEntry,
  linkedFlows,
  paramsFor,
  sitemapPages,
} from "@/lib/demo-data";

export type ToolTab = "proxy" | "repeater" | "intruder" | "scanner";

export function ToolTabs({ active, onSelect }: { active: ToolTab | null; onSelect: (t: ToolTab) => void }) {
  const tabs: { value: ToolTab; label: string; icon: IconName; live: boolean }[] = [
    { value: "proxy", label: "Proxy", icon: "proxy", live: true },
    { value: "repeater", label: "Repeater", icon: "repeater", live: true },
    { value: "intruder", label: "Intruder", icon: "intruder", live: false },
    { value: "scanner", label: "Scanner", icon: "scanner", live: false },
  ];
  return (
    <div className="flex h-[30px] shrink-0 items-end border-b border-line bg-surface px-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          tabIndex={t.live ? 0 : -1}
          onClick={t.live ? () => onSelect(t.value) : undefined}
          className={`flex items-center gap-1.5 border-b-2 px-2.5 pb-1.5 pt-1 text-[12px] ${
            active === t.value
              ? "border-accent text-ink"
              : `border-transparent text-ink-muted ${t.live ? "hover:text-ink" : "cursor-default"}`
          }`}
        >
          <span className={active === t.value ? "text-accent-fg" : "text-disabled"}>
            <AppIcon name={t.icon} size={13} />
          </span>
          {t.label}
        </button>
      ))}
      <span className="px-2 pb-1.5 text-[14px] text-disabled">+</span>
    </div>
  );
}

export type ProxySub = "intercept" | "history";

export function ProxySubTabs({ active, onSelect }: { active: ProxySub; onSelect: (s: ProxySub) => void }) {
  const subs: { value: ProxySub | null; label: string }[] = [
    { value: "intercept", label: "Intercept" },
    { value: "history", label: "HTTP history" },
    { value: null, label: "WebSockets" },
    { value: null, label: "Match / Replace" },
    { value: null, label: "Import" },
  ];
  return (
    <div className="flex h-7 shrink-0 items-end border-b border-line px-1">
      {subs.map((s) => (
        <button
          key={s.label}
          type="button"
          tabIndex={s.value ? 0 : -1}
          onClick={s.value ? () => onSelect(s.value as ProxySub) : undefined}
          className={`tab-underline ${s.value === active ? "tab-underline-active" : ""} ${s.value ? "" : "cursor-default"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export function FilterRow({ count }: { count: number }) {
  return (
    <div className="flex h-[34px] shrink-0 items-center gap-1.5 border-b border-line px-1.5">
      <span className="flex overflow-hidden rounded border border-line text-[10px]">
        <span className="px-1.5 py-1 text-ink-muted">HTTP</span>
        <span className="border-l border-line px-1.5 py-1 text-ink-muted">HTTPS</span>
      </span>
      <span className="app-field flex w-[92px] items-center justify-between text-[10px] text-ink">
        Domain <span className="text-[8px] text-ink-muted">▼</span>
      </span>
      <span className="app-field min-w-0 flex-1 truncate text-[10.5px] text-disabled">⌕ Search requests…</span>
      <span className="app-btn shrink-0 text-[10px] text-ink-muted">≡ Filter</span>
      <span className="shrink-0 font-mono text-[10px] text-ink-muted">{count}</span>
    </div>
  );
}

function EditorHeader({ label, right }: { label: string; right?: ReactNode }) {
  return (
    <div className="flex h-[26px] shrink-0 items-center gap-1 border-b border-line px-1.5">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-ink">{label}</span>
      <span className="border-b-2 border-accent px-1 pb-0.5 pt-1 text-[10.5px] text-ink">Pretty</span>
      <span className="px-1 pb-0.5 pt-1 text-[10.5px] text-ink-muted">Raw</span>
      <span className="px-1 pb-0.5 pt-1 text-[10.5px] text-ink-muted">Hex</span>
      <span className="ml-auto flex items-center gap-1.5 text-ink-muted">
        {right}
        <AppIcon name="columns" size={11} />
        <AppIcon name="expand" size={11} />
      </span>
    </div>
  );
}

export function MessagePane({
  label,
  headers,
  body,
  empty,
  json,
}: {
  label: "Request" | "Response";
  headers: readonly string[];
  body: readonly string[];
  empty?: string;
  json?: boolean;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface">
      <EditorHeader
        label={label}
        right={
          json ? (
            <span className="rounded border border-line px-1 text-[9px] uppercase text-ink-muted">Json</span>
          ) : undefined
        }
      />
      <div className="thin-scroll min-h-0 flex-1 overflow-hidden px-1.5 pb-1.5">
        {empty ? (
          <p className="px-1 py-3 text-[11.5px] leading-relaxed text-ink-muted">{empty}</p>
        ) : (
          <>
            <p className="pb-1 pt-1.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Headers</p>
            <CodeBox lines={headers} />
            {body.length ? (
              <>
                <p className="pb-1 pt-2 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Body</p>
                <CodeBox lines={body} />
              </>
            ) : null}
          </>
        )}
      </div>
      <div className="flex h-[22px] shrink-0 items-center gap-3 border-t border-line px-2 text-ink-muted">
        <AppIcon name="copy" size={11} />
        <AppIcon name="list" size={11} />
        <AppIcon name="wrap" size={11} />
      </div>
    </div>
  );
}

export function HistoryPane({
  rows,
  selectedId,
  onSelect,
  animateIds,
  narrow,
}: {
  rows: readonly HistoryEntry[];
  selectedId: number;
  onSelect: (id: number) => void;
  animateIds: ReadonlySet<number>;
  narrow?: boolean;
}) {
  return (
    <div className="thin-scroll min-h-0 flex-1 overflow-hidden bg-surface">
      <HistoryList
        rows={rows}
        selectedId={selectedId}
        onSelect={onSelect}
        columns={narrow ? compactColumns : allColumns}
        animateIds={animateIds}
      />
    </div>
  );
}

export function InterceptPane() {
  return (
    <div className="m-1.5 rounded-md border border-line bg-surface p-2.5">
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink">
        <span className="rounded-md border border-line bg-canvas px-2.5 py-1.5 text-[12px] font-semibold">
          Intercept is off
        </span>
        <Check label="Intercept requests" />
        <Check label="Intercept responses" />
        <Check label="Don't intercept static (css/js/images/fonts)" checked />
      </div>
      <p className="mt-2.5 text-[11px] text-ink-muted">
        When Intercept is <b className="text-ink">on</b>, matching traffic pauses in the browser until you{" "}
        <b className="text-ink">Forward</b> or <b className="text-ink">Drop</b> it.
      </p>
      <p className="mt-2.5 rounded-md border border-line bg-canvas px-2.5 py-2 text-[12px] text-ink-muted">
        Intercept is <b className="text-ink">off</b>: traffic flows and appears in HTTP history.
      </p>
    </div>
  );
}

function Check({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-ink">
      <span
        className={`flex size-3 items-center justify-center rounded-[3px] border text-[8px] ${
          checked ? "border-info bg-info text-canvas" : "border-ink-muted"
        }`}
      >
        {checked ? "✓" : ""}
      </span>
      <span className={checked ? "text-ink-muted" : ""}>{label}</span>
    </span>
  );
}

export function RepeaterPane({
  allowed,
  headers,
  body,
  responseHeaders,
  responseBody,
}: {
  allowed: boolean;
  headers: readonly string[];
  body: readonly string[];
  responseHeaders: readonly string[];
  responseBody: readonly string[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-7 shrink-0 items-end border-b border-line px-1">
        <span className="border-b-2 border-accent bg-raised px-2 pb-1 pt-1 text-[11px] text-ink">PATCH /api/orders/48…</span>
        <span className="px-2 pb-1 text-[13px] text-disabled">+</span>
        <span className="ml-auto flex items-center gap-1 pb-1 text-[10.5px] text-ink-muted">
          <span className="size-2.5 rounded-[2px] border border-ink-muted" /> Follow redirects
        </span>
      </div>
      <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-line px-1.5">
        <span className="app-field flex w-[66px] items-center justify-between text-[11.5px] text-ink">
          PATCH <span className="text-[8px] text-ink-muted">▼</span>
        </span>
        <span className="app-field min-w-0 flex-1 truncate font-mono text-[12px] text-ink">
          https://{demoHost}/api/orders/4812/status
        </span>
        <span className="app-btn app-btn-primary px-3 py-1.5 text-[12px]">Send</span>
        <span className="app-btn text-[10.5px]">Send w/o CL</span>
      </div>
      <div className="flex h-7 shrink-0 items-center gap-2 px-1.5 text-[10.5px]">
        <span className={methodPillClass("PATCH")}>PATCH</span>
        <span className="truncate font-mono text-ink-muted">https://{demoHost}/api/orders/4812/status</span>
        {allowed ? (
          <span className="font-mono font-semibold text-success">200</span>
        ) : (
          <span className="rounded bg-raised px-1.5 font-mono text-[9.5px] text-ink-muted">not sent</span>
        )}
        <span className="ml-auto text-ink-muted">{allowed ? "RESPONSE · 200 · 84ms · 96 B" : "RESPONSE · —"}</span>
      </div>
      <div className="flex min-h-0 flex-1 gap-1.5 px-1.5 pb-1.5">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded border border-line">
          <MessagePane label="Request" headers={headers} body={body} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded border border-line">
          <MessagePane
            label="Response"
            headers={responseHeaders}
            body={responseBody}
            json
            empty={allowed ? undefined : "Not sent. Agent requests wait for your Allow before they reach the target."}
          />
        </div>
      </div>
    </div>
  );
}

export function SitemapPane({ allowed }: { allowed: boolean }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line px-1.5 text-[11px]">
        <span className="app-field w-[140px] truncate font-mono text-[11px] text-ink">http://{demoHost}/</span>
        <span className="app-btn app-btn-primary text-[11px]">Open lab browser</span>
        <span className="text-ink-muted">Proxy mode</span>
        <span className="app-field text-[11px] text-ink">Required ▾</span>
        <span className="app-btn text-[11px]">Refresh map</span>
        <span className="ml-auto shrink-0 text-[10.5px] text-ink-muted">4 pages · 6 controls · 4 linked flows</span>
      </div>
      <div className="flex min-h-0 flex-[1.1] border-b border-line">
        <div className="w-[190px] shrink-0 border-r border-line bg-surface">
          <p className="border-b border-line px-1.5 py-1 text-[9.5px] font-semibold uppercase tracking-wide text-ink-muted">
            Pages
          </p>
          <div className="grid grid-cols-[1fr_auto] border-b border-line px-1.5 py-1 text-[10px] font-semibold text-ink">
            <span>URL</span>
            <span>Title</span>
          </div>
          {sitemapPages.map((p, i) => (
            <div
              key={p.url}
              className={`grid grid-cols-[minmax(0,1fr)_auto] gap-2 px-1.5 py-1 text-[11px] ${i === 0 ? "bg-accent/[0.12]" : ""}`}
            >
              <span className="truncate font-mono text-ink">{p.url}</span>
              <span className="truncate text-ink-muted">{p.title}</span>
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-surface">
          <p className="border-b border-line px-1.5 py-1 text-[9.5px] font-semibold uppercase tracking-wide text-ink-muted">
            Linked flows <span className="font-normal normal-case tracking-normal text-disabled">(page → control → requests / route)</span>
          </p>
          <table className="w-full table-fixed text-left text-[10.5px]">
            <thead>
              <tr className="text-ink">
                <th className="w-[74px] px-1.5 py-1 font-semibold">From</th>
                <th className="w-[96px] px-1.5 py-1 font-semibold">Control</th>
                <th className="px-1.5 py-1 font-semibold">Network</th>
                <th className="w-[74px] px-1.5 py-1 font-semibold">Effect</th>
                <th className="w-[64px] px-1.5 py-1 font-semibold">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {linkedFlows.map((f, i) => (
                <tr key={f.control} className={`border-t border-line ${i === 0 ? "bg-accent/[0.12]" : ""}`}>
                  <td className="truncate px-1.5 py-1 text-ink">{f.from}</td>
                  <td className="truncate px-1.5 py-1 text-ink">{f.control}</td>
                  <td className="truncate px-1.5 py-1 font-mono text-hl-path">{f.network}</td>
                  <td className="truncate px-1.5 py-1 text-ink-muted">{f.effect}</td>
                  <td className={`px-1.5 py-1 ${f.confidence === "High" ? "text-success" : "text-warn"}`}>{f.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="min-h-0 flex-1 bg-surface">
        <p className="border-b border-line px-1.5 py-1 text-[9.5px] font-semibold uppercase tracking-wide text-ink-muted">
          Linked requests
        </p>
        <table className="w-full table-fixed text-left text-[11px]">
          <thead className="text-ink-muted">
            <tr>
              {["#", "Method", "URL", "Status code", "Source"].map((h, i) => (
                <th
                  key={h}
                  className={`px-1.5 py-1 text-[9.5px] font-semibold uppercase tracking-wide ${
                    i === 0 ? "w-[28px]" : i === 1 ? "w-[62px]" : i === 3 ? "w-[84px]" : i === 4 ? "w-[66px]" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { m: "GET" as const, u: "/api/orders/4812", s: 200, src: "proxy" },
              ...(allowed ? [{ m: "PATCH" as const, u: "/api/orders/4812/status", s: 200, src: "repeater" }] : []),
            ].map((r, i) => (
              <tr key={r.u} className="border-t border-line">
                <td className="px-1.5 py-[3px] font-mono text-ink-muted">{i + 1}</td>
                <td className="px-1.5 py-[3px]">
                  <span className={methodPillClass(r.m)}>{r.m}</span>
                </td>
                <td className="truncate px-1.5 py-[3px] font-mono text-ink">{r.u}</td>
                <td className={`px-1.5 py-[3px] font-mono font-semibold ${statusTone(r.s)}`}>
                  <span className={`status-dot ${statusDot(r.s)}`} />
                  {r.s}
                </td>
                <td className="px-1.5 py-[3px]">
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] uppercase ${
                      r.src === "proxy" ? "chip-proxy" : "chip-repeater"
                    }`}
                  >
                    {r.src}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Inspector({ entry }: { entry: HistoryEntry | null }) {
  const params = entry ? paramsFor(entry) : [];
  return (
    <aside className="flex h-full w-[112px] shrink-0 flex-col border-l border-line bg-surface">
      <div className="flex h-[30px] items-center justify-between border-b border-line px-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink">Inspector</span>
        <span className="text-[12px] text-ink-muted">×</span>
      </div>
      {entry ? (
        <>
          <div className="p-1.5">
            <span className="app-field flex items-center justify-between text-[10.5px] text-ink">
              Request <span className="text-[8px] text-ink-muted">▼</span>
            </span>
          </div>
          <div className="flex border-b border-line text-[10px]">
            <span className="border-b-2 border-accent px-1.5 py-1 text-ink">Params</span>
            <span className="px-1.5 py-1 text-ink-muted">Cookies</span>
          </div>
          <div className="p-1.5">
            {params.length ? (
              params.map((p) => (
                <div key={p.name} className="flex justify-between gap-1 py-0.5 text-[10px]">
                  <span className="font-mono font-semibold text-accent-fg">{p.name}</span>
                  <span className="truncate text-ink">{p.value}</span>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-ink-muted">No params.</p>
            )}
          </div>
        </>
      ) : (
        <p className="p-2 text-[10.5px] leading-relaxed text-ink-muted">
          Select a message to inspect params, cookies, and headers.
        </p>
      )}
    </aside>
  );
}

export function BottomDock({ requests, findings, latest }: { requests: number; findings: number; latest: string }) {
  return (
    <div className="flex h-[96px] shrink-0 flex-col border-t border-line bg-surface">
      <div className="flex h-6 items-end border-b border-line px-1 text-[10px]">
        <span className="border-b-2 border-accent px-1.5 pb-1 text-accent-fg">Overview</span>
        <span className="px-1.5 pb-1 text-ink-muted">Sitemap</span>
        <span className="px-1.5 pb-1 text-ink-muted">Principals</span>
        <span className="px-1.5 pb-1 text-ink-muted">Notes</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 divide-x divide-line">
        <div className="p-1.5">
          <p className="flex justify-between text-[10.5px] font-semibold text-ink">
            Target Overview <span className="font-normal text-accent-fg">Open</span>
          </p>
          <p className="mt-1.5 font-mono text-[10.5px] text-ink">{demoHost}</p>
          <p className="mt-0.5 text-[10px] text-ink-muted">4 pages · {requests} requests</p>
        </div>
        <div className="p-1.5">
          <p className="text-[10.5px] font-semibold text-ink">
            Findings <span className="font-normal text-ink-muted">{findings}</span>
          </p>
          {findings ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-ink">
              <span className="rounded bg-danger/[0.18] px-1 text-[9px] font-semibold uppercase text-danger">High</span>
              <span className="truncate">Order status by non-owner</span>
            </p>
          ) : (
            <p className="mt-1.5 text-[10.5px] text-ink-muted">No findings yet.</p>
          )}
        </div>
        <div className="p-1.5">
          <p className="text-[10.5px] font-semibold text-ink">Recent Activity</p>
          <p className="mt-1.5 truncate font-mono text-[10px] text-ink-muted">{latest}</p>
        </div>
      </div>
    </div>
  );
}
