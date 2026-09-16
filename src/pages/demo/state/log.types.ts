import type { Area, Status } from "@/domain/types";

export type StatusFilter = Status | "all";
export type AreaFilter = Area | "all";

/** What the drawer is showing, if anything. */
export type DrawerState = { mode: "view" | "edit"; id: string } | { mode: "create" } | null;

export type DrawerMode = "view" | "edit" | "create";
