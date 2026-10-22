import type { ReactNode } from "react";

export function LegalLayout({
  title,
  description,
  version,
  effectiveDate,
  effectiveDateIso,
  children,
}: {
  title: string;
  description: string;
  version?: string;
  effectiveDate?: string;
  effectiveDateIso?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
      <h1 className="text-balance text-4xl font-medium tracking-[-0.035em] text-ink md:text-5xl">{title}</h1>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">{description}</p>
      {version || effectiveDate ? (
        <p className="mt-5 font-mono text-[12px] text-ink-dim">
          {version ? <>Version {version}</> : null}
          {version && effectiveDate ? <span aria-hidden="true"> · </span> : null}
          {effectiveDate ? (
            <>
              Effective{" "}
              {effectiveDateIso ? <time dateTime={effectiveDateIso}>{effectiveDate}</time> : effectiveDate}
            </>
          ) : null}
        </p>
      ) : null}
      <div className="mt-12 space-y-10 text-[15.5px] leading-7 text-ink-muted">{children}</div>
    </article>
  );
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3.5">
      <h2 className="text-xl font-medium tracking-[-0.015em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[13px] [&>li]:before:h-px [&>li]:before:w-2.5 [&>li]:before:bg-accent">{children}</ul>;
}

/** Placeholder text that still needs a real value (entity name, contact email). */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="rounded bg-raised px-1.5 py-0.5 font-mono text-[13px] text-ink">{children}</span>;
}
