import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Get started",
  description: "PentAgent is free and open to everyone. Download it and sign in with any GitHub account. No application needed.",
  alternates: { canonical: "/pilot" },
  openGraph: { url: "/pilot" },
};

const notes = [
  "PentAgent is free. There's no application and no approval step.",
  "Sign in with any GitHub account.",
  "We record your GitHub username, email and sign-in times so we can count users and block accounts that misuse PentAgent.",
];

export default function PilotPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim"><span className="text-accent">§</span> Get started</p>
      <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-ink md:text-5xl">
        PentAgent is open to everyone.
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
        Download PentAgent for Windows, macOS or Linux, open it, and sign in with GitHub.
      </p>

      <ul className="mt-10 space-y-4 border-t border-line pt-8">
        {notes.map((note) => (
          <li key={note} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
            <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
            <span>{note}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={links.download} size="lg">
          Download PentAgent
        </ButtonLink>
        <ButtonLink href={links.docs} size="lg" variant="secondary">
          Getting started
        </ButtonLink>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-ink-muted">
        PentAgent is for testing apps you own or have permission to test.
      </p>
    </section>
  );
}
