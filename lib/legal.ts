// Current versions of the two legal documents. The desktop app reads the same values from
// the Supabase app_config rows terms_version / privacy_version. Bump both places together:
// change the text here, publish the site, then update app_config so the app asks users to re-accept.

export const legalDocs = {
  terms: {
    version: "1.0.0",
    effectiveDate: "18 October 2026",
    effectiveDateIso: "2026-10-18",
  },
  privacy: {
    version: "1.1.0",
    effectiveDate: "18 October 2026",
    effectiveDateIso: "2026-10-18",
  },
} as const;

// Placeholder until the operating entity is confirmed. Do not guess.
export const legalEntityPlaceholder = "[Entity name]";
