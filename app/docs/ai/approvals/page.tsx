import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Approvals & stop",
  description: "Approve live requests, stop runs, Explore toggles and spend caps.",
  alternates: { canonical: "/docs/ai/approvals" },
  openGraph: { url: "/docs/ai/approvals" },
};

export default function ApprovalsPage() {
  return (
    <DocPage href="/docs/ai/approvals">
      <p>
        When Agent (or Explore) is about to send live traffic or spend tokens, PentAgent asks first.
      </p>

      <H2 id="allow">Allow this request?</H2>
      <p>
        The prompt shows a short summary and about how many requests. Choose:
      </p>
      <InfoTable
        head={["Button", "What it does"]}
        rows={[
          [<Ui key="a">Deny</Ui>, "Blocks this send."],
          [<Ui key="b">Stop</Ui>, "Stops everything for the run."],
          [<Ui key="c">Allow</Ui>, "Lets this request through."],
        ]}
      />
      <p>
        Under <Link href="/docs/settings/ai-models">AI models</Link>, you can enable{" "}
        <Ui>Approve batch (one Allow for following sends)</Ui> so one Allow covers the rest of that attack until you
        Stop.
      </p>

      <H2 id="explore">Explore (per mode)</H2>
      <p>
        In AI settings, each mode (Ask / Plan / Agent) has an Explore toggle. When off, that mode only uses endpoints
        you drop into chat. When on, a whole-app explore shows a cost warning first if{" "}
        <Ui>Warn about cost before exploring</Ui> is enabled. Destructive actions get their own prompt.
      </p>

      <H2 id="spend">Spend cap</H2>
      <p>
        Spend caps are off by default — PentAgent does not sell models. Under AI models you can turn on{" "}
        <Ui>Enforce spend / token limits</Ui> and set session / daily money or token limits. Chat stops cleanly when a
        cap is hit. Money caps need a provider that reports cost; token caps use provider usage when available.
      </p>

      <H2 id="stop">Stop</H2>
      <p>
        Use <Ui>Stop</Ui> on the approval prompt, <Ui>Stop attack</Ui> in the thread, or the Stop control in the
        composer to halt a run.
      </p>
    </DocPage>
  );
}
