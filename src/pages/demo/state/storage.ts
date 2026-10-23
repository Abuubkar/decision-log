import type { Change } from "@/domain/changes";
import type { Area, Decision } from "@/domain/types";

const KEY = "decision-log";

/**
 * Bumped when the seed changes. A log nobody has touched is only the demo, so
 * a new seed replaces it. A log someone has touched is theirs and keeps its
 * own version, whatever we ship.
 */
const SEED_VERSION = 1;

export type SavedLog = {
  version: number;
  touched: boolean;
  decisions: Decision[];
  changes: Change[];
  areas: Area[];
};

const looksLikeALog = (value: unknown): value is SavedLog => {
  if (typeof value !== "object" || value === null) return false;
  const log = value as Partial<SavedLog>;
  return (
    typeof log.version === "number" &&
    typeof log.touched === "boolean" &&
    Array.isArray(log.decisions) &&
    Array.isArray(log.changes) &&
    Array.isArray(log.areas)
  );
};

/**
 * Null means start from the seed. Anything unreadable is treated the same way
 * rather than thrown: storage can be turned off, full, or left behind by a
 * version of this that wrote a different shape.
 */
export function loadLog(): SavedLog | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const saved: unknown = JSON.parse(raw);
    if (!looksLikeALog(saved)) return null;
    // Their own decisions outrank the seed. Only a log nobody touched is ours
    // to replace.
    if (!saved.touched && saved.version !== SEED_VERSION) return null;
    return saved;
  } catch {
    return null;
  }
}

export function saveLog(log: Omit<SavedLog, "version">) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...log, version: SEED_VERSION }));
  } catch {
    // A full or disabled store is not worth interrupting anyone over. The log
    // still works for this visit.
  }
}

export function forgetLog() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to do. If it cannot be removed it could not have been written.
  }
}
