import { AgentTrace, AskThread, PlanList } from "@/components/workbench/ai-panel";
import { ApprovalCard } from "@/components/workbench/approval-card";
import { ModeSwitcher, type Mode } from "@/components/workbench/mode-switcher";
import { SectionHeading, SectionRule } from "@/components/section-heading";

const modes: { value: Mode; title: string; body: string; sends: string; footnote: string }[] = [
  {
    value: "ask",
    title: "Ask",
    body: "Explains requests, flows, authentication and roles, using what you have already captured.",
    sends: "None",
    footnote: "Answers from your captured traffic.",
  },
  {
    value: "plan",
    title: "Plan",
    body: "Prioritised test ideas, each tied to the requests that suggested it. You pick what runs next.",
    sends: "None",
    footnote: "Nothing runs from a plan on its own.",
  },
  {
    value: "agent",
    title: "Agent",
    body: "Works through the plan step by step. Every live request needs your Allow, and Stop ends the run.",
    sends: "After Allow",
    footnote: "Each live request waits for you.",
  },
];

export function Modes() {
  return (
    <section id="modes" className="scroll-mt-20 pb-20 pt-8 lg:pb-28">
      <SectionRule index="03" label="Modes" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading className="mt-14" title="Three modes. You decide how much runs.">
          Use Ask to learn the app, Plan to decide what is worth testing, and Agent to run one approved step at a time.
        </SectionHeading>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
          {modes.map((mode) => (
            <article key={mode.value} className="flex flex-col bg-canvas p-6 lg:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">{mode.title}</h3>
                <ModeSwitcher value={mode.value} />
              </div>
              <p className="mt-3 min-h-[4.5rem] text-[14.5px] leading-relaxed text-ink-muted">{mode.body}</p>

              <dl className="mt-5 grid grid-cols-2 border-y border-line font-mono text-[11px]">
                <div className="border-r border-line py-2.5 pr-3">
                  <dt className="uppercase tracking-[0.12em] text-ink-dim">Mode</dt>
                  <dd className="mt-1 text-ink">{mode.value}</dd>
                </div>
                <div className="py-2.5 pl-3">
                  <dt className="uppercase tracking-[0.12em] text-ink-dim">Live requests</dt>
                  <dd className={`mt-1 ${mode.value === "agent" ? "text-accent-fg" : "text-ink"}`}>{mode.sends}</dd>
                </div>
              </dl>

              <div className="relative mt-6 h-[19rem] overflow-hidden rounded-md border border-line bg-surface p-5">
                {mode.value === "ask" ? <AskThread /> : null}
                {mode.value === "plan" ? <PlanList /> : null}
                {mode.value === "agent" ? (
                  <div className="space-y-5">
                    <AgentTrace />
                    <ApprovalCard state="pending" compact />
                  </div>
                ) : null}
              </div>

              <p className="mt-5 font-mono text-[11px] text-ink-dim">{mode.footnote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
