import { useCallback, useEffect, useMemo, useState } from "react";
import { created, diffFields, edited, historyFor, statusChanged } from "@/domain/changes";
import type { Change } from "@/domain/changes";
import { byNewest, countByStatus, matchesQuery, withStatus } from "@/domain/decisions";
import { SEED } from "@/domain/seed";
import { SEED_CHANGES } from "@/domain/seedChanges";
import type { Area, Decision, Status } from "@/domain/types";
import type { AreaFilter, DrawerState, StatusFilter } from "./log.types";
import { readUrl, writeUrl } from "./url";

/**
 * Everything the log holds. State lives in memory on purpose: a refresh puts
 * the seed data back, which is what Reset demo says out loud.
 */
export function useLog() {
  // Read once. After this the URL follows the log, not the other way round.
  const [link] = useState(() => readUrl(window.location.search));

  const [decisions, setDecisions] = useState<Decision[]>(SEED);
  const [changes, setChanges] = useState<Change[]>(SEED_CHANGES);
  const [status, setStatus] = useState<StatusFilter>(link.status);
  const [area, setArea] = useState<AreaFilter>(link.area);
  const [query, setQuery] = useState(link.query);
  const [drawer, setDrawer] = useState<DrawerState>(
    // A link to a decision that is not in the log opens nothing rather than an
    // empty drawer.
    link.openId && SEED.some((decision) => decision.id === link.openId)
      ? { mode: "view", id: link.openId }
      : null,
  );

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

  /**
   * A count is taken against every filter except the one it belongs to, so it
   * describes what clicking it would actually show. Counting the whole log
   * instead offered rows that were not there: Hiring read 2 and Reversed read 1
   * while the two together were empty. All counts the same way, because it is
   * the status group's own answer to whatever area is chosen.
   */
  const statusCounts = useMemo(() => {
    const pool = decisions.filter(
      (decision) => (area === "all" || decision.area === area) && matchesQuery(decision, query),
    );
    return { all: pool.length, ...countByStatus(pool) };
  }, [decisions, area, query]);

  const areaCounts = useMemo(() => {
    const pool = decisions.filter(
      (decision) =>
        (status === "all" || decision.status === status) && matchesQuery(decision, query),
    );
    const counts = new Map<Area | "all", number>([["all", pool.length]]);
    for (const decision of pool) {
      counts.set(decision.area, (counts.get(decision.area) ?? 0) + 1);
    }
    return counts;
  }, [decisions, status, query]);

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

  // replaceState, not push: filtering is not navigation, and Back should leave
  // the demo rather than walk every filter the reader tried.
  useEffect(() => {
    window.history.replaceState(null, "", writeUrl({ status, area, query, openId }));
  }, [status, area, query, openId]);

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
