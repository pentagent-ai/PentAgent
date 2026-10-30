import type { Metadata } from "next";
import { InfoTable, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Proxy & gateway",
  description: "Listener defaults, lab browser, CA certificate and proxy options.",
  alternates: { canonical: "/docs/settings/proxy" },
  openGraph: { url: "/docs/settings/proxy" },
};

export default function ProxySettingsPage() {
  return (
    <DocPage href="/docs/settings/proxy">
      <p>
        <Ui>Proxy &amp; gateway</Ui> configures the listener, lab browser and CA. Start and stop the gateway from the
        top-bar Proxy control as well.
      </p>
      <InfoTable
        head={["Section", "What you set"]}
        rows={[
          [<Ui key="a">Listener defaults</Ui>, <>Listen host and port (default port 8088). <Ui>Check port</Ui> sees if it&apos;s free.</>],
          [<Ui key="b">Lab browser</Ui>, <><Ui>Proxy mode</Ui> Off / Optional / Required, browser pick, <Ui>Open lab Chromium</Ui>, <Ui>Stop listener</Ui>, <Ui>Reset</Ui>.</>],
          [<Ui key="c">Active gateway</Ui>, "Status and address of the running listener."],
          [<Ui key="d">PentAgent CA certificate</Ui>, <><Ui>Download CA certificate</Ui> (<code>pentagent-ca-cert.crt</code>). Lab Chromium trusts it automatically; download for manual setups.</>],
          [<Ui key="e">Proxy options</Ui>, "Upstream proxy chain and TLS pass-through hosts (no proxy decryption). Restart the listener after changes."],
        ]}
      />
    </DocPage>
  );
}
