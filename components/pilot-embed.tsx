"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink, buttonClass } from "@/components/button";
import { links } from "@/lib/links";

// How long to wait for the embedded form before making the fallback link prominent.
const SLOW_LOAD_MS = 8000;

// true in the browser after hydration, false during the static render.
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

const linkClass =
  "text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent";

export function PilotEmbed() {
  const router = useRouter();
  const loadCountRef = useRef(0);
  const maxHeightRef = useRef(0);
  // The iframe is only rendered after hydration so its onLoad is never missed
  // (an iframe that finishes loading before React attaches would leave the
  // loading message up forever).
  const mounted = useHydrated();
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setSlow(true), SLOW_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!event.origin.endsWith("airtable.com")) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      const record = data as Record<string, unknown>;

      if (record.key === "airtableUrlDidChange") {
        router.push(links.download);
        return;
      }

      if (record.key === "airtableEmbedContentDidResize" && typeof record.height === "number") {
        if (record.height > maxHeightRef.current) {
          maxHeightRef.current = record.height;
        } else if (maxHeightRef.current >= 800 && record.height > 0 && record.height <= 550) {
          router.push(links.download);
        }
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  function handleIframeLoad() {
    loadCountRef.current += 1;
    setLoaded(true);
    setSlow(false);
    if (loadCountRef.current > 1) {
      router.push(links.download);
    }
  }

  return (
    <div id="form" className="min-w-0 scroll-mt-28">
      {/* Shown above the frame too: the form is 1,400px tall, and a blocked frame (extension,
          firewall) still fires onLoad and paints a blank page, so the link under it is out of view. */}
      <p className="mb-3 text-sm leading-relaxed text-ink-dim">
        The form opens from Airtable. Not loading?{" "}
        <a className={linkClass} href={links.pilotForm} target="_blank" rel="noopener">
          Open it in a new tab
        </a>
      </p>

      <div className="relative overflow-hidden rounded-[6px] border border-line bg-surface">
        {mounted ? (
          <iframe
            src={links.pilotFormEmbed}
            title="PentAgent pilot request form"
            onLoad={handleIframeLoad}
            className="block h-[1500px] w-full border-0 bg-white sm:h-[1400px]"
          />
        ) : (
          <div aria-hidden="true" className="h-[1500px] w-full sm:h-[1400px]" />
        )}

        {!loaded && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex justify-center bg-surface px-6 pt-20 sm:pt-28"
          >
            <div className="flex max-w-sm flex-col items-center text-center">
              {slow ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warn">Still loading</p>
                  <p className="mt-3 text-[15px] font-medium text-ink">The form is taking longer than usual.</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Your browser, an extension or your network may be blocking embedded forms. You can fill it in
                    directly instead.
                  </p>
                  <a
                    className={buttonClass({ size: "md", className: "mt-6" })}
                    href={links.pilotForm}
                    target="_blank"
                    rel="noopener"
                  >
                    Open the form in a new tab
                  </a>
                </>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-line-strong border-t-accent"
                  />
                  <p className="mt-4 text-[15px] font-medium text-ink">Loading the request form&hellip;</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">This usually takes a few seconds.</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className={`mt-3 text-sm leading-relaxed ${slow && !loaded ? "text-ink" : "text-ink-dim"}`}>
        Form not loading?{" "}
        <a
          className={slow && !loaded ? `${linkClass} font-medium text-accent-fg decoration-accent` : linkClass}
          href={links.pilotForm}
          target="_blank"
          rel="noopener"
        >
          Open it in a new tab
        </a>
      </p>

      <div className="mt-5 flex flex-col gap-4 rounded-[6px] border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[14.5px] font-medium text-ink">Finished submitting the form?</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Proceed to download PentAgent for Windows, macOS, or Linux while we review your request.
          </p>
        </div>
        <ButtonLink href={links.download} size="md" className="shrink-0">
          Continue to download
        </ButtonLink>
      </div>
    </div>
  );
}
