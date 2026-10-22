import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Answers } from "@/components/sections/answers";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Learners } from "@/components/sections/learners";
import { ModelsAndPrivacy } from "@/components/sections/models-and-privacy";
import { Modes } from "@/components/sections/modes";
import { PilotCta } from "@/components/sections/pilot-cta";
import { Safety } from "@/components/sections/safety";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <HowItWorks />
      <Modes />
      <Safety />
      <ModelsAndPrivacy />
      <Learners />
      <Answers />
      <PilotCta />
    </>
  );
}
