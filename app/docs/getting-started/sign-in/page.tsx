import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Legend, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to PentAgent with GitHub, and what happens while your pilot access is being approved.",
  alternates: { canonical: "/docs/getting-started/sign-in" },
  openGraph: { url: "/docs/getting-started/sign-in" },
};

export default function SignInPage() {
  return (
    <DocPage href="/docs/getting-started/sign-in">
      <p>
        PentAgent asks you to sign in each time it can&rsquo;t find a saved session, for example on the first launch
        or after you sign out. Signing in lets PentAgent confirm that your account is part of the pilot.
      </p>


      <H2 id="sign-in-with-github">Sign in with GitHub</H2>
      <Steps>
        <Step title="Choose Continue with GitHub">
          <p>
            Click <Ui>Continue with GitHub</Ui>. The button changes to <Ui>Redirecting…</Ui> while GitHub opens.
          </p>
        </Step>
        <Step title="Approve on GitHub">
          <p>
            Sign in to GitHub if you aren&rsquo;t already, and approve PentAgent. Use the GitHub account from your pilot
            request, since that&rsquo;s the one on the approved list.
          </p>
        </Step>
        <Step title="Back to PentAgent">
          <p>
            GitHub sends you back to PentAgent, which checks your access. If you&rsquo;re approved and it&rsquo;s your
            first time, you&rsquo;ll see the <Link href="/docs/getting-started/welcome-screen">welcome screen</Link>{" "}
            next. After that, PentAgent opens straight to your workspace.
          </p>
        </Step>
      </Steps>

      <Callout kind="note" title="What PentAgent gets from GitHub">
        <p>
          Your name, GitHub username, email address and profile picture. PentAgent uses them to check your access and
          to show who&rsquo;s signed in. It doesn&rsquo;t ask for access to your repositories.
        </p>
      </Callout>

      <Callout kind="tip" title="Email sign-in is coming soon">
        <p>Signing in with a one-time code sent to your email is on its way. For now, use GitHub.</p>
      </Callout>

      <H2 id="access-checks">How access checks work</H2>
      <p>
        Right after you sign in, PentAgent asks our server whether your account is on the pilot list. It checks again
        every few hours while the app is open, and whenever you come back to the PentAgent window.
      </p>
      <p>
        If you lose your internet connection, you can keep working. As long as PentAgent confirmed your access on this
        computer within the last three days, it lets you in with the same account.
      </p>

      <H2 id="not-approved-yet">If your access isn&rsquo;t approved yet</H2>
      <p>
        If your account isn&rsquo;t on the pilot list yet, PentAgent shows <Ui>Not approved yet</Ui> with the GitHub
        username it checked.
      </p>
      <p>What you can do:</p>
      <ul>
        <li>
          <strong>Haven&rsquo;t applied yet?</strong> Click <Ui>Apply for pilot access</Ui> to open the{" "}
          <Link href="/pilot">pilot request form</Link>.
        </li>
        <li>
          <strong>Already applied?</strong> We review requests by hand, so it can take a little while. Once
          you&rsquo;re approved, open PentAgent again and you&rsquo;ll go straight in.
        </li>
        <li>
          <strong>Signed in with a different GitHub account?</strong> Click <Ui>Sign out</Ui> and sign in with the
          account from your request.
        </li>
      </ul>

      <H2 id="other-screens">Other screens you might see</H2>
      <H3 id="could-not-verify">Could not verify pilot access</H3>
      <p>
        PentAgent couldn&rsquo;t reach our server to check your access, and there&rsquo;s no recent confirmation on
        this computer to fall back on. Check your connection, then click <Ui>Try again</Ui>. You can also{" "}
        <Ui>Sign out</Ui> from here.
      </p>

      <H3 id="update-required">Update required</H3>
      <p>
        Your build is older than the oldest version the pilot supports. Click <Ui>Get the latest build</Ui>, then
        follow <Link href="/docs/getting-started/install#updating">Updating to a new build</Link>.
      </p>
      <p>
        When a newer build is out but yours still works, PentAgent shows a small <Ui>Update available</Ui> bar at the
        top of the window instead. It has a <Ui>Download</Ui> link and a <Ui>Dismiss</Ui> button, so you can update
        when it suits you.
      </p>

      <H2 id="account-menu">Your account menu</H2>
      <p>
        Once you&rsquo;re in, your account button sits at the far right of the top bar. It shows your GitHub profile
        picture, or your initials if you don&rsquo;t have one. Click it to see your account details.
      </p>
      <Legend
        items={[
          <>Your name and GitHub username.</>,
          <>The email address on your GitHub account.</>,
          <>
            Your access status, for example <Ui>Pilot access · allowed</Ui>.
          </>,
          <>
            <Ui>Sign out</Ui>.
          </>,
        ]}
      />
      <p>
        The menu only ever shows your own details. Press <kbd className="doc-kbd">Esc</kbd> or click anywhere else to
        close it.
      </p>

      <H2 id="sign-out">Signing out</H2>
      <p>
        Open the account menu and click <Ui>Sign out</Ui>. PentAgent returns to the sign-in screen. Your projects and
        captured traffic stay on your computer and are there when you sign in again.
      </p>

      <H2 id="sign-in-trouble">If sign-in doesn&rsquo;t work</H2>
      <InfoTable
        head={["What you see", "What to do"]}
        rows={[
          [
            "GitHub opens but you never get back to PentAgent",
            "Close the GitHub tab, go back to PentAgent and click Continue with GitHub again. Make sure you finish the approval on GitHub.",
          ],
          [
            "Not approved yet, but you were approved",
            "Check you signed in with the GitHub account from your pilot request. If it's the right one, sign out and sign in again.",
          ],
          [
            "Could not verify pilot access",
            "Check your internet connection, then click Try again.",
          ],
        ]}
      />
    </DocPage>
  );
}
