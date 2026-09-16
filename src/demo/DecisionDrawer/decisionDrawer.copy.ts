import type { Status } from "../../domain/types";
import type { DrawerMode } from "../state";

export const HEADINGS: Record<DrawerMode, string> = {
  view: "Decision",
  edit: "Edit decision",
  create: "New decision",
};

/** Teaches the vocabulary at the moment someone needs it. */
export const HINTS: Record<Status, string> = {
  active:
    "Mark it superseded if a later decision replaced it, or reversed if the team went back on it.",
  superseded: "Marking it active again puts it back in force.",
  reversed: "Marking it active again puts it back in force.",
};
