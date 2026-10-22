// Capture-area pieces (Proxy tab). Each mirrors the app file named above it. Demo data only.
import type { ReactNode } from "react";
import { Spot } from "./app-window";
import * as L from "./labels";
import { MessagePane, TabBar, demo } from "./pieces";

const proxyUrl = "http://127.0.0.1:8088";

function Box({ on, children, muted }: { on: boolean; children: ReactNode; muted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] ${muted ? "text-[var(--muted)]" : ""}`}>
      <span className={`inline-flex size-3 items-center justify-center rounded-[3px] border text-[9px] leading-none ${on ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border-strong)]"}`}>{on ? "✓" : ""}</span>
      {children}
    </span>
  );
}
function Field({ children, mono, grow }: { children: ReactNode; mono?: boolean; grow?: boolean }) {
  return <span className={`inline-block rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[12px] ${mono ? "font-mono" : ""} ${grow ? "flex-1" : ""}`}>{children}</span>;
}
function Placeholder({ children }: { children: ReactNode }) {
  return <span className="text-[var(--disabled)]">{children}</span>;
}

/** Proxy tool tab + its sub-tabs (WorkspaceToolTabs + ProxyPane sub-tab strip). */
export function ProxyTabs({ active, pending = 0 }: { active: (typeof L.proxySubTabs)[number]; pending?: number }) {
  const subs = L.proxySubTabs.map((t) => (t === "Intercept" && pending ? `Intercept (${pending})` : t));
  return (
    <>
      <TabBar tabs={L.toolTabs} icons plus active="Proxy" />
      <TabBar id="proxy-subtabs" tabs={subs} active={active === "Intercept" && pending ? `Intercept (${pending})` : active} />
    </>
  );
}

/* ---------- panes/ProxyPane.tsx — Intercept sub-tab ---------- */
const held = [
  { phase: "request", method: "POST", host: demo.host, path: "/api/cart/items" },
  { phase: "request", method: "GET", host: demo.host, path: "/api/products?page=2" },
];
export function InterceptPanel({ state }: { state: "off" | "waiting" | "held" }) {
  const i = L.intercept;
  const on = state !== "off";
  return (
    <div className="bg-[var(--bg)]">
      <ProxyTabs active="Intercept" pending={state === "held" ? held.length : 0} />
      <div className="m-2 rounded border border-[var(--border)] bg-[var(--panel)] p-3">
        {state === "held" ? <p className="mb-2.5 rounded border border-[var(--warn)]/40 bg-[var(--warn)]/10 px-2.5 py-1.5 text-[12px] font-medium text-[var(--warn)]">{i.bannerOn(held.length)}</p> : null}
        {on ? <p className="mb-2.5 text-[11.5px] text-[var(--muted)]">{i.labLinked}</p> : null}
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Spot id="intercept-toggle" n={1}>
            <span className={`inline-block rounded px-3 py-1.5 text-[13px] font-semibold ${on ? "bg-[var(--warn)] text-[var(--accent-ink)]" : "border border-[var(--border)] bg-[var(--bg)]"}`}>{on ? i.toggle.on : i.toggle.off}</span>
          </Spot>
          <Spot id="intercept-options" n={2}>
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
              <Box on>{i.options.requests}</Box>
              <Box on={false}>{i.options.responses}</Box>
              <Box on muted>{i.options.static}</Box>
              <Box on muted>{i.options.noise}</Box>
              <Box on muted>{i.options.inScope}</Box>
              <Box on={false}>{i.options.ws}</Box>
            </span>
          </Spot>
        </div>
        <Spot id="intercept-rules" n={3} block className="mb-2.5 rounded border border-[var(--border)] bg-[var(--bg)] p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[12px] font-medium">{i.rules.title}</p>
            <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px]">{i.rules.add}</span>
          </div>
          <p className="text-[11px] text-[var(--muted)]">{i.rules.help}</p>
          <p className="mt-1 text-[11px] text-[var(--muted)]">{i.rules.empty}</p>
        </Spot>
        {state === "off" ? (
          <p className="rounded border border-dashed border-[var(--border)] bg-[var(--bg)] p-3 text-[13px] text-[var(--muted)]">{i.offState}</p>
        ) : state === "waiting" ? (
          <div className="rounded border border-dashed border-[var(--warn)]/50 bg-[var(--warn)]/10 p-3 text-[13px]">
            <p>{i.waiting(proxyUrl)}</p>
            <span className="mt-2 inline-block rounded border border-[var(--border)] px-2 py-1 text-[12px]">{i.copyUrl}</span>
          </div>
        ) : (
          <div className="grid gap-2 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Spot id="intercept-queue" n={4} block className="flex flex-col gap-1.5">
              <div className="flex gap-2">
                <span className="rounded bg-[var(--success)] px-2 py-1 text-[12px] text-[var(--accent-ink)]">{i.forwardAll}</span>
                <span className="rounded border border-[var(--critical)]/40 px-2 py-1 text-[12px] text-[var(--critical)]">{i.dropAll}</span>
              </div>
              {held.map((h, n) => (
                <span key={h.path} className={`block rounded border px-2 py-1.5 text-[12px] ${n === 0 ? "border-[var(--accent)] bg-[var(--accent-dim)]" : "border-[var(--border)] bg-[var(--bg)]"}`}>
                  <span className="text-[var(--muted)]">→ </span><span className="font-semibold">{h.method}</span> {h.host}
                  <span className="block truncate font-mono text-[11px] text-[var(--muted)]">{h.path}</span>
                </span>
              ))}
            </Spot>
            <div className="flex min-w-0 flex-col gap-1.5">
              <Spot id="intercept-actions" n={5}>
                <span className="inline-flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[var(--success)] px-2 py-1 text-[12px] text-[var(--accent-ink)]">{i.forward}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-1 text-[12px]">{i.forwardNext}</span>
                  <span className="rounded border border-[var(--critical)]/40 px-2 py-1 text-[12px] text-[var(--critical)]">{i.drop}</span>
                  <span className="text-[11px] text-[var(--muted)]">{i.phase("request")}</span>
                </span>
              </Spot>
              <div className="flex gap-1.5"><Field mono>POST</Field><Field mono grow>http://{demo.host}/api/cart/items</Field></div>
              <MessagePane id="intercept-editor" title="Request" lines={["POST /api/cart/items HTTP/1.1", `Host: ${demo.host}`, "Content-Type: application/json", "", '{"sku":"DEMO-001","qty":1}']} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- panes/ProxyPane.tsx — HTTP history; components/TrafficTable.tsx ---------- */
const rows = [
  { n: 7, m: "GET", u: `http://${demo.host}/api/products?page=2`, s: 200, l: "4,812", t: "10:42:18", src: "proxy" },
  { n: 6, m: "POST", u: `http://${demo.host}/api/cart/items`, s: 201, l: "312", t: "10:42:11", src: "proxy" },
  { n: 5, m: "GET", u: `http://${demo.host}/api/cart`, s: 200, l: "1,204", t: "10:42:09", src: "proxy" },
  { n: 4, m: "GET", u: `http://${demo.host}/account`, s: 302, l: "0", t: "10:41:57", src: "proxy" },
  { n: 3, m: "POST", u: `http://${demo.host}/api/login`, s: 401, l: "88", t: "10:41:50", src: "proxy" },
  { n: 2, m: "GET", u: `http://${demo.host}/`, s: 200, l: "18,330", t: "10:41:44", src: "proxy" },
];
const methodColor: Record<string, string> = { GET: "text-[var(--method-get)]", POST: "text-[var(--method-post)]" };
export function HistoryPanel({ selected = 6, hostChip = false }: { selected?: number; hostChip?: boolean }) {
  const h = L.history;
  return (
    <div className="bg-[var(--bg)]">
      <ProxyTabs active="HTTP history" />
      <div className="flex flex-col gap-1 p-1.5">
        {hostChip ? (
          <Spot id="host-chip"><span className="inline-flex items-center gap-2 px-0.5 text-[10px] text-[var(--muted)]">{h.hostChip} <code className="text-[var(--accent-fg)]">{demo.host}</code><span className="text-[var(--accent-fg)] underline">{h.clear}</span></span></Spot>
        ) : null}
        <Spot id="history-toolbar" n={1} block className="flex flex-nowrap items-center gap-1.5">
          <span className="flex shrink-0 gap-0.5 rounded border border-[var(--border)] p-0.5">{h.protocol.map((p) => <span key={p} className="rounded px-1.5 py-0.5 text-[10px] text-[var(--muted)]">{p}</span>)}</span>
          <span className="shrink-0 rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[10px]">{h.domain} ▾</span>
          <span className="min-w-0 flex-1 truncate rounded border border-[var(--border)] bg-[var(--bg)] py-0.5 pl-2 text-[11px] text-[var(--disabled)]">⌕ {h.search}</span>
          <Spot id="filter-button"><span className="inline-block rounded border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)]">⏷ {h.filter}</span></Spot>
          <span className="shrink-0 text-[10px] text-[var(--disabled)]">{rows.length}</span>
        </Spot>
        <p className="px-1 text-[10px] text-[var(--muted)]">{h.showing(rows.length, rows.length)}</p>
        <Spot id="history-table" n={2} block className="overflow-hidden border border-[var(--border)]">
          <table className="w-full table-fixed text-[11px]">
            <thead className="bg-[var(--panel)] text-left text-[10px] text-[var(--muted)]">
              <tr>{h.columns.map((c, i) => <th key={c} className={`px-1.5 py-1 font-medium ${i === 2 ? "w-auto" : i === 0 ? "w-7" : "w-[11%]"} ${i === 5 ? "max-[560px]:hidden" : ""} ${i === 6 ? "max-[700px]:hidden" : ""}`}>{c}</th>)}</tr>
            </thead>
            <tbody className="font-mono">
              {rows.map((r) => (
                <tr key={r.n} className={`border-t border-[var(--border)] ${r.n === selected ? "bg-[var(--accent-dim)]" : ""}`}>
                  <td className="px-1.5 py-[3px] text-[var(--muted)]">{r.n}</td>
                  <td className={`px-1.5 ${methodColor[r.m] ?? ""}`}>{r.m}</td>
                  <td className="truncate px-1.5">{r.u}</td>
                  <td className={`px-1.5 ${r.s >= 400 ? "text-[var(--warn)]" : ""}`}>{r.s}</td>
                  <td className="px-1.5 text-[var(--muted)]">{r.l}</td>
                  <td className="px-1.5 text-[var(--muted)] max-[560px]:hidden">{r.t}</td>
                  <td className="px-1.5 text-[var(--muted)] max-[700px]:hidden">{r.src}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spot>
        <Spot id="history-viewer" n={3} block className="relative flex gap-1">
          <MessagePane title="Request" lines={["POST /api/cart/items HTTP/1.1", `Host: ${demo.host}`, "Content-Type: application/json", "", '{"sku":"DEMO-001","qty":1}']} />
          <MessagePane title="Response" lines={["HTTP/1.1 201 Created", "Content-Type: application/json", "Content-Length: 312", "", '{"cart":{"items":1}}']} />
          <Spot id="send-to-repeater"><span className="absolute right-1.5 top-1 rounded border border-[var(--border)] bg-[var(--panel)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]" title={h.sendToRepeater}>➤</span></Spot>
        </Spot>
      </div>
    </div>
  );
}

/* ---------- components/TrafficFilterModal.tsx + HistoryFilters.tsx ---------- */
export function HistoryFiltersDialog() {
  const f = L.filters;
  const head = "mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--disabled)]";
  return (
    <div className="flex justify-center bg-[var(--bg)] p-4">
      <div className="w-full max-w-[560px] rounded-lg border border-[var(--border)] bg-[var(--panel)] shadow-[var(--modal-shadow)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
          <div><p className="text-[13px] font-semibold">{f.title}</p><p className="text-[11px] text-[var(--muted)]">{f.none} · 6 rows</p></div>
          <span className="text-[var(--muted)]">×</span>
        </div>
        <div className="space-y-3 p-3">
          <Spot id="quick-filters" n={1} block>
            <p className={head}>{f.quick}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex gap-0.5 rounded border border-[var(--border)] p-0.5">{f.protocol.map((p, i) => <span key={p} className={`rounded px-2 py-1 text-[11px] ${i === 0 ? "bg-[var(--accent-soft)] text-[var(--accent-fg)]" : "text-[var(--muted)]"}`}>{p}</span>)}</span>
              <Field>{f.allDomains} ▾</Field>
            </div>
          </Spot>
          <Spot id="history-filters" n={2} block>
            <p className={head}>{f.history}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <Field><Placeholder>{f.hostContains}</Placeholder></Field>
              <Field><Placeholder>{f.method}</Placeholder></Field>
              <Field><Placeholder>{f.status}</Placeholder></Field>
              <Field>{f.statusClass} ▾</Field>
              <Field><Placeholder>{f.searchPath}</Placeholder></Field>
              <Box on muted>{f.hideStatic}</Box>
              <Box on muted>{f.hideNoise}</Box>
              <Box on={false} muted>{f.legacy}</Box>
              <Box on muted>{f.hideCdn}</Box>
              <Spot id="scope-select"><Field>{f.scope[1]} ▾</Field></Spot>
              <span className="rounded border border-[var(--border)] px-2 py-1 text-[12px]">{f.refresh}</span>
              <Spot id="clear-history"><span className="inline-block rounded border border-[var(--critical)]/40 px-2 py-1 text-[12px] text-[var(--critical)]">{f.clearHistory}</span></Spot>
            </div>
          </Spot>
          <Spot id="columns" n={3} block>
            <p className={head}>{f.columns}</p>
            <div className="flex flex-wrap gap-1">{L.history.allColumns.slice(0, 12).map((c) => <span key={c} className={`rounded border px-1.5 py-0.5 text-[10.5px] ${L.history.columns.includes(c) ? "border-[var(--accent-border)] text-[var(--accent-fg)]" : "border-[var(--border)] text-[var(--muted)]"}`}>{c}</span>)}<span className="px-1 text-[10.5px] text-[var(--muted)]">…</span></div>
          </Spot>
        </div>
        <div className="flex justify-end border-t border-[var(--border)] px-3 py-2"><span className="rounded bg-[var(--accent)] px-3 py-1 text-[12px] text-[var(--accent-ink)]">{f.done}</span></div>
      </div>
    </div>
  );
}

/* ---------- panes/ProxyPane.tsx — WebSockets; components/WebSocketTable.tsx ---------- */
const frames = [
  { d: "←", type: "text", p: `${demo.host}/ws/notifications`, t: "10:43:02" },
  { d: "→", type: "text", p: `${demo.host}/ws/notifications`, t: "10:43:01" },
  { d: "←", type: "binary", p: `${demo.host}/ws/notifications`, t: "10:42:58" },
];
export function WebSocketsPanel() {
  const w = L.websockets;
  return (
    <div className="bg-[var(--bg)]">
      <ProxyTabs active="WebSockets" />
      <div className="flex flex-col gap-2 p-2">
        <p className="text-[12px] text-[var(--muted)]">{w.intro}</p>
        <Spot id="ws-table" n={1} block className="overflow-hidden rounded border border-[var(--border)]">
          <table className="w-full text-[11px]">
            <thead className="bg-[var(--panel)] text-left text-[10px] text-[var(--muted)]"><tr>{w.columns.map((c) => <th key={c} className="px-2 py-1.5 font-medium">{c}</th>)}</tr></thead>
            <tbody>{frames.map((f, i) => (
              <tr key={i} className={`border-t border-[var(--border)] ${i === 0 ? "bg-[var(--accent-dim)]" : ""}`}>
                <td className="px-2 py-1">{f.d}</td><td className="px-2 text-[var(--muted)]">{f.type}</td><td className="truncate px-2 font-mono">{f.p}</td><td className="px-2 text-[var(--muted)]">{f.t}</td>
              </tr>))}</tbody>
          </table>
        </Spot>
        <Spot id="ws-payload" n={2} block className="flex rounded border border-[var(--border)] bg-[var(--bg)] p-2">
          <MessagePane title="Request" lines={[`GET /ws/notifications`, '{"type":"cart.updated","items":1}']} />
        </Spot>
      </div>
    </div>
  );
}

/* ---------- panes/MatchReplacePanel.tsx ---------- */
export function MatchReplacePanelMock() {
  const m = L.matchReplace;
  return (
    <div className="bg-[var(--bg)]">
      <ProxyTabs active="Match / Replace" />
      <div className="flex flex-col gap-3 p-3 text-[12px]">
        <p className="text-[12px] text-[var(--muted)]">{m.intro}</p>
        <Spot id="mr-form" n={1} block className="grid gap-2 rounded border border-[var(--border)] p-3 md:grid-cols-2">
          <Field><Placeholder>{m.name}</Placeholder></Field>
          <div className="flex gap-2"><Spot id="mr-target"><Field>{m.target[0]} ▾</Field></Spot><Spot id="mr-where"><Field>{m.where[0]} ▾</Field></Spot></div>
          <span className="md:col-span-2"><Field mono grow><Placeholder>{m.match}</Placeholder></Field></span>
          <span className="md:col-span-2"><Field mono grow><Placeholder>{m.replace}</Placeholder></Field></span>
          <Box on={false} muted>{m.regex}</Box>
          <span className="justify-self-end rounded bg-[var(--accent)] px-3 py-1 text-[var(--accent-ink)]">{m.add}</span>
        </Spot>
        <Spot id="mr-rules" n={2} block className="flex flex-col gap-2">
          {[
            { name: "Demo header", match: "^User-Agent: .*$", replace: "User-Agent: PentAgent-demo", tw: "request/headers", re: true, on: true },
            { name: "Beta flag", match: "beta=false", replace: "beta=true", tw: "request/url", re: false, on: false },
          ].map((r) => (
            <span key={r.name} className="flex flex-wrap items-center gap-2 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
              <Box on={r.on}>{m.on}</Box>
              <span className="font-semibold">{r.name}</span>
              <code className="font-mono text-[var(--accent-fg)]">{r.match} → {r.replace}</code>
              <span className="text-[var(--muted)]">{r.tw}{r.re ? " · regex" : ""}</span>
              <span className="ml-auto text-[var(--critical)]">{m.delete}</span>
            </span>
          ))}
        </Spot>
      </div>
    </div>
  );
}

/* ---------- panes/ImportPanel.tsx ---------- */
export function ImportPanelMock({ done = false }: { done?: boolean }) {
  const im = L.importPanel;
  return (
    <div className="bg-[var(--bg)]">
      <ProxyTabs active="Import" />
      <div className="flex max-w-xl flex-col gap-3 p-3 text-[13px]">
        <p className="text-[12px] text-[var(--muted)]">Import a Chrome/Firefox <strong>.har</strong> or proxy <strong>XML</strong> export into this project. Entries become history transactions and map nodes.</p>
        <Spot id="import-file" n={1} block className="flex flex-col items-start gap-2 rounded border border-dashed border-[var(--border)] bg-[var(--panel)] p-5">
          <span className="text-[var(--muted)]">{im.choose}</span>
          <span className="inline-flex items-center gap-2 text-[12px]"><span className="rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5">Browse…</span><span className="text-[var(--muted)]">{done ? "demo-shop.har" : "No file chosen"}</span></span>
        </Spot>
        {done ? <p className="text-[var(--success)]">{im.done(42, demo.host)}</p> : null}
        <Spot id="engagement" n={2} block className="flex flex-col gap-2 rounded border border-[var(--border)] bg-[var(--panel)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">{im.engagement}</p>
          <p className="text-[12px] text-[var(--muted)]">{im.engagementHelp}</p>
          <span className="flex flex-wrap gap-2">
            <span className="rounded border border-[var(--border)] px-3 py-1.5 text-[12px]">{im.export}</span>
            <span className="rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[12px] text-[var(--muted)]">{im.importZip}</span>
          </span>
        </Spot>
      </div>
    </div>
  );
}
