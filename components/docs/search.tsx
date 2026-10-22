"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { withBase } from "@/lib/base-path";

const noopSubscribe = () => () => {};

export type SearchEntry = {
  href: string;
  anchor: string;
  page: string;
  group: string;
  heading: string;
  text: string;
};

type Result = SearchEntry & { score: number; snippet: string };

let indexPromise: Promise<SearchEntry[]> | null = null;
function loadIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) {
    indexPromise = fetch(withBase("/docs/search-index.json"))
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => {
        indexPromise = null;
        return [];
      });
  }
  return indexPromise;
}

function snippetFor(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    at = lower.indexOf(t);
    if (at !== -1) break;
  }
  if (at === -1) return text.slice(0, 140);
  const start = Math.max(0, at - 50);
  const end = Math.min(text.length, at + 110);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

function search(index: SearchEntry[], query: string): Result[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const out: Result[] = [];
  for (const entry of index) {
    const page = entry.page.toLowerCase();
    const heading = entry.heading.toLowerCase();
    const body = entry.text.toLowerCase();
    let score = 0;
    let all = true;
    for (const t of terms) {
      let s = 0;
      if (page.includes(t)) s += 6;
      if (heading.includes(t)) s += 4;
      if (body.includes(t)) s += 1;
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (!all) continue;
    if (!entry.anchor) score += 1; // page intro slightly ahead of its sections on ties
    out.push({ ...entry, score, snippet: snippetFor(entry.text, terms) });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, 12);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-transparent text-accent-fg">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function DocsSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isMac = useSyncExternalStore(noopSubscribe, () => /Mac|iPhone|iPad/.test(navigator.platform), () => false);
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => search(index, query), [index, query]);

  const open = useCallback(() => {
    void loadIndex().then(setIndex);
    dialogRef.current?.showModal();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The desktop and mobile layouts each render a search; only the visible one answers shortcuts.
      if (!triggerRef.current || triggerRef.current.getClientRects().length === 0) return;
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      } else if (e.key === "/" && !typing && !dialogRef.current?.open) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);


  function go(r: Result) {
    close();
    setQuery("");
    router.push(r.anchor ? `${r.href}#${r.anchor}` : r.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        className={`flex w-full items-center gap-2 rounded-[5px] border border-line bg-surface px-3 text-left text-[13px] text-ink-dim transition-colors hover:border-line-strong hover:text-ink-muted focus-visible:outline-2 focus-visible:outline-accent ${
          compact ? "h-9" : "h-9"
        }`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="7" cy="7" r="4.75" />
          <path d="m10.5 10.5 3.25 3.25" strokeLinecap="round" />
        </svg>
        <span className="flex-1">Search docs</span>
        <kbd className="doc-kbd !text-[10.5px]">{isMac ? "⌘" : "Ctrl"} K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search docs"
        className="doc-search-dialog"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onClose={() => setQuery("")}
      >
        <div className="flex items-center gap-2 border-b border-line px-4">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="text-ink-dim">
            <circle cx="7" cy="7" r="4.75" />
            <path d="m10.5 10.5 3.25 3.25" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Search docs"
            placeholder="Search docs"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-dim [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={close} className="doc-kbd !text-[10.5px] hover:text-ink">
            Esc
          </button>
        </div>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2 thin-scroll">
          {query && results.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13.5px] text-ink-muted">
              No matches for &ldquo;{query}&rdquo;. Try a different word.
            </p>
          ) : null}
          {!query ? (
            <p className="px-3 py-8 text-center text-[13px] text-ink-dim">Search page titles, headings and text.</p>
          ) : null}
          <ul id={listId} role="listbox" aria-label="Results">
            {results.map((r, i) => (
              <li
                key={`${r.href}#${r.anchor}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={`cursor-pointer rounded-[5px] px-3 py-2.5 ${i === active ? "bg-raised" : ""}`}
              >
                <p className="font-mono text-[11px] text-ink-dim">
                  {r.group} / {r.page}
                </p>
                <p className="mt-0.5 text-[14px] text-ink">
                  <Highlight text={r.heading} query={query} />
                </p>
                <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink-muted">
                  <Highlight text={r.snippet} query={query} />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10.5px] text-ink-dim">
          <span>↑ ↓ to move</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
        </div>
      </dialog>
    </>
  );
}
