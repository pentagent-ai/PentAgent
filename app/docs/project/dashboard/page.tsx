import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "See capture health, findings, scans and recent evidence for the current project.",
  alternates: { canonical: "/docs/project/dashboard" },
  openGraph: { url: "/docs/project/dashboard" },
};

export default function DashboardPage() {
  return (
    <DocPage href="/docs/project/dashboard">
      <p>
        The <Ui>Dashboard</Ui> is the overview for the current project. Open it from the left menu under{" "}
        <Ui>Project</Ui>. With no project selected it says <Ui>Open or create a project to see capture health,
        findings, and recent evidence.</Ui>
      </p>

      <H2 id="cards">What you see</H2>
      <InfoTable
        head={["Card", "What it shows"]}
        rows={[
          [<Ui key="a">Capture</Ui>, <>Proxy status, transaction count and last seen. <Ui>Open history</Ui> / <Ui>See history</Ui> jumps to HTTP history. If the proxy is off, it points you to start it.</>],
          [<Ui key="b">Understanding</Ui>, <>Hosts, pages and tech from the Target map. <Ui>Open Target →</Ui> opens the sitemap.</>],
          [<Ui key="c">Findings</Ui>, <>Issues from passive scans. <Ui>Open Scanner</Ui>, or <Ui>Run a passive scan</Ui> / <Ui>Launch passive scan</Ui> when empty.</>],
          [<Ui key="d">Testing</Ui>, <>Scan runs and other tasks. <Ui>New scan</Ui> / <Ui>Start a passive scan</Ui> starts one. Double-click a task to rename it.</>],
          [<Ui key="e">Recent evidence</Ui>, "Jump points to transactions linked from scan issues."],
        ]}
      />
      <Callout kind="tip">
        Background imports and kit builds also show progress here under other tasks.
      </Callout>
    </DocPage>
  );
}
