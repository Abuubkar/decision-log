// THROWAWAY PROTOTYPE DATA. Answers "what should change history look like".
import type { Status } from "../../domain/types";

export type ChangeKind = "recorded" | "edited" | "standing";

export type Change = {
  id: string;
  decisionId: string;
  kind: ChangeKind;
  at: string;
  by: string;
  /** Standing changes only. */
  from?: Status;
  to?: Status;
  /** Edits only: which fields moved. */
  fields?: string[];
};

/**
 * Two years of changes. The interesting ones are the standing changes that
 * land on the same day another decision was recorded, which is the log quietly
 * explaining itself.
 */
export const CHANGES: Change[] = [
  { id: "c1", decisionId: "d1", kind: "recorded", at: "2024-03-14", by: "Priya" },
  { id: "c2", decisionId: "d2", kind: "recorded", at: "2024-05-02", by: "Marcus" },
  { id: "c3", decisionId: "d3", kind: "recorded", at: "2024-06-27", by: "Tom" },
  { id: "c4", decisionId: "d4", kind: "recorded", at: "2024-09-11", by: "Priya" },
  {
    id: "c5",
    decisionId: "d4",
    kind: "edited",
    at: "2024-09-13",
    by: "Priya",
    fields: ["Why"],
  },
  { id: "c6", decisionId: "d5", kind: "recorded", at: "2024-11-05", by: "Tom" },
  { id: "c7", decisionId: "d6", kind: "recorded", at: "2025-01-22", by: "Marcus" },
  { id: "c8", decisionId: "d7", kind: "recorded", at: "2025-02-13", by: "Naz" },
  {
    id: "c9",
    decisionId: "d3",
    kind: "standing",
    at: "2025-02-13",
    by: "Naz",
    from: "active",
    to: "reversed",
  },
  { id: "c10", decisionId: "d8", kind: "recorded", at: "2025-04-30", by: "Marcus" },
  { id: "c11", decisionId: "d9", kind: "recorded", at: "2025-07-08", by: "Marcus" },
  {
    id: "c12",
    decisionId: "d2",
    kind: "standing",
    at: "2025-07-08",
    by: "Marcus",
    from: "active",
    to: "superseded",
  },
  {
    id: "c13",
    decisionId: "d8",
    kind: "standing",
    at: "2025-08-14",
    by: "Marcus",
    from: "active",
    to: "superseded",
  },
  { id: "c14", decisionId: "d10", kind: "recorded", at: "2025-10-16", by: "Ellie" },
  {
    id: "c15",
    decisionId: "d7",
    kind: "edited",
    at: "2025-11-03",
    by: "Naz",
    fields: ["What we decided", "Why"],
  },
  { id: "c16", decisionId: "d11", kind: "recorded", at: "2026-02-09", by: "Priya" },
  {
    id: "c17",
    decisionId: "d9",
    kind: "edited",
    at: "2026-02-20",
    by: "Marcus",
    fields: ["Title"],
  },
];

export function changesFor(decisionId: string) {
  return CHANGES.filter((change) => change.decisionId === decisionId).sort((a, b) =>
    b.at.localeCompare(a.at),
  );
}

export const newestFirst = [...CHANGES].sort((a, b) => b.at.localeCompare(a.at));

/** One sentence per change, in the product's own words. */
export function describe(change: Change) {
  if (change.kind === "recorded") return "Recorded";
  if (change.kind === "standing") return `Standing changed from ${change.from} to ${change.to}`;
  const fields = change.fields ?? [];
  const list =
    fields.length > 1 ? `${fields.slice(0, -1).join(", ")} and ${fields.at(-1)}` : fields[0];
  return `Reworded ${list}`;
}
