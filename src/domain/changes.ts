import type { Decision, Status } from "./types";

export type ChangeKind = "created" | "edited" | "status";

export type Change = {
  id: string;
  decisionId: string;
  kind: ChangeKind;
  /** ISO date. */
  at: string;
  by: string;
  /** Edits only: the fields that actually moved. */
  fields?: string[];
  /** Status changes only. */
  from?: Status;
  to?: Status;
};

/** Nobody is signed in, so a change you make says so rather than borrowing a name. */
export const YOU = "You";

/** The words the form uses, so history and form agree. */
const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  statement: "What we decided",
  rationale: "Why",
  decidedOn: "Decided on",
  owner: "Owner",
  area: "Area",
};

const TRACKED = Object.keys(FIELD_LABELS) as (keyof Decision)[];

/** Which fields moved between two versions of a decision. Empty means nothing did. */
export function changedFields(before: Decision, after: Decision) {
  return TRACKED.filter((field) => before[field] !== after[field]).map(
    (field) => FIELD_LABELS[field]!,
  );
}

const today = () => new Date().toISOString().slice(0, 10);

export function created(decisionId: string, by = YOU): Change {
  return { id: crypto.randomUUID(), decisionId, kind: "created", at: today(), by };
}

export function edited(decisionId: string, fields: string[], by = YOU): Change {
  return { id: crypto.randomUUID(), decisionId, kind: "edited", at: today(), by, fields };
}

export function statusChanged(decisionId: string, from: Status, to: Status, by = YOU): Change {
  return { id: crypto.randomUUID(), decisionId, kind: "status", at: today(), by, from, to };
}

/**
 * Newest first. Changes carry a date but no time, so two on the same day fall
 * back to the order they were recorded in, latest on top.
 */
export function historyFor(changes: Change[], decisionId: string) {
  return changes
    .map((change, order) => ({ change, order }))
    .filter((entry) => entry.change.decisionId === decisionId)
    .sort((a, b) => b.change.at.localeCompare(a.change.at) || b.order - a.order)
    .map((entry) => entry.change);
}

const capitalise = (word: string) => word[0]!.toUpperCase() + word.slice(1);

/** A label and the move it describes, or just a label when there is no move. */
export function readChange(change: Change): { label: string; detail?: string } {
  if (change.kind === "created") return { label: "Created" };
  if (change.kind === "status") {
    return {
      label: "Status",
      detail: `${capitalise(change.from ?? "")} → ${capitalise(change.to ?? "")}`,
    };
  }
  return { label: "Edited", detail: (change.fields ?? []).join(", ") };
}
