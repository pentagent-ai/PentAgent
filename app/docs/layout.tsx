import type { ReactNode } from "react";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";
import { DocsSearch } from "@/components/docs/search";
import { DocsSidebar } from "@/components/docs/sidebar";
import { DocsToc } from "@/components/docs/toc";
import { publishedNav } from "@/lib/docs/nav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const groups = publishedNav();
  return (
    <div className="mx-auto grid w-full max-w-[88rem] gap-8 px-5 pb-20 pt-6 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
      <aside className="hidden lg:block">
        <div className="sticky top-14 -mt-6 max-h-[calc(100vh-3.5rem)] overflow-y-auto pb-10 pt-6 pr-2 thin-scroll">
          <DocsSearch />
          <div className="mt-6">
            <DocsSidebar groups={groups} />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-4 lg:hidden">
        <DocsSearch compact />
        <MobileDocsNav groups={groups} />
      </div>

      <div className="min-w-0 lg:pt-6">
        <div className="mx-auto max-w-[46rem]">{children}</div>
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-14 -mt-6 max-h-[calc(100vh-3.5rem)] overflow-y-auto pb-10 pt-12 thin-scroll">
          <DocsToc />
        </div>
      </aside>
    </div>
  );
}
