import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Records",
  description: "The engagement report in Markdown, with chapters you or the model can maintain.",
  alternates: { canonical: "/docs/findings/records" },
  openGraph: { url: "/docs/findings/records" },
};

export default function RecordsPage() {
  return (
    <DocPage href="/docs/findings/records">
      <p>
        <Ui>Records</Ui> is the client-facing engagement report for the current project. Chapters are written and
        maintained by the model by default; you can edit any of them anytime. Confirmed findings with evidence from
        Scanner and Agent also land here.
      </p>

      <H2 id="start">When it&rsquo;s empty</H2>
      <p>
        With nothing written yet you&rsquo;ll see <Ui>No reports yet</Ui>. You can{" "}
        <Ui>Seed draft chapters</Ui>, <Ui>Open Agent</Ui> to start testing, or <Ui>Write manually</Ui>.
      </p>

      <H2 id="chapters">Work with chapters</H2>
      <InfoTable
        head={["Action", "What it does"]}
        rows={[
          [<Ui key="a">Refresh LLM drafts</Ui>, "Regenerates unlocked chapters from current project facts."],
          [<Ui key="b">Copy markdown</Ui>, "Copies the whole report to the clipboard."],
          [<Ui key="c">Edit markdown</Ui>, "Edit a chapter yourself. It becomes locked so the model won&apos;t overwrite it."],
          [<Ui key="d">Unlock for LLM</Ui>, "Lets the model maintain that chapter again."],
        ]}
      />
      <p>
        Each chapter shows whether it is <Ui>Edited by you</Ui> or <Ui>Maintained by LLM</Ui>, and when it was last
        updated. Scope for the project is listed under <Ui>Project scope</Ui>.
      </p>
    </DocPage>
  );
}
