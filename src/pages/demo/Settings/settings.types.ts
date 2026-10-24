import type { AreaInLog } from "@/domain/areas";
import type { Area, Status, StatusId, Tone } from "@/domain/types";

/** The four things settings can be showing. `menu` is the way back. */
export type SettingsPane = "menu" | "statuses" | "areas";

export type SettingsProps = {
  areas: AreaInLog[];
  areaCounts: Map<Area, number>;
  statuses: Status[];
  statusCounts: Map<StatusId, number>;
  onAddArea: (name: Area) => void;
  onRenameArea: (from: Area, to: Area) => void;
  onRemoveArea: (name: Area) => void;
  onAddStatus: (label: string, tone: Tone, holds: boolean) => void;
  onEditStatus: (id: StatusId, label: string, tone: Tone, holds: boolean) => void;
  onRemoveStatus: (id: StatusId) => void;
  onDeleteAll: () => void;
  onResetDemo: () => void;
  /** How many decisions Delete all would take, so the menu can say so. */
  decisionCount: number;
};
