import type { Status } from "@/domain/types";
import type { DrawerMode } from "../state";

export const HEADINGS: Record<DrawerMode, string> = {
  view: "Decision",
  edit: "Edit decision",
  create: "New decision",
  settings: "Settings",
};

/**
 * Teaches the vocabulary at the moment someone needs it. The seeded three have
 * their own words; a status a team wrote gets the one thing the log knows about
 * it, which is whether decisions in it still hold.
 */
const SEEDED: Record<string, string> = {
  active:
    "Mark it superseded if a later decision replaced it, or reversed if the team went back on it.",
  superseded: "Marking it active again puts it back in force.",
  reversed: "Marking it active again puts it back in force.",
};

export function hintFor(status: Status) {
  return (
    SEEDED[status.id] ??
    (status.holds
      ? "Decisions in this status still hold."
      : "Decisions in this status keep their place in the log and stop holding.")
  );
}
