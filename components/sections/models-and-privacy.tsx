import { Figure, SectionHeading, SectionRule } from "@/components/section-heading";

const points = [
  "Bring your own key for the model provider you choose, or point PentAgent at a local or self-hosted model.",
  "Projects and captured traffic are stored on your machine.",
  "The AI provider you choose receives the traffic you send to it, including request and response contents.",
  "Tokens in captured traffic reach that model too, so a local model is a good fit for sensitive targets.",
];

export function ModelsAndPrivacy() {
  return (
    <section id="models" className="scroll-mt-20 pb-20 pt-8 lg:pb-28">
      <SectionRule index="05" label="Your model" />
      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading title="Bring your own model. Keep your projects on your machine.">
            PentAgent does not run a model for you. You choose where model calls go, and you can keep them local.
          </SectionHeading>

          <ul className="mt-10 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3.5 text-[15px] leading-relaxed text-ink-muted">
                <span aria-hidden="true" className="mt-[12px] h-px w-3 shrink-0 bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <Figure label="Fig. 03 / Data path" meta="what leaves your machine" bodyClassName="ruled p-6 sm:p-8">
          <div className="rounded-md border border-line-strong bg-canvas p-5">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em]">
              <span className="text-ink-dim">Your machine</span>
              <span className="text-ink-dim">local</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Proxy", "History", "Projects"].map((item) => (
                <span
                  key={item}
                  className="rounded-[4px] border border-line bg-surface px-2 py-3 text-center font-mono text-[11px] text-ink-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative ml-8 flex h-16 w-px bg-line-strong">
            <span className="absolute -bottom-px -left-[3.5px] size-2 rotate-45 border-b border-r border-ink-dim" />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] text-ink-dim">
              only the traffic you send
            </span>
          </div>

          <div className="rounded-md border border-line-strong bg-canvas p-5">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em]">
              <span className="text-ink-dim">Model endpoint you choose</span>
            </div>
            <div className="mt-4 divide-y divide-line rounded-[4px] border border-line bg-surface">
              <div className="px-3.5 py-3">
                <p className="text-[13.5px] text-ink">Your own API key</p>
                <p className="mt-1 font-mono text-[11px] text-ink-dim">Traffic goes to the provider you pick</p>
              </div>
              <div className="border-l-2 border-l-accent px-3.5 py-3">
                <p className="text-[13.5px] text-ink">Local or self-hosted model</p>
                <p className="mt-1 font-mono text-[11px] text-accent-fg">Recommended for sensitive targets</p>
              </div>
            </div>
          </div>
        </Figure>
      </div>
    </section>
  );
}
