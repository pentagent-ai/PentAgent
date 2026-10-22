import type { Metadata } from "next";
import { LegalLayout, LegalList, LegalSection, Ph } from "@/components/legal-layout";
import { legalDocs, legalEntityPlaceholder } from "@/lib/legal";
import { links } from "@/lib/links";

const doc = legalDocs.terms;

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using PentAgent, in plain English: only test what you're allowed to, how your own AI model sees your traffic, and how the pilot works.",
  alternates: { canonical: links.terms },
  openGraph: {
    title: "Terms | PentAgent",
    description: "The terms for using PentAgent, in plain English.",
    url: links.terms,
  },
};

const linkClass = "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent";

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms"
      description="The short, plain-English terms for using PentAgent and this website."
      version={doc.version}
      effectiveDate={doc.effectiveDate}
      effectiveDateIso={doc.effectiveDateIso}
    >
      <LegalSection id="about" title="Who we are">
        <p>
          PentAgent is made by <Ph>{legalEntityPlaceholder}</Ph>. By using the app or this site, you agree to these terms
          and to our{" "}
          <a className={linkClass} href={links.privacy}>
            Privacy Policy
          </a>
          . You need to be 18 or older.
        </p>
      </LegalSection>

      <LegalSection id="pilot" title="The pilot">
        <p>
          PentAgent is in an invite-only pilot. Things will change, and some features may not work perfectly yet. We may
          pause or end pilot access, and we&rsquo;ll let you know when we can. Please keep your sign-in to yourself.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="Only test what you're allowed to">
        <p>
          Only test apps you own or have permission to test. Stay within the scope you&rsquo;ve agreed with the owner, and
          follow the laws where you and the target are. You&rsquo;re responsible for what you test with PentAgent.
        </p>
      </LegalSection>

      <LegalSection id="ai-byok" title="Your AI model and your key">
        <LegalList>
          <li>You connect your own model: a provider with your API key, or a local or self-hosted model.</li>
          <li>
            The provider sees the traffic you send it, including requests, responses and any tokens or passwords inside
            them. PentAgent doesn&rsquo;t mask or hide anything.
          </li>
          <li>For sensitive targets, a local model keeps everything on your machine.</li>
          <li>Model costs are between you and your provider. You can set a spend cap; it&rsquo;s off by default.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="agent" title="You stay in control">
        <p>
          In Agent mode, every live request waits for your approval before it&rsquo;s sent, and the Stop button ends a run
          at any time. Please review what you approve.
        </p>
      </LegalSection>

      <LegalSection id="your-data" title="Your work is yours">
        <p>
          Your projects, captured traffic and findings stay on your computer and belong to you. The app itself belongs to
          us: please don&rsquo;t copy, resell or reverse-engineer it.
        </p>
      </LegalSection>

      <LegalSection id="no-guarantees" title="No guarantees">
        <p>
          PentAgent is pilot software, provided as it is. It can have bugs and can miss issues, and AI output can be
          wrong, so please double-check findings before you rely on them.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes and contact">
        <p>
          If we update these terms, we&rsquo;ll post the new version here and the app will ask you to accept it.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
