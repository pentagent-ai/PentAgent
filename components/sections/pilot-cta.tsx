import { ButtonLink } from "@/components/button";
import { SectionRule } from "@/components/section-heading";
import { links } from "@/lib/links";

export function PilotCta() {
  return (
    <section className="pb-24 pt-10 lg:pb-28">
      <SectionRule index="08" label="Pilot" />
      <div className="mx-auto mt-14 max-w-6xl px-6 lg:px-8">
        <div className="reg panel ruled grid gap-10 rounded-md p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <span aria-hidden="true" className="reg-mark reg-tl" />
          <span aria-hidden="true" className="reg-mark reg-tr" />
          <span aria-hidden="true" className="reg-mark reg-bl" />
          <span aria-hidden="true" className="reg-mark reg-br" />
          <div>
            <h2 className="text-balance text-[2rem] font-medium leading-[1.06] tracking-[-0.04em] text-ink sm:text-[2.75rem]">
              PentAgent is in an invite-only pilot.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-[16.5px] leading-relaxed text-ink-muted">
              We review every request by hand and invite people when there&rsquo;s a good fit.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href={links.pilot} size="lg">
                Request pilot access
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
