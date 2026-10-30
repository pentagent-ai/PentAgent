import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Repeater",
  description: "Edit a request by hand, send it again, and compare what comes back.",
  alternates: { canonical: "/docs/test/repeater" },
  openGraph: { url: "/docs/test/repeater" },
};

export default function RepeaterPage() {
  return (
    <DocPage href="/docs/test/repeater">
      <p>
        <Ui>Repeater</Ui> is for trying one request over and over with small changes. Each request gets its own tab, so
        you can keep several experiments going at once.
      </p>

      <H2 id="open-a-request">Open a request in Repeater</H2>
      <ul>
        <li>In <Link href="/docs/capture/http-history">HTTP history</Link>, click the <Ui>Send to Repeater</Ui> arrow, or right-click a row and send it.</li>
        <li>Double-click a row in Fuzzer results, the Target sitemap, or other tables that say <Ui>Double-click to send to Repeater</Ui>.</li>
        <li>From the <Ui>Inspector</Ui>, click <Ui>Open in Repeater with changes</Ui>.</li>
        <li>Or paste a raw request into an empty tab.</li>
      </ul>
      <p>
        With nothing open yet, Repeater says <Ui>Send to Repeater from History or paste a request.</Ui>
      </p>

      <H2 id="tabs">Work with tabs</H2>
      <InfoTable
        head={["To", "Do this"]}
        rows={[
          ["Open a new tab", <><Ui>+</Ui> or <Keys keys={["Ctrl", "T"]} /></>],
          ["Rename a tab", "Double-click its name."],
          ["Close a tab", <>The <Ui>×</Ui> on the tab.</>],
          ["See what this tab sent before", <><Ui>◀ History</Ui>, the per-tab send history.</>],
        ]}
      />

      <H2 id="send">Send the request</H2>
      <Steps>
        <Step title="Edit the request">Change anything in the request editor: method, path, headers or body.</Step>
        <Step title="Send it">
          Click <Ui>Send</Ui> or press <Keys keys={["Ctrl", "R"]} />. The response appears next to the request. If the
          site redirects and <Ui>Follow redirects</Ui> is on, the redirect chain is shown as well.
        </Step>
      </Steps>

      <H3 id="send-options">Send options</H3>
      <InfoTable
        head={["Option", "What it does"]}
        rows={[
          [<Ui key="a">Follow redirects</Ui>, "Follow 3xx responses to the final page."],
          [<Ui key="b">Via proxy</Ui>, <><Ui>Auto</Ui> sends through the project listener when capture is running. <Ui>Require</Ui> always uses it, and <Ui>Direct</Ui> skips it.</>],
          [<Ui key="c">Send as:</Ui>, <>Send as a saved principal (a signed-in user). This replaces the Cookie and Authorization headers. <Ui>draft headers</Ui> sends exactly what you typed.</>],
          [<Ui key="d">Send w/o CL</Ui>, <>Send without updating Content-Length (<Keys keys={["Ctrl", "Shift", "R"]} />).</>],
          [<Ui key="e">Send ×N</Ui>, "Send several identical requests at the same moment, to check how the site handles a race."],
          [<Ui key="f">WebSocket</Ui>, "Switch the tab to WebSocket messages."],
        ]}
      />
      <p>
        <Ui>Parent traffic</Ui> jumps back to the captured request this tab came from.
      </p>
      <Callout kind="tip">
        Repeater sends real requests to the target. Only use it on systems you&rsquo;re allowed to test.
      </Callout>
    </DocPage>
  );
}
