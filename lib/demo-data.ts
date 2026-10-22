// Fake demo-shop data for the product mockups. Nothing here is a real host, customer or credential.
// Labels and copy mirror what the PentAgent desktop app shows for the same demo project.

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Source = "proxy" | "repeater";

export type HistoryEntry = {
  id: number;
  method: Method;
  path: string;
  status: number;
  length: number;
  /** Seconds after the capture start, used to render the TIME column. */
  at: number;
  source: Source;
};

export const demoHost = "demo-shop.test";
export const demoProject = "Storefront audit";
export const listenerLabel = "MITM 127.0.0.1:8080";
export const scopeSummary = "Scope: 1 host · 2 rules";

export const PENDING_PATCH_ID = 999;

/** Captured while browsing, oldest first. */
export const seedHistory: HistoryEntry[] = [
  { id: 1, method: "GET", path: "/static/app.4f1c.js", status: 200, length: 246310, at: 2, source: "proxy" },
  { id: 2, method: "GET", path: "/api/session", status: 200, length: 312, at: 3, source: "proxy" },
  { id: 3, method: "POST", path: "/api/auth/login", status: 200, length: 486, at: 5, source: "proxy" },
  { id: 4, method: "GET", path: "/api/products?category=shoes", status: 200, length: 10035, at: 6, source: "proxy" },
  { id: 5, method: "POST", path: "/api/cart/items", status: 201, length: 208, at: 7, source: "proxy" },
  { id: 6, method: "POST", path: "/api/checkout", status: 200, length: 1127, at: 9, source: "proxy" },
  { id: 7, method: "GET", path: "/api/orders", status: 200, length: 4710, at: 10, source: "proxy" },
  { id: 8, method: "GET", path: "/api/orders/4812", status: 200, length: 1433, at: 12, source: "proxy" },
  { id: 9, method: "GET", path: "/api/orders/4812/invoice", status: 403, length: 166, at: 13, source: "proxy" },
  { id: 10, method: "DELETE", path: "/api/cart/items/88", status: 204, length: 0, at: 14, source: "proxy" },
  { id: 11, method: "GET", path: "/api/admin/users", status: 403, length: 166, at: 16, source: "proxy" },
  { id: 12, method: "GET", path: "/api/orders/4813", status: 200, length: 1331, at: 17, source: "proxy" },
];

/** Streams into HTTP history while the demo runs. */
export const browseFeed: Omit<HistoryEntry, "id" | "at">[] = [
  { method: "GET", path: "/api/notifications", status: 200, length: 524, source: "proxy" },
  { method: "GET", path: "/api/orders?page=2", status: 200, length: 4198, source: "proxy" },
  { method: "GET", path: "/api/shipping/rates?zip=560001", status: 200, length: 911, source: "proxy" },
  { method: "PUT", path: "/api/profile/address", status: 200, length: 319, source: "proxy" },
  { method: "GET", path: "/api/products/112/reviews", status: 200, length: 3702, source: "proxy" },
  { method: "GET", path: "/api/wishlist", status: 200, length: 640, source: "proxy" },
  { method: "GET", path: "/api/orders/4812/tracking", status: 200, length: 720, source: "proxy" },
  { method: "GET", path: "/api/admin/reports", status: 403, length: 166, source: "proxy" },
];

export const pendingPatch: HistoryEntry = {
  id: PENDING_PATCH_ID,
  method: "PATCH",
  path: "/api/orders/4812/status",
  status: 200,
  length: 236,
  at: 0,
  source: "repeater",
};

const BASE_SECONDS = 11 * 3600 + 54 * 60 + 52; // 11:54:52 AM

export function clockFor(at: number): string {
  const t = BASE_SECONDS + at;
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export const pendingRequestHeaders = [
  "PATCH /api/orders/4812/status HTTP/1.1",
  "Host: demo-shop.test",
  "Content-Type: application/json",
  "Accept: application/json",
  "Cookie: sid=demo-session-2207",
  "Content-Length: 24",
];
export const pendingRequestBody = ['{ "status": "refunded" }'];

export const sentResponseHeaders = ["HTTP/1.1 200 OK", "Content-Type: application/json", "X-Request-Id: 4812-7c1e"];
export const sentResponseBody = [
  "{",
  '  "id": 4812,',
  '  "status": "refunded",',
  '  "owner_id": 1093,',
  '  "updated_by": 2207',
  "}",
];

const reasons: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export function requestHeadersFor(entry: Pick<HistoryEntry, "method" | "path">): string[] {
  return [
    `${entry.method} ${entry.path} HTTP/1.1`,
    `Host: ${demoHost}`,
    "Accept: application/json",
    "Cookie: sid=demo-session-1093",
    "User-Agent: Mozilla/5.0",
  ];
}

export function responseHeadersFor(entry: Pick<HistoryEntry, "status" | "length">): string[] {
  return [
    `HTTP/1.1 ${entry.status} ${reasons[entry.status] ?? "OK"}`,
    "Content-Type: application/json",
    `Content-Length: ${entry.length}`,
  ];
}

export function responseBodyFor(entry: Pick<HistoryEntry, "status" | "path">): string[] {
  if (entry.status === 403) return ['{ "error": "forbidden" }'];
  if (entry.status === 204) return [];
  if (entry.path.startsWith("/api/orders/4812")) {
    return ["{", '  "id": 4812,', '  "status": "paid",', '  "owner_id": 1093', "}"];
  }
  return ['{ "ok": true }'];
}

/** Params the Inspector shows for a request. */
export function paramsFor(entry: Pick<HistoryEntry, "id" | "path">): { name: string; value: string }[] {
  if (entry.id === PENDING_PATCH_ID) return [{ name: "status", value: "refunded" }];
  const q = entry.path.split("?")[1];
  if (!q) return [];
  return q.split("&").map((pair) => {
    const [name, value = ""] = pair.split("=");
    return { name, value };
  });
}

// --- AI Assistant threads (Ask / Plan / Agent) ---

export const askThread = [
  {
    role: "user" as const,
    text: "What does the status endpoint take, and who should be able to call it?",
  },
  {
    role: "ai" as const,
    text: "PATCH /api/orders/4812/status takes a JSON body with one status field and loads the order by ID. Captured responses include owner_id, so only the order's owner or staff should be able to change it.",
  },
];

export const agentThread = {
  goal: "Can a customer change the status of an order they do not own?",
  intro:
    "Order 4812 belongs to customer 1093. I will replay the same status change as customer 2207. It is one live request, so it waits for your Allow.",
  allowed:
    "Sent once. The server returned 200 and the order now shows updated_by 2207 while owner_id is still 1093. Customer 2207 changed an order they do not own.",
  denied: "Denied. That request was never sent.",
  stopped: "Stopped. Nothing else will be sent.",
};

export const approval = {
  tool: "http_send",
  summary: "Replay PATCH /api/orders/4812/status as customer 2207",
  estimate: 1,
};

export const agentSteps = [
  { label: "Map which orders belong to which customer", state: "done" },
  { label: "Replay the status change as a second customer", state: "active" },
  { label: "Compare owner and response data", state: "queued" },
] as const;

export const planItems = [
  {
    title: "Ownership check on order status",
    priority: "High",
    target: "PATCH /api/orders/:id/status",
  },
  {
    title: "Invoice access across customers",
    priority: "Medium",
    target: "GET /api/orders/:id/invoice",
  },
  {
    title: "Coupon reuse at checkout",
    priority: "Medium",
    target: "POST /api/checkout",
  },
] as const;

export const scopeText = ["demo-shop.test", "demo-shop.test/api/*"];
export const scopeRules = [
  { host: "demo-shop.test", note: "In scope", inScope: true },
  { host: "demo-shop.test/api/*", note: "In scope", inScope: true },
  { host: "cdn.demo-shop.test", note: "Out of scope", inScope: false },
] as const;

// --- Sitemap (the app's understanding view) ---

export const sitemapPages = [
  { url: "https://demo-shop.test/orders/4812", title: "Order 4812" },
  { url: "https://demo-shop.test/orders", title: "Orders" },
  { url: "https://demo-shop.test/admin/users", title: "Admin users" },
  { url: "https://demo-shop.test/", title: "Storefront" },
];

export const linkedFlows = [
  { from: "Order 4812", control: "Cancel order", network: "PATCH /api/orders/:id/status", opens: "—", effect: "State change", confidence: "High" },
  { from: "Order 4812", control: "Download invoice", network: "GET /api/orders/:id/invoice", opens: "invoice.pdf", effect: "Read", confidence: "High" },
  { from: "Orders", control: "Order row", network: "GET /api/orders/:id", opens: "Order 4812", effect: "Navigate", confidence: "Medium" },
  { from: "Storefront", control: "Add to cart", network: "POST /api/cart/items", opens: "—", effect: "State change", confidence: "High" },
] as const;

export const roles = [
  { name: "customer 1093", active: true },
  { name: "customer 2207", active: false },
  { name: "admin", active: false },
];

export const understandingNodes = [
  { kind: "Page", label: "Order 4812", detail: "/orders/4812" },
  { kind: "Control", label: "Cancel order", detail: "button · State change" },
  { kind: "Request", label: "Update order status", detail: "PATCH /api/orders/:id/status", flagged: true },
] as const;
