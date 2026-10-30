// Every internal and external link on the site comes from this file.

const RELEASE_BASE = "https://github.com/pentagent-ai/PentAgent/releases";
const ASSET_BASE = `${RELEASE_BASE}/latest/download`;

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
  releaseVersion: "0.1.0-trial10.7",
  releases: `${RELEASE_BASE}/latest`,
  // Windows (64-bit)
  downloadWinZip: `${ASSET_BASE}/PentAgent-win-x64.zip`,
  downloadWinZipSha: `${ASSET_BASE}/PentAgent-win-x64.zip.sha256`,
  // macOS (Apple Silicon)
  downloadMacDmg: `${ASSET_BASE}/PentAgent-mac-arm64.dmg`,
  downloadMacDmgSha: `${ASSET_BASE}/PentAgent-mac-arm64.dmg.sha256`,
  downloadMacZip: `${ASSET_BASE}/PentAgent-mac-arm64.zip`,
  downloadMacZipSha: `${ASSET_BASE}/PentAgent-mac-arm64.zip.sha256`,
  // Linux (64-bit)
  downloadDeb: `${ASSET_BASE}/pentagent_amd64.deb`,
  downloadDebSha: `${ASSET_BASE}/pentagent_amd64.deb.sha256`,
  downloadAppImage: `${ASSET_BASE}/PentAgent-linux-x86_64.AppImage`,
  downloadAppImageSha: `${ASSET_BASE}/PentAgent-linux-x86_64.AppImage.sha256`,
  downloadTarball: `${ASSET_BASE}/pentagent-linux-x64.tar.gz`,
  downloadTarballSha: `${ASSET_BASE}/pentagent-linux-x64.tar.gz.sha256`,
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
  ],
  legal: [
    { label: "Terms", href: links.terms },
    { label: "Privacy", href: links.privacy },
  ],
} as const;
