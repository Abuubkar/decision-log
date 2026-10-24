import type { Area, Status } from "@/domain/types";

export type StatusFilter = Status | "all";

/** Null is every area. An area is a string now, so it cannot carry a sentinel. */
export type AreaFilter = Area | null;

/** What the drawer is showing, if anything. */
export type DrawerState =
  | { mode: "view" | "edit"; id: string }
  | { mode: "create" }
  | { mode: "areas" }
  | null;

export type DrawerMode = "view" | "edit" | "create" | "areas";
