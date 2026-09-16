import type { Decision, Status } from "../../domain/types";
import type { DrawerState } from "../state";

export type DecisionDrawerProps = {
  drawer: DrawerState;
  decision: Decision | null;
  onClose: () => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onChangeStatus: (id: string, status: Status) => void;
  onSave: (decision: Decision) => void;
};
