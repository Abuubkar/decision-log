import type { Area, StatusId } from "@/domain/types";

/** Null is every status, matching the area filter. A string carries no sentinel. */
export type StatusFilter = StatusId | null;

/** Null is every area. An area is a string now, so it cannot carry a sentinel. */
export type AreaFilter = Area | null;

/** What the drawer is showing, if anything. */
export type DrawerState =
  | { mode: "view" | "edit"; id: string }
  | { mode: "create" }
  | { mode: "settings" }
  | null;

export type DrawerMode = "view" | "edit" | "create" | "settings";
