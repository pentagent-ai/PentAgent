import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { links, primaryNav } from "@/lib/links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link
          href={links.home}
          aria-label="PentAgent home"
          className="rounded-md outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={links.pilot} size="sm" className="max-sm:hidden">
            Request pilot access
          </ButtonLink>
          <ButtonLink href={links.pilot} size="sm" className="sm:hidden">
            Request access
          </ButtonLink>
          <MobileNav links={primaryNav} />
        </div>
      </div>
    </header>
  );
}
