import Link from "next/link";
import { Logo } from "@/components/logo";
import { footerLinks } from "@/lib/links";
import { siteConfig } from "@/lib/site";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto">
      <div className="mx-auto max-w-6xl px-6 lg:px-8" aria-hidden="true">
        <div className="ruler w-full" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-dim">
            An AI-native desktop workbench for web app security.
          </p>
        </div>
        <FooterColumn title="Product" items={footerLinks.product} />
        <FooterColumn title="Access" items={footerLinks.access} />
        <FooterColumn title="The basics" items={footerLinks.legal} />
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            &copy; {siteConfig.copyrightYear} {siteConfig.legalEntity}
          </p>
          <p className="font-mono">{siteConfig.builtIn}</p>
        </div>
      </div>
    </footer>
  );
}
