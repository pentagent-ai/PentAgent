export const siteConfig = {
  name: "PentAgent",
  tagline: "AI-native desktop workbench for web app security",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pentagent-ai.github.io/PentAgent",
  description:
    "PentAgent is an AI-native desktop workbench for web app security. It learns your target from real traffic, explains it, plans tests, and runs them only when you approve.",
  // Left empty on purpose: the legal entity name is not confirmed yet. Do not guess.
  legalEntity: "",
  copyrightYear: 2026,
  builtIn: "Built in India",
  authorizedTestingNote: "Only test systems you own or have explicit permission to test.",
} as const;
