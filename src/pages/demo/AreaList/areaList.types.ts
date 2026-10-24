import type { AreaInLog } from "@/domain/areas";
import type { Area } from "@/domain/types";

export type AreaListProps = {
  areas: AreaInLog[];
  /** How many decisions sit in each area, so a removal explains itself. */
  counts: Map<Area, number>;
  onAdd: (name: Area) => void;
  onRemove: (name: Area) => void;
};
