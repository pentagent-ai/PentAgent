import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Shortcuts",
  description: "Keyboard shortcuts for the workbench, Repeater and Intruder.",
  alternates: { canonical: "/docs/reference/shortcuts" },
  openGraph: { url: "/docs/reference/shortcuts" },
};

export default function ShortcutsPage() {
  return (
    <DocPage href="/docs/reference/shortcuts">
      <p>
        Open the shortcut list anytime with the keyboard-shortcuts command, or from the command palette (
        <Keys keys={["Ctrl", "K"]} /> — command palette; docs search uses the same chord on the website).
      </p>

      <H2 id="global">Global</H2>
      <InfoTable
        head={["Keys", "Action"]}
        rows={[
          [<Keys keys={["Ctrl", "K"]} />, "Open command palette"],
          ["?", "Show keyboard shortcuts"],
          [<Keys keys={["Ctrl", "Shift", "I"]} />, "Toggle Inspector"],
          [<Keys keys={["Ctrl", "Shift", "L"]} />, "Toggle Chat sidebar / dock Agent"],
        ]}
      />

      <H2 id="workbench">Workbench</H2>
      <InfoTable
        head={["Keys / gesture", "Action"]}
        rows={[
          [<Keys keys={["F"]} />, "Forward selected intercept (Proxy)"],
          [<Keys keys={["D"]} />, "Drop selected intercept"],
          [<Keys keys={["Ctrl", "F"]} />, "Forward and intercept next"],
          ["Right-click row", "Send to Repeater / Intruder / Chat / Organizer / Comparer / Decoder"],
          ["Double-click table row", "Select row and open detail pane"],
          ["Double-click Repeater tab", "Rename tab"],
          ["Double-click Dashboard task", "Rename task"],
        ]}
      />

      <H2 id="repeater">Repeater</H2>
      <InfoTable
        head={["Keys", "Action"]}
        rows={[
          [<Keys keys={["Ctrl", "R"]} />, "Send request"],
          [<Keys keys={["Ctrl", "Shift", "R"]} />, "Send without updating Content-Length"],
          [<Keys keys={["Ctrl", "T"]} />, "New Repeater tab"],
          [<Keys keys={["Ctrl", "W"]} />, "Close Repeater tab"],
        ]}
      />

      <H2 id="intruder">Intruder</H2>
      <InfoTable
        head={["Keys", "Action"]}
        rows={[
          [<Keys keys={["Ctrl", "Enter"]} />, "Start / stop attack"],
          [<Keys keys={["Ctrl", "S"]} />, "Save attack config"],
          [<Keys keys={["Alt", "I"]} />, "Add payload position (wrap selection in §…§)"],
        ]}
      />
      <Callout kind="note">
        Exact chords can vary slightly by OS. The in-app <Ui>Keyboard shortcuts</Ui> dialog is the source of truth
        for your build.
      </Callout>
    </DocPage>
  );
}
