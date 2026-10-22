// Every internal and external link on the site comes from this file.
// The download URL is a placeholder: replace it with a signed, expiring build URL
// only after the real artifact is hosted behind access control.

export const links = {
  home: "/",
  howItWorks: "/#how-it-works",
  modes: "/#modes",
  control: "/#control",
  models: "/#models",
  docs: "/docs/getting-started",
  download: "/download",
  pilot: "/pilot",
  privacy: "/privacy",
  terms: "/terms",
  acceptableUse: "/terms#acceptable-use",
  pilotForm: "https://airtable.com/app8sXqKI3zZSfOqn/pagbHLm1HcD8eoiuZ/form",
  pilotFormEmbed: "https://airtable.com/embed/app8sXqKI3zZSfOqn/pagbHLm1HcD8eoiuZ/form",
  // Latest public release assets. Upload with these exact, version-less names.
  releases: "https://github.com/pentagent-ai/PentAgent/releases/latest",
  downloadDeb: "https://github.com/pentagent-ai/PentAgent/releases/latest/download/pentagent_amd64.deb",
  downloadTarball: "https://github.com/pentagent-ai/PentAgent/releases/latest/download/pentagent-linux-x64.tar.gz",
  downloadTarballSha: "https://github.com/pentagent-ai/PentAgent/releases/latest/download/pentagent-linux-x64.tar.gz.sha256",
} as const;

export const primaryNav = [
  { label: "How it works", href: links.howItWorks },
  { label: "Modes", href: links.modes },
  { label: "Control", href: links.control },
  { label: "Your model", href: links.models },
  { label: "Docs", href: links.docs },
] as const;

export const footerLinks = {
  product: [
    { label: "How it works", href: links.howItWorks },
    { label: "Modes", href: links.modes },
    { label: "Control", href: links.control },
    { label: "Your model", href: links.models },
    { label: "Docs", href: links.docs },
  ],
  access: [
    { label: "Request pilot access", href: links.pilot },
    { label: "Download", href: links.download },
  ],
  legal: [
    { label: "Terms", href: links.terms },
    { label: "Privacy", href: links.privacy },
  ],
} as const;
