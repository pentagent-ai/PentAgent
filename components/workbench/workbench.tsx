"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantRail, type RailTab } from "@/components/workbench/ai-panel";
import { NavRail, NavRailCollapsed, TopBar, type NavKey } from "@/components/workbench/app-chrome";
import type { ApprovalState } from "@/components/workbench/approval-card";
import type { Mode } from "@/components/workbench/mode-switcher";
import {
  BottomDock,
  FilterRow,
  HistoryPane,
  Inspector,
  InterceptPane,
  MessagePane,
  ProxySubTabs,
  RepeaterPane,
  SitemapPane,
  ToolTabs,
  type ProxySub,
  type ToolTab,
} from "@/components/workbench/panes";
import { ScopePanel } from "@/components/workbench/scope-panel";
import { usePrefersReducedMotion } from "@/components/workbench/use-reduced-motion";
import {
  browseFeed,
  clockFor,
  type HistoryEntry,
  PENDING_PATCH_ID,
  pendingPatch,
  pendingRequestBody,
  pendingRequestHeaders,
  requestHeadersFor,
  responseBodyFor,
  responseHeadersFor,
  seedHistory,
  sentResponseBody,
  sentResponseHeaders,
} from "@/lib/demo-data";

const STREAM_INTERVAL_MS = 1700;
const APPROVAL_DELAY_MS = 2600;
const REDUCED_MOTION_STREAM = 4;

// Native size of the mock app window. It is scaled to fit, the way the app itself runs at 85% zoom.
const WIDE = { w: 1280, h: 780 };
const NARROW = { w: 420, h: 720 };
const NARROW_BREAKPOINT = 720;

type CenterView = "proxy" | "repeater" | "sitemap" | "scope";

function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const initial = el.getBoundingClientRect().width;
    if (initial) setWidth(initial);
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

export function Workbench() {
  const { ref, width } = useFit();
  const narrow = width !== null && width < NARROW_BREAKPOINT;
  const size = narrow ? NARROW : WIDE;
  const scale = width ? Math.min(1, width / size.w) : null;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="workbench-frame relative w-full overflow-hidden rounded-[7px] border border-line-strong bg-canvas"
        style={{ height: scale !== null ? size.h * scale : undefined, aspectRatio: scale !== null ? undefined : `${WIDE.w} / ${WIDE.h}` }}
      >
        <div
          className={`app-scope absolute left-0 top-0 origin-top-left ${scale === null ? "workbench-fit" : ""}`}
          style={{
            width: size.w,
            height: size.h,
            ...(scale !== null ? { transform: `scale(${scale})` } : {}),
          }}
        >
          <WorkbenchApp narrow={narrow} />
        </div>
      </div>
    </div>
  );
}

function WorkbenchApp({ narrow }: { narrow: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [nav, setNav] = useState<NavKey>("proxy");
  const [center, setCenter] = useState<CenterView>("proxy");
  const [proxySub, setProxySub] = useState<ProxySub>("history");
  const [mode, setMode] = useState<Mode>("agent");
  const [railTab, setRailTab] = useState<RailTab>("agent");
  const [running, setRunning] = useState(true);
  const [approval, setApproval] = useState<ApprovalState>("idle");
  const [streamCount, setStreamCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number>(8);
  const [narrowPane, setNarrowPane] = useState<"chat" | "center">("chat");

  const shown = reduced ? REDUCED_MOTION_STREAM : streamCount;

  useEffect(() => {
    if (!running || reduced) return;
    const id = window.setInterval(
      () => setStreamCount((c) => Math.min(c + 1, browseFeed.length)),
      STREAM_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [running, reduced]);

  useEffect(() => {
    if (!running || mode !== "agent" || approval !== "idle") return;
    const id = window.setTimeout(() => setApproval("pending"), APPROVAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [running, mode, approval]);

  const streamed: HistoryEntry[] = browseFeed.slice(0, shown).map((e, i) => ({ ...e, id: 100 + i, at: 18 + i * 2 }));
  const lastAt = streamed.length ? streamed[streamed.length - 1].at : 17;
  const allowed = approval === "allowed";
  const patchRow: HistoryEntry = { ...pendingPatch, at: lastAt + 1 };
  // Newest first, like the app's TIME ↓ sort.
  const rows: HistoryEntry[] = [...(allowed ? [patchRow] : []), ...[...seedHistory, ...streamed].reverse()];
  const animateIds = new Set<number>([...streamed.map((r) => r.id), PENDING_PATCH_ID]);

  const selected = rows.find((r) => r.id === selectedId) ?? null;
  const isPatch = selected?.id === PENDING_PATCH_ID;
  const reqHeaders = selected ? (isPatch ? pendingRequestHeaders : requestHeadersFor(selected)) : [];
  const reqBody = isPatch ? pendingRequestBody : [];
  const resHeaders = selected ? (isPatch ? sentResponseHeaders : responseHeadersFor(selected)) : [];
  const resBody = selected ? (isPatch ? sentResponseBody : responseBodyFor(selected)) : [];

  const armed = mode === "agent" && (approval === "idle" || approval === "pending") && running;
  const findings = allowed ? 1 : 0;
  const latest = allowed
    ? `${clockFor(patchRow.at)} PATCH /api/orders/4812/status 200`
    : rows[0]
      ? `${clockFor(rows[0].at)} ${rows[0].method} ${rows[0].path}`
      : "No recent activity.";

  const changeMode = (m: Mode) => {
    setMode(m);
    setRailTab(m === "plan" ? "plan" : "agent");
  };

  const selectNav = (key: NavKey) => {
    setNav(key);
    if (key === "ask" || key === "plan" || key === "agent") {
      changeMode(key);
      setNarrowPane("chat");
      return;
    }
    if (key === "plans") {
      changeMode("plan");
      setNarrowPane("chat");
      return;
    }
    if (key === "findings") {
      setRailTab("findings");
      setNarrowPane("chat");
      return;
    }
    setNarrowPane("center");
    if (key === "proxy" || key === "history") {
      setCenter("proxy");
      setProxySub("history");
    } else if (key === "repeater") setCenter("repeater");
    else if (key === "sitemap") setCenter("sitemap");
    else if (key === "scope" || key === "target") setCenter("scope");
  };

  const selectTool = (t: ToolTab) => {
    if (t === "proxy" || t === "repeater") {
      setCenter(t);
      setNav(t);
    }
  };

  const allow = () => {
    setApproval("allowed");
    setSelectedId(PENDING_PATCH_ID);
  };
  const deny = () => setApproval("denied");
  const stop = () => {
    setRunning(false);
    if (approval === "idle" || approval === "pending") setApproval(mode === "agent" ? "stopped" : approval);
  };
  const toggleProxy = () => {
    if (running) stop();
    else setRunning(true);
  };
  const replay = () => {
    setApproval("idle");
    setRunning(true);
    setStreamCount(0);
    setSelectedId(8);
    changeMode("agent");
  };

  const toolTab: ToolTab | null = center === "proxy" || center === "repeater" ? center : null;

  const centerPane = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-canvas">
      <ToolTabs active={toolTab} onSelect={selectTool} />
      {center === "proxy" ? (
        <>
          <ProxySubTabs active={proxySub} onSelect={setProxySub} />
          {proxySub === "intercept" ? (
            <div className="min-h-0 flex-1">
              <InterceptPane />
            </div>
          ) : (
            <>
              <FilterRow count={rows.length} />
              <HistoryPane
                rows={rows}
                selectedId={selectedId}
                onSelect={setSelectedId}
                animateIds={animateIds}
                narrow={narrow}
              />
              <div className={`flex shrink-0 gap-px border-t border-line bg-line ${narrow ? "h-[250px] flex-col" : "h-[220px]"}`}>
                {selected ? (
                  <>
                    <MessagePane label="Request" headers={reqHeaders} body={reqBody} />
                    {narrow ? null : <MessagePane label="Response" headers={resHeaders} body={resBody} json />}
                  </>
                ) : (
                  <p className="bg-surface p-3 text-[11px] text-ink-muted">Select a row.</p>
                )}
              </div>
            </>
          )}
        </>
      ) : null}
      {center === "repeater" ? (
        <RepeaterPane
          allowed={allowed}
          headers={pendingRequestHeaders.slice(0, 5)}
          body={pendingRequestBody}
          responseHeaders={sentResponseHeaders}
          responseBody={sentResponseBody}
        />
      ) : null}
      {center === "sitemap" ? <SitemapPane allowed={allowed} /> : null}
      {center === "scope" ? (
        <div className="flex min-h-0 flex-1 gap-1.5 p-1.5">
          <div className="w-[230px] shrink-0">
            <ScopePanel />
          </div>
          <div className="min-w-0 flex-1 rounded-md border border-line bg-surface p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink">Sitemap</p>
            <ul className="mt-2 space-y-0.5 font-mono text-[11px] text-ink">
              {["/", "/api/auth/login", "/api/cart/items", "/api/checkout", "/api/orders", "/api/orders/{id}", "/api/orders/{id}/invoice", "/api/orders/{id}/status", "/api/admin/users"].map(
                (p) => (
                  <li key={p} className="flex items-center gap-1.5 rounded px-1 py-0.5 hover:bg-canvas">
                    <span className="text-disabled">▸</span>
                    <span className={p.includes("status") ? "text-accent-fg" : ""}>{p}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      ) : null}
      {narrow ? null : <BottomDock requests={rows.length} findings={findings} latest={latest} />}
    </div>
  );

  const rail = (
    <AssistantRail
      mode={mode}
      onModeChange={changeMode}
      tab={railTab}
      onTabChange={(t) => {
        setRailTab(t);
        if (t === "plan") setMode("plan");
        else if (t === "agent" && mode === "plan") setMode("agent");
      }}
      approval={approval}
      busy={armed}
      armed={armed}
      onAllow={allow}
      onDeny={deny}
      onReplay={replay}
      onStop={stop}
    />
  );

  if (narrow) {
    const narrowNav: NavKey = narrowPane === "chat" ? (["ask", "plan", "agent"].includes(nav) ? nav : mode) : nav;
    return (
      <div className="flex h-full flex-col bg-canvas text-ink">
        <TopBar running={running} onToggleProxy={toggleProxy} findings={findings} narrow />
        <div className="flex min-h-0 flex-1">
          <NavRailCollapsed active={narrowNav} onSelect={selectNav} running={running} onStop={stop} />
          <div className="flex min-w-0 flex-1 flex-col">{narrowPane === "chat" ? rail : centerPane}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-canvas text-ink">
      <TopBar running={running} onToggleProxy={toggleProxy} findings={findings} />
      <div className="flex min-h-0 flex-1">
        <NavRail active={nav} onSelect={selectNav} running={running} onStop={stop} findings={findings} />
        {centerPane}
        <Inspector entry={center === "proxy" && proxySub === "history" ? selected : null} />
        <div className="w-[340px] shrink-0 border-l border-line">{rail}</div>
      </div>
    </div>
  );
}
