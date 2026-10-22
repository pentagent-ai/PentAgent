// Stroke icons drawn the same way as the desktop app's own icon set
// (24px viewBox, 1.6 stroke, round caps). The app does not use an icon package.

export type IconName =
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
  | "agent"
  | "globe"
  | "activity"
  | "bell"
  | "settings"
  | "sparkle"
  | "sliders"
  | "send"
  | "copy"
  | "expand"
  | "columns"
  | "list"
  | "wrap";

export function AppIcon({ name, size = 15, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "send" ? 2.2 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths(name)}
    </svg>
  );
}

function paths(name: IconName) {
  switch (name) {
    case "proxy":
      return (
        <>
          <path d="M4 12h16M12 4v16" />
          <circle cx="12" cy="12" r="3" />
        </>
      );
    case "repeater":
      return <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />;
    case "intruder":
      return <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />;
    case "scanner":
    case "findings":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </>
      );
    case "target":
    case "scope":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </>
      );
    case "organizer":
      return (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </>
      );
    case "history":
    case "plans":
    case "plan":
    case "list":
      return <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />;
    case "sitemap":
      return <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6zM9 4v14M15 6v14" />;
    case "principals":
      return (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </>
      );
    case "kits":
      return <path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7l8-4zM12 12v7" />;
    case "dashboard":
      return (
        <>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </>
      );
    case "decoder":
      return <path d="M4 7h16M4 12h10M4 17h13" />;
    case "comparer":
    case "columns":
      return (
        <>
          <rect x="3" y="4" width="8" height="16" rx="1" />
          <rect x="13" y="4" width="8" height="16" rx="1" />
        </>
      );
    case "sequencer":
    case "activity":
      return <path d="M3 12h4l3-7 4 14 3-7h4" />;
    case "collaborator":
      return (
        <>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M3 20c1-3 3.5-4.5 6-4.5S14 17 15 20M14 18c1-1.5 2.5-2 3.5-2s2.5.5 3.5 2" />
        </>
      );
    case "ask":
      return <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />;
    case "agent":
      return (
        <>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <path d="M9 8V6a3 3 0 016 0v2" />
          <circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </>
      );
    case "bell":
      return <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />;
    case "settings":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
        </>
      );
    case "sparkle":
      return (
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
      );
    case "sliders":
      return <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />;
    case "send":
      return <path d="M5 12h14M13 6l6 6-6 6" />;
    case "copy":
      return (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 012-2h9" />
        </>
      );
    case "expand":
      return <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />;
    case "wrap":
      return <path d="M4 6h16M4 12h13a3 3 0 010 6h-4l2-2M13 18l2 2M4 18h5" />;
  }
}
