import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Intruder",
  description: "Send one request many times, swapping in a list of values at the places you mark.",
  alternates: { canonical: "/docs/test/intruder" },
  openGraph: { url: "/docs/test/intruder" },
};

export default function IntruderPage() {
  return (
    <DocPage href="/docs/test/intruder">
      <p>
        <Ui>Intruder</Ui> takes one request, marks spots with <code>§…§</code>, and replaces those spots with values from
        a payload set. Use it to try many inputs quickly.
      </p>

      <H2 id="start">Start an attack</H2>
      <Steps>
        <Step title="Load a request">Send a request from History, Target, Decoder or elsewhere, or paste one into Intruder.</Step>
        <Step title="Mark positions">
          Select text in the URL, headers or body and click <Ui>Add payload position</Ui>, press{" "}
          <Keys keys={["Alt", "I"]} />, or use the right-click menu. Positions look like{" "}
          <code>?id=§1§</code> or <code>/api/§FUZZ§</code>.
        </Step>
        <Step title="Build a payload set">
          Choose a type (<Ui>Simple list</Ui>, <Ui>File / wordlist</Ui>, <Ui>Numbers</Ui>, <Ui>Brute forcer</Ui>,{" "}
          <Ui>Dates</Ui>, <Ui>Null payloads</Ui>, <Ui>Usernames</Ui> or <Ui>Case substitution</Ui>), then paste values
          or load a wordlist file.
        </Step>
        <Step title="Start">
          Click <Ui>Start attack</Ui> or press <Keys keys={["Ctrl", "Enter"]} />. <Ui>Stop</Ui> ends it early.
        </Step>
      </Steps>
      <Callout kind="tip">
        Shortcuts on this tab: <Keys keys={["Ctrl", "Enter"]} /> start/stop, <Keys keys={["Ctrl", "S"]} /> save the
        config, <Keys keys={["Alt", "I"]} /> add a position.
      </Callout>

      <H2 id="payloads">Payload sets and processors</H2>
      <p>
        You can have several sets. Click <Ui>+ Set</Ui> for another. For each set, <Ui>Processors</Ui> change every
        value before it is sent. Available processors include Prefix, Suffix, URL-encode / decode, Base64 /
        Base64URL / Base64 decode, HTML-encode, MD5, SHA-1, SHA-256, Reverse and Skip (match).
      </p>

      <H2 id="options">Attack options</H2>
      <InfoTable
        head={["Option", "What it does"]}
        rows={[
          [<Ui key="a">Follow redirects</Ui>, "Follow 3xx responses."],
          [<Ui key="b">Max requests</Ui>, "Hard stop after this many sends."],
          [<Ui key="c">Concurrent requests</Ui>, "How many to send at once."],
          [<Ui key="d">Delay (ms)</Ui>, "Pause between sends."],
          [<Ui key="e">Grep — Extract</Ui>, "Pull a value out of each response with a named regex capture group."],
          [<Ui key="f">Grep — Match</Ui>, "Flag responses that contain a needle (plain text, or regex if you confirm)."],
        ]}
      />

      <H2 id="results">Results</H2>
      <p>
        Results fill a table as they arrive. Use <Ui>Filter results…</Ui> to narrow them, and <Ui>Export CSV</Ui> to
        save them. Click a row to inspect it; double-click to send it to Repeater. From a row you can also{" "}
        <Ui>Send to Chat</Ui> or <Ui>Send to Organizer</Ui>.
      </p>
      <p>
        <Ui>Save</Ui> and <Ui>Load…</Ui> keep attack configs so you can rerun them later.
      </p>
    </DocPage>
  );
}
