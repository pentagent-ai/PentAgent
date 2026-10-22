import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Kits",
  description: "Browse the attack library and build campaign kits from Plan threads.",
  alternates: { canonical: "/docs/project/kits" },
  openGraph: { url: "/docs/project/kits" },
};

export default function KitsPage() {
  return (
    <DocPage href="/docs/project/kits">
      <p>
        <Ui>Kits</Ui> (the Library pane) holds the seed library of skills and suites, plus campaign kits you build
        from a Plan thread.
      </p>

      <H2 id="seed">Seed library</H2>
      <p>
        Pick a skill or suite in the tree to preview methodology text. The seed library is a read-only reference:
        payloads and notes you can learn from. Use <Ui>Enable all</Ui> / <Ui>Disable all</Ui> when editing which
        suites are active in a kit.
      </p>

      <H2 id="campaign">Campaign kit</H2>
      <Steps>
        <Step title="Open a Plan thread">
          In the AI Assistant, switch to <Ui>Plan</Ui> and work until a plan document appears on the left.
        </Step>
        <Step title="Build kit from plan">
          Click <Ui>Build kit from plan</Ui> (or <Ui>Build campaign kit</Ui> from the chat). Status moves from{" "}
          <Ui>Starting kit build…</Ui> to <Ui>Kit ready</Ui>.
        </Step>
        <Step title="Review and approve">
          Open the kit in Library, check the endpoint map (On / Parent / Param / Suites), then{" "}
          <Ui>Approve kit</Ui>. Authz plans need at least two principals before Approve / Start.
        </Step>
        <Step title="Start attack">
          Back in Agent mode, start the attack. See <Link href="/docs/ai/agent">Agent</Link>.
        </Step>
      </Steps>
      <Callout kind="tip">
        <Ui>Open plan</Ui> jumps back to the Plan thread. Without a plan thread, the pane says to open one first.
      </Callout>
    </DocPage>
  );
}
