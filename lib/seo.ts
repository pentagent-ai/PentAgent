import { siteConfig } from "@/lib/site";

/** Pages that should not be crawled or indexed. */
export const privatePaths = ["/auth/"] as const;

/**
 * Search and answer-engine crawlers. Named on purpose so the policy is
 * explicit: they may read the public site, and they may not read sign-in or
 * the gated download.
 */
export const crawlerAgents = [
  "*",
  "Googlebot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
] as const;

/** Visible homepage answers. JSON-LD must repeat this text, not a different wording. */
export const productAnswers = [
  {
    question: "What is PentAgent?",
    answer:
      "PentAgent is an AI-native desktop workbench for web app security. It learns a web app from the traffic your browser sends, explains that traffic, plans tests, and runs a test only after you approve the live request. It runs on your machine. You bring your own model.",
  },
  {
    question: "How does PentAgent test a web app?",
    answer:
      "Browse the app through PentAgent's proxy. Every request lands in one history. PentAgent maps screens, API calls, roles and workflows from that traffic. You can ask for an explanation or for test ideas tied to those requests. In Agent mode, each live request waits until you choose Allow. Stop ends the run at any point.",
  },
  {
    question: "Where does captured traffic go?",
    answer:
      "Projects and captured traffic stay on your machine. PentAgent does not run a model for you. You bring a key for a model provider, or you point PentAgent at a local or self-hosted model. That provider receives the traffic you send to it, including request and response contents.",
  },
  {
    question: "Who is the pilot for?",
    answer:
      "PentAgent is an invite-only pilot. Every request is reviewed by hand, and people are invited when there is a good fit. It is built for cybersecurity students, junior pentesters and bug bounty hunters who want to understand an app from real traffic. Approved members sign in with GitHub.",
  },
  {
    question: "What can I test?",
    answer:
      "Only systems you own or have explicit permission to test. You name the hosts and paths in scope before a run starts. Nothing that touches the target is sent until you choose Allow.",
  },
] as const;

function absolute(path: string) {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}

export function siteJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const siteId = `${siteConfig.url}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: `${siteConfig.url}/brand/pentagent-mark.png`,
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Desktop",
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: { "@id": orgId },
        isPartOf: { "@id": siteId },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/LimitedAvailability",
          url: absolute("/pilot"),
          description: "Invite-only pilot. Request access. There is no public price.",
        },
      },
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: siteConfig.url,
    mainEntity: productAnswers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absolute(crumb.path) } : {}),
    })),
  };
}
