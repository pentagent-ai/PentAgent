import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Comparer",
  description: "Diff two requests or responses side by side.",
  alternates: { canonical: "/docs/test/comparer" },
  openGraph: { url: "/docs/test/comparer" },
};

export default function ComparerPage() {
  return (
    <DocPage href="/docs/test/comparer">
      <p>
        <Ui>Comparer</Ui> shows what&rsquo;s different between two messages. Right-click a request elsewhere and
        choose <Ui>Send to Comparer</Ui>, or switch a side to <Ui>Paste</Ui> and paste text.
      </p>

      <H2 id="compare">Compare two items</H2>
      <Steps>
        <Step title="Pick A and B">
          Choose a transaction for each side, or switch to <Ui>Paste</Ui> and paste into{" "}
          <Ui>Paste item A…</Ui> / <Ui>Paste item B…</Ui>.
        </Step>
        <Step title="Choose what to diff">
          <Ui>Response</Ui>, <Ui>Request</Ui> or <Ui>Both</Ui>.
        </Step>
        <Step title="Choose how to tokenise">
          <Ui>Words (token diff)</Ui>, <Ui>Lines</Ui>, or <Ui>Bytes (hex)</Ui>. Tick{" "}
          <Ui>Ignore whitespace</Ui> to skip whitespace-only differences (not available in Bytes mode).
        </Step>
        <Step title="Compare">Press <Ui>Compare</Ui>. Removals from A and additions in B are highlighted.</Step>
      </Steps>
    </DocPage>
  );
}
