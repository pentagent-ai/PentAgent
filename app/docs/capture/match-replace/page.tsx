import type { Metadata } from "next";
import { Callout, H2, InfoTable, Legend, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Match / Replace",
  description: "Rewrite requests and responses automatically as they pass through.",
  alternates: { canonical: "/docs/capture/match-replace" },
  openGraph: { url: "/docs/capture/match-replace" },
};

export default function MatchReplacePage() {
  return (
    <DocPage href="/docs/capture/match-replace">
      <p>
        <Ui>Proxy › Match / Replace</Ui> rules change traffic automatically. They run while the listener captures,
        before anything reaches Intercept or HTTP history. Use them to swap a header, flip a flag in a URL, or tidy up
        a response body without stopping each request by hand.
      </p>
      <Legend
        items={[
          <>The form for a new rule.</>,
          <>Your rules. Each one has an <Ui>on</Ui> box and a <Ui>Delete</Ui> button.</>,
        ]}
      />

      <H2 id="add-a-rule">Add a rule</H2>
      <Steps>
        <Step title="Name it">Give the rule a short <Ui>Name</Ui> so you can spot it later.</Step>
        <Step title="Pick where it applies">
          Choose <Ui>Request</Ui>, <Ui>Response</Ui> or <Ui>Both</Ui>, then the part to look in.
        </Step>
        <Step title="Fill in Match and Replace">
          Leave <Ui>Replace</Ui> empty to remove what matched. Tick <Ui>Regex</Ui> to use a regular expression.
        </Step>
        <Step title="Click Add rule">The rule is on straight away.</Step>
      </Steps>
      <InfoTable
        head={["Where", "Looks in"]}
        rows={[
          [<Ui key="a">Any</Ui>, "The URL, headers and body."],
          [<Ui key="b">URL</Ui>, "The request URL only."],
          [<Ui key="c">Headers</Ui>, "The header lines."],
          [<Ui key="d">Body</Ui>, "The message body."],
        ]}
      />
      <p>
        In the list, a rule shows as <code>match → replace</code> with where it applies, for example{" "}
        <code>request/headers · regex</code>. An empty replace shows as <code>∅</code>.
      </p>

      <H2 id="turn-off-or-delete">Turn a rule off or delete it</H2>
      <p>Untick <Ui>on</Ui> to pause a rule without losing it. <Ui>Delete</Ui> removes it for good.</p>

      <Callout kind="tip">
        Rules belong to the current project, so each project can have its own set.
      </Callout>
      <Callout kind="note">
        Rules only change traffic captured from now on. Requests already in HTTP history stay as they were.
      </Callout>
    </DocPage>
  );
}
