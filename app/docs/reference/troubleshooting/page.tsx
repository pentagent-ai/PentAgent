import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "Fixes for common install, sign-in, proxy and capture problems.",
  alternates: { canonical: "/docs/reference/troubleshooting" },
  openGraph: { url: "/docs/reference/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <DocPage href="/docs/reference/troubleshooting">
      <H2 id="install">Install and launch</H2>
      <InfoTable
        head={["Problem", "What to try"]}
        rows={[
          ["launch.sh fails unless you're in the folder", "cd into the unpacked directory, then run ./pa_release/launch.sh."],
          ["Lab browser missing", <>Install Chromium into the pilot venv: <code>~/.local/share/pentagent/venv/bin/python -m playwright install chromium</code>.</>],
          ["Port already in use", <>Change the listen port in Settings › Proxy &amp; gateway, or stop whatever is on 8088.</>],
        ]}
      />

      <H2 id="sign-in">Sign-in</H2>
      <InfoTable
        head={["Problem", "What to try"]}
        rows={[
          ["GitHub sign-in never returns to the app", "The pilot tarball may not register the pentagent:// handler yet. Prefer the supported build path from the pilot download page; email code sign-in is coming soon."],
          ["Not approved yet", "Apply for pilot access, then wait for approval. The app rechecks every few hours."],
          ["Update required", "Download the latest pilot build and replace your install."],
        ]}
      />

      <H2 id="capture">Capture</H2>
      <InfoTable
        head={["Problem", "What to try"]}
        rows={[
          ["No rows in HTTP history", <>Browse in the lab window, not daily Chrome. Check the history scope filter isn't hiding everything — see <Link href="/docs/capture/http-history">HTTP history</Link>.</>],
          ["Certificate warnings", "Use lab Chromium (CA auto-trusted), or download the CA for a manual setup."],
          ["Intercept on but nothing pauses", "Confirm lab Chromium is running and the host is in scope (or turn off In-scope only)."],
          ["UI Map empty despite proxy traffic", "Open the lab browser while the project is selected, then browse in that window so the extension is seeded."],
        ]}
      />

      <H2 id="ai">AI assistant</H2>
      <InfoTable
        head={["Problem", "What to try"]}
        rows={[
          ["No models / provider dropdown empty", <>Configure a provider under <Link href="/docs/settings/ai-models">AI models</Link> and Save.</>],
          ["Agent or Explore disabled", "Some pilot builds turn these off temporarily — use Ask / Plan until they're back."],
          ["Spend cap hit", "Raise or clear limits under AI models, or wait for the daily window to reset."],
        ]}
      />
    </DocPage>
  );
}
