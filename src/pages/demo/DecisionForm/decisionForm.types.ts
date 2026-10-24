import type { Area, Decision } from "@/domain/types";

export type DecisionValues = {
  title: string;
  statement: string;
  rationale: string;
  decidedOn: string;
  owner: string;
  area: Area;
};

export type DecisionFormProps = {
  /** Absent when adding a decision rather than editing one. */
  decision?: Decision;
  /** Every area the log knows, in the order the picker shows them. */
  areas: Area[];
  onSubmit: (values: DecisionValues) => void;
  onCancel: () => void;
  /** Absent while adding, because there is nothing yet to delete. */
  onDelete?: () => void;
  /**
   * Called as the form becomes dirty and clean again, so whatever is holding
   * the form can refuse to throw the typing away.
   */
  onDirtyChange?: (dirty: boolean) => void;
};
