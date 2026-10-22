import { statusTone } from "@/components/workbench/tones";

// HTTP syntax colours from the desktop app's message viewer.
function colorize(line: string) {
  const request = /^(GET|POST|PUT|PATCH|DELETE) (\S+) (HTTP\/1\.1)$/.exec(line);
  if (request) {
    return (
      <>
        <span className="font-semibold text-accent-fg">{request[1]}</span>{" "}
        <span className="text-hl-path">{request[2]}</span> <span className="text-ink-muted">{request[3]}</span>
      </>
    );
  }

  const response = /^(HTTP\/1\.1) (\d{3})( .*)?$/.exec(line);
  if (response) {
    return (
      <>
        <span className="text-ink-muted">{response[1]}</span>{" "}
        <span className={`font-semibold ${statusTone(Number(response[2]))}`}>{response[2]}</span>
        <span className="text-ink-muted">{response[3] ?? ""}</span>
      </>
    );
  }

  const header = /^([A-Za-z-]+): (.*)$/.exec(line);
  if (header) {
    return (
      <>
        <span className="text-hl-header-name">{header[1]}</span>
        <span className="text-ink-muted">: </span>
        <span className="text-hl-header-value">{header[2]}</span>
      </>
    );
  }

  return <JsonLine line={line} />;
}

function JsonLine({ line }: { line: string }) {
  if (!line) return <span>{"\u00a0"}</span>;
  const parts = line.split(/("(?:[^"\\]|\\.)*"\s*:?|-?\d+(?:\.\d+)?|true|false|null|[{}[\],])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (/^".*":?$/.test(part.trim()) && part.trim().endsWith(":")) {
          return (
            <span key={i}>
              <span className="text-hl-header-name">{part.trim().slice(0, -1)}</span>
              <span className="text-ink-muted">:</span>
            </span>
          );
        }
        if (/^"/.test(part)) return <span key={i} className="text-hl-path">{part}</span>;
        if (/^-?\d/.test(part)) return <span key={i} className="text-hl-number">{part}</span>;
        if (/^(true|false|null)$/.test(part)) return <span key={i} className="text-hl-literal">{part}</span>;
        if (/^[{}[\],]$/.test(part)) return <span key={i} className="text-ink-muted">{part}</span>;
        return <span key={i} className="text-ink">{part}</span>;
      })}
    </>
  );
}

/** Code box with line-number gutter, like the app's request/response editor. */
export function CodeBox({ lines, className = "" }: { lines: readonly string[]; className?: string }) {
  return (
    <div className={`code-box flex overflow-hidden ${className}`}>
      <div className="code-gutter">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <pre className="min-w-0 flex-1 overflow-hidden px-2 py-[0.4rem] font-mono text-[11.5px] leading-[1.6] whitespace-pre text-ink">
        {lines.map((line, index) => (
          <span key={index} className="block truncate">
            {colorize(line)}
          </span>
        ))}
      </pre>
    </div>
  );
}

export function RawBlock({ lines }: { lines: readonly string[] }) {
  return <CodeBox lines={lines} />;
}
