import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Collaborator",
  description: "Out-of-band listener status and environment variables.",
  alternates: { canonical: "/docs/settings/collaborator" },
  openGraph: { url: "/docs/settings/collaborator" },
};

export default function CollaboratorSettingsPage() {
  return (
    <DocPage href="/docs/settings/collaborator">
      <p>
        Settings for the OOB callback listener used by the{" "}
        <Link href="/docs/test/collaborator">Collaborator</Link> tab. Host and ports come from server{" "}
        <code>.env</code> — restart the API after changes.
      </p>
      <InfoTable
        head={["Control", "What it does"]}
        rows={[
          [<Ui key="a">Status / Domain / HTTP / DNS</Ui>, "Shows whether the listener is up and on which ports."],
          [<Ui key="b">Start listener / Stop listener</Ui>, "Control the local listener."],
          [<Ui key="c">Refresh</Ui>, "Reload status."],
        ]}
      />
      <p>
        Environment variables: <code>COLLABORATOR_LISTEN_HOST</code> (default 127.0.0.1),{" "}
        <code>COLLABORATOR_LISTEN_PORT</code> (8099), <code>COLLABORATOR_DNS_PORT</code> (5300),{" "}
        <code>COLLABORATOR_DOMAIN</code> (<code>oast.pentagent.local</code>).
      </p>
    </DocPage>
  );
}
