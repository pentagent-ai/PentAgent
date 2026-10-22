import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Scanner",
  description: "Run a passive audit on captured traffic and review the issues it finds.",
  alternates: { canonical: "/docs/test/scanner" },
  openGraph: { url: "/docs/test/scanner" },
};

export default function ScannerPage() {
  return (
    <DocPage href="/docs/test/scanner">
      <p>
        <Ui>Scanner</Ui> looks through traffic you&rsquo;ve already captured and flags possible issues. It doesn&rsquo;t
        send new attacks on its own. Issues are identification leads. Confirmed findings with evidence show up under{" "}
        <Link href="/docs/findings/records">Records → Findings</Link>.
      </p>

      <H2 id="run">Run a passive scan</H2>
      <Steps>
        <Step title="Capture some traffic">Browse your target in the lab window first.</Step>
        <Step title="Start the scan">
          Click <Ui>New passive scan</Ui> (or <Ui>Run a passive scan</Ui> when the list is empty). You can also start
          one from the <Ui>Dashboard</Ui>.
        </Step>
      </Steps>
      <p>
        While it runs, the status shows on the Dashboard. When it finishes, issues appear here. Tick{" "}
        <Ui>Group by rule</Ui> to group them. <Ui>Open Dashboard</Ui> jumps back to the live overview.
      </p>

      <H2 id="review">Review an issue</H2>
      <p>
        Select an issue to see its severity, host and evidence. From there you can{" "}
        <Ui>Open evidence in HTTP history</Ui>, <Ui>View transaction</Ui>, <Ui>View in Target / History</Ui>, or{" "}
        <Ui>Open in Records</Ui>.
      </p>
      <Callout kind="note">
        Passive scans only look at what you&rsquo;ve already captured. Queue AI leads (when enabled) sends candidates
        to Organizer under the <Ui>Has AI lead</Ui> filter.
      </Callout>
    </DocPage>
  );
}
