import { ButtonLink } from "@/components/button";
import { Workbench } from "@/components/workbench/workbench";
import { links } from "@/lib/links";

// Product facts only. No metrics, no counts.
const readout: { key: string; value: string; accent?: boolean }[] = [
  { key: "Runs", value: "On your machine" },
  { key: "Model", value: "Your API key, or a local model" },
  { key: "Live requests", value: "Each one waits for Allow", accent: true },
  { key: "Stop", value: "Ends the run at any point" },
  { key: "Access", value: "Invite-only pilot" },
];

export function Hero() {
  return (
    <section className="relative pb-20 pt-10 sm:pt-14 lg:pb-28">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
          <p>
            <span className="text-accent">01</span>
            <span className="mx-2 text-line-strong">/</span>
            Web app security workbench
          </p>
          <p className="hidden sm:block">Desktop &middot; Pilot</p>
        </div>
        <div className="ruler mt-3 w-full" aria-hidden="true" />

        <h1 className="rise mt-12 text-balance text-[2.3rem] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-[3.5rem] lg:mt-14 lg:text-[4.5rem]">
          Understand the app.
          <br />
          <span className="text-ink-muted">Then test what matters.</span>
        </h1>

        <div className="rise mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="max-w-xl text-pretty text-[17px] leading-relaxed text-ink-muted">
              PentAgent is an AI-native desktop workbench for web app security. It learns your target from real
              traffic, explains it, plans tests, and runs them only when you approve.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={links.pilot} size="lg">
                Request pilot access
              </ButtonLink>
              <ButtonLink href={links.howItWorks} size="lg" variant="secondary">
                See how it works
              </ButtonLink>
            </div>

            <p className="mt-6 font-mono text-[12px] text-ink-dim">
              Runs locally. Bring your own model.
              <span className="mx-2.5 text-line-strong" aria-hidden="true">
                |
              </span>
              Authorized testing only.
            </p>
          </div>

          <dl className="border-y border-line font-mono text-[12px]">
            {readout.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3 last:border-b-0"
              >
                <dt className="uppercase tracking-[0.12em] text-ink-dim">{row.key}</dt>
                <dd className={row.accent ? "text-accent-fg" : "text-ink"}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise rise-delay relative mt-14 lg:mt-16">
          <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">
            <p>
              Fig. 01<span className="mx-2 text-line-strong">/</span>Proxy, HTTP history, Agent
            </p>
            <p className="hidden normal-case tracking-normal sm:block">demo-shop.test &middot; demo data</p>
          </div>
          {/* Layered flat plates behind the app window give depth. */}
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-3 rounded-[8px] border border-line bg-surface sm:inset-x-10 sm:-bottom-5" />
            <div aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-[8px] border border-line bg-raised sm:inset-x-5 sm:-bottom-2.5" />
            <div className="relative">
              <Workbench />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
