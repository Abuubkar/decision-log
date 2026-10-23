import type { Decision, Status } from "./types";

/** A log reads newest first. */
export function byNewest(a: Decision, b: Decision) {
  return b.decidedOn.localeCompare(a.decidedOn);
}

/** Superseded and reversed decisions stay in the log, they just stop holding. */
export function stillHolds(decision: Decision) {
  return decision.status === "active";
}

export function withStatus(decision: Decision, status: Status): Decision {
  return { ...decision, status };
}

export function countByStatus(decisions: Decision[]) {
  return decisions.reduce(
    (counts, decision) => {
      counts[decision.status] += 1;
      return counts;
    },
    { active: 0, superseded: 0, reversed: 0 } as Record<Status, number>,
  );
}

/**
 * Matches against the words someone would actually remember. The owner and the
 * area are in here because a name is the first thing anyone types, and reading
 * only the prose returned the decisions that mention a person rather than the
 * ones they made.
 */
export function matchesQuery(decision: Decision, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [decision.title, decision.statement, decision.rationale, decision.owner, decision.area]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

/**
 * Today where the reader is standing. toISOString would give the UTC day, which
 * east of UTC is tomorrow for part of the evening and yesterday for part of the
 * morning: the form defaulted to a day that had not happened yet and then
 * refused to accept today.
 */
export function today() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function formatDecidedOn(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
