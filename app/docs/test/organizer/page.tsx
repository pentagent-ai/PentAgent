import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Organizer",
  description: "Keep interesting requests in collections with notes, tags and leads.",
  alternates: { canonical: "/docs/test/organizer" },
  openGraph: { url: "/docs/test/organizer" },
};

export default function OrganizerPage() {
  return (
    <DocPage href="/docs/test/organizer">
      <p>
        <Ui>Organizer</Ui> is where you park requests worth coming back to. Right-click any request elsewhere and
        choose <Ui>Send to Organizer</Ui>, or press the Organizer shortcut from a selected message.
      </p>

      <H2 id="collections">Collections</H2>
      <p>
        Items live in collections. Create one with <Ui>New collection</Ui>. Open an item to set a status (
        <Ui>To do</Ui>, <Ui>In review</Ui>, <Ui>Won&apos;t fix</Ui> and others), a highlight colour, tags and notes.
        Notes autosave; press <Keys keys={["N"]} /> to focus the notes box and <Keys keys={["Ctrl", "S"]} /> to save.
      </p>
      <p>
        <Ui>Move →</Ui> and <Ui>Copy to…</Ui> put the item into another collection. Params, cookies and headers for
        the selected item show in the Inspector on the right.
      </p>

      <H2 id="filters">Search and filters</H2>
      <InfoTable
        head={["Control", "What it does"]}
        rows={[
          [<Ui key="a">Search notes, tags, host, path…</Ui>, "Finds items across collections."],
          [<Ui key="b">All statuses</Ui>, "Narrow by status."],
          [<Ui key="c">All items / Has AI lead / Open leads</Ui>, "Show only items with an AI lead, or open leads."],
          [<Ui key="d">Tag filter</Ui>, "Match a tag substring."],
          [<Ui key="e">Export CSV / Export JSON</Ui>, "Download the current view."],
        ]}
      />

      <H2 id="ai-leads">AI leads</H2>
      <p>
        When Scanner or Agent queues a lead, it lands here with an <Ui>AI Lead</Ui> field. Fill in{" "}
        <Ui>Lead status</Ui> and notes for later Plan work — leads are pivots for a later plan, not a mid-campaign
        replan.
      </p>
    </DocPage>
  );
}
