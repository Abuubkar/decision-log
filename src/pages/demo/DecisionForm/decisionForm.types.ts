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
  onSubmit: (values: DecisionValues) => void;
  onCancel: () => void;
  /**
   * Called as the form becomes dirty and clean again, so whatever is holding
   * the form can refuse to throw the typing away.
   */
  onDirtyChange?: (dirty: boolean) => void;
};
