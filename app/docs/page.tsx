import type { Metadata } from "next";
import Link from "next/link";
import { publishedNav } from "@/lib/docs/nav";

export const metadata: Metadata = {
  title: "Docs",
  description: "How to install, set up and use PentAgent, the AI-native desktop workbench for web app security.",
  alternates: { canonical: "/docs" },
  openGraph: { url: "/docs" },
};

export default function DocsIndexPage() {
  const groups = publishedNav();
  return (
    <article className="min-w-0" aria-labelledby="doc-title">
      <p className="font-mono text-[11.5px] text-ink-dim">Docs</p>
      <h1 id="doc-title" className="mt-4 text-balance text-[2rem] font-medium leading-tight tracking-[-0.03em] text-ink md:text-[2.4rem]">
        PentAgent documentation
      </h1>
      <p className="mt-3 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-ink-muted">
        PentAgent is a desktop workbench for testing web apps. It captures traffic through a local proxy, helps you
        understand what it sees, and only runs tests when you say so. These guides walk through every part of it.
      </p>

      <div data-doc-content className="doc-prose mt-10">
        <p>
          New here? Start with <Link href="/docs/getting-started">Getting started</Link>. It takes you from download to
          your first captured request in a few minutes.
        </p>

        {groups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h2 id={group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-24">
              {group.title}
            </h2>
            <div className="doc-cards mt-4">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className="doc-card">
                  <span className="doc-card-title block">{item.title === "Overview" ? `${group.title} overview` : item.title}</span>
                  {item.description ? <span className="doc-card-body block">{item.description}</span> : null}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2 id="testing-responsibly" className="scroll-mt-24">Testing responsibly</h2>
        <p>
          Only test apps you own or have permission to test. A practice app running on your own machine is a great
          place to start.
        </p>
      </div>
    </article>
  );
}
