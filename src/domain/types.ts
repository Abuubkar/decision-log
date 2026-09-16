export const STATUSES = ["active", "superseded", "reversed"] as const;
export type Status = (typeof STATUSES)[number];

export const AREAS = ["Product", "Engineering", "GTM", "Hiring"] as const;
export type Area = (typeof AREAS)[number];

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
