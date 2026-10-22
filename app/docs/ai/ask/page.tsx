import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Ask",
  description: "Ask questions about traffic, scope and coverage in the AI Assistant.",
  alternates: { canonical: "/docs/ai/ask" },
  openGraph: { url: "/docs/ai/ask" },
};

export default function AskPage() {
  return (
    <DocPage href="/docs/ai/ask">
      <p>
        <Ui>Ask</Ui> is the default mode of the <Ui>AI Assistant</Ui> panel. Use it to ask about captured traffic,
        scope and coverage. It doesn&rsquo;t run attacks.
      </p>

      <H2 id="open">Open the assistant</H2>
      <p>
        The assistant docks on the right. Toggle it with <Keys keys={["Ctrl", "Shift", "L"]} />, open the chat list,
        or go fullscreen with the fullscreen control. Pick a <Ui>Mode</Ui> and <Ui>Model</Ui> in the composer. If no
        models are configured, set them under <Link href="/docs/settings/ai-models">AI models</Link>.
      </p>

      <H2 id="chat">Chat</H2>
      <ul>
        <li>Type in the composer (<Ui>Ask about traffic, scope, coverage…</Ui>) and send.</li>
        <li><Ui>+ New</Ui> starts a new chat. Delete chats from the list.</li>
        <li>Copy a response with the copy control on the message.</li>
        <li>Drop a request into chat (or select one) so <Ui>Context</Ui> fills. <Ui>Open Inspector</Ui> shows the message.</li>
      </ul>
      <Callout kind="note">
        Explore for Ask mode can be turned off in Settings. When it&rsquo;s on and a whole-app explore would run, you
        get a cost warning first. See <Link href="/docs/ai/approvals">Approvals &amp; stop</Link>.
      </Callout>
    </DocPage>
  );
}
