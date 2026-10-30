import type { Metadata } from "next";
import { Callout, H2, Legend, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Import",
  description: "Bring in HAR or XML captures, and move whole projects between machines.",
  alternates: { canonical: "/docs/capture/import" },
  openGraph: { url: "/docs/capture/import" },
};

export default function ImportPage() {
  return (
    <DocPage href="/docs/capture/import">
      <p>
        <Ui>Proxy › Import</Ui> has two jobs: adding traffic you captured somewhere else to this project, and moving a
        whole project in or out as one file.
      </p>
      <Legend
        items={[
          <>Import a traffic file into this project.</>,
          <><Ui>Portable engagement</Ui>: export or import a whole project.</>,
        ]}
      />

      <H2 id="import-traffic">Import traffic</H2>
      <p>
        PentAgent reads <strong>.har</strong> files saved from Chrome or Firefox developer tools, and XML exports from
        other intercepting proxies.
      </p>
      <Steps>
        <Step title="Choose a file">Click the box that reads <Ui>Choose HAR or proxy XML file</Ui> and pick your file.</Step>
        <Step title="Wait for the import">
          The box shows <Ui>Importing…</Ui>. Each entry becomes a row in HTTP history and a node in the sitemap.
        </Step>
      </Steps>
      <p>
        Bigger files import in the background. You&rsquo;ll see <Ui>Import started — track progress on the Dashboard</Ui>,
        and the progress shows on the <Ui>Dashboard</Ui> tab.
      </p>

      <H2 id="portable-engagement">Move a whole project</H2>
      <p>
        A <code>.pentagent.zip</code> holds a project&rsquo;s traffic, Fuzzer setups, scope and settings.
      </p>
      <ul>
        <li><Ui>Export engagement</Ui> downloads the current project as one file.</li>
        <li>
          <Ui>Import engagement zip</Ui> adds the file as a brand-new project. Pick it from the project picker
          afterwards. Your current project isn&rsquo;t changed.
        </li>
      </ul>
      <Callout kind="tip">
        Exports are handy for handing work to a teammate, or for keeping a copy before you clear history.
      </Callout>
    </DocPage>
  );
}
