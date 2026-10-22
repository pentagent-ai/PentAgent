import Link from "next/link";
import { SectionHeading, SectionRule } from "@/components/section-heading";
import { links } from "@/lib/links";
import { productAnswers } from "@/lib/seo";

export function Answers() {
  const [lead, ...rest] = productAnswers;

  return (
    <section id="answers" className="scroll-mt-20 pb-20 pt-8 lg:pb-28">
      <SectionRule index="07" label="Questions" />
      <div className="mx-auto mt-14 max-w-6xl px-6 lg:px-8">
        <SectionHeading id="what-is-pentagent" title={lead.question}>
          {lead.answer}
        </SectionHeading>

        <dl className="mt-12 max-w-3xl border-t border-line">
          {rest.map((item) => (
            <div key={item.question} className="border-b border-line py-6">
              <dt>
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-ink">{item.question}</h3>
              </dt>
              <dd className="mt-2 max-w-2xl text-[15.5px] leading-relaxed text-ink-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-[15px] leading-relaxed text-ink-muted">
          <Link href={links.docs} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
            Read the docs
          </Link>
          <span className="mx-2.5 text-line-strong" aria-hidden="true">
            /
          </span>
          <Link href={links.pilot} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
            Request pilot access
          </Link>
        </p>
      </div>
    </section>
  );
}
