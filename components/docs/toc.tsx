"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TocItem = { id: string; text: string; level: 2 | 3 };

/** "On this page": built from the h2/h3 headings of the current article, highlights the section in view. */
export function DocsToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const frame = requestAnimationFrame(() => {
    const root = document.querySelector("[data-doc-content]");
    if (!root) {
      setItems([]);
      return;
    }
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"));
    setItems(
      headings.map((h) => ({
        id: h.id,
        // Drop the trailing "#" anchor link text.
        text: (h.textContent ?? "").replace(/#\s*$/, "").trim(),
        level: h.tagName === "H3" ? 3 : 2,
      })),
    );
    if (headings.length === 0) return;

    const visible = new Map<string, boolean>();
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const firstVisible = headings.find((h) => visible.get(h.id));
        if (firstVisible) {
          setActive(firstVisible.id);
          return;
        }
        // Nothing in the band: pick the last heading above the viewport.
        const above = headings.filter((h) => h.getBoundingClientRect().top < 120);
        if (above.length) setActive(above[above.length - 1].id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => observer!.observe(h));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-[12.5px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">On this page</p>
      <ul className="mt-3 space-y-px border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={`-ml-px block border-l py-1 leading-snug transition-colors ${
                item.level === 3 ? "pl-6" : "pl-3"
              } ${
                active === item.id
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
