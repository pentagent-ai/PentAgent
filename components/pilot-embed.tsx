"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/button";
import { links } from "@/lib/links";

export function PilotEmbed() {
  const router = useRouter();
  const loadCountRef = useRef(0);
  const maxHeightRef = useRef(0);

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
    if (loadCountRef.current > 1) {
      router.push(links.download);
    }
  }

  return (
    <div id="form" className="min-w-0 scroll-mt-28">
      <div className="overflow-hidden rounded-[6px] border border-line bg-surface">
        <iframe
          src={links.pilotFormEmbed}
          title="PentAgent pilot request form"
          loading="lazy"
          onLoad={handleIframeLoad}
          className="block h-[1500px] w-full border-0 bg-white sm:h-[1400px]"
        />
      </div>

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

      <p className="mt-4 text-sm leading-relaxed text-ink-dim">
        Form not showing?{" "}
        <a
          className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
          href={links.pilotForm}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
