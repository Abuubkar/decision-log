import type { Decision } from "../../domain/types";

export type DecisionRowProps = {
  decision: Decision;
  onOpen: (id: string) => void;
};
