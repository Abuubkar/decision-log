import type { Change } from "../../domain/changes";
import type { Decision, Status } from "../../domain/types";
import type { DrawerState } from "../state";

export type DecisionDrawerProps = {
  drawer: DrawerState;
  decision: Decision | null;
  onClose: () => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  /** Returns the id of the change it recorded, so Undo can remove it. */
  onChangeStatus: (id: string, from: Status, to: Status) => string;
  onUndoStatus: (id: string, back: Status, changeId: string) => void;
  onSave: (decision: Decision) => void;
  history: Change[];
};
