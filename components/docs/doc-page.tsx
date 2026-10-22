import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { findDoc, prevNext } from "@/lib/docs/nav";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Wraps every docs page: breadcrumbs, title, lead, content, and prev/next. */
export function DocPage({ href, children }: { href: string; children: ReactNode }) {
  const doc = findDoc(href);
  if (!doc) throw new Error(`Docs page ${href} is missing from lib/docs/nav.ts`);
  const { prev, next } = prevNext(href);
  const currentTitle = doc.title === "Overview" ? doc.group : doc.title;
  const crumbs =
    doc.title === "Overview"
      ? [
          { name: "Docs", path: "/docs" },
          { name: doc.group, path: doc.href },
        ]
      : [
          { name: "Docs", path: "/docs" },
          { name: doc.group },
          { name: currentTitle, path: doc.href },
        ];

  return (
    <article className="min-w-0" aria-labelledby="doc-title">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="font-mono text-[11.5px] text-ink-dim">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/docs" className="hover:text-ink">
              Docs
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>{doc.group}</li>
          {doc.title !== "Overview" ? (
            <>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-muted">
                {doc.title}
              </li>
            </>
          ) : null}
        </ol>
      </nav>

      <h1 id="doc-title" className="mt-4 text-balance text-[2rem] font-medium leading-tight tracking-[-0.03em] text-ink md:text-[2.4rem]">
        {doc.title === "Overview" ? doc.group : doc.title}
      </h1>
      {doc.description ? (
        <p className="mt-3 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-ink-muted">{doc.description}</p>
      ) : null}

      <div data-doc-content className="doc-prose mt-10">
        {children}
      </div>

      <nav aria-label="Previous and next pages" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="doc-pager">
            <span className="doc-pager-label">Previous</span>
            <span className="doc-pager-title">
              <span aria-hidden>← </span>
              {prev.title === "Overview" ? prev.group : prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="doc-pager sm:text-right">
            <span className="doc-pager-label">Next</span>
            <span className="doc-pager-title">
              {next.title === "Overview" ? next.group : next.title}
              <span aria-hidden> →</span>
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
