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
};
