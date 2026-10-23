import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { STATUSES } from "@/domain/types";
import type { Decision, Status } from "@/domain/types";
import { HINTS } from "./decisionDrawer.copy";
import { styles } from "./decisionDrawer.styles";

const label = (status: Status) => status[0]!.toUpperCase() + status.slice(1);

type Props = {
  decision: Decision;
  onChangeStatus: (id: string, status: Status) => void;
  onUndo: () => void;
};

/** Changing a status confirms itself, and offers the way back. */
export function StatusControl({ decision, onChangeStatus, onUndo }: Props) {
  const toast = useToast();

  function change(next: Status) {
    if (decision.status === next) return;
    onChangeStatus(decision.id, next);
    toast(`Marked “${decision.title}” ${next}`, { label: "Undo", run: onUndo });
  }

  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">Status</Text>
      <div {...stylex.props(styles.segment)} role="group" aria-label="Status">
        {STATUSES.map((status) => (
          <Button
            key={status}
            onClick={() => change(status)}
            aria-pressed={decision.status === status}
            style={[styles.option, decision.status === status && styles.chosen]}
          >
            {label(status)}
          </Button>
        ))}
      </div>
      <Text variant="small" tone="muted" style={styles.hint}>
        {HINTS[decision.status]}
      </Text>
    </div>
  );
}
