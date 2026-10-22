import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Legend, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "HTTP history",
  description: "Browse, search and filter everything the proxy has captured.",
  alternates: { canonical: "/docs/capture/http-history" },
  openGraph: { url: "/docs/capture/http-history" },
};

export default function HttpHistoryPage() {
  return (
    <DocPage href="/docs/capture/http-history">
      <p>
        <Ui>Proxy › HTTP history</Ui> lists every request and response that went through the listener for the current
        project, newest first. Rows appear live while you browse in the lab window.
      </p>

      <H2 id="the-list">The list</H2>
      <Legend
        items={[
          <>The toolbar: <Ui>HTTP</Ui> / <Ui>HTTPS</Ui> chips, a <Ui>Domain</Ui> picker, <Ui>Search requests…</Ui>, the <Ui>Filter</Ui> button and the count of matching rows.</>,
          <>The table. By default it shows <Ui>#</Ui>, <Ui>Method</Ui>, <Ui>URL</Ui>, <Ui>Status code</Ui>, <Ui>Length</Ui>, <Ui>Time</Ui> and <Ui>Source</Ui>.</>,
          <>The selected exchange, with the request on one side and the response on the other.</>,
        ]}
      />
      <p>
        Long histories load in pages. The line above the table reads <Ui>Showing 50 of 1,240 (newest first)</Ui> or
        similar. Click <Ui>Load more rows</Ui> to fetch more.
      </p>

      <H2 id="look-at-a-request">Look at a request</H2>
      <p>
        Click a row to open it below the table. Each side has <Ui>pretty</Ui>, <Ui>raw</Ui> and <Ui>hex</Ui> views. From
        here you can:
      </p>
      <ul>
        <li>Click the <Ui>Send to Repeater</Ui> arrow to open the request in <Ui>Repeater</Ui> and switch to it.</li>
        <li>Right-click the row or the message for more actions, like sending it to other tools.</li>
      </ul>
      <p>
        The <Ui>Inspector</Ui> panel on the right breaks the selected message into params, cookies and headers.
      </p>

      <H2 id="search-and-filter">Search and filter</H2>
      <p>
        Type in <Ui>Search requests…</Ui> to narrow the list. A small <Ui>×</Ui> clears it. The <Ui>HTTP</Ui> and{" "}
        <Ui>HTTPS</Ui> chips and the <Ui>Domain</Ui> picker are quick toggles. Click a chip again to turn it off.
      </p>
      <H3 id="filter-dialog">The filter dialog</H3>
      <p>Click <Ui>Filter</Ui> for everything else.</p>
      <Legend
        items={[
          <><Ui>Quick filters</Ui>: the same protocol and domain choices as the toolbar.</>,
          <><Ui>History filters</Ui>: host, method, status, status class, path/URL search, and the hide options below.</>,
          <><Ui>Columns</Ui>: pick which columns the table shows.</>,
        ]}
      />
      <InfoTable
        head={["Filter", "Default"]}
        rows={[
          [<Ui key="a">Hide static</Ui>, "On. Hides CSS, scripts, images and fonts."],
          [<Ui key="b">Hide browser noise</Ui>, "On. Hides browser telemetry, updates and connectivity checks."],
          [<Ui key="c">Hide CDN</Ui>, "On. Hides common CDN hosts."],
          [<><Ui>All hosts</Ui> / <Ui>In scope</Ui> / <Ui>Out of scope</Ui></>, <><Ui>In scope</Ui>, unless your project options say otherwise.</>],
          [<Ui key="e">Legacy extension traffic</Ui>, "Off. Only for rows captured by an older browser extension."],
        ]}
      />
      <Callout kind="heads-up" title="Seeing fewer rows than you expect?">
        History starts filtered to in-scope hosts. If your project has no scope yet, or the site you&rsquo;re browsing
        isn&rsquo;t in it, switch the scope filter to <Ui>All hosts</Ui>, or add the host on the{" "}
        <Ui>Target</Ui> tab.
      </Callout>

      <H3 id="host-filter">Filtering to one host</H3>
      <p>
        Some views, like the insights strip under the history, can narrow the list to one host. A{" "}
        <Ui>Host: demo.local</Ui> line then appears above the toolbar. Click <Ui>clear</Ui> to remove it.
      </p>

      <H2 id="clear-history">Clear history</H2>
      <p>
        In the filter dialog, <Ui>Clear history</Ui> deletes every captured request for this project. PentAgent asks
        you to confirm first, because this can&rsquo;t be undone. <Ui>Refresh</Ui> reloads the list.
      </p>

      <H2 id="empty">When the list is empty</H2>
      <p>
        With no captures yet, the sub-tab shows the <Ui>Get your first capture</Ui> steps. See{" "}
        <Link href="/docs/getting-started/first-run">First run</Link>, then browse your target in the lab window.
      </p>
    </DocPage>
  );
}
