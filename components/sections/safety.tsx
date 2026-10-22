import { ScopePanel } from "@/components/workbench/scope-panel";
import { StopButton } from "@/components/workbench/stop-button";
import { SectionHeading, SectionRule } from "@/components/section-heading";

const controls = [
  {
    code: "A",
    title: "Approval on every live request",
    body: "Anything that touches the target waits in the approval card. Nothing is sent until you choose Allow.",
  },
  {
    code: "B",
    title: "Stop, one control",
    body: "The Stop button ends the run. Resume only when you are ready.",
  },
  {
    code: "C",
    title: "Scope rules",
    body: "Name the hosts and paths PentAgent works within before a run starts.",
  },
  {
    code: "D",
    title: "Optional spend cap",
    body: "Set a limit on model usage if you want one. It is off by default.",
  },
];

export function Safety() {
  return (
    <section id="control" className="scroll-mt-20 pb-20 pt-8 lg:pb-28">
      <SectionRule index="04" label="Control" />
      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading title="You stay in control of every live request.">
            PentAgent is built around a simple rule. The agent proposes, you decide, and you can stop it at any point.
          </SectionHeading>

          <ul className="mt-12 border-t border-line">
            {controls.map((control) => (
              <li key={control.title} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-5">
                <span className="pt-0.5 font-mono text-[11px] text-accent">{control.code}</span>
                <div>
                  <h3 className="text-[15px] font-medium text-ink">{control.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">{control.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reg panel rounded-md">
          <span aria-hidden="true" className="reg-mark reg-tl" />
          <span aria-hidden="true" className="reg-mark reg-tr" />
          <span aria-hidden="true" className="reg-mark reg-bl" />
          <span aria-hidden="true" className="reg-mark reg-br" />
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-dim">Fig. 02 / Run controls</p>
            <StopButton running />
          </div>
          <div className="ruled p-5 sm:p-7">
            <ScopePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
