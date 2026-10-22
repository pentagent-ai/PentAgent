// Server-safe building blocks for docs pages: headings, callouts, keys, figures, tables, steps.
import type { ReactNode } from "react";

/* ---------- Headings with anchor links ---------- */

function Anchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      className="doc-anchor ml-2 text-ink-dim opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover/h:opacity-100"
      aria-label="Link to this section"
    >
      #
    </a>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group/h scroll-mt-24">
      {children}
      <Anchor id={id} />
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="group/h scroll-mt-24">
      {children}
      <Anchor id={id} />
    </h3>
  );
}

/* ---------- Callouts ---------- */

type CalloutKind = "note" | "tip" | "heads-up";

const calloutMeta: Record<CalloutKind, { label: string; tone: string; icon: ReactNode }> = {
  note: {
    label: "Note",
    tone: "doc-callout-note",
    icon: (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 7.25v4M8 4.75v.01" strokeLinecap="round" />
      </svg>
    ),
  },
  tip: {
    label: "Tip",
    tone: "doc-callout-tip",
    icon: (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M6 12.5h4M6.5 14.5h3M8 1.75a4.25 4.25 0 0 0-2.5 7.7c.5.37.75.9.75 1.5h3.5c0-.6.25-1.13.75-1.5A4.25 4.25 0 0 0 8 1.75Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  "heads-up": {
    label: "Heads up",
    tone: "doc-callout-heads",
    icon: (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M8 2.25 14.25 13H1.75L8 2.25Z" strokeLinejoin="round" />
        <path d="M8 6.5v3M8 11.25v.01" strokeLinecap="round" />
      </svg>
    ),
  },
};

export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}) {
  const meta = calloutMeta[kind];
  return (
    <aside role="note" aria-label={title ?? meta.label} className={`doc-callout ${meta.tone}`}>
      <p className="doc-callout-title">
        <span className="doc-callout-icon">{meta.icon}</span>
        {title ?? meta.label}
      </p>
      <div className="doc-callout-body">{children}</div>
    </aside>
  );
}

/* ---------- Keyboard keys ---------- */

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="doc-kbd">{children}</kbd>;
}

/** Renders a key combo like ["Ctrl", "K"] as Ctrl + K. */
export function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline">
      {keys.map((key, i) => (
        <span key={`${key}-${i}`} className="inline-flex items-center gap-1">
          {i > 0 ? <span className="text-ink-dim" aria-hidden>+</span> : null}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  );
}

/* ---------- UI labels (buttons, tabs, menu items as they appear in the app) ---------- */

export function Ui({ children }: { children: ReactNode }) {
  return <span className="doc-ui">{children}</span>;
}

/* ---------- Figures (screenshots) ---------- */

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  maxWidth,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  width: number;
  height: number;
  /** Optional display cap in px, for small crops that would look blurry stretched. */
  maxWidth?: number;
}) {
  return (
    <figure className="doc-figure" style={maxWidth ? { maxWidth } : undefined}>
      <a href={src} target="_blank" rel="noopener" className="doc-figure-frame" aria-label={`Open full size: ${alt}`}>
        {/* Static export: plain img with intrinsic size to avoid layout shift. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Numbered key for the markers drawn on an annotated screenshot. */
export function Legend({ items }: { items: ReactNode[] }) {
  return (
    <ol className="doc-legend">
      {items.map((item, i) => (
        <li key={i}>
          <span className="doc-marker" aria-hidden>
            {i + 1}
          </span>
          <span>
            <span className="sr-only">Marker {i + 1}: </span>
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Steps ---------- */

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="doc-steps">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="doc-step">
      <p className="doc-step-title">{title}</p>
      <div className="doc-step-body">{children}</div>
    </li>
  );
}

/* ---------- Settings tables ---------- */

export type SettingRow = {
  setting: string;
  what: ReactNode;
  default: ReactNode;
  when: ReactNode;
};

export function SettingsTable({ caption, rows }: { caption?: string; rows: SettingRow[] }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            <th scope="col">Setting</th>
            <th scope="col">What it does</th>
            <th scope="col">Default</th>
            <th scope="col">When to change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.setting}>
              <th scope="row" className="doc-ui-cell">{row.setting}</th>
              <td>{row.what}</td>
              <td className="font-mono text-[12.5px]">{row.default}</td>
              <td>{row.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Simple two-column table for "this screen means / do this" style content. */
export function InfoTable({ head, rows }: { head: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead>
          <tr>
            <th scope="col">{head[0]}</th>
            <th scope="col">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i}>
              <th scope="row">{a}</th>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
