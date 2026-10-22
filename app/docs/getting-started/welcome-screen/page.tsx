import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, InfoTable, Legend, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Welcome screen",
  description: "The two quick checkboxes you see once in PentAgent, before the app opens.",
  alternates: { canonical: "/docs/getting-started/welcome-screen" },
  openGraph: { url: "/docs/getting-started/welcome-screen" },
};

export default function WelcomeScreenPage() {
  return (
    <DocPage href="/docs/getting-started/welcome-screen">
      <p>
        The first time you sign in, PentAgent shows a short welcome screen before the app opens. It asks for two
        things, and you only need to do it once.
      </p>

      <H2 id="whats-on-the-screen">What&rsquo;s on the screen</H2>
      <Legend
        items={[
          <>
            <Ui>I agree to the Terms and Privacy Policy.</Ui> The two links open the <Link href="/terms">Terms</Link>{" "}
            and <Link href="/privacy">Privacy Policy</Link> on our website, so you can read them first.
          </>,
          <>
            <Ui>I&rsquo;ll only test apps I own or have permission to test.</Ui> A simple promise that keeps everyone
            safe.
          </>,
          <>
            <Ui>Includes anonymous usage analytics.</Ui> The link opens the{" "}
            <Link href="/privacy#analytics">analytics section</Link> of the Privacy Policy.
          </>,
          <>The versions of the Terms and Privacy Policy you&rsquo;re agreeing to.</>,
          <>
            <Ui>Continue</Ui> becomes available once both boxes are ticked.
          </>,
        ]}
      />

      <H2 id="continue">Tick both boxes and continue</H2>
      <p>
        Tick both boxes and click <Ui>Continue</Ui>. The button shows <Ui>Saving…</Ui> for a moment while PentAgent
        records your choice on your account, then the app opens.
      </p>
      <p>
        Prefer to stop here? Click <Ui>Sign out</Ui>. Nothing is saved, and you&rsquo;ll see this screen again next
        time you sign in.
      </p>

      <H2 id="analytics">About analytics</H2>
      <p>
        PentAgent sends anonymous usage analytics, such as which features get used, to help us improve it. Analytics
        only start once you&rsquo;ve clicked <Ui>Continue</Ui>. Nothing is sent from the sign-in or welcome screens.
      </p>
      <p>
        Your captured traffic stays on your computer. The{" "}
        <Link href="/privacy#analytics">Privacy Policy</Link> explains exactly what is and isn&rsquo;t collected.
      </p>

      <H2 id="seeing-it-again">When you&rsquo;ll see it again</H2>
      <p>
        Your answer is saved to your account, not just this computer, so signing in elsewhere won&rsquo;t ask again.
        You&rsquo;ll only see the welcome screen again if we publish a new version of the Terms or the Privacy Policy.
        In that case, have a quick look at what changed and tick the boxes again.
      </p>

      <H2 id="if-it-doesnt-work">If it doesn&rsquo;t work</H2>
      <p>
        If PentAgent can&rsquo;t load the current Terms and Privacy versions, it shows{" "}
        <Ui>We couldn&rsquo;t load the latest terms</Ui> with a <Ui>Try again</Ui> button instead of the checkboxes.
      </p>
      <p>Here&rsquo;s what each message means:</p>
      <InfoTable
        head={["Message", "What to do"]}
        rows={[
          ["You're offline. Reconnect and try again.", "Check your internet connection, then click Try again."],
          ["We couldn't reach PentAgent just now. Try again in a moment.", "Wait a moment, then click Try again."],
          ["We're still setting things up on our side. Try again a little later.", "Nothing's wrong on your end. Try again a little later."],
          ["We couldn't save that. Check your connection and try again.", "Check your connection, then click Try again."],
          ["That didn't save. Please try again.", "Click Try again."],
          [
            "The Terms or Privacy Policy just changed. Have a quick look and tick the boxes again.",
            "A new version came out while the screen was open. Read it, tick both boxes and continue.",
          ],
          ["You've been signed out. Sign in again to continue.", "Sign in again with GitHub."],
        ]}
      />
      <Callout kind="note">
        <p>
          PentAgent only opens once your choice is safely saved, so if a message appears you&rsquo;ll stay on this
          screen until it works.
        </p>
      </Callout>
    </DocPage>
  );
}
