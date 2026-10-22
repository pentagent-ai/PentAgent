import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, Legend, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "WebSockets",
  description: "See WebSocket frames captured through the proxy.",
  alternates: { canonical: "/docs/capture/websockets" },
  openGraph: { url: "/docs/capture/websockets" },
};

export default function WebSocketsPage() {
  return (
    <DocPage href="/docs/capture/websockets">
      <p>
        When a site opens a WebSocket through the lab browser, PentAgent records each frame. You&rsquo;ll find them on{" "}
        <Ui>Proxy › WebSockets</Ui>.
      </p>

      <H2 id="frames">Frames</H2>
      <Legend
        items={[
          <>The frame list: <Ui>Dir</Ui> (→ sent, ← received), <Ui>Type</Ui>, <Ui>Host / path</Ui> and <Ui>Time</Ui>.</>,
          <>The payload of the selected frame. Text frames show as plain text, binary frames as base64.</>,
        ]}
      />
      <p>The list updates live while the connection is open.</p>

      <H2 id="pause-frames">Pause frames with Intercept</H2>
      <p>
        To stop frames and change them before they go through, turn on <Ui>Intercept WebSocket frames</Ui> on the{" "}
        <Link href="/docs/capture/proxy#what-gets-paused">Intercept</Link> sub-tab. You can also write an intercept
        match rule on <Ui>Protocol</Ui> with the value <code>websocket</code>.
      </p>

      <Callout kind="note">
        Seeing <Ui>No WebSocket frames yet</Ui>? The site you&rsquo;re on may not use WebSockets, or you may be browsing
        outside the lab window.
      </Callout>
    </DocPage>
  );
}
