import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the PentAgent pilot build for Windows, macOS, and Linux. Signing in needs an approved pilot account.",
  alternates: { canonical: "/download" },
  openGraph: { url: "/download" },
};

const platformGroups = [
  {
    os: "Windows",
    arch: "64-bit (x64)",
    note: "Extract the zip to a folder on your disk and run win-unpacked\\pentagent.exe.",
    files: [
      {
        label: "Windows portable archive (64-bit)",
        name: "PentAgent-win-x64.zip",
        href: links.downloadWinZip,
        shaHref: links.downloadWinZipSha,
        primary: true,
      },
    ],
  },
  {
    os: "macOS",
    arch: "Apple Silicon (arm64)",
    note: "Drag PentAgent to Applications. On first launch, right-click PentAgent and choose Open.",
    files: [
      {
        label: "macOS disk image (Apple Silicon)",
        name: "PentAgent-mac-arm64.dmg",
        href: links.downloadMacDmg,
        shaHref: links.downloadMacDmgSha,
        primary: true,
      },
      {
        label: "macOS app archive (Apple Silicon)",
        name: "PentAgent-mac-arm64.zip",
        href: links.downloadMacZip,
        shaHref: links.downloadMacZipSha,
        primary: false,
      },
    ],
  },
  {
    os: "Linux",
    arch: "64-bit (x86_64 / amd64)",
    note: "Works on Ubuntu, Debian, Kali, Linux Mint, Fedora, and other 64-bit distributions.",
    files: [
      {
        label: "Debian / Ubuntu / Kali package",
        name: "pentagent_amd64.deb",
        href: links.downloadDeb,
        shaHref: links.downloadDebSha,
        primary: true,
      },
      {
        label: "AppImage (portable single file)",
        name: "PentAgent-linux-x86_64.AppImage",
        href: links.downloadAppImage,
        shaHref: links.downloadAppImageSha,
        primary: false,
      },
      {
        label: "Portable tarball",
        name: "pentagent-linux-x64.tar.gz",
        href: links.downloadTarball,
        shaHref: links.downloadTarballSha,
        primary: false,
      },
    ],
  },
] as const;

export default function DownloadPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
        <span className="text-accent">§</span> Pilot builds
      </p>
      <h1 className="mt-5 text-balance text-4xl font-medium tracking-[-0.04em] text-ink md:text-5xl">Download</h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
        Pilot builds for Windows, macOS, and Linux. Python is bundled inside the app, and the first launch sets up the
        local engine and lab browser automatically.
      </p>

      <div className="mt-12 space-y-10">
        {platformGroups.map((group) => (
          <div key={group.os}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
              <h2 className="text-lg font-medium tracking-[-0.02em] text-ink">{group.os}</h2>
              <span className="font-mono text-xs text-ink-dim">{group.arch}</span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-ink-dim">{group.note}</p>

            <div className="mt-4 space-y-3">
              {group.files.map((file) => (
                <div
                  key={file.name}
                  className="flex flex-col gap-4 rounded-[6px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-ink">{file.label}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="break-all font-mono text-[12.5px] text-ink-dim">{file.name}</span>
                      <a
                        href={file.shaHref}
                        className="font-mono text-[11px] text-ink-muted underline decoration-line-strong underline-offset-2 hover:text-ink"
                      >
                        .sha256
                      </a>
                    </div>
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
          </div>
        ))}
      </div>

      <p className="mt-10 text-[15px] leading-relaxed text-ink-muted">
        The app needs an approved pilot account to sign in. Don&rsquo;t have one yet?{" "}
        <Link className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent" href={links.pilot}>
          Request pilot access
        </Link>
        .
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-dim">
        All builds and checksums are on the{" "}
        <a className="underline underline-offset-2 hover:text-ink" href={links.releases}>
          releases page
        </a>
        . Step-by-step setup for Windows, macOS, and Linux is in the{" "}
        <Link className="underline underline-offset-2 hover:text-ink" href="/docs/getting-started/install">
          install guide
        </Link>
        .
      </p>
    </section>
  );
}
