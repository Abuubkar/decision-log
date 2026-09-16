import { useCallback, useMemo, useState } from "react";
import { byNewest, countByStatus, matchesQuery, withStatus } from "../domain/decisions";
import { SEED } from "../domain/seed";
import type { Area, Decision, Status } from "../domain/types";

export type StatusFilter = Status | "all";
export type AreaFilter = Area | "all";

/**
 * Everything the log holds. State lives in memory on purpose: a refresh puts
 * the seed data back, which is what Reset demo says out loud.
 */
export function useLog() {
  const [decisions, setDecisions] = useState<Decision[]>(SEED);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [area, setArea] = useState<AreaFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      decisions
        .filter(
          (decision) =>
            (status === "all" || decision.status === status) &&
            (area === "all" || decision.area === area) &&
            matchesQuery(decision, query),
        )
        .sort(byNewest),
    [decisions, status, area, query],
  );

  const statusCounts = useMemo(() => countByStatus(decisions), [decisions]);

  const areaCounts = useMemo(() => {
    const counts = new Map<Area, number>();
    for (const decision of decisions) {
      counts.set(decision.area, (counts.get(decision.area) ?? 0) + 1);
    }
    return counts;
  }, [decisions]);

  const filtersApplied = status !== "all" || area !== "all" || query.trim() !== "";

  const clearFilters = useCallback(() => {
    setStatus("all");
    setArea("all");
    setQuery("");
  }, []);

  const resetDemo = useCallback(() => {
    setDecisions(SEED);
    setOpenId(null);
    setStatus("all");
    setArea("all");
    setQuery("");
  }, []);

  const changeStatus = useCallback((id: string, next: Status) => {
    setDecisions((current) =>
      current.map((decision) => (decision.id === id ? withStatus(decision, next) : decision)),
    );
  }, []);

  const save = useCallback((decision: Decision) => {
    setDecisions((current) => {
      const exists = current.some((item) => item.id === decision.id);
      return exists
        ? current.map((item) => (item.id === decision.id ? decision : item))
        : [...current, decision];
    });
  }, []);

  const open = openId ? (decisions.find((decision) => decision.id === openId) ?? null) : null;

  return {
    decisions,
    filtered,
    statusCounts,
    areaCounts,
    status,
    area,
    query,
    filtersApplied,
    open,
    setStatus,
    setArea,
    setQuery,
    clearFilters,
    resetDemo,
    changeStatus,
    save,
    openDecision: setOpenId,
    closeDrawer: useCallback(() => setOpenId(null), []),
  };
}
