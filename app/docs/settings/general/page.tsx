import type { Metadata } from "next";
import Link from "next/link";
import { Callout, InfoTable, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "General",
  description: "Theme, API health, embeddings and lab browser overview.",
  alternates: { canonical: "/docs/settings/general" },
  openGraph: { url: "/docs/settings/general" },
};

export default function GeneralSettingsPage() {
  return (
    <DocPage href="/docs/settings/general">
      <p>
        Open Settings from the gear in the top bar. <Ui>General</Ui> covers appearance, server health and feature
        status.
      </p>
      <InfoTable
        head={["Section", "What you set"]}
        rows={[
          [<Ui key="a">Appearance</Ui>, "Theme for the workbench. System follows your OS preference."],
          [<Ui key="b">API</Ui>, "Status and version of the local engine."],
          [<Ui key="c">Embeddings (AI search)</Ui>, "Whether local semantic search is active or using the lightweight keyword fallback."],
          [<Ui key="d">Server config</Ui>, "Active local host, proxy listener defaults, and storage status."],
          [<Ui key="e">Lab browser</Ui>, "Lists available lab browsers and notes that the capture extension loads automatically in lab Chromium."],
        ]}
      />
      <Callout kind="note">
        PentAgent downloads its isolated lab Chromium automatically on the first launch. If a network interruption
        skipped that step, restart PentAgent with an internet connection — see{" "}
        <Link href="/docs/getting-started/install">Install</Link>.
      </Callout>
    </DocPage>
  );
}
