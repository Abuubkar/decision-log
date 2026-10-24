import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { areaExists, areasInLog, countByArea } from "@/domain/areas";
import { historyFor } from "@/domain/changes";
import { byNewest, countByStatus, matchesQuery } from "@/domain/decisions";
import type { Area, Decision, Status } from "@/domain/types";
import type { AreaFilter, DrawerState, StatusFilter } from "./log.types";
import { initialLog, logReducer } from "./logReducer";
import { forgetLog, loadLog, saveLog } from "./storage";
import { readUrl, writeUrl } from "./url";

/** The seed, or whatever was left here last time. Read once, before first paint. */
function openingLog() {
  const saved = loadLog();
  return saved ? logReducer(initialLog(), { type: "restore", saved }) : initialLog();
}

/**
 * Everything the log holds. The decisions live in a reducer because every write
 * also writes a change, and keeping the two in step is the reducer's whole job.
 * The filters are plain state: they belong to the reader, not to the log, which
 * is why they live in the URL and not on the machine.
 */
export function useLog() {
  const [log, dispatch] = useReducer(logReducer, null, openingLog);

  // Read once. After this the URL follows the log, not the other way round.
  const [link] = useState(() => readUrl(window.location.search));

  const areas = useMemo(() => areasInLog(log.decisions, log.areas), [log.decisions, log.areas]);

  const [status, setStatus] = useState<StatusFilter>(link.status);
  const [area, setArea] = useState<AreaFilter>(() =>
    // A link to an area this log does not have shows the whole log rather than
    // an empty one under a filter the sidebar cannot even show.
    link.area && areaExists(areasInLog(openingLog().decisions, openingLog().areas), link.area)
      ? link.area
      : null,
  );
  const [query, setQuery] = useState(link.query);
  const [drawer, setDrawer] = useState<DrawerState>(
    link.openId && log.decisions.some((decision) => decision.id === link.openId)
      ? { mode: "view", id: link.openId }
      : null,
  );

  const filtered = useMemo(
    () =>
      log.decisions
        .filter(
          (decision) =>
            (status === "all" || decision.status === status) &&
            (area === null || decision.area === area) &&
            matchesQuery(decision, query),
        )
        .sort(byNewest),
    [log.decisions, status, area, query],
  );

  /**
   * A count is taken against every filter except the one it belongs to, so it
   * describes what clicking it would actually show. Counting the whole log
   * instead offered rows that were not there.
   */
  const statusCounts = useMemo(() => {
    const pool = log.decisions.filter(
      (decision) => (area === null || decision.area === area) && matchesQuery(decision, query),
    );
    return { all: pool.length, ...countByStatus(pool) };
  }, [log.decisions, area, query]);

  const areaCounts = useMemo(() => {
    const pool = log.decisions.filter(
      (decision) =>
        (status === "all" || decision.status === status) && matchesQuery(decision, query),
    );
    return { all: pool.length, byArea: countByArea(pool) };
  }, [log.decisions, status, query]);

  const filtersApplied = status !== "all" || area !== null || query.trim() !== "";

  const clearFilters = useCallback(() => {
    setStatus("all");
    setArea(null);
    setQuery("");
  }, []);

  const openId = drawer && "id" in drawer ? drawer.id : null;
  const open = openId ? (log.decisions.find((decision) => decision.id === openId) ?? null) : null;

  // The open decision may have just been deleted. Closing beats showing a
  // drawer with nothing in it.
  useEffect(() => {
    if (openId && !open) setDrawer(null);
  }, [openId, open]);

  // replaceState, not push: filtering is not navigation, and Back should leave
  // the demo rather than walk every filter the reader tried.
  useEffect(() => {
    window.history.replaceState(null, "", writeUrl({ status, area, query, openId }));
  }, [status, area, query, openId]);

  // The log, and only the log, goes to the machine. Where the reader happens to
  // be looking is in the link they are already holding.
  useEffect(() => {
    saveLog({
      touched: log.touched,
      decisions: log.decisions,
      changes: log.changes,
      areas: log.areas,
    });
  }, [log.touched, log.decisions, log.changes, log.areas]);

  const resetDemo = useCallback(() => {
    forgetLog();
    dispatch({ type: "reset" });
    setDrawer(null);
    setStatus("all");
    setArea(null);
    setQuery("");
  }, []);

  return {
    decisions: log.decisions,
    areas,
    filtered,
    statusCounts,
    areaCounts,
    status,
    area,
    query,
    filtersApplied,
    open,
    drawer,
    undoLabel: log.undo?.label ?? null,
    refusal: log.refusal,
    history: open ? historyFor(log.changes, open.id) : [],
    setStatus,
    setArea,
    setQuery,
    clearFilters,
    resetDemo,
    save: useCallback((decision: Decision) => dispatch({ type: "save", decision }), []),
    changeStatus: useCallback(
      (id: string, status: Status) => dispatch({ type: "setStatus", id, status }),
      [],
    ),
    remove: useCallback((id: string) => dispatch({ type: "delete", id }), []),
    removeAll: useCallback(() => dispatch({ type: "deleteAll" }), []),
    addArea: useCallback((name: Area) => dispatch({ type: "addArea", name }), []),
    removeArea: useCallback((name: Area) => dispatch({ type: "removeArea", name }), []),
    clearRefusal: useCallback(() => dispatch({ type: "clearRefusal" }), []),
    undo: useCallback(() => dispatch({ type: "undo" }), []),
    view: useCallback((id: string) => setDrawer({ mode: "view", id }), []),
    edit: useCallback((id: string) => setDrawer({ mode: "edit", id }), []),
    create: useCallback(() => setDrawer({ mode: "create" }), []),
    manageAreas: useCallback(() => setDrawer({ mode: "areas" }), []),
    closeDrawer: useCallback(() => setDrawer(null), []),
  };
}

/** What every piece of the log receives. */
export type LogState = ReturnType<typeof useLog>;
