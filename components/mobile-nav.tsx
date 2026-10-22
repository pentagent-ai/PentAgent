"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/lib/links";

export function MobileNav({ links: items }: { links: readonly { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-[5px] border border-line-strong bg-transparent text-ink"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute bg-canvas inset-x-0 top-full border-b border-line px-6 pb-8 pt-4"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[15px] text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={links.pilot}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-[5px] bg-accent text-sm font-medium text-accent-ink"
            >
              Request pilot access
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
