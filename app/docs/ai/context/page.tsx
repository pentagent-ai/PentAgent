import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Context",
  description: "Attach recon notes and see the request selected for the assistant.",
  alternates: { canonical: "/docs/ai/context" },
  openGraph: { url: "/docs/ai/context" },
};

export default function ContextPage() {
  return (
    <DocPage href="/docs/ai/context">
      <p>
        Context has two sides: the request currently selected for chat, and your own recon notes attached to the
        project.
      </p>

      <H2 id="selected">Selected request</H2>
      <p>
        In the AI Assistant, the <Ui>Context</Ui> strip shows the selected message.{" "}
        <Ui>Select a request to populate context.</Ui> <Ui>Open Inspector</Ui> opens the full breakdown. Status for the
        selection is listed under <Ui>Status</Ui>.
      </p>

      <H2 id="notes">Context notes</H2>
      <p>
        The <Ui>Context notes</Ui> panel (project context) lets you attach recon output, business profile and roles.
      </p>
      <InfoTable
        head={["Field", "Use"]}
        rows={[
          [<Ui key="a">Scope</Ui>, <><Ui>Project</Ui> or <Ui>Host</Ui>.</>],
          [<Ui key="b">Host</Ui>, "When scope is Host, the hostname the notes apply to."],
          [<Ui key="c">Title</Ui>, "A short label."],
          [<Ui key="d">Notes (markdown)</Ui>, "Paste recon output, business profile, roles…"],
        ]}
      />
      <p>Click <Ui>Save context</Ui> to keep the notes with the project.</p>
    </DocPage>
  );
}
