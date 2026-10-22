import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24 lg:px-8">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-5 text-balance text-4xl font-medium tracking-[-0.035em] text-ink md:text-5xl">
        This page isn&rsquo;t here.
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
        The link may be out of date, or the page may have moved. You can head back to the start or request pilot access.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={links.home} size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href={links.pilot} size="lg" variant="secondary">
          Request pilot access
        </ButtonLink>
      </div>
    </section>
  );
}
