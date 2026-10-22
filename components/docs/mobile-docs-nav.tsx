"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DocNavGroup } from "@/lib/docs/nav";
import { DocsSidebar } from "./sidebar";

/** Below lg: a slim bar with the current page and a button that opens the docs nav as a drawer. */
export function MobileDocsNav({ groups }: { groups: DocNavGroup[] }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const current =
    groups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title }))).find((i) => i.href === pathname?.replace(/\/+$/, "")) ??
    null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);


  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="flex w-full items-center gap-2 rounded-[5px] border border-line bg-surface px-3 py-2 text-left text-[13px] text-ink-muted focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M2.5 4h11M2.5 8h11M2.5 12h11" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Open docs menu. Current page: </span>
        <span className="truncate">
          {current ? (
            <>
              <span className="text-ink-dim">{current.group} / </span>
              <span className="text-ink">{current.title === "Overview" ? current.group : current.title}</span>
            </>
          ) : (
            <span className="text-ink">Introduction</span>
          )}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Docs menu"
        className="doc-drawer"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">Docs</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[5px] border border-line px-2.5 py-1 text-[12px] text-ink-muted hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-5 thin-scroll">
            <DocsSidebar groups={groups} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
