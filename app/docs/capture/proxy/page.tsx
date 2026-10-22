import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Legend, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Proxy & Intercept",
  description: "Start capturing, then pause, edit, forward or drop requests with Intercept.",
  alternates: { canonical: "/docs/capture/proxy" },
  openGraph: { url: "/docs/capture/proxy" },
};

export default function ProxyPage() {
  return (
    <DocPage href="/docs/capture/proxy">
      <p>
        The <Ui>Proxy</Ui> tab is where traffic from the lab browser comes in. It has five sub-tabs:{" "}
        <Ui>Intercept</Ui>, <Ui>HTTP history</Ui>, <Ui>WebSockets</Ui>, <Ui>Match / Replace</Ui> and <Ui>Import</Ui>.
        This page covers the listener and the <Ui>Intercept</Ui> sub-tab.
      </p>

      <H2 id="start-and-stop">Start and stop the listener</H2>
      <p>
        PentAgent captures through a local listener, <code>127.0.0.1:8088</code> by default. You can start it from
        any of these places:
      </p>
      <ul>
        <li>The proxy button in the top bar. It reads <Ui>Proxy Off</Ui> until the listener runs.</li>
        <li><Ui>Start proxy</Ui> in the <Ui>Get your first capture</Ui> steps.</li>
        <li><Ui>Open lab browser</Ui>, which starts the listener for you if it isn&rsquo;t running.</li>
      </ul>
      <p>
        To stop, click the proxy button again (its tooltip reads <Ui>Stop proxy (127.0.0.1:8088)</Ui>), use the{" "}
        <Ui>■</Ui> next to <Ui>Lab</Ui> at the bottom of the left menu, or <Ui>Stop listener</Ui> in{" "}
        <Ui>Settings › Proxy &amp; gateway</Ui>. Once it stops, the lab browser shows <em>No internet</em> until you
        open it again.
      </p>
      <Callout kind="note">
        The listener belongs to one project at a time. If another project is using it, the Proxy tab says{" "}
        <Ui>Listener owned by another project</Ui>. Opening the lab browser or turning on Intercept here moves it to
        this project.
      </Callout>

      <H2 id="intercept">Intercept</H2>
      <p>
        Intercept pauses matching traffic in the lab browser so you can look at it, change it, and then send it on or
        drop it. While Intercept is off, traffic flows normally and shows up in{" "}
        <Link href="/docs/capture/http-history">HTTP history</Link>.
      </p>
      <Legend
        items={[
          <>The <Ui>Intercept is off</Ui> / <Ui>Intercept is on</Ui> switch.</>,
          <>What to pause, and what to let through without stopping.</>,
          <><Ui>Intercept match rules</Ui> for finer control.</>,
        ]}
      />

      <H3 id="turn-it-on">Turn Intercept on</H3>
      <Steps>
        <Step title="Click Intercept is off">
          It turns into <Ui>Intercept is on</Ui>. If the listener isn&rsquo;t capturing yet, PentAgent starts it and opens
          the lab browser if needed. Your everyday browser isn&rsquo;t affected.
        </Step>
        <Step title="Reload your target in the lab window">
          The page waits while its requests are held. Static files like CSS, scripts, images and fonts are skipped by
          default.
        </Step>
      </Steps>
      <p>
        Turning Intercept off again forwards everything still in the queue, so nothing is left hanging.
      </p>

      <H3 id="what-gets-paused">Choose what gets paused</H3>
      <InfoTable
        head={["Option", "What it does"]}
        rows={[
          [<Ui key="a">Intercept requests</Ui>, "Pause requests on their way to the site."],
          [<Ui key="b">Intercept responses</Ui>, "Pause responses on their way back to the browser."],
          [<Ui key="c">Don&apos;t intercept static (css/js/images/fonts)</Ui>, "Let page assets through without stopping."],
          [<Ui key="d">Don&apos;t intercept browser noise</Ui>, "Skip browser telemetry, updates, connectivity checks and prefetch."],
          [<Ui key="e">In-scope only</Ui>, <>Only pause traffic to hosts in your project&rsquo;s scope. On unless you turn it off.</>],
          [<Ui key="f">Intercept WebSocket frames</Ui>, "Pause WebSocket messages as well as HTTP."],
        ]}
      />

      <H3 id="match-rules">Intercept match rules</H3>
      <p>
        Rules sit on top of the options above. Click <Ui>Add rule</Ui>, pick <Ui>Include</Ui> or <Ui>Exclude</Ui>,
        then choose what to match on: <Ui>Host</Ui>, <Ui>Method</Ui>, <Ui>Path</Ui>, <Ui>URL</Ui>, <Ui>Header</Ui> or{" "}
        <Ui>Protocol</Ui> (<code>http</code> or <code>websocket</code>). Each rule has its own on/off box.
      </p>
      <ul>
        <li>If any include rule is on, traffic has to match at least one include to be paused.</li>
        <li>An exclude rule always wins over an include.</li>
      </ul>

      <H2 id="work-the-queue">Work through held items</H2>
      <Legend
        items={[
          <>The queue, with <Ui>Forward all</Ui> and <Ui>Drop all</Ui> above it. The sub-tab shows a count, like <Ui>Intercept (2)</Ui>.</>,
          <>Actions for the selected item.</>,
          <>The editor. Change the method, URL, headers or body. For a response, you can change the status, headers and body.</>,
        ]}
      />
      <InfoTable
        head={["Action", "What happens"]}
        rows={[
          [<><Ui>Forward</Ui> <Keys keys={["F"]} /></>, "Sends the item on, with any edits you made."],
          [<><Ui>Forward &amp; next</Ui> <Keys keys={["Ctrl", "F"]} /></>, "Sends it on and stays ready to pause the next matching item."],
          [<><Ui>Drop</Ui> <Keys keys={["D"]} /></>, "Throws the item away. The browser never gets it."],
        ]}
      />
      <Callout kind="tip">
        The keyboard shortcuts work when the Intercept panel has focus. Click anywhere inside it first.
      </Callout>

      <H2 id="troubleshooting">If something doesn&rsquo;t work</H2>
      <InfoTable
        head={["What you see", "What to try"]}
        rows={[
          [
            "Intercept is on but lab Chromium is not running",
            <>Open the lab browser (<Ui>Lab</Ui> in the left menu, or <Ui>Settings › Proxy &amp; gateway</Ui>), then reload the target there.</>,
          ],
          ["Nothing gets paused", <>Check that you&rsquo;re browsing in the lab window, and that the host is in scope or <Ui>In-scope only</Ui> is off.</>],
          ["Pages stall after you leave Intercept on", <>Turn Intercept off. The queue is forwarded automatically.</>],
        ]}
      />
    </DocPage>
  );
}
