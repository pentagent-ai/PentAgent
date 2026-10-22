"use client";

import { createContext, useContext, type ReactNode } from "react";

type MockCtx = { highlight?: string; markers: boolean | string[] };
const Ctx = createContext<MockCtx>({ markers: false });

/**
 * Desktop-app frame for docs mockups. Code-rendered, non-interactive (inert), app tokens inside.
 * Caption renders as "Fig. N · <section>" (N auto-counts per page via CSS counters).
 */
export function AppWindow({
  section,
  label,
  caption,
  children,
  highlight,
  markers = false,
  crop,
  titleBar,
  theme = "dark",
  width,
}: {
  /** Real tab/section name from the app; shown in the title bar and the caption. */
  section: string;
  /** Screen-reader description of what the mockup shows. */
  label: string;
  /** Optional sentence after the section name in the caption. */
  caption?: ReactNode;
  children: ReactNode;
  /** Spot id to outline (see <Spot>). */
  highlight?: string;
  /** Numbered markers: an array of Spot ids (numbered in that order), or true to use each Spot's own n. */
  markers?: boolean | string[];
  /** Show only part of the window. Edges that are cut get a faded edge. */
  crop?: { height?: number; fade?: "bottom" | "right" | "both" };
  /** Defaults to true, or false when cropped. */
  titleBar?: boolean;
  theme?: "dark" | "light";
  /** Max display width in px. */
  width?: number;
}) {
  const showBar = titleBar ?? !crop;
  const fade = crop?.fade ?? (crop ? "bottom" : undefined);
  return (
    <figure className="pa-fig" aria-label={label} style={width ? { maxWidth: width } : undefined}>
      <div className={`pa-window ${crop ? "is-cropped" : ""}`}>
        {showBar ? (
          <div className="pa-titlebar" aria-hidden>
            <span className="pa-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="pa-title">
              PentAgent<span className="pa-title-sec"> — {section}</span>
            </span>
          </div>
        ) : null}
        <div
          className={`pa-mock pa-viewport ${fade ? `fade-${fade}` : ""}`}
          data-theme={theme}
          style={crop?.height ? { maxHeight: crop.height } : undefined}
          inert
          aria-hidden
        >
          <Ctx.Provider value={{ highlight, markers }}>{children}</Ctx.Provider>
        </div>
      </div>
      <figcaption>
        <span className="pa-fig-num" />
        {section}
        {caption ? <span className="pa-fig-text"> {caption}</span> : null}
      </figcaption>
    </figure>
  );
}

/** Marks a region a docs paragraph can point at: outlined when highlighted, numbered when markers are on. */
export function Spot({
  id,
  n,
  children,
  className = "",
  block = false,
}: {
  id: string;
  n?: number;
  children: ReactNode;
  className?: string;
  block?: boolean;
}) {
  const { highlight, markers } = useContext(Ctx);
  const on = highlight === id;
  const num = Array.isArray(markers) ? (markers.indexOf(id) + 1 || undefined) : markers ? n : undefined;
  const Tag = block ? "div" : "span";
  return (
    <Tag className={`pa-spot ${block ? "" : "inline-flex"} ${on ? "is-on" : ""} ${className}`} data-spot={id}>
      {children}
      {num ? <span className="pa-marker">{num}</span> : null}
    </Tag>
  );
}
