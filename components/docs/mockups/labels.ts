// Every string the docs mockups show, copied from the PentAgent app source
// (~/development/Personal/pentagent-V2/frontend/src, branch restore/oct15-plus-phase2).
// Update here when the app changes; the file each block mirrors is noted above it.

/** App.tsx (top bar header) */
export const topBar = {
  appName: "PentAgent",
  project: "Project",
  projectPlaceholder: "— select —",
  target: "Target",
  noTarget: "No target",
  newProject: "New project",
  createProject: "Create project",
  proxyOff: "Proxy Off",
  proxyActive: "Proxy Active",
  proxyTitle: "Start proxy listener (MITM capture)",
  activity: "Activity",
  records: "Records",
};

/** App.tsx proxyListenerLabel + LeftNavRail.tsx footer */
export const listener = {
  off: "Listener off",
  lab: "Lab",
  settings: "Settings",
  stop: "Stop",
  connected: "Connected",
  noProject: "No project selected",
};

/** lib/tabs.ts NAV_ENTRIES + TAB_GROUP_LABELS (left rail) */
export const navGroups = [
  {
    label: "Workbench",
    primary: ["Proxy", "Repeater", "Intruder", "Scanner"],
    secondary: ["Target", "Organizer", "History"],
  },
  { label: "Project", primary: ["Sitemap", "Records", "Plans", "Kits"], extras: ["Dashboard", "Decoder", "Comparer", "Sequencer", "Collaborator"] },
  { label: "AI Agent", primary: ["Ask", "Plan", "Agent"] },
] as const;

/** components/WorkspaceToolTabs.tsx */
export const toolTabs = ["Proxy", "Repeater", "Intruder", "Scanner"] as const;

/** panes/ProxyPane.tsx sub-tabs */
export const proxySubTabs = ["Intercept", "HTTP history", "WebSockets", "Match / Replace", "Import"] as const;

/** components/CaptureOnboarding.tsx */
export const onboarding = {
  title: "Get your first capture",
  sub: "Four steps — stay in-app. Prefer the lab browser over system proxy docs.",
  steps: {
    proxy: { title: "Start proxy", action: "Start proxy", hintOff: "MITM listener on 127.0.0.1:8088", hintOn: "Listening 127.0.0.1:8088" },
    ca: {
      title: "CA certificate",
      action: "Download CA",
      hintReady: "Lab Chromium auto-trusts the PentAgent CA. Download only for manual proxy setups.",
      hintNew: "Generated on first capture. Lab Chromium trusts it automatically.",
    },
    lab: {
      title: "Open lab browser",
      action: "Open lab browser",
      hintOff: "Opens lab Chromium through the proxy (CA auto-trusted).",
      hintOn: "Browse only in the lab window — not daily Chrome/Brave.",
    },
    capture: { title: "First capture", hint: "Visit your target in the lab window. Rows appear in HTTP history." },
  },
};

/** components/pilot/PilotGateScreens.tsx */
export const gate = {
  signIn: {
    title: "PentAgent pilot",
    body: "Sign in to access the pilot. Access is limited to approved participants.",
    github: "Continue with GitHub",
    busy: "Redirecting…",
  },
  notApproved: {
    title: "Not approved yet",
    body: (user: string) => `GitHub user @${user} is not on the pilot allowlist yet.`,
    apply: "Apply for pilot access",
    signOut: "Sign out",
  },
  accessError: {
    title: "Could not verify pilot access",
    body: "PentAgent could not confirm your pilot allowlist entry. Check your connection and try again.",
    retry: "Try again",
    signOut: "Sign out",
  },
  updateRequired: {
    title: "Update required",
    body: (current: string, min: string) => `This build (${current}) is below the minimum supported version (${min}) for the pilot.`,
    action: "Get the latest build",
  },
};

/** components/pilot/PolicyAcceptanceScreen.tsx */
export const welcome = {
  eyebrow: "Before you start",
  title: "Welcome to PentAgent",
  sub: "Two quick things before you start.",
  failedTitle: "We couldn't load the latest terms",
  failedSub: "Check your connection and try again.",
  agreePre: "I agree to the ",
  terms: "Terms",
  and: " and ",
  privacy: "Privacy Policy",
  authorized: "I’ll only test apps I own or have permission to test.",
  analyticsPre: "Includes ",
  analytics: "anonymous usage analytics",
  errorTitle: "That didn’t work",
  signOut: "Sign out",
  continue: "Continue",
  retry: "Try again",
  saving: "Saving…",
  versionTerms: "Terms",
  versionPrivacy: "Privacy",
};

/** components/pilot/UserMenu.tsx */
export const userMenu = { email: "Email", access: "Access", allowed: "Pilot access · allowed", signOut: "Sign out" };

/** panes/DashboardPane.tsx (labels as rendered) */
export const dashboard = {
  title: "Dashboard",
  live: "LIVE",
  newScan: "New passive scan",
  capture: "CAPTURE",
  openHistory: "Open history",
  proxy: "PROXY",
  transactions: "TRANSACTIONS",
  lastSeen: "LAST SEEN",
  noTraffic: "No traffic yet",
  understanding: "UNDERSTANDING",
  openTarget: "Open Target →",
  hosts: "HOSTS",
  pages: "PAGES",
  tech: "TECH",
  understandingHint: "Capture traffic, then review Target scope.",
  findings: "FINDINGS",
  openScanner: "Open Scanner",
  noFindings: "No findings yet",
  noFindingsHint: "Capture traffic first, then run a passive scan.",
};

/** components/InspectorPanel.tsx + panes/ChatPane.tsx (sidebar header) */
export const sidePanels = {
  inspector: "INSPECTOR",
  inspectorEmpty: "Select a message to inspect params, cookies, and headers.",
  ai: "AI Assistant",
  chats: "Chats",
  aiTabs: ["Records", "Plan", "Agent", "Context"],
  aiNoProject: "Select a project to chat about traffic and the UI map.",
};

/** panes/ChatPane.tsx composer + approval modal */
export const chat = {
  modes: ["Ask", "Plan", "Agent"],
  modeTitle: "Mode",
  modelTitle: "Model",
  placeholderSidebar: "Ask a question or give a command…",
  placeholder: { ask: "Ask about traffic, scope, coverage…", plan: "Describe what to test…", agent: "Ask the agent to run the plan…" },
  send: "Send",
  stop: "Stop",
  approvalTitle: "Allow this request?",
  deny: "Deny",
  allow: "Allow",
};

/** components/MessageViewer.tsx */
export const viewer = { request: "Request", response: "Response", tabs: ["pretty", "raw", "hex"] };

/** components/settings/types.ts SETTINGS_SECTIONS + ProxySettingsSection.tsx */
export const settings = {
  title: "Settings",
  close: "Close",
  sections: [
    { id: "general", label: "General", hint: "Appearance, health, embeddings" },
    { id: "ai", label: "AI models", hint: "LLM providers and defaults" },
    { id: "proxy", label: "Proxy & gateway", hint: "Listener, CA cert, upstream" },
    { id: "project", label: "Project", hint: "Scope, context" },
    { id: "collaborator", label: "Collaborator", hint: "OOB listener" },
    { id: "browser", label: "Lab browser", hint: "Chromium, extension" },
  ],
  proxy: {
    listenerDefaults: "Listener defaults",
    listenHost: "Listen host",
    listenPort: "Listen port",
    checkPort: "Check port",
  },
};

/* ---------- Area 2: Capture ---------- */

/** panes/ProxyPane.tsx — Intercept sub-tab */
export const intercept = {
  toggle: { on: "Intercept is on", off: "Intercept is off" },
  bannerOn: (n: number) => `Intercept is ON — ${n} item(s) in queue. Shortcuts: Forward (F), Drop (D), Forward & intercept next (Ctrl+F).`,
  notCapturing: "Intercept only works while the listener is in MITM mode. Turning it on starts MITM automatically and opens lab Chromium if needed. Daily Chrome/Brave is not linked.",
  labLinked: "Lab Chromium is linked. Reload the target in that window — the page waits until you Forward or Drop (static assets skipped by default).",
  options: {
    requests: "Intercept requests",
    responses: "Intercept responses",
    static: "Don't intercept static (css/js/images/fonts)",
    noise: "Don't intercept browser noise",
    inScope: "In-scope only",
    ws: "Intercept WebSocket frames",
  },
  rules: {
    title: "Intercept match rules",
    add: "Add rule",
    help: "Optional include/exclude rules on top of the toggles above. If any include rules are enabled, traffic must match at least one include. Exclude always wins.",
    empty: "No match rules yet.",
    modes: ["Include", "Exclude"],
    fields: ["Host", "Method", "Path", "URL", "Header", "Protocol"],
  },
  explainer: "When Intercept is on, matching traffic pauses in the browser until you Forward or Drop. Turning Intercept off auto-forwards the queue.",
  offState: "Intercept is off — traffic flows and appears in HTTP history. Flip Intercept on to pause requests/responses.",
  waiting: (url: string) => `Intercept is on — waiting for browser traffic through ${url}. Static assets are skipped by default.`,
  copyUrl: "Copy proxy URL",
  forwardAll: "Forward all",
  dropAll: "Drop all",
  forward: "Forward",
  forwardNext: "Forward & next",
  drop: "Drop",
  phase: (p: string) => `Phase: ${p} · edits go with Forward`,
  otherProject: "Listener owned by another project",
  justStopped: "Listener stopped. Lab Chromium will show No internet until you open it again (gateway auto-starts).",
};

/** panes/ProxyPane.tsx — HTTP history toolbar; lib/trafficColumns.ts; components/TrafficTable.tsx */
export const history = {
  protocol: ["HTTP", "HTTPS"],
  domain: "Domain",
  search: "Search requests…",
  filter: "Filter",
  showing: (n: number, total: number) => `Showing ${n} of ${total} (newest first)`,
  loadMore: "Load more rows",
  selectRow: "Select a row.",
  empty: "No captures yet — use the steps above, then browse in the lab window.",
  sendToRepeater: "Send to Repeater",
  hostChip: "Host:",
  clear: "clear",
  /** DEFAULT_HISTORY_COLUMNS via labelForColumn (tool → "Source") */
  columns: ["#", "Method", "URL", "Status code", "Length", "Time", "Source"],
  allColumns: ["#", "Time", "Source", "Method", "Host", "URL", "Path", "Params", "Status code", "Length", "MIME type", "Extension", "Title", "Comment", "TLS", "IP", "Cookies", "Listener port", "Response time", "Edited", "Trigger"],
  clearConfirm: "Clear all HTTP history for this project? This cannot be undone.",
};

/** components/TrafficFilterModal.tsx + components/HistoryFilters.tsx */
export const filters = {
  title: "Proxy history filters",
  none: "No filters",
  quick: "Quick filters",
  protocol: ["All", "HTTP", "HTTPS"],
  allDomains: "All domains",
  history: "History filters",
  hostContains: "Host contains",
  method: "Method",
  status: "Status",
  statusClass: "Status class",
  searchPath: "Search path/url",
  hideStatic: "Hide static",
  hideNoise: "Hide browser noise",
  legacy: "Legacy extension traffic",
  hideCdn: "Hide CDN",
  scope: ["All hosts", "In scope", "Out of scope"],
  refresh: "Refresh",
  clearHistory: "Clear history",
  columns: "Columns",
  done: "Done",
};

/** panes/ProxyPane.tsx — WebSockets sub-tab; components/WebSocketTable.tsx */
export const websockets = {
  intro: "WebSocket frames captured from proxy traffic. Text frames show as plain text; binary as base64.",
  columns: ["Dir", "Type", "Host / path", "Time"],
  empty: "No WebSocket frames yet — browse a WS-enabled site through the proxy.",
  select: "Select a frame to view payload.",
};

/** panes/MatchReplacePanel.tsx */
export const matchReplace = {
  intro: "Rules run automatically in MITM capture before intercept / history.",
  name: "Name",
  target: ["Request", "Response", "Both"],
  where: ["Any", "URL", "Headers", "Body"],
  match: "Match",
  replace: "Replace",
  regex: "Regex",
  add: "Add rule",
  empty: "No rules yet.",
  on: "on",
  delete: "Delete",
  required: "Match pattern required",
};

/** panes/ImportPanel.tsx (the app names its XML source generically) */
export const importPanel = {
  choose: "Choose HAR or proxy XML file",
  importing: "Importing…",
  done: (n: number, hosts: string) => `Imported ${n} transaction(s). Hosts: ${hosts}`,
  started: "Import started — track progress on the Dashboard",
  engagement: "Portable engagement",
  engagementHelp: "Export this project (traffic + Intruder configs + scope/settings) as a single .pentagent.zip file, or import one as a brand-new project.",
  export: "Export engagement",
  importZip: "Import engagement zip",
};
