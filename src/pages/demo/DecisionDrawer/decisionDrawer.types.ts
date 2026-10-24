import type { AreaInLog } from "@/domain/areas";
import type { Change } from "@/domain/changes";
import type { Area, Decision, Status, StatusId, Tone } from "@/domain/types";
import type { DrawerState } from "../state";

export type DecisionDrawerProps = {
  drawer: DrawerState;
  decision: Decision | null;
  areas: AreaInLog[];
  areaCounts: Map<Area, number>;
  statuses: Status[];
  statusCounts: Map<StatusId, number>;
  decisionCount: number;
  onClose: () => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onChangeStatus: (id: string, status: StatusId) => void;
  onDelete: (id: string) => void;
  onSave: (decision: Decision) => void;
  onAddArea: (name: Area) => void;
  onRenameArea: (from: Area, to: Area) => void;
  onRemoveArea: (name: Area) => void;
  onAddStatus: (label: string, tone: Tone, holds: boolean) => void;
  onEditStatus: (id: StatusId, label: string, tone: Tone, holds: boolean) => void;
  onRemoveStatus: (id: StatusId) => void;
  onDeleteAll: () => void;
  onResetDemo: () => void;
  /** Takes the last action back, whatever it was. */
  onUndo: () => void;
  history: Change[];
};
