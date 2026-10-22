import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "The Target sitemap and the UI Map built from the lab browser.",
  alternates: { canonical: "/docs/project/sitemap" },
  openGraph: { url: "/docs/project/sitemap" },
};

export default function SitemapPage() {
  return (
    <DocPage href="/docs/project/sitemap">
      <p>
        PentAgent has two maps. The HTTP sitemap lives on the <Link href="/docs/test/target">Target</Link> tab. The{" "}
        <Ui>Sitemap</Ui> item in the left menu opens the <Ui>Target Map</Ui> (also called the UI Map) — pages and
        controls discovered by the lab browser extension.
      </p>

      <H2 id="http-sitemap">HTTP sitemap (Target)</H2>
      <p>
        See <Link href="/docs/test/target#sitemap">Target &amp; scope → Sitemap</Link>. It fills from proxy traffic
        and supports in-scope / hide-static filters and send-to-Repeater.
      </p>

      <H2 id="ui-map">UI Map (Target Map)</H2>
      <p>
        The UI Map is separate from HTTP history. Proxy traffic alone does not create pages or buttons — only the lab
        browser extension does. Open it with the project selected, enter a <Ui>Target URL</Ui>, set{" "}
        <Ui>Proxy mode</Ui> (<Ui>Off (fast explore)</Ui>, <Ui>Optional</Ui>, or <Ui>Required (MITM)</Ui>), then click{" "}
        <Ui>Open lab browser</Ui>. Browse only in that window; the map updates live.
      </p>
      <InfoTable
        head={["Control", "What it does"]}
        rows={[
          [<Ui key="a">Refresh map</Ui>, "Reload pages, controls and action evidence packs."],
          [<Ui key="b">Clear map &amp; history</Ui>, "Deletes UI map data and HTTP history for this project (asks first)."],
          [<Ui key="c">Exploration</Ui>, "Journeys from Exploration feed UI→HTTP bindings after a rebuild."],
          [<Ui key="d">Repeat under proxy ×3</Ui>, "Replays a selected flow through the MITM listener."],
          [<Ui key="e">Send to Chat / Pin to plan</Ui>, "Share a flow with the AI assistant or pin it to a plan."],
        ]}
      />
      <Callout kind="note">
        If the project already has proxy traffic but zero mapped pages, open the lab browser while this project is
        selected so the extension is seeded with the project ID, then browse in lab Chromium — not your everyday
        Chrome.
      </Callout>
    </DocPage>
  );
}
