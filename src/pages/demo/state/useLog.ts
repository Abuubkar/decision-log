import { useCallback, useMemo, useState } from "react";
import { created, diffFields, edited, historyFor, statusChanged } from "@/domain/changes";
import type { Change } from "@/domain/changes";
import { byNewest, countByStatus, matchesQuery, withStatus } from "@/domain/decisions";
import { SEED } from "@/domain/seed";
import { SEED_CHANGES } from "@/domain/seedChanges";
import type { Area, Decision, Status } from "@/domain/types";
import type { AreaFilter, DrawerState, StatusFilter } from "./log.types";

/**
 * Everything the log holds. State lives in memory on purpose: a refresh puts
 * the seed data back, which is what Reset demo says out loud.
 */
export function useLog() {
  const [decisions, setDecisions] = useState<Decision[]>(SEED);
  const [changes, setChanges] = useState<Change[]>(SEED_CHANGES);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [area, setArea] = useState<AreaFilter>("all");
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState<DrawerState>(null);

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
    setChanges(SEED_CHANGES);
    setDrawer(null);
    setStatus("all");
    setArea("all");
    setQuery("");
  }, []);

  /** Returns the change it recorded, so Undo can take it back out again. */
  const changeStatus = useCallback((id: string, from: Status, to: Status) => {
    setDecisions((current) =>
      current.map((decision) => (decision.id === id ? withStatus(decision, to) : decision)),
    );
    const change = statusChanged(id, from, to);
    setChanges((current) => [...current, change]);
    return change.id;
  }, []);

  /** Undo means it never happened, so the change comes back out of the history. */
  const undoStatus = useCallback((id: string, back: Status, changeId: string) => {
    setDecisions((current) =>
      current.map((decision) => (decision.id === id ? withStatus(decision, back) : decision)),
    );
    setChanges((current) => current.filter((change) => change.id !== changeId));
  }, []);

  // The diff is worked out here rather than inside the setDecisions updater.
  // An updater has to be pure, and React runs it twice in development to prove
  // it: recording the change in there wrote every edit to the history twice.
  const save = useCallback(
    (decision: Decision) => {
      const before = decisions.find((item) => item.id === decision.id);

      if (!before) {
        setDecisions((current) => [...current, decision]);
        setChanges((history) => [...history, created(decision.id)]);
        return;
      }

      // Saving a form nobody touched should not fill the history with noise.
      const fields = diffFields(before, decision);
      setDecisions((current) => current.map((item) => (item.id === decision.id ? decision : item)));
      if (fields.length > 0) {
        setChanges((history) => [...history, edited(decision.id, fields)]);
      }
    },
    [decisions],
  );

  const openId = drawer && "id" in drawer ? drawer.id : null;
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
    drawer,
    history: open ? historyFor(changes, open.id) : [],
    setStatus,
    setArea,
    setQuery,
    clearFilters,
    resetDemo,
    changeStatus,
    undoStatus,
    save,
    view: useCallback((id: string) => setDrawer({ mode: "view", id }), []),
    edit: useCallback((id: string) => setDrawer({ mode: "edit", id }), []),
    create: useCallback(() => setDrawer({ mode: "create" }), []),
    closeDrawer: useCallback(() => setDrawer(null), []),
  };
}

/** What every piece of the log receives. */
export type LogState = ReturnType<typeof useLog>;
