import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Lab browser",
  description: "How lab Chromium, the capture extension and proxy modes work.",
  alternates: { canonical: "/docs/settings/lab-browser" },
  openGraph: { url: "/docs/settings/lab-browser" },
};

export default function LabBrowserSettingsPage() {
  return (
    <DocPage href="/docs/settings/lab-browser">
      <p>
        PentAgent launches dedicated Playwright Chromium with the capture extension — not your daily Chrome or Brave
        profile. Most controls live under <Link href="/docs/settings/proxy">Proxy &amp; gateway</Link>; the overview
        also appears under General.
      </p>
      <InfoTable
        head={["Topic", "Details"]}
        rows={[
          ["Opening", <><Ui>Open lab browser</Ui> / <Ui>Open lab Chromium</Ui> from onboarding, Settings, or the <Ui>Lab</Ui> control in the left menu.</>],
          ["Extension", "Pre-loaded on open. Project ID and API base are set automatically. Manual options are in the extension popup."],
          ["Proxy modes", <><Ui>Required</Ui> — capture through the proxy. <Ui>Optional</Ui> — capture if the proxy is running. <Ui>Off</Ui> — extension-only capture, no proxy (fast explore).</>],
          ["CA", "The PentAgent CA is auto-trusted in the lab profile."],
        ]}
      />
    </DocPage>
  );
}
