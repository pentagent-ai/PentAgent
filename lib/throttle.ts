// Client-side throttle for the pilot form. It only slows honest users down and
// does not replace the database rate limit in the migration.

const STORAGE_KEY = "pentagent.pilot.submissions.v1";
const COOLDOWN_MS = 30_000;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_IN_WINDOW = 3;

function readSubmissions(now: number): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is number => typeof t === "number" && now - t < WINDOW_MS);
  } catch {
    return [];
  }
}

export function getThrottleWait(now: number = Date.now()): number {
  const recent = readSubmissions(now);
  if (recent.length === 0) return 0;
  const cooldownWait = Math.max(0, recent[recent.length - 1] + COOLDOWN_MS - now);
  if (recent.length < MAX_IN_WINDOW) return cooldownWait;
  const windowWait = recent[0] + WINDOW_MS - now;
  return Math.max(cooldownWait, windowWait);
}

export function recordSubmission(now: number = Date.now()): void {
  try {
    const next = [...readSubmissions(now), now];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode). The server-side limit still applies.
  }
}
