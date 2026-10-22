import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Agent",
  description: "Run an approved plan with live requests that ask for your approval.",
  alternates: { canonical: "/docs/ai/agent" },
  openGraph: { url: "/docs/ai/agent" },
};

export default function AgentPage() {
  return (
    <DocPage href="/docs/ai/agent">
      <p>
        <Ui>Agent</Ui> mode runs an approved plan against the target. Every live request asks for Approve / Deny
        unless you enable batch approvals. The composer placeholder reads <Ui>Ask the agent to run the plan…</Ui>
      </p>

      <H2 id="before">Before you start</H2>
      <ul>
        <li>Finish a Plan document and build/approve the campaign kit in Library.</li>
        <li>Set Target scope.</li>
        <li>Pick a model with a configured key.</li>
        <li>Finish or stop any current chat turn.</li>
      </ul>
      <Callout kind="heads-up" title="Pilot note">
        Some pilot builds temporarily disable Agent or Explore. If you see that message, try again later or use Ask /
        Plan.
      </Callout>

      <H2 id="run">Run</H2>
      <Steps>
        <Step title="Start attack">From the plan-ready prompt, start the attack.</Step>
        <Step title="Approve requests">
          Each live send shows <Ui>Allow this request?</Ui> with <Ui>Deny</Ui>, <Ui>Stop</Ui> and <Ui>Allow</Ui>. See{" "}
          <Link href="/docs/ai/approvals">Approvals &amp; stop</Link>.
        </Step>
        <Step title="Watch progress">
          Status lines like <Ui>Calling model…</Ui> and tool activity appear in the thread. Findings with evidence go
          to Records.
        </Step>
      </Steps>
      <p>
        <Ui>Stop attack</Ui> ends the run. <Ui>Skip endpoint</Ui> / <Ui>Retry</Ui> appear when a step fails.
      </p>
    </DocPage>
  );
}
