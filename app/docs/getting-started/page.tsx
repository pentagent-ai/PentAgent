import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, Step, Steps } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Getting started",
  description: "The short path from download to your first captured request in PentAgent.",
  alternates: { canonical: "/docs/getting-started" },
  openGraph: { url: "/docs/getting-started" },
};

export default function GettingStartedPage() {
  return (
    <DocPage href="/docs/getting-started">
      <p>
        Getting set up takes four short steps. Each one has its own guide if you want more detail.
      </p>

      <H2 id="before-you-begin">Before you begin</H2>
      <ul>
        <li>
          An approved pilot request. If you don&rsquo;t have one yet, <Link href="/pilot">request pilot access</Link>.
        </li>
        <li>The GitHub account you used on your request.</li>
        <li>
          A 64-bit Windows or 64-bit Linux computer (macOS is coming soon) with an internet connection for the first
          launch.
        </li>
        <li>An app you own or have permission to test. A practice app on your own machine works well.</li>
      </ul>

      <H2 id="the-quick-path">The quick path</H2>
      <Steps>
        <Step title="Install PentAgent">
          <p>
            Download the pilot build for Windows or Linux and open PentAgent. The first launch sets up the
            local engine and lab browser for you.{" "}
            <Link href="/docs/getting-started/install">Install</Link>
          </p>
        </Step>
        <Step title="Sign in with GitHub">
          <p>
            PentAgent checks that your account is approved for the pilot.{" "}
            <Link href="/docs/getting-started/sign-in">Sign in</Link>
          </p>
        </Step>
        <Step title="Tick two boxes">
          <p>
            Agree to the Terms and Privacy Policy, and confirm you&rsquo;ll only test apps you&rsquo;re allowed to. You
            only do this once. <Link href="/docs/getting-started/welcome-screen">Welcome screen</Link>
          </p>
        </Step>
        <Step title="Capture your first request">
          <p>
            Create a project, start the proxy, open the lab browser and visit your app. Requests show up as you
            browse. <Link href="/docs/getting-started/first-run">First run</Link>
          </p>
        </Step>
      </Steps>

      <Callout kind="tip" title="Everything stays on your computer">
        <p>
          The traffic you capture and the projects you create are stored locally. Our servers only see your account
          check and anonymous usage analytics. When you use the AI features, requests go to the model you choose.
        </p>
      </Callout>
    </DocPage>
  );
}
