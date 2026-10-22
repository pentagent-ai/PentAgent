import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Short answers to common questions about the pilot.",
  alternates: { canonical: "/docs/reference/faq" },
  openGraph: { url: "/docs/reference/faq" },
};

export default function FaqPage() {
  return (
    <DocPage href="/docs/reference/faq">
      <H2 id="what-is">What is PentAgent?</H2>
      <p>
        A local workbench for authorised web testing: capture traffic through a lab browser, repeat and fuzz
        requests, and optionally use an AI assistant with your own model keys.
      </p>

      <H2 id="pilot">Who can use the pilot?</H2>
      <p>
        Approved pilot participants who sign in with GitHub. See{" "}
        <Link href="/docs/getting-started/sign-in">Sign in</Link>.
      </p>

      <H2 id="data">Where does my data live?</H2>
      <p>
        Traffic, projects and chats stay on your machine under the pilot data directory. AI features send the context
        you select to the provider you configure — PentAgent doesn&rsquo;t mask secrets in that traffic. Analytics only
        run after you accept the welcome screen; details are on the privacy page.
      </p>

      <H2 id="other-tools">Is this a drop-in replacement for other proxy tools?</H2>
      <p>
        No. Workflows will feel familiar if you&rsquo;ve used intercepting proxies before, but labels, tabs and
        behaviour are PentAgent&rsquo;s own. Don&rsquo;t expect every feature from other tools to exist here.
      </p>

      <H2 id="history-pane">What about the History and Logger items?</H2>
      <p>
        Proxy › HTTP history is the main capture list. Separate History / Logger panes exist for tool-sourced traffic
        and exports (CSV, JSON, HAR). Prefer Proxy › HTTP history for everyday capture review.
      </p>

      <H2 id="findings-tab">Where are Findings?</H2>
      <p>
        There isn&rsquo;t a top-level Findings tab. Passive issues live under Scanner; confirmed findings and the
        engagement report live under <Link href="/docs/findings/records">Records</Link>.
      </p>
    </DocPage>
  );
}
