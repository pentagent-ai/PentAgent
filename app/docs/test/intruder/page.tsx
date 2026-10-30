import type { Metadata } from "next";
import Link from "next/link";
import { withBase } from "@/lib/base-path";

// Old address for the Fuzzer guide. Kept so existing links don't 404; sends visitors to the new page.
export const metadata: Metadata = {
  title: "Fuzzer",
  alternates: { canonical: "/docs/test/fuzzer" },
  robots: { index: false, follow: true },
};

export default function MovedToFuzzerPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${withBase("/docs/test/fuzzer/")}`} />
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-ink-muted">
          This page has moved to{" "}
          <Link className="text-ink underline underline-offset-4" href="/docs/test/fuzzer">
            Fuzzer
          </Link>
          .
        </p>
      </section>
    </>
  );
}
