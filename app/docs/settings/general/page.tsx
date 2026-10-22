import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
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
          [<Ui key="b">API</Ui>, "Status and version of the local API."],
          [<Ui key="c">Embeddings (AI search)</Ui>, <>Enabled / model / backend. Configure with <code>EMBEDDING_*</code>; install with <code>uv sync --extra embeddings</code>.</>],
          [<Ui key="d">Server config (.env)</Ui>, <>Reminders for <code>API_HOST</code>, <code>PROXY_LISTEN_*</code>, <code>DATABASE_URL</code>, stealth and scanner flags. Restart the API after editing.</>],
          [<Ui key="e">Lab browser</Ui>, "Lists available Playwright browsers and notes that the capture extension loads automatically in lab Chromium."],
        ]}
      />
      <Callout kind="note">
        The empty-browser message may suggest <code>uv run playwright install chromium</code>. Pilot tarball users
        should install Chromium with the venv Python under{" "}
        <code>~/.local/share/pentagent/venv</code> instead — see{" "}
        <Link href="/docs/getting-started/install">Install</Link>.
      </Callout>
    </DocPage>
  );
}
