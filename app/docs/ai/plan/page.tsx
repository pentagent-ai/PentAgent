import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Plan",
  description: "Write an attack plan the agent can follow.",
  alternates: { canonical: "/docs/ai/plan" },
  openGraph: { url: "/docs/ai/plan" },
};

export default function PlanPage() {
  return (
    <DocPage href="/docs/ai/plan">
      <p>
        <Ui>Plan</Ui> mode writes a named guide on the left (types and library paths, not full payload dumps). Edit it
        there anytime. The composer placeholder reads <Ui>Describe what to test…</Ui>
      </p>

      <H2 id="write">Write a plan</H2>
      <Steps>
        <Step title="Switch to Plan">
          Choose <Ui>Plan</Ui> in the mode dropdown. Switching to Plan disarms Agent until you Start attack.
        </Step>
        <Step title="Describe what to test">
          Answer clarifying questions if the assistant asks them (including <Ui>Other</Ui> with a free-text answer).
        </Step>
        <Step title="Review the plan on the left">
          Use <Ui>Open on left</Ui> / <Ui>Viewing on left</Ui>. Edit the document directly.
        </Step>
        <Step title="Build the kit">
          When the plan is ready, build and approve a campaign kit in <Link href="/docs/project/kits">Kits</Link>.
        </Step>
      </Steps>
      <Callout kind="tip">
        Set Target scope before you Start attack from Agent. The assistant will remind you if scope is empty.
      </Callout>
    </DocPage>
  );
}
