import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "AI models",
  description: "Providers, Explore toggles, approvals batch mode and spend caps.",
  alternates: { canonical: "/docs/settings/ai-models" },
  openGraph: { url: "/docs/settings/ai-models" },
};

export default function AiModelsSettingsPage() {
  return (
    <DocPage href="/docs/settings/ai-models">
      <p>
        <Ui>AI models</Ui> is where you configure providers and defaults. The default provider is only what you pick
        here and Save — it is not inferred from <code>.env</code>. Existing chats keep their own provider until you
        change the chat dropdown.
      </p>

      <H2 id="privacy">Privacy</H2>
      <p>
        Your chosen model sees raw captured traffic and chat context, including any secrets in it. PentAgent does not
        mask them. That provider is the only place those values go for AI features.
      </p>

      <H2 id="providers">Providers</H2>
      <p>
        Enable a provider, paste an API key (leave blank to keep a saved key), set Base URL when needed, Fetch models,
        Test connection, and optionally <Ui>Set as default</Ui>. Then <Ui>Save AI settings</Ui>. Model routing can be
        Manual, Auto (this API), or Auto (all APIs).
      </p>

      <H2 id="explore-approvals-caps">Explore, approvals and spend caps</H2>
      <p>
        See <Link href="/docs/ai/approvals">Approvals &amp; stop</Link> for Explore per mode, cost warnings, batch
        Allow, and session / daily money and token limits. API usage for the last period is listed when providers
        report cost.
      </p>
    </DocPage>
  );
}
