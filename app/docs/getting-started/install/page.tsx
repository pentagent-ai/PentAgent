import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout, H2, H3, Keys, SettingsTable, Step, Steps } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Install",
  description: "Download the PentAgent pilot build, start it, and open PentAgent.",
  alternates: { canonical: "/docs/getting-started/install" },
  openGraph: { url: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <DocPage href="/docs/getting-started/install">
      <H2 id="what-you-need">What you need</H2>
      <ul>
        <li>
          <strong>A 64-bit Linux computer.</strong> The pilot build is Linux only for now. Builds for macOS and Windows
          will follow.
        </li>
        <li>
          <strong>Python 3.12 or newer</strong>, available as <code>python3</code>. Check with{" "}
          <code>python3 --version</code>.
        </li>
        <li>
          <strong>An internet connection</strong> for the first launch, which downloads what PentAgent needs.
        </li>
        <li>
          <strong>Pilot access.</strong> Anyone can download the build, but signing in needs an approved pilot
          account. If you haven&rsquo;t applied yet, <Link href="/pilot">join the pilot</Link>.
        </li>
      </ul>

      <H2 id="download">Download the pilot build</H2>
      <Steps>
        <Step title="Open the download page">
          <p>
            Go to <Link href="/download">Download</Link>.
          </p>
        </Step>
        <Step title="Save both files">
          <p>
            You&rsquo;ll get the app, <code>pentagent-linux-x64.tar.gz</code>, and a checksum file next to it,{" "}
            <code>pentagent-linux-x64.tar.gz.sha256</code>.
          </p>
        </Step>
        <Step title="Check the download (optional)">
          <p>In the folder where you saved both files, run:</p>
          <CodeBlock code="sha256sum -c pentagent-linux-x64.tar.gz.sha256" />
          <p>
            You should see <code>OK</code>. If not, download the files again.
          </p>
        </Step>
      </Steps>

      <H2 id="start-pentagent">Unpack and start PentAgent</H2>
      <p>Unpack the build anywhere you like, for example your home folder, then run the launcher:</p>
      <CodeBlock
        code={`tar xzf pentagent-linux-x64.tar.gz
cd pentagent-*/
./pa_release/launch.sh`}
      />
      <p>
        The first launch takes a few minutes. It creates a private Python environment for PentAgent and installs
        everything it needs. You&rsquo;ll see progress in the terminal. Later launches skip this and start in a few
        seconds.
      </p>
      <p>
        When it&rsquo;s ready, PentAgent opens in your default browser at <code>http://127.0.0.1:8765/</code>. If the
        page doesn&rsquo;t open on its own, copy that address into your browser.
      </p>
      <Callout kind="note">
        <p>
          PentAgent runs only on your own computer. The address <code>127.0.0.1</code> means &ldquo;this
          machine&rdquo;, so nobody else on your network can reach it.
        </p>
      </Callout>

      <H2 id="lab-browser">Set up the lab browser</H2>
      <p>
        PentAgent captures traffic through a separate <strong>lab browser</strong>: its own Chromium window with its
        own profile, so your everyday browser is never involved. Install it once with:
      </p>
      <CodeBlock code="~/.local/share/pentagent/venv/bin/python -m playwright install chromium" />
      <p>
        This downloads a copy of Chromium just for PentAgent. It doesn&rsquo;t change any browser you already use. If
        you already have Chromium installed from your Linux distribution, PentAgent can use that instead and you can
        skip this step.
      </p>

      <H2 id="everyday-use">Everyday use</H2>
      <H3 id="start-again">Starting PentAgent again</H3>
      <p>
        Open a terminal in the PentAgent folder and run <code>./pa_release/launch.sh</code>. Always start it from
        inside that folder. Keep the terminal window open while you work.
      </p>
      <H3 id="stop">Stopping PentAgent</H3>
      <p>
        Go back to the terminal and press <Keys keys={["Ctrl", "C"]} />. Close the PentAgent browser tab too.
      </p>

      <H3 id="launch-options">Launch options</H3>
      <p>Most people never need these. Set them in front of the launch command, for example:</p>
      <CodeBlock code="PENTAGENT_PORT=8800 ./pa_release/launch.sh" />
      <SettingsTable
        caption="Launch options"
        rows={[
          {
            setting: "PENTAGENT_PORT",
            what: "The port PentAgent itself listens on. The app opens at this address.",
            default: "8765",
            when: "Another program on your computer already uses port 8765.",
          },
          {
            setting: "PENTAGENT_DATA",
            what: "The folder for PentAgent's Python environment and project database.",
            default: "~/.local/share/pentagent",
            when: "You'd like PentAgent's data on a different disk or folder.",
          },
        ]}
      />

      <H2 id="updating">Updating to a new build</H2>
      <Steps>
        <Step title="Unpack the new build">
          <p>Download the new build and unpack it next to the old one.</p>
        </Step>
        <Step title="Refresh PentAgent's environment">
          <p>
            Remove the old Python environment so the new build can set up the parts it needs. Your projects are not
            stored there, so they&rsquo;re safe.
          </p>
          <CodeBlock code="rm -rf ~/.local/share/pentagent/venv" />
        </Step>
        <Step title="Start the new build">
          <p>
            Run <code>./pa_release/launch.sh</code> from inside the new folder. The first launch sets things up again,
            then run the <a href="#lab-browser">lab browser install</a> once more.
          </p>
        </Step>
      </Steps>
      <p>
        Your project database lives in <code>~/.local/share/pentagent</code>, so your projects are there when the new
        version opens.
      </p>
      <Callout kind="tip">
        <p>Keep the old folder until you&rsquo;ve opened the new version and checked your projects.</p>
      </Callout>
      <p>
        If PentAgent says <strong>Update required</strong> when you sign in, your build is older than the pilot
        supports. See <Link href="/docs/getting-started/sign-in#update-required">Update required</Link>.
      </p>

      <H2 id="uninstall">Uninstalling</H2>
      <p>To remove PentAgent completely:</p>
      <ol>
        <li>Stop PentAgent.</li>
        <li>Delete the folder you unpacked.</li>
        <li>
          Delete <code>~/.local/share/pentagent</code>. This removes the Python environment, your project database and
          the lab browser profile.
        </li>
        <li>
          If you installed the lab browser with the command above, delete its Chromium copy in{" "}
          <code>~/.cache/ms-playwright</code>.
        </li>
        <li>
          If you trusted PentAgent&rsquo;s certificate in another browser or tool, remove it there too. The certificate
          file itself lives in <code>~/.mitmproxy</code>.
        </li>
      </ol>

      <H2 id="install-trouble">If something doesn&rsquo;t work</H2>
      <H3 id="python-version">&ldquo;python3: command not found&rdquo; or a version error</H3>
      <p>
        Install Python 3.12 or newer from your distribution&rsquo;s package manager, then run the launcher again. If
        the first launch stopped halfway, delete <code>~/.local/share/pentagent/venv</code> and start again so it
        sets up from scratch.
      </p>
      <H3 id="port-in-use">The page doesn&rsquo;t load</H3>
      <p>
        Check the terminal for an error. If it mentions the address already being in use, another program has port
        8765. Start PentAgent with a different port using <code>PENTAGENT_PORT</code> (see{" "}
        <a href="#launch-options">Launch options</a>).
      </p>
    </DocPage>
  );
}
