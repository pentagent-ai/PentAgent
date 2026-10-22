"use client";

import { useState } from "react";

export function CodeBlock({ code, title, lang }: { code: string; title?: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="doc-code">
      <div className="doc-code-bar">
        <span className="font-mono text-[11px] text-ink-dim">{title ?? lang ?? "shell"}</span>
        <button type="button" onClick={copy} className="doc-code-copy">
          {copied ? "Copied" : "Copy"}
          <span className="sr-only"> code to clipboard</span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
