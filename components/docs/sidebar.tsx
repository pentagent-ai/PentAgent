"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { DocNavGroup } from "@/lib/docs/nav";

function normalize(path: string | null): string {
  if (!path) return "";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function DocsSidebar({ groups, onNavigate }: { groups: DocNavGroup[]; onNavigate?: () => void }) {
  const pathname = normalize(usePathname());
  const [closed, setClosed] = useState<Record<string, boolean>>({});

  return (
    <nav aria-label="Docs" className="text-[13.5px]">
      <Link
        href="/docs"
        onClick={onNavigate}
        aria-current={pathname === "/docs" ? "page" : undefined}
        className={`doc-nav-link mb-4 ${pathname === "/docs" ? "is-active" : ""}`}
      >
        Introduction
      </Link>
      <ul className="space-y-5">
        {groups.map((group) => {
          const id = `docs-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          const isOpen = !closed[group.title];
          return (
            <li key={group.title}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setClosed((c) => ({ ...c, [group.title]: isOpen }))}
                className="flex w-full items-center justify-between rounded-[5px] px-2.5 py-1 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                {group.title}
                <svg
                  viewBox="0 0 12 12"
                  width="10"
                  height="10"
                  aria-hidden
                  className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </button>
              <ul id={id} hidden={!isOpen} className="mt-1.5 space-y-px border-l border-line pl-2 ml-2.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`doc-nav-link ${active ? "is-active" : ""}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
