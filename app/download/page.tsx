import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the PentAgent early pilot build for Linux. Signing in needs an approved pilot account.",
  alternates: { canonical: "/download" },
  openGraph: { url: "/download" },
};

const files = [
  { label: "Debian / Ubuntu package", name: "pentagent_amd64.deb", href: links.downloadDeb, primary: true },
  { label: "Portable tarball", name: "pentagent-linux-x64.tar.gz", href: links.downloadTarball, primary: false },
] as const;

export default function DownloadPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim"><span className="text-accent">§</span> Pilot builds</p>
      <h1 className="mt-5 text-balance text-4xl font-medium tracking-[-0.04em] text-ink md:text-5xl">Download</h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
        This is an early version for Linux (64-bit). macOS and Windows will follow.
      </p>

      <div className="mt-12 space-y-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex flex-col gap-4 rounded-[6px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-ink">{file.label}</p>
              <p className="mt-1 break-all font-mono text-[12.5px] text-ink-dim">{file.name}</p>
            </div>
            <a
              href={file.href}
              className={buttonClass({ variant: file.primary ? "primary" : "secondary", size: "md" })}
            >
              Download
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[15px] leading-relaxed text-ink-muted">
        The app needs an approved pilot account to sign in. Don&rsquo;t have one yet?{" "}
        <Link className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent" href={links.pilot}>
          Join the pilot
        </Link>
        .
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-dim">
        All builds and checksums are on the{" "}
        <a className="underline underline-offset-2 hover:text-ink" href={links.releases}>
          releases page
        </a>
        . Install steps are in the{" "}
        <Link className="underline underline-offset-2 hover:text-ink" href="/docs/getting-started/install">docs</Link>.
      </p>
    </section>
  );
}
