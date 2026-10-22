import type { Metadata } from "next";
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

        <p className="mt-10 text-sm leading-relaxed text-ink-muted">
          PentAgent is for testing apps you own or have permission to test.
        </p>
      </div>

      <div id="form" className="min-w-0 scroll-mt-28">
        <div className="overflow-hidden rounded-[6px] border border-line bg-surface">
          <iframe
            src={links.pilotFormEmbed}
            title="PentAgent pilot request form"
            loading="lazy"
            className="block h-[1500px] w-full border-0 bg-white sm:h-[1400px]"
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          Form not showing?{" "}
          <a
            className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            href={links.pilotForm}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open it in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}
