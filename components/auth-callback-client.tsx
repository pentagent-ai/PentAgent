"use client";

import { useEffect, useMemo } from "react";
import { siteConfig } from "@/lib/site";
import { withBase } from "@/lib/base-path";

const DESKTOP_SCHEME = "pentagent://auth-callback";

function isSafeReturnPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("://");
}

/**
 * Website OAuth bridge: after Supabase redirects here with tokens in the hash/query,
 * hand off to the desktop app via pentagent://, or finish in-browser for web-only flows.
 * No open redirects — only same-origin paths or the fixed desktop scheme.
 */
export function AuthCallbackClient() {
  const search = useMemo(() => (typeof window !== "undefined" ? window.location.search : ""), []);
  const hash = useMemo(() => (typeof window !== "undefined" ? window.location.hash : ""), []);
  const next = useMemo(() => {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    return params.get("next") || params.get("return") || "";
  }, [search]);
  const invalid = Boolean(next) && !isSafeReturnPath(next);
  const message = invalid
    ? "Invalid return path."
    : `Opening ${siteConfig.name}… If nothing happens, return to the app and try email code sign-in.`;

  useEffect(() => {
    if (invalid) return;
    const payload = hash || (search ? `#${search.slice(1)}` : "");
    const desktopUrl = `${DESKTOP_SCHEME}${payload || ""}`;

    // Prefer desktop handoff; fall back to home on this site.
    try {
      window.location.assign(desktopUrl);
      window.setTimeout(() => {
        window.location.replace(withBase(next && isSafeReturnPath(next) ? next : "/"));
      }, 1200);
    } catch {
      window.location.replace(withBase("/"));
    }
  }, [invalid, next, search, hash]);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-zinc-400">{message}</p>
    </main>
  );
}
