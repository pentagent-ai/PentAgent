import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Legend, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "First run",
  description: "Create a project in PentAgent, start the proxy, and capture your first request.",
  alternates: { canonical: "/docs/getting-started/first-run" },
  openGraph: { url: "/docs/getting-started/first-run" },
};

export default function FirstRunPage() {
  return (
    <DocPage href="/docs/getting-started/first-run">
      <p>
        Once you&rsquo;re past the welcome screen, PentAgent opens its main window. This page walks through the window
        and gets your first request captured.
      </p>

      <H2 id="the-main-window">The main window</H2>
      <Legend
        items={[
          <><Ui>Project</Ui> picker. Switch between your projects here.</>,
          <><Ui>New project</Ui> field and its <Ui>+</Ui> button.</>,
          <>The proxy button. It reads <Ui>Proxy Off</Ui> until you start capturing, and turns on once a project is open.</>,
          <>The left menu, grouped into <Ui>Workbench</Ui>, <Ui>Project</Ui> and <Ui>AI Agent</Ui>.</>,
          <>Your workspace, with the <Ui>Proxy</Ui>, <Ui>Repeater</Ui>, <Ui>Fuzzer</Ui> and <Ui>Scanner</Ui> tabs on top.</>,
          <><Ui>Inspector</Ui>, which shows params, cookies and headers for the message you select.</>,
          <><Ui>AI Assistant</Ui>, with Ask, Plan and Agent modes.</>,
          <>The listener strip: whether the proxy is listening, plus <Ui>Lab</Ui> and <Ui>Settings</Ui> shortcuts.</>,
        ]}
      />

      <H2 id="create-a-project">Create a project</H2>
      <p>
        A project keeps everything for one app together: its traffic, scope, findings and AI chats. Type a name in
        the <Ui>New project</Ui> field in the top bar and press <kbd className="doc-kbd">Enter</kbd> or click{" "}
        <Ui>+</Ui>.
      </p>
      <p>
        The new project opens straight away. Next, click the <Ui>Target</Ui> button next to the project name. It opens
        the <Ui>Target</Ui> tab, where you add your app&rsquo;s host to the project&rsquo;s scope. Until you do, the
        button reads <Ui>No scope hosts</Ui>.
      </p>

      <H2 id="first-capture">Get your first capture</H2>
      <p>
        With a project open, the <Ui>Dashboard</Ui> shows a short <Ui>Get your first capture</Ui> checklist. The next
        step to do is highlighted, and finished steps get a tick.
      </p>

      <Steps>
        <Step title="Start proxy">
          <p>
            Click <Ui>Start proxy</Ui>. PentAgent starts a listener on <code>127.0.0.1:8088</code> that records the
            traffic passing through it. The step then reads <Ui>Listening 127.0.0.1:8088</Ui>.
          </p>
        </Step>
        <Step title="CA certificate">
          <p>
            To read HTTPS traffic, the browser needs to trust PentAgent&rsquo;s certificate. PentAgent creates its
            local <strong>PentAgent CA</strong> certificate on your computer and the lab browser trusts it
            automatically, so usually there&rsquo;s nothing to do here.
          </p>
          <p>
            <Ui>Download CA</Ui> saves the certificate as <code>pentagent-ca-cert.crt</code>. You only need it if you
            want to send traffic from another browser or tool through PentAgent yourself.
          </p>
        </Step>
        <Step title="Open lab browser">
          <p>
            Click <Ui>Open lab browser</Ui>. A separate Chromium window opens, already connected to the proxy. It has
            its own profile, so your everyday browser, its logins and its history are never involved. It starts on{" "}
            <code>example.com</code>.
          </p>
        </Step>
        <Step title="First capture">
          <p>
            In the lab window, go to the app you&rsquo;re testing and click around. Each request appears in{" "}
            <Ui>Proxy</Ui> › <Ui>HTTP history</Ui>. Once the first one arrives, the checklist steps aside.
          </p>
        </Step>
      </Steps>

      <Callout kind="note">
        <p>
          Only test apps you own or have permission to test. A practice app running on your own computer, such as OWASP
          Juice Shop, is a good place to start.
        </p>
      </Callout>

      <H3 id="same-steps-in-proxy">The same steps in the Proxy tab</H3>
      <p>
        You&rsquo;ll find the same checklist, in a compact form, in <Ui>Proxy</Ui> › <Ui>HTTP history</Ui> while
        it&rsquo;s still empty.
      </p>

      <H2 id="top-bar">The top bar</H2>
      <Legend
        items={[
          <><Ui>Project</Ui> picker.</>,
          <><Ui>Target</Ui> shows your project&rsquo;s scope host and opens the Target tab.</>,
          <>Proxy button. Click it to start or stop the listener. It reads <Ui>Proxy Active</Ui> while capturing.</>,
          <><Ui>Activity</Ui> opens the Dashboard.</>,
          <><Ui>Records</Ui>, where findings and notes collect.</>,
          <><Ui>Settings</Ui>.</>,
          <>Your account menu. See <Link href="/docs/getting-started/sign-in#account-menu">Your account menu</Link>.</>,
        ]}
      />

      <H2 id="change-proxy-port">Changing the proxy port</H2>
      <p>
        PentAgent listens on port <code>8088</code> by default. If another program already uses it, open{" "}
        <Ui>Settings</Ui> › <Ui>Proxy &amp; gateway</Ui> and change <Ui>Listen port</Ui> under{" "}
        <Ui>Listener defaults</Ui>. <Ui>Check port</Ui> tells you whether the new port is free.
      </p>

      <H2 id="first-run-trouble">If something doesn&rsquo;t work</H2>
      <InfoTable
        head={["What you see", "What to do"]}
        rows={[
          [
            "No lab browser found",
            "Restart PentAgent while connected to the internet so first-launch setup can finish downloading the lab browser.",
          ],
          [
            "The proxy won't start",
            "Another program may be using port 8088. Pick a different Listen port in Settings › Proxy & gateway.",
          ],
          [
            "Pages show a certificate warning",
            "Make sure you're browsing in the lab window, which trusts the PentAgent CA certificate automatically.",
          ],
          [
            "Nothing appears in HTTP history",
            "Check the proxy button reads Proxy Active and that you're browsing in the lab window, not your everyday browser.",
          ],
        ]}
      />
    </DocPage>
  );
}
