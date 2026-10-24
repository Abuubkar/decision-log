import { ACTIVE } from "./types";
import type { Decision, Status, StatusId } from "./types";

/** Falls back rather than throwing: a saved log can name a status it later lost. */
export function statusById(statuses: Status[], id: StatusId): Status {
  return (
    statuses.find((status) => status.id === id) ??
    statuses[0] ?? { id, label: id, tone: "slate", holds: true }
  );
}

export const labelOf = (statuses: Status[], id: StatusId) => statusById(statuses, id).label;

/** A decision still holds when the status it is in says so. */
export const stillHolds = (statuses: Status[], decision: Decision) =>
  statusById(statuses, decision.status).holds;

/**
 * Active stays, because a decision recorded today has to land somewhere, and a
 * status decisions are already in stays, or those decisions would point at
 * nothing. Returns why, so the control can say it rather than only refuse.
 */
export function whyStatusStays(
  statuses: Status[],
  decisions: Decision[],
  id: StatusId,
): string | null {
  if (id === ACTIVE) return "Every log needs one status a new decision starts in.";
  const count = decisions.filter((decision) => decision.status === id).length;
  if (count > 0) {
    return `${count} ${count === 1 ? "decision is" : "decisions are"} in it.`;
  }
  if (statuses.length <= 1) return "A log needs at least one status.";
  return null;
}

/** Two statuses with the same name are one status, whatever the case. */
export const statusNameTaken = (statuses: Status[], label: string, except?: StatusId) =>
  statuses.some(
    (status) => status.id !== except && status.label.toLowerCase() === label.trim().toLowerCase(),
  );

export function countByStatus(decisions: Decision[]) {
  const counts = new Map<StatusId, number>();
  for (const decision of decisions) {
    counts.set(decision.status, (counts.get(decision.status) ?? 0) + 1);
  }
  return counts;
}
