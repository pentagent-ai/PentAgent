import type { Method } from "@/lib/demo-data";

// Same semantics as the desktop app: method pills with per-method text colour,
// status = dot + number (2xx success, 3xx warn, 4xx/5xx critical).

export function methodPillClass(method: Method): string {
  return `method-pill method-pill-${method.toLowerCase()}`;
}

export function methodTone(method: Method): string {
  switch (method) {
    case "GET":
      return "text-method-get";
    case "POST":
      return "text-method-post";
    case "PUT":
      return "text-method-put";
    case "PATCH":
      return "text-method-patch";
    case "DELETE":
      return "text-method-delete";
  }
}

export function statusTone(status: number): string {
  if (status >= 400) return "text-danger";
  if (status >= 300) return "text-warn";
  return "text-success";
}

export function statusDot(status: number): string {
  if (status >= 400) return "bg-danger";
  if (status >= 300) return "bg-warn";
  return "bg-success";
}
