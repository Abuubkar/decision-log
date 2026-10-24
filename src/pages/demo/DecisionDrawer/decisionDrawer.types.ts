import type { AreaInLog } from "@/domain/areas";
import type { Change } from "@/domain/changes";
import type { Area, Decision, Status } from "@/domain/types";
import type { DrawerState } from "../state";

export type DecisionDrawerProps = {
  drawer: DrawerState;
  decision: Decision | null;
  areas: AreaInLog[];
  areaCounts: Map<Area, number>;
  onClose: () => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onChangeStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onSave: (decision: Decision) => void;
  onAddArea: (name: Area) => void;
  onRemoveArea: (name: Area) => void;
  /** Takes the last action back, whatever it was. */
  onUndo: () => void;
  history: Change[];
};
