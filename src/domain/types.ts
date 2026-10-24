/**
 * The colours a status may wear. A tone and not a colour, so the palette can
 * move without every saved log moving with it.
 */
export const TONES = ["green", "amber", "red", "slate", "blue"] as const;
export type Tone = (typeof TONES)[number];

/** What a decision carries. Stable, so renaming a status never rewrites history. */
export type StatusId = string;

export type Status = {
  id: StatusId;
  /** What the team calls it. Theirs to change. */
  label: string;
  tone: Tone;
  /** Decisions in this status still hold. */
  holds: boolean;
};

/**
 * Every log has an active status and cannot lose it, because a decision
 * recorded today has to land somewhere.
 */
export const ACTIVE: StatusId = "active";

export const DEFAULT_STATUSES: Status[] = [
  { id: ACTIVE, label: "Active", tone: "green", holds: true },
  { id: "superseded", label: "Superseded", tone: "amber", holds: false },
  { id: "reversed", label: "Reversed", tone: "red", holds: false },
];

/**
 * An area is whatever a team calls that part of its business, so it is a
 * string and not a union. The four below are only what a new log starts with.
 */
export type Area = string;

export const DEFAULT_AREAS: Area[] = ["Product", "Engineering", "GTM", "Hiring"];

export type Decision = {
  id: string;
  title: string;
  /** What was decided. */
  statement: string;
  /** Why. The part that decays. */
  rationale: string;
  /** ISO date. The day the team committed, not the day someone wrote it down. */
  decidedOn: string;
  owner: string;
  area: Area;
  status: StatusId;
};
