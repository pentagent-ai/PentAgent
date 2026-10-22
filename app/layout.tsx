import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Geist for text, Geist Mono for data, requests, labels and readouts.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.name}: ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
};

const authForward = `(function(){try{var b=${JSON.stringify(process.env.NEXT_PUBLIC_BASE_PATH || "")};var l=location;if(l.pathname.indexOf("/auth/callback")!==-1)return;var q=new URLSearchParams(l.search);var h=l.hash||"";if(q.has("code")||q.has("error")||/access_token=|error=/.test(h)){l.replace(b+"/auth/callback/"+l.search+h);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: authForward }} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[5px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <JsonLd data={siteJsonLd()} />
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col bg-canvas">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
