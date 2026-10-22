import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Collaborator",
  description: "Generate out-of-band payloads and watch HTTP and DNS callbacks.",
  alternates: { canonical: "/docs/test/collaborator" },
  openGraph: { url: "/docs/test/collaborator" },
};

export default function CollaboratorPage() {
  return (
    <DocPage href="/docs/test/collaborator">
      <p>
        <Ui>Collaborator</Ui> is a local out-of-band listener (HTTP + DNS). Generate a payload, put it somewhere that
        might trigger a blind callback (SSRF, XXE, XSS beacon), then watch <Ui>Interactions</Ui>.
      </p>

      <H2 id="start-listener">Start the listener</H2>
      <p>
        The status at the top shows <Ui>Listener running</Ui> or <Ui>Listener stopped</Ui>, with the HTTP and DNS
        ports. Start or stop it from here or from <Ui>Settings › Collaborator</Ui>. Host and ports come from server
        environment variables (defaults: <code>127.0.0.1</code>, HTTP <code>8099</code>, DNS <code>5300</code>, domain{" "}
        <code>oast.pentagent.local</code>). Restart the API after changing them.
      </p>

      <H2 id="generate">Generate a payload</H2>
      <Steps>
        <Step title="Choose HTTP or DNS">Then click <Ui>Generate</Ui>.</Step>
        <Step title="Copy or insert">
          <Ui>Copy payload</Ui>, or <Ui>Insert into Repeater</Ui> / <Ui>Insert into Intruder</Ui>. Or use{" "}
          <Ui>Insert payload into Repeater</Ui> to put it into a URL query, an <code>X-Collaborator</code> header, or
          the body.
        </Step>
        <Step title="Use a lab snippet">
          <Ui>Copyable lab snippets</Ui> give you ready <code>curl</code> / <code>dig</code> commands against the
          local listener.
        </Step>
      </Steps>

      <H2 id="interactions">Interactions</H2>
      <p>
        Filter by protocol (<Ui>All</Ui> / <Ui>HTTP only</Ui> / <Ui>DNS only</Ui>) and search detail / path / from.
        Tick <Ui>Auto-refresh</Ui> or click <Ui>Refresh now</Ui>. Export with <Ui>Export CSV</Ui> or{" "}
        <Ui>Export JSON</Ui>.
      </p>
    </DocPage>
  );
}
