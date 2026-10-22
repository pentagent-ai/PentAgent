import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Inspector",
  description: "See params, cookies and headers for the message you have selected.",
  alternates: { canonical: "/docs/test/inspector" },
  openGraph: { url: "/docs/test/inspector" },
};

export default function InspectorPage() {
  return (
    <DocPage href="/docs/test/inspector">
      <p>
        <Ui>Inspector</Ui> is the side panel on the right of the workbench, not a top-level tab. When you select a
        message in Proxy, History, Organizer or elsewhere, it lists that message&rsquo;s params, cookies and headers.
      </p>

      <H2 id="use">Use the Inspector</H2>
      <ul>
        <li>Toggle it with the Inspector shortcut (see <Link href="/docs/reference/shortcuts">Shortcuts</Link>).</li>
        <li>Switch between <Ui>Request</Ui> and <Ui>Response</Ui>.</li>
        <li>Edit name/value pairs and click <Ui>+ add</Ui> for a new one. Form body params appear under{" "}
          <Ui>Body params (form)</Ui>.</li>
        <li>
          <Ui>Open in Repeater with changes</Ui> sends the edited query, headers, cookies and form body to a new
          Repeater tab.
        </li>
      </ul>
      <p>
        With nothing selected, it says <Ui>Select a message to inspect params, cookies, and headers.</Ui>
      </p>
    </DocPage>
  );
}
