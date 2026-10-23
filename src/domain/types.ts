export const STATUSES = ["active", "superseded", "reversed"] as const;
export type Status = (typeof STATUSES)[number];

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
  status: Status;
};
