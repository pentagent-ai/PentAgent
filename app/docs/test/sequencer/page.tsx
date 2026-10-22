import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Sequencer",
  description: "Capture session tokens and check whether they look random.",
  alternates: { canonical: "/docs/test/sequencer" },
  openGraph: { url: "/docs/test/sequencer" },
};

export default function SequencerPage() {
  return (
    <DocPage href="/docs/test/sequencer">
      <p>
        <Ui>Sequencer</Ui> collects session tokens and runs statistical checks on them. A PASS means the sample looks
        reasonably random under these checks. A FAIL means entropy, uniformity or sample size looks weak. This is a
        signal, not a security proof.
      </p>

      <H2 id="live-capture">Live capture</H2>
      <Steps>
        <Step title="Pick a source">
          Choose a <Ui>Source transaction</Ui> that returns a cookie or token, then click <Ui>Use selected</Ui>.
        </Step>
        <Step title="Set Token location">
          <Ui>Set-Cookie</Ui>, <Ui>Response body (regex)</Ui> or <Ui>Response header</Ui>. Fill in the cookie name,
          header name, or a regex with a capture group. <Ui>Preview extraction</Ui> shows what would be pulled.
        </Step>
        <Step title="Start capture">
          Click <Ui>Start capture</Ui>. Aim for at least 100 samples. <Ui>Stop</Ui> ends it. Then click{" "}
          <Ui>Analyze</Ui>.
        </Step>
      </Steps>

      <H2 id="manual-paste">Manual paste</H2>
      <p>
        Switch to <Ui>Manual paste</Ui>, paste one token per line, and click <Ui>Analyze pasted samples</Ui>. Fewer
        than 100 samples may be unreliable.
      </p>

      <H2 id="results">What the analysis shows</H2>
      <InfoTable
        head={["Check", "What it means"]}
        rows={[
          ["Effective entropy", "How unpredictable each character looks. Higher is better; about 3.0 bits/char is treated as a minimum for session-like tokens."],
          ["Chi-square", "Whether characters appear about equally often. A high score suggests bias."],
          ["Monobit", "Whether 0s and 1s are balanced in the bit stream."],
          ["Runs", "How often the bit stream flips. Too few or too many suggests correlation."],
          ["Uniqueness", "How many unique tokens vs total. Heavy repetition usually means a short pool."],
          ["Length / character distribution", "How sizes and characters vary."],
        ]}
      />
      <p>
        <Ui>Send token source to Repeater</Ui> opens the source request for more digging. The sample table lists every
        captured token; duplicates are highlighted.
      </p>
    </DocPage>
  );
}
