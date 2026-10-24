import { created, diffFields, edited, statusChanged } from "@/domain/changes";
import type { Change } from "@/domain/changes";
import { mayRemoveArea } from "@/domain/areas";
import { withStatus } from "@/domain/decisions";
import { SEED } from "@/domain/seed";
import { SEED_CHANGES } from "@/domain/seedChanges";
import { whyStatusStays } from "@/domain/statuses";
import { ACTIVE, DEFAULT_AREAS, DEFAULT_STATUSES } from "@/domain/types";
import type { Area, Decision, Status, StatusId, Tone } from "@/domain/types";
import type { SavedLog } from "./storage";

export type LogData = {
  decisions: Decision[];
  changes: Change[];
  /** Areas someone kept. The list the log shows adds the ones in use. */
  areas: Area[];
  /** What a decision can be. Renaming one never touches a decision. */
  statuses: Status[];
};

export type LogState = LogData & {
  /**
   * The log as it was before the last action, and what to call that action.
   * One level deep, which is as long as the undo is offered for.
   */
  undo: (LogData & { label: string }) | null;
  /**
   * True once someone has put something of their own in. A log nobody touched
   * is still the demo, and a new seed may replace it. A log someone touched is
   * theirs, and nothing we ship may replace it.
   */
  touched: boolean;
  /** Set when an action was refused, so the log can say why. */
  refusal: string | null;
};

export type LogAction =
  | { type: "save"; decision: Decision }
  | { type: "setStatus"; id: string; status: StatusId }
  | { type: "delete"; id: string }
  | { type: "deleteAll" }
  | { type: "addArea"; name: Area }
  | { type: "removeArea"; name: Area }
  | { type: "renameArea"; from: Area; to: Area }
  | { type: "addStatus"; label: string; tone: Tone; holds: boolean }
  | { type: "editStatus"; id: StatusId; label: string; tone: Tone; holds: boolean }
  | { type: "removeStatus"; id: StatusId }
  | { type: "undo" }
  | { type: "reset" }
  | { type: "restore"; saved: SavedLog }
  | { type: "clearRefusal" };

export function initialLog(): LogState {
  return {
    decisions: SEED,
    changes: SEED_CHANGES,
    areas: DEFAULT_AREAS,
    statuses: DEFAULT_STATUSES,
    undo: null,
    touched: false,
    refusal: null,
  };
}

/** Everything an undo needs: the log as it stands, before the action lands. */
const snapshot = (state: LogState, label: string) => ({
  label,
  decisions: state.decisions,
  changes: state.changes,
  areas: state.areas,
  statuses: state.statuses,
});

/** Every action that writes marks the log as someone's own and clears the refusal. */
const wrote = (state: LogState, label: string) => ({
  undo: snapshot(state, label),
  touched: true,
  refusal: null,
});

export function logReducer(state: LogState, action: LogAction): LogState {
  switch (action.type) {
    case "save": {
      const before = state.decisions.find((item) => item.id === action.decision.id);

      if (!before) {
        return {
          ...state,
          ...wrote(state, `adding “${action.decision.title}”`),
          decisions: [...state.decisions, action.decision],
          changes: [...state.changes, created(action.decision.id)],
        };
      }

      // Saving a form nobody touched should not fill the history with noise.
      const fields = diffFields(before, action.decision);
      if (fields.length === 0) return state;
      return {
        ...state,
        ...wrote(state, "that edit"),
        decisions: state.decisions.map((item) =>
          item.id === action.decision.id ? action.decision : item,
        ),
        changes: [...state.changes, edited(action.decision.id, fields)],
      };
    }

    case "setStatus": {
      const before = state.decisions.find((item) => item.id === action.id);
      if (!before || before.status === action.status) return state;
      return {
        ...state,
        ...wrote(state, `marking it ${action.status}`),
        decisions: state.decisions.map((item) =>
          item.id === action.id ? withStatus(item, action.status) : item,
        ),
        changes: [...state.changes, statusChanged(action.id, before.status, action.status)],
      };
    }

    /**
     * A deleted decision takes its changes with it. The history of something
     * that is not in the log is not history, it is a pointer at nothing.
     */
    case "delete": {
      const gone = state.decisions.find((item) => item.id === action.id);
      if (!gone) return state;
      return {
        ...state,
        ...wrote(state, `deleting “${gone.title}”`),
        decisions: state.decisions.filter((item) => item.id !== action.id),
        changes: state.changes.filter((change) => change.decisionId !== action.id),
      };
    }

    case "deleteAll": {
      if (state.decisions.length === 0) return state;
      return {
        ...state,
        ...wrote(state, `deleting all ${state.decisions.length} decisions`),
        decisions: [],
        changes: [],
      };
    }

    case "addArea": {
      const name = action.name.trim();
      if (!name) return state;
      return { ...state, ...wrote(state, `adding ${name}`), areas: [...state.areas, name] };
    }

    /** Removing an area only stops offering it. One in use stays. */
    case "removeArea": {
      if (!mayRemoveArea(state.decisions, action.name)) {
        return {
          ...state,
          refusal: `${action.name} is in use, so it stays in the log.`,
        };
      }
      return {
        ...state,
        ...wrote(state, `removing ${action.name}`),
        areas: state.areas.filter((name) => name !== action.name),
      };
    }

    /** Renaming an area moves every decision filed under it, in one step. */
    case "renameArea": {
      const to = action.to.trim();
      if (!to || to === action.from) return state;
      return {
        ...state,
        ...wrote(state, `renaming ${action.from}`),
        areas: state.areas.map((name) => (name === action.from ? to : name)),
        decisions: state.decisions.map((decision) =>
          decision.area === action.from ? { ...decision, area: to } : decision,
        ),
      };
    }

    case "addStatus": {
      const label = action.label.trim();
      if (!label) return state;
      return {
        ...state,
        ...wrote(state, `adding ${label}`),
        statuses: [
          ...state.statuses,
          { id: crypto.randomUUID(), label, tone: action.tone, holds: action.holds },
        ],
      };
    }

    /** The id never moves, so no decision and no change has to be rewritten. */
    case "editStatus": {
      const label = action.label.trim();
      if (!label) return state;
      return {
        ...state,
        ...wrote(state, `editing ${label}`),
        statuses: state.statuses.map((status) =>
          status.id === action.id
            ? { ...status, label, tone: action.tone, holds: status.id === ACTIVE || action.holds }
            : status,
        ),
      };
    }

    case "removeStatus": {
      const why = whyStatusStays(state.statuses, state.decisions, action.id);
      if (why) return { ...state, refusal: why };
      return {
        ...state,
        ...wrote(state, "removing that status"),
        statuses: state.statuses.filter((status) => status.id !== action.id),
      };
    }

    case "undo": {
      if (!state.undo) return state;
      const { decisions, changes, areas, statuses } = state.undo;
      return { ...state, decisions, changes, areas, statuses, undo: null, refusal: null };
    }

    /** Reset means reset, so the log goes back to being nobody's. */
    case "reset":
      return initialLog();

    case "restore":
      return {
        ...initialLog(),
        decisions: action.saved.decisions,
        changes: action.saved.changes,
        areas: action.saved.areas,
        statuses: action.saved.statuses,
        touched: action.saved.touched,
      };

    case "clearRefusal":
      return state.refusal === null ? state : { ...state, refusal: null };
  }
}
