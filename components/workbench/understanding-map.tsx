import { linkedFlows, sitemapPages } from "@/lib/demo-data";

/** Compact version of the app's Sitemap: pages on the left, linked flows (page → control → request). */
export function UnderstandingMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <p className="border-b border-line px-2 py-1 text-[9.5px] font-semibold uppercase tracking-wide text-ink-muted">
          Pages
        </p>
        <ul>
          {sitemapPages.slice(0, compact ? 3 : 4).map((page, i) => (
            <li
              key={page.url}
              className={`flex items-center justify-between gap-2 px-2 py-1 text-[11px] ${i === 0 ? "bg-accent/[0.12]" : ""}`}
            >
              <span className="truncate font-mono text-ink">{page.url.replace("https://", "")}</span>
              <span className="shrink-0 text-ink-muted">{page.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <p className="border-b border-line px-2 py-1 text-[9.5px] font-semibold uppercase tracking-wide text-ink-muted">
          Linked flows <span className="font-normal normal-case tracking-normal text-disabled">(page → control → requests)</span>
        </p>
        <ul>
          {linkedFlows.slice(0, compact ? 3 : 4).map((flow) => (
            <li key={flow.control} className="border-t border-line px-2 py-1.5 first:border-t-0">
              <p className="text-[11px] text-ink">
                {flow.from} <span className="text-ink-muted">→</span> {flow.control}
              </p>
              <p className="mt-0.5 truncate font-mono text-[10.5px] text-hl-path">{flow.network}</p>
              <p className="mt-0.5 text-[10px] text-ink-muted">
                {flow.effect} · {flow.confidence}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
