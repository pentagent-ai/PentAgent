// Reusable app pieces for docs mockups. Each mirrors the app file named above it.
// All data is demo data. Render inside <AppWindow>.
import type { ReactNode } from "react";
import { AppIcon, type IconName } from "@/components/workbench/icons";
import { Spot } from "./app-window";
import * as L from "./labels";
import { withBase } from "@/lib/base-path";

export const demo = {
  project: "Demo shop",
  host: "demo.local",
  user: { name: "Alex Demo", login: "alex-demo", email: "alex@example.com", initials: "AD" },
  version: { current: "0.1.0", min: "0.2.0", terms: "1.0.0", privacy: "1.1.0" },
};

const ICONS: Record<string, IconName> = {
  Proxy: "proxy", Repeater: "repeater", Fuzzer: "fuzzer", Scanner: "scanner", Target: "target", Organizer: "organizer",
  History: "history", Sitemap: "sitemap", Records: "findings", Plans: "plans", Kits: "kits", Dashboard: "dashboard",
  Decoder: "decoder", Comparer: "comparer", Sequencer: "sequencer", Collaborator: "collaborator", Ask: "ask", Plan: "plan", Agent: "agent",
};

function Mark({ size = 22 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={withBase("/brand/pentagent-mark.png")} alt="" width={size} height={size} className="shrink-0 object-contain [[data-theme=light]_&]:invert" />;
}

/* ---------- App.tsx header ---------- */
export function TopBar({ project, signedIn = false }: { project?: string | null; signedIn?: boolean }) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--panel)] px-3">
      <span className="flex items-center gap-2.5 px-1">
        <Mark size={24} />
        <span className="text-[15px] font-semibold tracking-tight">{L.topBar.appName}</span>
      </span>
      <div className="flex min-w-0 items-center gap-3 max-[720px]:hidden">
        <Spot id="project-picker" n={1}>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
            <span className="font-medium">{L.topBar.project}</span>
            <span className="field flex items-center gap-1 text-[11px]">
              {project ?? L.topBar.projectPlaceholder}
              <span className="text-[9px] text-[var(--disabled)]">▾</span>
            </span>
          </span>
        </Spot>
        <Spot id="target" n={2}>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
            <AppIcon name="globe" size={14} />
            <span className="font-medium">{L.topBar.target}</span>
            <span className="flex items-center gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-2 py-1 font-mono text-[11px] text-[var(--text)]">
              {project ? demo.host : L.topBar.noTarget}
              <span className="text-[9px] text-[var(--disabled)]">▾</span>
            </span>
          </span>
        </Spot>
        <Spot id="new-project" n={3}>
          <span className="flex items-center gap-1">
            <span className="field w-28 text-[11px] text-[var(--disabled)]">{L.topBar.newProject}</span>
            <span className="btn-primary flex h-7 min-w-7 items-center justify-center rounded-[var(--radius)] px-2 text-[13px] opacity-50">+</span>
          </span>
        </Spot>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <Spot id="proxy-chip" n={4}>
          <span className={`inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)] ${project ? "" : "opacity-50"}`}>
            <span className="inline-block size-1.5 rounded-full bg-[var(--disabled)]" />
            {L.topBar.proxyOff}
          </span>
        </Spot>
        <Spot id="activity" n={5}><span className="flex size-8 items-center justify-center text-[var(--muted)]"><AppIcon name="activity" /></span></Spot>
        <Spot id="records" n={6}><span className="flex size-8 items-center justify-center text-[var(--muted)]"><AppIcon name="bell" /></span></Spot>
        <Spot id="settings" n={7}><span className="flex size-8 items-center justify-center text-[var(--muted)]"><AppIcon name="settings" /></span></Spot>
        <Spot id="account" n={8}>
          <span className="flex size-[30px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--raised)] text-[10px] font-semibold">
            {signedIn ? demo.user.initials : <AppIcon name="principals" size={14} />}
          </span>
        </Spot>
      </div>
    </div>
  );
}

/* ---------- LeftNavRail.tsx + lib/tabs.ts ---------- */
function NavItem({ label, active, muted }: { label: string; active?: boolean; muted?: boolean }) {
  return (
    <span className={`relative flex items-center gap-2 rounded-[5px] px-2 py-[5px] text-[12px] ${active ? "bg-[var(--accent-dim)] text-[var(--text)]" : muted ? "text-[var(--disabled)]" : "text-[var(--muted)]"}`}>
      {active ? <span className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-r bg-[var(--accent)]" /> : null}
      <span className={active ? "text-[var(--accent-fg)]" : "text-[var(--disabled)]"}><AppIcon name={ICONS[label] ?? "proxy"} size={14} /></span>
      {label}
    </span>
  );
}

export function Sidebar({ active, project, listenerOn = false }: { active?: string; project?: string | null; listenerOn?: boolean }) {
  return (
    <div className="flex w-[170px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--panel)]">
      <Spot id="sidebar" n={1} block className="min-h-0 flex-1 px-1.5 py-2.5">
        {L.navGroups.map((g) => (
          <div key={g.label} className="mb-3">
            <div className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--disabled)]">{g.label}</div>
            {g.primary.map((l) => <NavItem key={l} label={l} active={active === l} />)}
            {"secondary" in g ? (<><div className="my-1.5 border-t border-[var(--border)]" />{g.secondary.map((l) => <NavItem key={l} label={l} active={active === l} />)}</>) : null}
            {"extras" in g ? (<><div className="my-1.5 border-t border-[var(--border)]" />{g.extras.map((l) => <NavItem key={l} label={l} active={active === l} muted={active !== l} />)}</>) : null}
          </div>
        ))}
      </Spot>
      <div className="shrink-0 border-t border-[var(--border)] px-2 py-1.5">
        <Spot id="listener" n={2} block className="mb-2 space-y-1.5 rounded border border-[var(--border)] bg-[var(--bg)] p-1.5">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className={`inline-block size-1.5 rounded-full ${listenerOn ? "bg-[var(--success)]" : "bg-[var(--disabled)]"}`} />
            <span className="text-[var(--muted)]">{listenerOn ? "Listening 127.0.0.1:8088" : L.listener.off}</span>
          </div>
          <div className="flex gap-1">
            <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px]">{L.listener.lab}</span>
            <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] text-[var(--muted)]">{L.listener.settings}</span>
          </div>
        </Spot>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--success)]"><span className="inline-block size-1.5 rounded-full bg-[var(--success)]" />{L.listener.connected}</div>
        <p className="mt-1 truncate text-[10px] text-[var(--disabled)]">{project ? "Scope: 1 domain" : L.listener.noProject}</p>
      </div>
    </div>
  );
}

/* ---------- WorkspaceToolTabs.tsx (also usable for any underline tab bar) ---------- */
export function TabBar({ tabs, active, icons = false, plus = false, id }: { tabs: readonly string[]; active?: string; icons?: boolean; plus?: boolean; id?: string }) {
  const bar = (
    <div className="flex shrink-0 items-center border-b border-[var(--border)] bg-[var(--panel)] px-1">
      {tabs.map((t) => (
        <span key={t} className={`tabu ${active === t ? "on" : ""}`}>
          {icons ? <span className={active === t ? "text-[var(--accent-fg)]" : "text-[var(--disabled)]"}><AppIcon name={ICONS[t] ?? "proxy"} size={14} /></span> : null}
          {t}
        </span>
      ))}
      {plus ? <span className="ml-0.5 px-2.5 text-[15px] text-[var(--disabled)]">+</span> : null}
    </div>
  );
  return id ? <Spot id={id} block>{bar}</Spot> : bar;
}

/* ---------- CaptureOnboarding.tsx ---------- */
export function CaptureOnboarding({ compact = false, proxyOn = false, caReady = true, labOn = false }: { compact?: boolean; proxyOn?: boolean; caReady?: boolean; labOn?: boolean }) {
  const s = L.onboarding.steps;
  const steps = [
    { id: "proxy", title: s.proxy.title, hint: proxyOn ? s.proxy.hintOn : s.proxy.hintOff, done: proxyOn, action: proxyOn ? null : s.proxy.action },
    { id: "ca", title: s.ca.title, hint: caReady ? s.ca.hintReady : s.ca.hintNew, done: caReady || proxyOn, action: s.ca.action },
    { id: "lab", title: s.lab.title, hint: labOn ? s.lab.hintOn : s.lab.hintOff, done: labOn, action: labOn ? null : s.lab.action },
    { id: "capture", title: s.capture.title, hint: s.capture.hint, done: false, action: null },
  ];
  const next = steps.find((x) => !x.done)?.id;
  return (
    <div className={`co ${compact ? "compact" : ""}`}>
      <div>
        <p className="co-title">{L.onboarding.title}</p>
        {compact ? null : <p className="co-sub mt-0.5">{L.onboarding.sub}</p>}
      </div>
      <ol className="flex flex-col gap-[.4rem]">
        {steps.map((st, i) => (
          <li key={st.id} className={`co-step ${st.done ? "done" : ""} ${next === st.id ? "next" : ""}`}>
            <span className="co-num">{st.done ? "✓" : i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="co-row">
                <span className="co-step-title">{st.title}</span>
                {st.action ? <Spot id={`onboarding-${st.id}`}><span className="co-btn">{st.action}</span></Spot> : null}
              </div>
              <p className="co-hint mt-0.5">{st.hint}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- DashboardPane.tsx (first-run state) ---------- */
function Card({ title, link, children }: { title: string; link?: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-wide text-[var(--muted)]">{title}</span>
        {link ? <span className="text-[10px] text-[var(--accent-fg)]">{link}</span> : null}
      </div>
      {children}
    </div>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0 rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-1.5">
      <div className="text-[9px] font-semibold text-[var(--muted)]">{k}</div>
      <div className="truncate text-[12px] font-semibold">{v}</div>
    </div>
  );
}
export function DashboardFirstRun() {
  const d = L.dashboard;
  return (
    <div className="p-3">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[14px] font-semibold">{d.title}</span>
        <span className="rounded-full border border-[var(--accent-border)] px-1.5 text-[9px] text-[var(--accent-fg)]">● {d.live}</span>
        <span className="btn-primary ml-auto rounded-[var(--radius)] px-2 py-1 text-[11px]">{d.newScan}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr_1fr]">
        <Card title={d.capture} link={d.openHistory}>
          <div className="mb-2 grid grid-cols-3 gap-1.5">
            <Stat k={d.proxy} v="Off" /><Stat k={d.transactions} v="0" /><Stat k={d.lastSeen} v={d.noTraffic} />
          </div>
          <Spot id="onboarding" n={2} block><CaptureOnboarding /></Spot>
        </Card>
        <Card title={d.understanding} link={d.openTarget}>
          <div className="mb-2 grid grid-cols-3 gap-1.5"><Stat k={d.hosts} v="0" /><Stat k={d.pages} v="0" /><Stat k={d.tech} v="—" /></div>
          <p className="text-[11px] text-[var(--muted)]">{d.understandingHint}</p>
        </Card>
        <Card title={d.findings} link={d.openScanner}>
          <div className="rounded border border-dashed border-[var(--border)] p-4 text-center">
            <p className="text-[12px] font-semibold">{d.noFindings}</p>
            <p className="mt-1 text-[11px] text-[var(--muted)]">{d.noFindingsHint}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- InspectorPanel.tsx + ChatPane.tsx sidebar (empty states) ---------- */
export function InspectorEmpty() {
  return (
    <Spot id="inspector" n={3} block className="w-[150px] shrink-0 border-l border-[var(--border)] bg-[var(--panel)] max-[900px]:hidden">
      <div className="flex h-8 items-center justify-between border-b border-[var(--border)] px-2.5 text-[10px] font-semibold tracking-wide text-[var(--muted)]">
        {L.sidePanels.inspector}<span>×</span>
      </div>
      <p className="p-2.5 text-[11px] text-[var(--muted)]">{L.sidePanels.inspectorEmpty}</p>
    </Spot>
  );
}
export function AiPanelEmpty() {
  return (
    <Spot id="ai-panel" n={4} block className="flex w-[230px] shrink-0 flex-col border-l border-[var(--border)] bg-[var(--panel)] max-[720px]:hidden">
      <div className="flex h-8 items-center gap-2 border-b border-[var(--border)] px-2.5">
        <AppIcon name="sparkle" size={13} />
        <span className="text-[12px] font-semibold">{L.sidePanels.ai}</span>
        <span className="field ml-auto px-1 py-0 text-[10px]">Agent ▾</span>
        <span className="text-[10px] text-[var(--accent-fg)]">{L.sidePanels.chats}</span>
      </div>
      <TabBar tabs={L.sidePanels.aiTabs} active="Agent" />
      <div className="flex flex-1 items-center justify-center p-4 text-center text-[11px] text-[var(--muted)]">{L.sidePanels.aiNoProject}</div>
    </Spot>
  );
}

/** Full main window (App.tsx layout): top bar, left rail, tool tabs, content, Inspector, AI panel. */
export function AppShell({ project, active = "Dashboard", children, signedIn = false, height = 470 }: { project?: string | null; active?: string; children: ReactNode; signedIn?: boolean; height?: number }) {
  return (
    <div className="flex flex-col" style={{ height }}>
      <TopBar project={project} signedIn={signedIn} />
      <div className="flex min-h-0 flex-1">
        <Sidebar active={active} project={project} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TabBar tabs={L.toolTabs} icons plus active={L.toolTabs.includes(active as never) ? active : undefined} />
          <Spot id="workspace" n={5} block className="min-h-0 flex-1 overflow-hidden">{children}</Spot>
        </div>
        <InspectorEmpty />
        <AiPanelEmpty />
      </div>
    </div>
  );
}

/* ---------- PilotGateScreens.tsx ---------- */
export function GateScreen({ variant }: { variant: "sign-in" | "not-approved" | "access-error" | "update-required" }) {
  const g = L.gate;
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center bg-[var(--bg)] px-4 py-10 text-center">
      <Mark size={44} />
      {variant === "sign-in" ? (
        <>
          <p className="mt-4 text-xl font-semibold">{g.signIn.title}</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{g.signIn.body}</p>
          <Spot id="github-button"><span className="mt-6 rounded bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-ink)]">{g.signIn.github}</span></Spot>
        </>
      ) : variant === "not-approved" ? (
        <>
          <p className="mt-4 text-xl font-semibold">{g.notApproved.title}</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{g.notApproved.body(demo.user.login)}</p>
          <Spot id="apply-link"><span className="mt-4 text-sm text-[var(--accent-fg)] underline">{g.notApproved.apply}</span></Spot>
          <span className="mt-6 text-xs text-[var(--muted)] underline">{g.notApproved.signOut}</span>
        </>
      ) : variant === "access-error" ? (
        <>
          <p className="mt-4 text-xl font-semibold">{g.accessError.title}</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{g.accessError.body}</p>
          <div className="mt-6 flex gap-3">
            <span className="rounded bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-ink)]">{g.accessError.retry}</span>
            <span className="rounded border border-[var(--border)] px-4 py-2 text-sm">{g.accessError.signOut}</span>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-xl font-semibold">{g.updateRequired.title}</p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{g.updateRequired.body(demo.version.current, demo.version.min)}</p>
          <span className="mt-6 rounded bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-ink)]">{g.updateRequired.action}</span>
        </>
      )}
    </div>
  );
}

/* ---------- PolicyAcceptanceScreen.tsx ---------- */
function Check({ on }: { on: boolean }) {
  return (
    <span className={`mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-[3px] border ${on ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border-strong)] bg-[var(--bg)]"}`}>
      {on ? <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2.5 6.2 2.3 2.3 4.7-5" /></svg> : null}
    </span>
  );
}
export function WelcomeCard({ checked = false, state = "ready", error }: { checked?: boolean; state?: "ready" | "load-failed" | "saving"; error?: string }) {
  const w = L.welcome;
  const failed = state === "load-failed";
  const ready = checked && state === "ready";
  const row = (on: boolean) => `flex items-start gap-3 rounded-[var(--radius)] border px-3.5 py-3 ${on ? "border-[var(--accent-border)] bg-[var(--accent-soft)]" : "border-[var(--border)] bg-[var(--bg)]"}`;
  const link = "font-medium text-[var(--accent-fg)] underline decoration-[var(--accent-border)] underline-offset-[3px]";
  return (
    <div className="flex justify-center bg-[var(--bg)] px-4 py-8">
      <div className="w-full max-w-[460px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] shadow-[var(--modal-shadow)]">
        <div className="border-b border-[var(--border)] px-6 pb-5 pt-6">
          <div className="flex items-center gap-2.5">
            <Mark size={20} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--dim)]">{w.eyebrow}</span>
          </div>
          <p className="mt-4 text-[19px] font-semibold tracking-[-0.01em]">{failed ? w.failedTitle : w.title}</p>
          <p className="mt-2 text-[13px] leading-5 text-[var(--muted)]">{failed ? w.failedSub : w.sub}</p>
        </div>
        <div className="space-y-2.5 px-6 py-5">
          {failed ? null : (
            <>
              <Spot id="agree" n={1} block className={row(checked)}>
                <Check on={checked} />
                <span className="text-[13px] leading-5">{w.agreePre}<span className={link}>{w.terms}</span>{w.and}<span className={link}>{w.privacy}</span>.</span>
              </Spot>
              <Spot id="authorized" n={2} block className={row(checked)}>
                <Check on={checked} />
                <span className="text-[13px] leading-5">{w.authorized}</span>
              </Spot>
              <p className="px-0.5 pt-1 text-[12px] text-[var(--muted)]">
                {w.analyticsPre}<Spot id="analytics" n={3}><span className={link}>{w.analytics}</span></Spot>.
              </p>
            </>
          )}
          {error ? (
            <div className="rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--critical)_40%,transparent)] bg-[color-mix(in_srgb,var(--critical)_8%,transparent)] px-3.5 py-3 text-[12.5px] leading-5">
              <p className="font-medium text-[var(--critical)]">{w.errorTitle}</p>
              <p className="mt-1 text-[var(--muted)]">{error}</p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-6 py-4">
          <Spot id="versions" n={4}>
            <span className="flex gap-4 font-mono text-[10.5px] text-[var(--dim)]">
              <span>{w.versionTerms} <span className="text-[var(--muted)]">{failed ? "—" : `v${demo.version.terms}`}</span></span>
              <span>{w.versionPrivacy} <span className="text-[var(--muted)]">{failed ? "—" : `v${demo.version.privacy}`}</span></span>
            </span>
          </Spot>
          <span className="flex items-center gap-2">
            <span className="px-3 py-1.5 text-[12.5px] text-[var(--muted)]">{w.signOut}</span>
            <Spot id="continue" n={5}>
              <span className={`rounded-[var(--radius)] px-4 py-1.5 text-[12.5px] font-medium ${failed || ready || state === "saving" ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "bg-[var(--raised)] text-[var(--disabled)]"}`}>
                {failed ? w.retry : state === "saving" ? w.saving : w.continue}
              </span>
            </Spot>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- UserMenu.tsx (open) ---------- */
export function UserMenuOpen() {
  const u = demo.user;
  return (
    <div className="relative h-[290px] bg-[var(--bg)]">
      <div className="flex h-11 items-center justify-end gap-1.5 border-b border-[var(--border)] bg-[var(--panel)] px-3">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--panel-2)] px-2.5 py-1 text-[11px] text-[var(--muted)]"><span className="size-1.5 rounded-full bg-[var(--disabled)]" />{L.topBar.proxyOff}</span>
        <span className="flex size-[30px] items-center justify-center rounded-full border border-[var(--accent-border)] bg-[var(--raised)] text-[10px] font-semibold">{u.initials}</span>
      </div>
      <div className="absolute right-3 top-12 w-[260px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] shadow-[var(--modal-shadow)]">
        <Spot id="identity" n={1} block className="flex items-center gap-3 border-b border-[var(--border)] p-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--raised)] text-[11px] font-semibold">{u.initials}</span>
          <span><span className="block text-[13px]">{u.name}</span><span className="block text-[11.5px] text-[var(--muted)]">@{u.login}</span></span>
        </Spot>
        <div className="space-y-2 border-b border-[var(--border)] p-3 text-[11.5px]">
          <Spot id="email" n={2} block><span className="block text-[var(--muted)]">{L.userMenu.email}</span><span>{u.email}</span></Spot>
          <Spot id="access" n={3} block><span className="block text-[var(--muted)]">{L.userMenu.access}</span><span>{L.userMenu.allowed}</span></Spot>
        </div>
        <div className="p-2.5"><Spot id="sign-out" n={4} block className="rounded-[var(--radius)] border border-[var(--border)] px-2.5 py-1.5 text-[12px]">{L.userMenu.signOut}</Spot></div>
      </div>
    </div>
  );
}

/* ---------- SettingsPage.tsx shell + a settings row ---------- */
export function SettingsShell({ section, children }: { section: string; children: ReactNode }) {
  return (
    <div className="flex h-[360px] flex-col bg-[var(--bg)]">
      <div className="flex h-11 items-center justify-between border-b border-[var(--border)] bg-[var(--panel)] px-4">
        <span className="text-[14px] font-semibold">{L.settings.title}</span>
        <span className="rounded-lg border border-[var(--border)] px-3 py-1 text-[12px] text-[var(--muted)]">{L.settings.close}</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="w-44 shrink-0 border-r border-[var(--border)] bg-[var(--panel)] p-2 max-[640px]:hidden">
          {L.settings.sections.map((s) => (
            <div key={s.id} className={`mb-0.5 rounded px-3 py-1.5 ${s.id === section ? "bg-[var(--accent-dim)] text-[var(--accent-fg)]" : "text-[var(--muted)]"}`}>
              <div className="text-[12.5px] font-medium">{s.label}</div>
              <div className="text-[10px] opacity-80">{s.hint}</div>
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden p-5">{children}</div>
      </div>
    </div>
  );
}
export function SettingsRow({ id, label, value, hint, mono = false }: { id?: string; label: string; value: string; hint?: string; mono?: boolean }) {
  const row = (
    <label className="flex flex-col gap-1 text-xs">
      {label}
      <span className={`field ${mono ? "font-mono" : ""}`}>{value}</span>
      {hint ? <span className="text-[10.5px] text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
  return id ? <Spot id={id} block>{row}</Spot> : row;
}
export function ProxyListenerDefaults() {
  const p = L.settings.proxy;
  return (
    <SettingsShell section="proxy">
      <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">{p.listenerDefaults}</p>
      <p className="mb-3 text-[11.5px] text-[var(--muted)]">Saved automatically in your browser. PentAgent uses port <strong>8088</strong> by default.</p>
      <div className="grid max-w-md grid-cols-2 gap-3">
        <SettingsRow id="listen-host" label={p.listenHost} value="127.0.0.1" mono />
        <SettingsRow id="listen-port" label={p.listenPort} value="8088" mono />
      </div>
      <Spot id="check-port"><span className="btn mt-3 inline-block">{p.checkPort}</span></Spot>
    </SettingsShell>
  );
}

/* ---------- MessageViewer.tsx (request/response pane) ---------- */
export function MessagePane({ title, lines, tab = "pretty", id }: { title: "Request" | "Response"; lines: string[]; tab?: string; id?: string }) {
  const pane = (
    <div className="flex min-w-0 flex-1 flex-col border border-[var(--border)] bg-[var(--bg)]">
      <div className="flex h-7 items-center border-b border-[var(--border)] px-1.5">
        <span className="mr-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">{title}</span>
        {L.viewer.tabs.map((t) => <span key={t} className={`px-1.5 py-0.5 text-[10px] capitalize ${t === tab ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>{t}</span>)}
      </div>
      <div className="flex font-mono text-[11px] leading-[1.45]">
        <pre className="w-7 shrink-0 select-none border-r border-[var(--border)] bg-[var(--panel)] px-1 py-1.5 text-right text-[10px] text-[var(--disabled)]">{lines.map((_, i) => i + 1).join("\n")}</pre>
        <pre className="min-w-0 flex-1 whitespace-pre-wrap break-all p-1.5">{lines.map((l, i) => {
          const m = l.match(/^([A-Za-z-]+): (.*)$/);
          return <span key={i}>{m ? <><span className="text-[var(--hl-header-name)]">{m[1]}</span>: <span className="text-[var(--hl-header-value)]">{m[2]}</span></> : i === 0 ? <span className="text-[var(--hl-path)]">{l}</span> : l}{"\n"}</span>;
        })}</pre>
      </div>
    </div>
  );
  return id ? <Spot id={id} block className="flex min-w-0 flex-1">{pane}</Spot> : pane;
}

/* ---------- ChatPane.tsx approval modal ---------- */
export function ApprovalPrompt({ summary, requests = 1, method = "GET", url = "/api/orders/4813" }: { summary: string; requests?: number; method?: string; url?: string }) {
  const c = L.chat;
  return (
    <div className="w-full max-w-[480px] rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 text-sm shadow-[var(--modal-shadow)]">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide">{c.approvalTitle}</div>
      <p className="mb-2 text-[13px] leading-relaxed">{summary}</p>
      <p className="mb-3 text-[11px] text-[var(--muted)]">About {requests} request(s) · {method} → {demo.host} · {url}</p>
      <div className="flex justify-end gap-2">
        <Spot id="deny-button"><span className="rounded-md border border-[var(--border)] px-3 py-1 text-xs">{c.deny}</span></Spot>
        <Spot id="stop-button"><span className="rounded-md border border-[var(--critical)] px-3 py-1 text-xs text-[var(--critical)]">{c.stop}</span></Spot>
        <Spot id="allow-button"><span className="rounded-md bg-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent-ink)]">{c.allow}</span></Spot>
      </div>
    </div>
  );
}

/* ---------- ChatPane.tsx composer (sidebar variant) ---------- */
export function ChatComposer({ mode = "Ask", model = "openrouter", draft }: { mode?: "Ask" | "Plan" | "Agent"; model?: string; draft?: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)]">
      <div className={`min-h-[72px] px-3 py-2.5 text-sm ${draft ? "" : "text-[var(--muted)]"}`}>{draft ?? L.chat.placeholderSidebar}</div>
      <div className="flex items-center gap-1.5 px-2 pb-2">
        <Spot id="mode-select"><span className="rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[11px]">{mode} ▾</span></Spot>
        <Spot id="model-select"><span className="max-w-[7.5rem] truncate rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[11px]">{model} ▾</span></Spot>
        <span className="flex-1" />
        <Spot id="send-button">
          <span className="flex size-7 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </Spot>
      </div>
    </div>
  );
}
