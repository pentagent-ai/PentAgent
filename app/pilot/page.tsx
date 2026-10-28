import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { PilotEmbed } from "@/components/pilot-embed";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Request pilot access",
  description:
    "Request access to the invite-only PentAgent pilot. Tell us who you are, how you'll run models and what you'd like to test.",
  alternates: { canonical: "/pilot" },
  openGraph: { url: "/pilot" },
};

const notes = [
  "We review every request by hand.",
  "We invite people when there's a good fit.",
  "Your GitHub username is how pilot members sign in to the app.",
];

export default function PilotPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:py-28">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim"><span className="text-accent">§</span> Pilot access</p>
        <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-ink md:text-5xl">
          Request pilot access.
        </h1>
        <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
          PentAgent is in an invite-only pilot. Tell us who you are and what you&rsquo;d like to test. Submitting this
          form doesn&rsquo;t grant access.
        </p>

        <ul className="mt-10 space-y-4 border-t border-line pt-8">
          {notes.map((note) => (
            <li key={note} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-[6px] border border-line bg-surface p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">Next step</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Once you submit the request form, head to the download page to get the pilot build for your operating system.
          </p>
          <div className="mt-4">
            <ButtonLink href={links.download} variant="secondary" size="sm">
              Go to download page
            </ButtonLink>
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-ink-muted">
          PentAgent is for testing apps you own or have permission to test.
        </p>
      </div>

      <PilotEmbed />
    </section>
  );
}
