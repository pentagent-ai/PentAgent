// Single source of truth for the docs sidebar, breadcrumbs, prev/next and search grouping.
//
// To add a page:
//   1. Create app/docs/<group>/<page>/page.tsx using <DocPage href="/docs/<group>/<page>">.
//   2. Add (or flip) its entry below. Entries with `soon: true` are planning stubs only:
//      they are never rendered in the sidebar, search, or prev/next, and have no public page.

export type DocNavItem = {
  title: string;
  href: string;
  /** One line, used under the page title and in search results. */
  description?: string;
  /** Planned page that is not written yet. Hidden everywhere on the site. */
  soon?: boolean;
};

export type DocNavGroup = {
  title: string;
  items: DocNavItem[];
};

export const docsNav: DocNavGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        title: "Overview",
        href: "/docs/getting-started",
        description: "The short path from download to your first captured request.",
      },
      {
        title: "Install",
        href: "/docs/getting-started/install",
        description: "Download the pilot build, start it, and open PentAgent.",
      },
      {
        title: "Sign in",
        href: "/docs/getting-started/sign-in",
        description: "Sign in with GitHub and what happens while your access is being approved.",
      },
      {
        title: "Welcome screen",
        href: "/docs/getting-started/welcome-screen",
        description: "The two quick checkboxes you see once, before the app opens.",
      },
      {
        title: "First run",
        href: "/docs/getting-started/first-run",
        description: "Create a project, start the proxy, and capture your first request.",
      },
    ],
  },
  {
    title: "Capture",
    items: [
      { title: "Proxy & Intercept", href: "/docs/capture/proxy", description: "Start capturing, then pause, edit, forward or drop requests with Intercept." },
      { title: "HTTP history", href: "/docs/capture/http-history", description: "Browse, search and filter everything the proxy has captured." },
      { title: "WebSockets", href: "/docs/capture/websockets", description: "See WebSocket frames captured through the proxy." },
      { title: "Match / Replace", href: "/docs/capture/match-replace", description: "Rewrite requests and responses automatically as they pass through." },
      { title: "Import", href: "/docs/capture/import", description: "Bring in HAR or XML captures, and move whole projects between machines." },
    ],
  },
  {
    title: "Test",
    items: [
      { title: "Repeater", href: "/docs/test/repeater", description: "Edit a request by hand, send it again, and compare what comes back." },
      { title: "Fuzzer", href: "/docs/test/fuzzer", description: "Send one request many times, swapping in a list of values at the places you mark." },
      { title: "Scanner", href: "/docs/test/scanner", description: "Run a passive audit on captured traffic and review the issues it finds." },
      { title: "Target & scope", href: "/docs/test/target", description: "Set which hosts are in scope, and browse the sitemap of what you've captured." },
      { title: "Organizer", href: "/docs/test/organizer", description: "Keep interesting requests in collections with notes, tags and leads." },
      { title: "Decoder", href: "/docs/test/decoder", description: "Encode, decode and hash values, or chain several steps together." },
      { title: "Comparer", href: "/docs/test/comparer", description: "Diff two requests or responses side by side." },
      { title: "Sequencer", href: "/docs/test/sequencer", description: "Capture session tokens and check whether they look random." },
      { title: "Collaborator", href: "/docs/test/collaborator", description: "Generate out-of-band payloads and watch HTTP and DNS callbacks." },
      { title: "Inspector", href: "/docs/test/inspector", description: "See params, cookies and headers for the message you have selected." },
    ],
  },
  {
    title: "Project",
    items: [
      { title: "Dashboard", href: "/docs/project/dashboard", description: "See capture health, findings, scans and recent evidence for the current project." },
      { title: "Sitemap", href: "/docs/project/sitemap", description: "The Target sitemap and the UI Map built from the lab browser." },
      { title: "Kits", href: "/docs/project/kits", description: "Browse the attack library and build campaign kits from Plan threads." },
    ],
  },
  {
    title: "Findings",
    items: [{ title: "Records", href: "/docs/findings/records", description: "The engagement report in Markdown, with chapters you or the model can maintain." }],
  },
  {
    title: "AI",
    items: [
      { title: "Ask", href: "/docs/ai/ask", description: "Ask questions about traffic, scope and coverage in the AI Assistant." },
      { title: "Plan", href: "/docs/ai/plan", description: "Write an attack plan the agent can follow." },
      { title: "Agent", href: "/docs/ai/agent", description: "Run an approved plan with live requests that ask for your approval." },
      { title: "Context", href: "/docs/ai/context", description: "Attach recon notes and see the request selected for the assistant." },
      { title: "Approvals & stop", href: "/docs/ai/approvals", description: "Approve live requests, stop runs, Explore toggles and spend caps." },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "General", href: "/docs/settings/general", description: "Theme, API health, embeddings and lab browser overview." },
      { title: "AI models", href: "/docs/settings/ai-models", description: "Providers, Explore toggles, approvals batch mode and spend caps." },
      { title: "Proxy & gateway", href: "/docs/settings/proxy", description: "Listener defaults, lab browser, CA certificate and proxy options." },
      { title: "Project", href: "/docs/settings/project", description: "Scope, rename, filter defaults, upstream proxy and delete for the active project." },
      { title: "Collaborator", href: "/docs/settings/collaborator", description: "Out-of-band listener status and environment variables." },
      { title: "Lab browser", href: "/docs/settings/lab-browser", description: "How lab Chromium, the capture extension and proxy modes work." },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Shortcuts", href: "/docs/reference/shortcuts", description: "Keyboard shortcuts for the workbench, Repeater and Fuzzer." },
      { title: "Troubleshooting", href: "/docs/reference/troubleshooting", description: "Fixes for common install, sign-in, proxy and capture problems." },
      { title: "FAQ", href: "/docs/reference/faq", description: "Short answers to common questions about the pilot." },
    ],
  },
];

/** Groups and items that are live on the site (no planning stubs). */
export function publishedNav(): DocNavGroup[] {
  return docsNav
    .map((group) => ({ ...group, items: group.items.filter((item) => !item.soon) }))
    .filter((group) => group.items.length > 0);
}

export type FlatDocItem = DocNavItem & { group: string };

export function flatPublished(): FlatDocItem[] {
  return publishedNav().flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })));
}

export function findDoc(href: string): FlatDocItem | undefined {
  return flatPublished().find((item) => item.href === href);
}

export function prevNext(href: string): { prev?: FlatDocItem; next?: FlatDocItem } {
  const list = flatPublished();
  const index = list.findIndex((item) => item.href === href);
  if (index === -1) return {};
  return { prev: list[index - 1], next: list[index + 1] };
}
