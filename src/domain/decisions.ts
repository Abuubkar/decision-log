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

/** Matches against the words someone would actually remember: the title and the reasoning. */
export function matchesQuery(decision: Decision, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return `${decision.title} ${decision.statement} ${decision.rationale}`
    .toLowerCase()
    .includes(needle);
}

export function formatDecidedOn(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
