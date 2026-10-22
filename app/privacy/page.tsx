import type { Metadata } from "next";
import { LegalLayout, LegalList, LegalSection, Ph } from "@/components/legal-layout";
import { legalDocs, legalEntityPlaceholder } from "@/lib/legal";
import { links } from "@/lib/links";

const doc = legalDocs.privacy;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What PentAgent collects, in plain English: your traffic stays on your computer, the anonymous analytics we collect, and the few account records we keep.",
  alternates: { canonical: links.privacy },
  openGraph: {
    title: "Privacy Policy | PentAgent",
    description: "Your traffic stays on your computer. Here's what we do collect, and why.",
    url: links.privacy,
  },
};

const linkClass = "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Your traffic, projects and keys stay on your computer. Here's the little we do collect, and why."
      version={doc.version}
      effectiveDate={doc.effectiveDate}
      effectiveDateIso={doc.effectiveDateIso}
    >
      <LegalSection id="local" title="What stays on your computer">
        <p>
          Captured traffic, your projects and findings, your API keys and the local proxy certificate are stored on your
          machine. We never receive them.
        </p>
      </LegalSection>

      <LegalSection id="ai" title="Your AI model">
        <p>
          When you use Ask, Plan or Agent, the relevant traffic goes straight from your computer to the model you
          connected. It doesn&rsquo;t pass through us. The provider sees it as captured, with nothing masked, and handles it
          under its own privacy policy. A local model keeps it all on your machine. More in our{" "}
          <a className={linkClass} href={`${links.terms}#ai-byok`}>
            Terms
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="analytics" title="Analytics">
        <p>
          Anonymous usage analytics are part of using PentAgent. After you accept these terms, the app sends usage events
          to PostHog (hosted in the EU) under a random install ID. They help us see what&rsquo;s used and fix problems, and
          they aren&rsquo;t linked to your account.
        </p>
        <p className="text-ink">What we track</p>
        <LegalList>
          <li>feature and screen usage, like &ldquo;Repeater request sent&rdquo; or &ldquo;map viewed&rdquo;</li>
          <li>session length and how often you use the app</li>
          <li>app version, browser and operating system</li>
          <li>screen size and timezone</li>
          <li>the random install ID</li>
          <li>error reports, with URLs, emails and tokens removed</li>
        </LegalList>
        <p className="text-ink">What we never track</p>
        <LegalList>
          <li>captured traffic, requests or responses</li>
          <li>target URLs or anything about what you test</li>
          <li>your prompts or the AI&rsquo;s output</li>
          <li>API keys, tokens or other credentials</li>
          <li>your email or GitHub username</li>
          <li>anything else that identifies you</li>
        </LegalList>
        <p>
          Analytics can&rsquo;t be turned off in the app. If you&rsquo;d rather not share them, you can stop using
          PentAgent, and collection stops when you do. There&rsquo;s no session recording or click tracking.
        </p>
      </LegalSection>

      <LegalSection id="account" title="Your account and pilot request">
        <p>To run sign-in and the pilot, we keep a few records (stored with Supabase):</p>
        <LegalList>
          <li>your GitHub sign-in details, such as your username and email</li>
          <li>whether you&rsquo;re in the pilot</li>
          <li>which version of the Terms and this policy you accepted, and when</li>
          <li>what you enter in the pilot request form, used only to review your request and get in touch</li>
        </LegalList>
        <p>
          We don&rsquo;t sell your data or use it for ads. The services that help us are Supabase (sign-in and records),
          PostHog (analytics) and GitHub (sign-in).
        </p>
      </LegalSection>

      <LegalSection id="rights" title="Your choices">
        <p>
          You can ask to see, correct or delete your data at any time, in line with India&rsquo;s Digital Personal Data
          Protection Act, 2023. We&rsquo;ll post a contact address here soon. PentAgent is for people 18 and over.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes and contact">
        <p>
          PentAgent is provided by <Ph>{legalEntityPlaceholder}</Ph>. If we update this policy, we&rsquo;ll post the new
          version here and the app will ask you to accept it.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
