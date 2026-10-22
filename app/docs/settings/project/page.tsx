import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Project",
  description: "Scope, rename, filter defaults, upstream proxy and delete for the active project.",
  alternates: { canonical: "/docs/settings/project" },
  openGraph: { url: "/docs/settings/project" },
};

export default function ProjectSettingsPage() {
  return (
    <DocPage href="/docs/settings/project">
      <p>
        <Ui>Project</Ui> settings apply to the project selected in the header. Match / Replace and Import live under
        the Proxy tab.
      </p>
      <InfoTable
        head={["Section", "What you set"]}
        rows={[
          [<Ui key="a">Target scope</Ui>, <>One origin per line, templates like <Ui>localhost + 127.0.0.1</Ui>, then <Ui>Save scope</Ui>.</>],
          [<Ui key="b">Rename project</Ui>, "Change the display name (must be unique)."],
          [<Ui key="c">Filter defaults</Ui>, "Hide static / browser noise / CDN / in-scope only by default for new proxy sessions (saved in your browser)."],
          [<Ui key="d">Upstream &amp; TLS pass-through</Ui>, "Optional upstream proxy and hosts tunneled without certificate interception."],
          [<Ui key="e">Danger zone</Ui>, <>Type the project name to confirm, then <Ui>Delete project</Ui>. Removes history, map and chat for that project.</>],
        ]}
      />
    </DocPage>
  );
}
