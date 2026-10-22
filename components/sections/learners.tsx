import { AskThread } from "@/components/workbench/ai-panel";
import { HistoryList } from "@/components/workbench/history-list";
import { Figure, SectionHeading, SectionRule } from "@/components/section-heading";
import { seedHistory } from "@/lib/demo-data";

const points = [
  {
    title: "Start from real requests",
    body: "Learn by reading the traffic your own browser produces, not a list of abstract vulnerability names.",
  },
  {
    title: "Ask what a request does",
    body: "Ask why a role matters, what a response reveals, and what to try next. Answers stay tied to the flow you captured.",
  },
  {
    title: "Approve each step",
    body: "See exactly what a test sends before it runs, so you learn what each technique does on the wire.",
  },
];

export function Learners() {
  return (
    <section className="pb-20 pt-8 lg:pb-28">
      <SectionRule index="06" label="Built for learners and juniors" />
      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading title="Understand web apps from your own traffic.">
            Built for cybersecurity students, junior pentesters and bug bounty hunters who want to understand how an app
            works before they try to break it.
          </SectionHeading>

          <ol className="mt-12 border-t border-line">
            {points.map((point, i) => (
              <li key={point.title} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-5">
                <span className="pt-0.5 font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[15px] font-medium text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Figure label="Fig. 04 / Captured, then asked" meta="demo-shop.test" bodyClassName="grid gap-px bg-line sm:grid-cols-[1.1fr_1fr]">
          <div className="bg-surface p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">Captured</p>
            <div className="mt-4">
              <HistoryList dense columns={["method", "url", "status"]} rows={seedHistory.slice(4, 10)} selectedId={9} />
            </div>
          </div>
          <div className="bg-surface p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">Ask</p>
            <div className="mt-4">
              <AskThread />
            </div>
          </div>
        </Figure>
      </div>
    </section>
  );
}
