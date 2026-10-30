import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout, H2, H3, Keys, SettingsTable, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Install",
  description: "Download the PentAgent pilot build for Windows, macOS, or Linux, start it, and open PentAgent.",
  alternates: { canonical: "/docs/getting-started/install" },
  openGraph: { url: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <DocPage href="/docs/getting-started/install">
      <H2 id="what-you-need">What you need</H2>
      <ul>
        <li>
          <strong>Windows (64-bit), macOS (Apple Silicon, macOS 13 or later), or Linux (64-bit).</strong> PentAgent bundles its own Python
          runtime inside the desktop app, so you don&rsquo;t need to install Python yourself.
        </li>
        <li>
          <strong>An internet connection</strong> for the first launch, which sets up PentAgent&rsquo;s private
          environment and downloads the isolated lab browser.
        </li>
        <li>
          <strong>About 2 GB of free disk space</strong> for the app, its local environment, and the lab browser.
        </li>
        <li>
          <strong>Pilot access.</strong> Anyone can download the build, but signing in needs an approved pilot account.
          If you haven&rsquo;t applied yet, <Link href="/pilot">request pilot access</Link>.
        </li>
      </ul>

      <H2 id="download">Download the pilot build</H2>
      <Steps>
        <Step title="Open the download page">
          <p>
            Go to <Link href="/download">Download</Link> and pick the package for your operating system.
          </p>
        </Step>
        <Step title="Verify the checksum (optional)">
          <p>
            Each build has a matching <code>.sha256</code> file next to it. In the folder where you saved both files,
            you can verify the download:
          </p>
          <CodeBlock
            code={`# Windows (PowerShell)
Get-FileHash .\\PentAgent-win-x64.zip -Algorithm SHA256

# macOS
shasum -a 256 -c PentAgent-mac-arm64.dmg.sha256

# Linux
sha256sum -c pentagent_amd64.deb.sha256`}
          />
        </Step>
      </Steps>

      <H2 id="start-pentagent">Install and start PentAgent</H2>

      <H3 id="windows">Windows (64-bit)</H3>
      <Steps>
        <Step title="Extract the archive">
          <p>
            Right-click <code>PentAgent-win-x64.zip</code> and choose <Ui>Extract All…</Ui> to unpack it into a normal
            folder on your disk (for example <code>C:\Users\&lt;you&gt;\PentAgent</code>). Don&rsquo;t run the app from
            inside the zip preview window.
          </p>
        </Step>
        <Step title="Start PentAgent">
          <p>
            Open the extracted <code>win-unpacked</code> folder and double-click <code>pentagent.exe</code>. If Windows
            SmartScreen shows <Ui>Windows protected your PC</Ui>, click <Ui>More info</Ui> and then <Ui>Run anyway</Ui>.
          </p>
        </Step>
      </Steps>

      <H3 id="macos">macOS (Apple Silicon)</H3>
      <Steps>
        <Step title="Move PentAgent to Applications">
          <p>
            Open <code>PentAgent-mac-arm64.dmg</code> and drag <Ui>PentAgent</Ui> into <Ui>Applications</Ui> (or unpack{" "}
            <code>PentAgent-mac-arm64.zip</code> and move <Ui>PentAgent.app</Ui> into <Ui>Applications</Ui>).
          </p>
        </Step>
        <Step title="Open the app the first time">
          <p>
            Pilot builds are ad-hoc signed rather than Apple-notarized. For the first launch, open{" "}
            <Ui>Applications</Ui>, <strong>right-click</strong> (or Control-click) <Ui>PentAgent</Ui> and choose{" "}
            <Ui>Open</Ui>, then click <Ui>Open</Ui> in the dialog (or allow it under{" "}
            <Ui>System Settings › Privacy &amp; Security › Open Anyway</Ui>).
          </p>
          <p>
            If macOS still blocks the app after a browser download, clear the quarantine attribute in Terminal and open
            it again:
          </p>
          <CodeBlock code="xattr -dr com.apple.quarantine /Applications/PentAgent.app" />
        </Step>
      </Steps>

      <H3 id="linux">Linux (64-bit)</H3>
      <p>Pick whichever package fits your distribution:</p>
      <ul>
        <li>
          <strong>Debian, Ubuntu, Kali, or Linux Mint (<code>.deb</code>):</strong>
          <CodeBlock
            code={`sudo apt install ./pentagent_amd64.deb
pentagent`}
          />
        </li>
        <li>
          <strong>AppImage (portable single file):</strong>
          <CodeBlock
            code={`chmod +x PentAgent-linux-x86_64.AppImage
./PentAgent-linux-x86_64.AppImage`}
          />
        </li>
        <li>
          <strong>Portable tarball (<code>.tar.gz</code>):</strong>
          <CodeBlock
            code={`tar xzf pentagent-linux-x64.tar.gz
./pentagent-*/pentagent`}
          />
        </li>
      </ul>

      <H2 id="first-launch">What happens on the first launch</H2>
      <p>
        The first time you open PentAgent, the startup screen prepares a private Python environment and downloads an
        isolated Chromium lab browser so your everyday browser is never touched. This takes a few minutes over a normal
        internet connection. Later launches skip setup and open in a few seconds.
      </p>
      <Callout kind="note">
        <p>
          PentAgent&rsquo;s engine and proxy listen only on <code>127.0.0.1</code> (your own computer), so nobody else
          on your network can reach them.
        </p>
      </Callout>

      <H2 id="everyday-use">Everyday use</H2>
      <H3 id="start-again">Starting and quitting</H3>
      <p>
        Launch PentAgent from your applications menu, Dock, or folder. To quit cleanly and stop the background engine,
        close the PentAgent window or press <Keys keys={["Ctrl", "Q"]} /> (<Keys keys={["Cmd", "Q"]} /> on macOS).
      </p>

      <H3 id="data-folder">Where your data lives</H3>
      <p>PentAgent stores its environment, local CA certificate, and project database in your user data folder:</p>
      <ul>
        <li>
          <strong>Windows:</strong> <code>%LOCALAPPDATA%\PentAgent</code>
        </li>
        <li>
          <strong>macOS:</strong> <code>~/Library/Application Support/PentAgent</code>
        </li>
        <li>
          <strong>Linux:</strong> <code>~/.local/share/pentagent</code>
        </li>
      </ul>

      <H3 id="launch-options">Launch options</H3>
      <p>Most people never need these. You can set them as environment variables before starting PentAgent:</p>
      <SettingsTable
        caption="Launch options"
        rows={[
          {
            setting: "PENTAGENT_PORT",
            what: "Pin a specific local port for the PentAgent engine instead of picking a free port automatically.",
            default: "Automatic",
            when: "You want the local engine on a fixed port.",
          },
          {
            setting: "PENTAGENT_DATA",
            what: "Override the folder for PentAgent's Python environment, certificates, and project database.",
            default: "OS data folder",
            when: "You'd like PentAgent's data on a different disk or folder.",
          },
        ]}
      />

      <H2 id="updating">Updating to a new build</H2>
      <Steps>
        <Step title="Quit PentAgent">
          <p>Close PentAgent so the local engine stops cleanly.</p>
        </Step>
        <Step title="Install the new build">
          <p>
            Download the latest package from <Link href="/download">Download</Link> and replace your previous app
            folder or package.
          </p>
        </Step>
        <Step title="Open PentAgent">
          <p>
            Start the new build. Your project database stays in your PentAgent data folder, so your projects and
            history are ready when the new version opens.
          </p>
        </Step>
      </Steps>
      <p>
        If PentAgent says <strong>Update required</strong> when you sign in, your build is older than the pilot
        supports. See <Link href="/docs/getting-started/sign-in#update-required">Update required</Link>.
      </p>

      <H2 id="uninstall">Uninstalling</H2>
      <p>To remove PentAgent completely:</p>
      <ol>
        <li>Quit PentAgent.</li>
        <li>
          Remove the application (delete the extracted folder on Windows, drag <code>PentAgent.app</code> to Trash on
          macOS, or run <code>sudo apt remove pentagent</code> / delete the AppImage or tarball folder on Linux).
        </li>
        <li>
          Delete your PentAgent data folder (<code>%LOCALAPPDATA%\PentAgent</code> on Windows,{" "}
          <code>~/Library/Application Support/PentAgent</code> on macOS, or <code>~/.local/share/pentagent</code> and{" "}
          <code>~/.cache/ms-playwright</code> on Linux). This removes the Python environment, project database, lab
          browser profile, and local CA files.
        </li>
        <li>
          If you imported the <strong>PentAgent CA</strong> certificate into your system or browser trust store for
          manual proxy setups, remove <strong>PentAgent CA</strong> from your trust store as well.
        </li>
      </ol>

      <H2 id="install-trouble">If something doesn&rsquo;t work</H2>
      <H3 id="first-run-interrupted">First-launch setup didn&rsquo;t finish</H3>
      <p>
        Check your internet connection and click <Ui>Try again</Ui> on the startup screen. If setup stopped halfway
        through creating the environment, delete the <code>venv</code> folder inside your PentAgent data folder and
        open PentAgent again so it sets up cleanly from scratch.
      </p>
      <H3 id="show-logs">Checking the logs</H3>
      <p>
        Choose <Ui>Help › Show Logs</Ui> from the PentAgent menu bar (or click <Ui>Show Logs</Ui> on the startup
        screen) to open the folder containing <code>backend.log</code> and <code>desktop.log</code>.
      </p>
    </DocPage>
  );
}
