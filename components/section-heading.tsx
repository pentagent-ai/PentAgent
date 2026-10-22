import type { ReactNode } from "react";

const TOTAL = "08";

/** Instrument-panel section header: a hairline, a tick ruler and a mono index line. */
export function SectionRule({ index, label, note }: { index: string; label: string; note?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="ruler w-full opacity-90" aria-hidden="true" />
      <div className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
        <p>
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-line-strong">/</span>
          {label}
        </p>
        <p className="hidden tabular-nums sm:block">
          {note ? <span className="mr-4 normal-case tracking-normal text-ink-dim">{note}</span> : null}
          {index}&thinsp;&middot;&thinsp;{TOTAL}
        </p>
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  children,
  id,
  className = "",
}: {
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-xl ${className}`}>
      <h2
        id={id}
        className="text-balance text-[2rem] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.5rem]"
      >
        {title}
      </h2>
      {children ? <div className="mt-5 text-pretty text-[16.5px] leading-relaxed text-ink-muted">{children}</div> : null}
    </div>
  );
}

/** Framed figure with corner registration marks and a mono caption. */
export function Figure({
  label,
  meta,
  children,
  className = "",
  bodyClassName = "",
}: {
  label: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <figure className={`reg panel rounded-md ${className}`}>
      <span aria-hidden="true" className="reg-mark reg-tl" />
      <span aria-hidden="true" className="reg-mark reg-tr" />
      <span aria-hidden="true" className="reg-mark reg-bl" />
      <span aria-hidden="true" className="reg-mark reg-br" />
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">
        <span>{label}</span>
        {meta ? <span className="hidden normal-case tracking-normal sm:inline">{meta}</span> : null}
      </figcaption>
      <div className={bodyClassName}>{children}</div>
    </figure>
  );
}
