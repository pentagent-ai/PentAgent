// <Mockup name="…" /> presets for docs pages. Each wraps an app piece in <AppWindow>.
import type { ReactNode } from "react";
import { AppWindow } from "./app-window";
import * as L from "./labels";
import {
  AppShell, CaptureOnboarding, DashboardFirstRun, GateScreen, ProxyListenerDefaults, TabBar, TopBar, UserMenuOpen, WelcomeCard, demo,
} from "./pieces";
import { HistoryFiltersDialog, HistoryPanel, ImportPanelMock, InterceptPanel, MatchReplacePanelMock, WebSocketsPanel } from "./capture";

export { AppWindow, Spot } from "./app-window";
export * from "./pieces";
export * from "./capture";

type Preset = { section: string; label: string; render: () => ReactNode; width?: number; crop?: { height?: number; fade?: "bottom" | "right" | "both" } };

const noProjectBody = (
  <div className="m-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] p-3">
    <p className="text-[13px] font-semibold">No project selected</p>
    <p className="mt-1 max-w-sm text-[11.5px] text-[var(--muted)]">Open or create a project to see capture health, findings, and recent evidence.</p>
  </div>
);

export const presets: Record<string, Preset> = {
  "sign-in": { section: L.gate.signIn.title, label: "PentAgent sign-in screen with a Continue with GitHub button.", width: 620, render: () => <GateScreen variant="sign-in" /> },
  "not-approved": { section: L.gate.notApproved.title, label: "Not approved yet screen naming the GitHub user, with Apply for pilot access and Sign out links.", width: 620, render: () => <GateScreen variant="not-approved" /> },
  "access-error": { section: L.gate.accessError.title, label: "Could not verify pilot access screen with Try again and Sign out buttons.", width: 620, render: () => <GateScreen variant="access-error" /> },
  "update-required": { section: L.gate.updateRequired.title, label: "Update required screen with a Get the latest build button.", width: 620, render: () => <GateScreen variant="update-required" /> },
  welcome: { section: L.welcome.title, label: "Welcome screen with two unticked checkboxes; Continue is not available yet.", width: 620, render: () => <WelcomeCard /> },
  "welcome-checked": { section: L.welcome.title, label: "Welcome screen with both checkboxes ticked and Continue available.", width: 620, render: () => <WelcomeCard checked /> },
  "welcome-load-failed": {
    section: L.welcome.title,
    label: "Welcome screen saying the latest terms couldn't load, with Sign out and Try again.",
    width: 620,
    render: () => <WelcomeCard state="load-failed" error="We couldn't reach PentAgent just now. Try again in a moment." />,
  },
  "user-menu": { section: "Account", label: "Open account menu showing initials, name, GitHub username, email, access status and Sign out.", width: 560, render: () => <UserMenuOpen /> },
  "main-empty": { section: "No project selected", label: "PentAgent main window before a project exists: top bar, left menu, tool tabs, Inspector and AI Assistant.", render: () => <AppShell project={null}>{noProjectBody}</AppShell> },
  "main-dashboard": {
    section: L.dashboard.title,
    label: "Dashboard for a new demo project, showing the Get your first capture steps.",
    render: () => <AppShell project={demo.project} height={500}><DashboardFirstRun /></AppShell>,
  },
  "top-bar": { section: "Top bar", label: "PentAgent top bar with project picker, target, new project field, proxy button and toolbar icons.", crop: { fade: "right" }, render: () => <TopBar project={demo.project} signedIn /> },
  "proxy-history-empty": {
    section: "Proxy › HTTP history",
    label: "Proxy tab, HTTP history sub-tab with no traffic yet, showing the compact Get your first capture steps.",
    crop: { height: 300 },
    render: () => (
      <div className="bg-[var(--bg)]">
        <TabBar tabs={L.toolTabs} icons plus active="Proxy" />
        <TabBar tabs={L.proxySubTabs} active="HTTP history" />
        <div className="p-3"><CaptureOnboarding compact /></div>
      </div>
    ),
  },
  "settings-proxy-listener": {
    section: "Settings › Proxy & gateway",
    label: "Settings, Proxy & gateway section, Listener defaults with Listen host 127.0.0.1 and Listen port 8088.",
    crop: { height: 330 },
    render: () => <ProxyListenerDefaults />,
  },
  "intercept-off": { section: "Proxy › Intercept", label: "Proxy tab, Intercept sub-tab with Intercept off, the intercept options and the empty match rules box.", crop: { height: 420 }, render: () => <InterceptPanel state="off" /> },
  "intercept-waiting": { section: "Proxy › Intercept", label: "Intercept on and waiting for browser traffic through http://127.0.0.1:8088, with a Copy proxy URL button.", crop: { height: 470 }, render: () => <InterceptPanel state="waiting" /> },
  "intercept-held": { section: "Proxy › Intercept", label: "Intercept on with two held requests to demo.local; the first is selected and open in the request editor with Forward, Forward & next and Drop.", render: () => <InterceptPanel state="held" /> },
  "history-list": { section: "Proxy › HTTP history", label: "HTTP history with six demo.local requests, the toolbar above and the selected request and response below.", render: () => <HistoryPanel /> },
  "history-filters": { section: "Proxy history filters", label: "Proxy history filters dialog with Quick filters, History filters and Columns sections.", width: 680, render: () => <HistoryFiltersDialog /> },
  "websockets-list": { section: "Proxy › WebSockets", label: "WebSockets sub-tab with three demo frames and the selected frame's payload.", render: () => <WebSocketsPanel /> },
  "match-replace": { section: "Proxy › Match / Replace", label: "Match / Replace sub-tab with the new rule form and two demo rules, one on and one off.", render: () => <MatchReplacePanelMock /> },
  "import-panel": { section: "Proxy › Import", label: "Import sub-tab with the HAR or proxy XML file picker and the Portable engagement box.", render: () => <ImportPanelMock /> },
  "import-done": { section: "Proxy › Import", label: "Import sub-tab after importing demo-shop.har: 42 transactions from demo.local.", crop: { height: 300 }, render: () => <ImportPanelMock done /> },
};

export function Mockup({
  name,
  highlight,
  markers,
  caption,
  theme,
}: {
  name: keyof typeof presets | string;
  highlight?: string;
  markers?: boolean | string[];
  caption?: ReactNode;
  theme?: "dark" | "light";
}) {
  const p = presets[name];
  if (!p) throw new Error(`Unknown mockup "${name}"`);
  return (
    <AppWindow section={p.section} label={p.label} caption={caption} highlight={highlight} markers={markers} crop={p.crop} width={p.width} theme={theme}>
      {p.render()}
    </AppWindow>
  );
}
