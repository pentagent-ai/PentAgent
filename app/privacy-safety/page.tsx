import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy & safety",
  description:
    "What stays on your computer, what leaves it, where your AI key is kept, and the controls around live requests in PentAgent.",
  alternates: { canonical: links.privacySafety },
  openGraph: { url: links.privacySafety },
};

const linkClass = "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line pt-8">
      <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-muted">{children}</div>
    </section>
  );
}

function Points({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span aria-hidden="true" className="mt-[12px] h-px w-3 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacySafetyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
        <span className="text-accent">§</span> Privacy &amp; safety
      </p>
      <h1 className="mt-5 text-balance text-4xl font-medium tracking-[-0.04em] text-ink md:text-5xl">
        Privacy &amp; safety
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
        What stays on your computer, what leaves it, and the controls around live requests. This page describes
        pilot build 0.1.0-trial10.7. The full details are in the{" "}
        <Link className={linkClass} href={links.privacy}>
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-12 space-y-12">
        <Block id="stays" title="What stays on your computer">
          <p>
            Captured traffic, projects, findings, chats and your AI settings are stored in the PentAgent data folder on
            your computer. The backup PentAgent makes before updating your data stays in that folder too.
            PentAgent doesn&rsquo;t run a server that receives your traffic or projects.
          </p>
        </Block>

        <Block id="leaves" title="What leaves your computer">
          <Points
            items={[
              <>
                <strong className="font-medium text-ink">To the AI provider you choose:</strong> the requests,
                responses and notes you send to it in Ask, Plan or Agent, plus your API key for that provider.
              </>,
              <>
                <strong className="font-medium text-ink">To our sign-in service:</strong> your GitHub sign-in, your Terms and
                Privacy acceptance, and checks for app updates and pilot settings. There is no approval step: any GitHub
                account can sign in. It records your GitHub username, email and the times of your first and latest
                sign-in, so we can count users and block accounts that misuse PentAgent. The app also shows your GitHub
                name and profile picture. It never receives captured traffic, projects or API keys.
              </>,
              <>
                <strong className="font-medium text-ink">Anonymous usage analytics (PostHog, EU):</strong> these start
                only after you accept the welcome screen. They include a random install ID, the app version, your
                operating system and which features you use, such as opening a tab or running the Fuzzer. They never
                include your name, GitHub account, URLs, traffic or keys. Error reports are scrubbed before sending.
              </>,
              <>
                <strong className="font-medium text-ink">First-launch setup:</strong> PentAgent downloads its Python
                packages and the isolated lab browser.
              </>,
              <>
                <strong className="font-medium text-ink">Your tests:</strong> requests you send go to the app
                you&rsquo;re testing.
              </>,
            ]}
          />
        </Block>

        <Block id="api-key" title="Where your API key lives">
          <p>
            Your AI provider key is saved in a settings file in the PentAgent data folder on your computer. It&rsquo;s
            stored as plain text, not in the system keychain, and on macOS and Linux only your user account can read
            the file. PentAgent sends the key only to the provider address you set up.
          </p>
        </Block>

        <Block id="limits" title="The honest limit">
          <p>
            Your AI provider sees everything you send it, including tokens, cookies or personal data inside captured
            traffic. PentAgent doesn&rsquo;t mask them. For sensitive or client work, use a local or self-hosted
            model. PentAgent supports llama.cpp and LM Studio, Ollama-compatible servers and any OpenAI-compatible
            endpoint, alongside Groq, Google Gemini and OpenRouter.
          </p>
        </Block>

        <Block id="safe-by-design" title="Safe by design">
          <Points
            items={[
              <>
                <strong className="font-medium text-ink">Agent asks first.</strong> Each live request the agent wants
                to send shows <em>Allow this request?</em> with Deny, Stop and Allow. Ask and Plan can&rsquo;t send
                live requests, and the agent only sends to hosts in your project&rsquo;s scope.
              </>,
              <>
                <strong className="font-medium text-ink">Batch approval is your choice.</strong> In AI settings you can
                let one Allow cover the rest of a run. It&rsquo;s off by default, and payloads that could destroy data
                still ask every time.
              </>,
              <>
                <strong className="font-medium text-ink">Stop.</strong> Stop attack ends the agent&rsquo;s run and
                disarms it, so it can&rsquo;t send again until you start a new attack. A Fuzzer or Sequencer job the
                agent already started keeps going until you stop it in its own tab or on the Dashboard.
              </>,
              <>
                <strong className="font-medium text-ink">Spend cap.</strong> Off by default. Turn it on to set a
                per-session or daily limit in money or tokens. When a limit is reached, the assistant stops before its
                next model call. Money limits need a provider that reports cost.
              </>,
              <>
                <strong className="font-medium text-ink">Your own tools.</strong> Repeater and Fuzzer send when you
                click Send or Start attack.
              </>,
            ]}
          />
        </Block>

        <Block id="practice" title="Start in a practice lab">
          <p>
            Try PentAgent on a deliberately vulnerable app running on your own computer, such as OWASP Juice Shop or
            bWAPP. Only test apps you own or have permission to test.
          </p>
        </Block>
      </div>
    </article>
  );
}
