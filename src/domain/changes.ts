import { formatDecidedOn } from "./decisions";
import type { Decision, Status } from "./types";

export type ChangeKind = "created" | "edited" | "status";

/** One field that moved, with both sides already formatted for reading. */
export type FieldChange = { field: string; from: string; to: string };

export type Change = {
  id: string;
  decisionId: string;
  kind: ChangeKind;
  /** ISO date. */
  at: string;
  by: string;
  /** Edits only: the fields that actually moved, and what they moved between. */
  fields?: FieldChange[];
  /** Status changes only. */
  from?: Status;
  to?: Status;
};

/** Nobody is signed in, so a change you make says so rather than borrowing a name. */
const YOU = "You";

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

/** A date reads as a date. Everything else is already a string. */
function valueOf(field: keyof Decision, decision: Decision) {
  return field === "decidedOn" ? formatDecidedOn(decision.decidedOn) : String(decision[field]);
}

/** Which fields moved between two versions of a decision. Empty means nothing did. */
export function diffFields(before: Decision, after: Decision): FieldChange[] {
  return TRACKED.filter((field) => before[field] !== after[field]).map((field) => ({
    field: FIELD_LABELS[field]!,
    from: valueOf(field, before),
    to: valueOf(field, after),
  }));
}

const today = () => new Date().toISOString().slice(0, 10);

export function created(decisionId: string, by = YOU): Change {
  return { id: crypto.randomUUID(), decisionId, kind: "created", at: today(), by };
}

export function edited(decisionId: string, fields: FieldChange[], by = YOU): Change {
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

export type HistoryRow = { key: string; label: string; from?: string; to?: string };

/**
 * One row per field that moved, so an edit reads the same way a status change
 * does. A save that touched two fields produces two rows under one date.
 */
export function historyRows(change: Change): HistoryRow[] {
  if (change.kind === "created") return [{ key: change.id, label: "Created" }];
  if (change.kind === "status") {
    return [
      {
        key: change.id,
        label: "Status",
        from: capitalise(change.from ?? ""),
        to: capitalise(change.to ?? ""),
      },
    ];
  }
  return (change.fields ?? []).map((moved, index) => ({
    key: `${change.id}-${index}`,
    label: moved.field,
    from: moved.from,
    to: moved.to,
  }));
}
