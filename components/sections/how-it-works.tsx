import { PlanList } from "@/components/workbench/ai-panel";
import { ApprovalCard } from "@/components/workbench/approval-card";
import { HistoryList } from "@/components/workbench/history-list";
import { UnderstandingMap } from "@/components/workbench/understanding-map";
import { SectionHeading, SectionRule } from "@/components/section-heading";
import { seedHistory } from "@/lib/demo-data";

const steps = [
  {
    number: "01",
    title: "Capture",
    label: "HTTP history",
    body: "Browse the app through PentAgent's proxy. Every request lands in one history you can filter, open and replay.",
  },
  {
    number: "02",
    title: "Understand",
    label: "Sitemap",
    body: "PentAgent maps screens, API calls, roles and workflows from that traffic, so answers reflect your app's real shape.",
  },
  {
    number: "03",
    title: "Plan",
    label: "Plan",
    body: "Ask for an explanation, or for prioritised test ideas tied to the specific requests that suggested them.",
  },
  {
    number: "04",
    title: "Test with approval",
    label: "Agent",
    body: "In Agent mode each live request waits for your Allow. Stop ends the run at any point.",
  },
];

function Visual({ index }: { index: number }) {
  if (index === 0) return <HistoryList dense columns={["method", "url", "status"]} rows={seedHistory.slice(0, 9)} />;
  if (index === 1) return <UnderstandingMap compact />;
  if (index === 2) return <PlanList />;
  return <ApprovalCard state="pending" compact />;
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 pb-20 pt-8 lg:pb-28">
      <SectionRule index="02" label="How it works" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading className="mt-14" title="Capture, understand, plan, then test with approval.">
          PentAgent works from the traffic your browser actually sends. Nothing is tested until you say so.
        </SectionHeading>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="flex flex-col bg-canvas"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">
                <span>
                  <span className="text-accent">{step.number}</span>
                  <span className="mx-2 text-line-strong">/</span>
                  {step.label}
                </span>
                <span aria-hidden="true" className="flex gap-[3px]">
                  {[0, 1, 2, 3].map((n) => (
                    <span key={n} className={`h-2 w-px ${n <= i ? "bg-accent" : "bg-line-strong"}`} />
                  ))}
                </span>
              </div>
              <div className="h-[19rem] overflow-hidden bg-surface p-4">
                <Visual index={i} />
              </div>
              <div className="border-t border-line px-4 pb-6 pt-5">
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
