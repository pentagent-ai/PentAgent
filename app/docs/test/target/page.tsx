import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Target & scope",
  description: "Set which hosts are in scope, and browse the sitemap of what you've captured.",
  alternates: { canonical: "/docs/test/target" },
  openGraph: { url: "/docs/test/target" },
};

export default function TargetPage() {
  return (
    <DocPage href="/docs/test/target">
      <p>
        The <Ui>Target</Ui> tab has two jobs: deciding which hosts are in scope for this project, and showing a
        sitemap of the URLs you&rsquo;ve captured.
      </p>

      <H2 id="scope">Scope</H2>
      <p>
        Scope is a list of include and exclude rules. A URL is in scope when it matches an <Ui>Include</Ui> rule and
        no <Ui>Exclude</Ui> rule. Host accepts <code>host:port</code> or <code>host/#/</code> for an SPA. Path prefix
        narrows it (for example <code>/api</code>). Leave Path prefix blank for the whole origin. Empty includes mean
        all hosts match until excludes apply.
      </p>
      <Steps>
        <Step title="Add rules">
          Click <Ui>+ Add rule</Ui> under Include or Exclude. Fill in <Ui>Host</Ui> and optionally{" "}
          <Ui>Path prefix</Ui>.
        </Step>
        <Step title="Save">
          Click <Ui>Save scope</Ui> or press <Keys keys={["Ctrl", "S"]} />.
        </Step>
        <Step title="Check a URL">
          Paste a URL into <Ui>Check URL against scope</Ui>. The result is <Ui>In scope</Ui> or{" "}
          <Ui>Out of scope</Ui>, and it tests the rules you see right now — you don&rsquo;t have to save first.
        </Step>
      </Steps>
      <Callout kind="heads-up" title="Unsaved scope changes">
        If you leave the tab with edits you haven&rsquo;t saved, PentAgent asks whether to <Ui>Save</Ui>,{" "}
        <Ui>Discard</Ui> or <Ui>Cancel</Ui>.
      </Callout>
      <p>
        You can also edit scope under <Ui>Settings › Project</Ui>, including templates like{" "}
        <Ui>localhost + 127.0.0.1</Ui>.
      </p>

      <H2 id="sitemap">Sitemap</H2>
      <p>
        The sitemap fills as you browse through the proxy. Use <Ui>In-scope only</Ui>, <Ui>Hide static</Ui> and{" "}
        <Ui>Search path…</Ui> to narrow it. <Ui>Collapse all</Ui> / <Ui>Expand all</Ui> and <Ui>Refresh</Ui> control
        the tree.
      </p>
      <p>
        Click an endpoint to see methods and parameters in <Ui>Endpoint detail</Ui>. Double-click to send it to
        Repeater. Right-click for <Ui>Add to scope</Ui>, <Ui>Filter History</Ui>, <Ui>Send to Repeater</Ui>,{" "}
        <Ui>Send to Chat</Ui> or <Ui>Send to Organizer</Ui>.
      </p>
      <Callout kind="note">
        Seeing an empty tree? Browse your target in the lab window first. The empty state points you to the Proxy tab.
      </Callout>
    </DocPage>
  );
}
