import type { Decision, Status } from "@/domain/types";

export type DecisionRowProps = {
  decision: Decision;
  status: Status;
  onOpen: (id: string) => void;
};
