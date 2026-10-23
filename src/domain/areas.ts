import type { Area, Decision } from "./types";

export type AreaInLog = { name: Area; inUse: boolean };

const sameName = (a: Area, b: Area) => a.toLowerCase() === b.toLowerCase();

/**
 * Every area a decision sits in, together with the ones someone kept that
 * nothing uses yet. Reading the decisions is what makes a dangling area
 * impossible: an area exists because a decision is in it.
 */
export function areasInLog(decisions: Decision[], kept: Area[]): AreaInLog[] {
  const inUse = new Set(decisions.map((decision) => decision.area));
  const names = new Map<string, Area>();
  for (const name of [...inUse, ...kept]) names.set(name.toLowerCase(), name);
  return [...names.values()]
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name, inUse: inUse.has(name) }));
}

/** An area a decision still sits in cannot be removed, or the decision would dangle. */
export function mayRemoveArea(decisions: Decision[], name: Area) {
  return !decisions.some((decision) => sameName(decision.area, name));
}

/** Two areas differing only in case are the same area, and the first one wins. */
export function areaExists(areas: AreaInLog[], name: Area) {
  return areas.some((area) => sameName(area.name, name));
}

export function countByArea(decisions: Decision[]) {
  const counts = new Map<Area, number>();
  for (const decision of decisions) {
    counts.set(decision.area, (counts.get(decision.area) ?? 0) + 1);
  }
  return counts;
}
