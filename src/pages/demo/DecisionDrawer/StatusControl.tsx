import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { statusById } from "@/domain/statuses";
import type { Decision, Status, StatusId } from "@/domain/types";
import { hintFor } from "./decisionDrawer.copy";
import { styles } from "./decisionDrawer.styles";

type Props = {
  decision: Decision;
  statuses: Status[];
  onChangeStatus: (id: string, status: StatusId) => void;
  onUndo: () => void;
};

/** Changing a status confirms itself, and offers the way back. */
export function StatusControl({ decision, statuses, onChangeStatus, onUndo }: Props) {
  const toast = useToast();
  const current = statusById(statuses, decision.status);

  function change(next: Status) {
    if (decision.status === next.id) return;
    onChangeStatus(decision.id, next.id);
    toast(`Marked “${decision.title}” ${next.label.toLowerCase()}`, {
      label: "Undo",
      run: onUndo,
    });
  }

  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">Status</Text>
      <div {...stylex.props(styles.segment)} role="group" aria-label="Status">
        {statuses.map((status) => (
          <Button
            key={status.id}
            onClick={() => change(status)}
            aria-pressed={decision.status === status.id}
            style={[styles.option, decision.status === status.id && styles.chosen]}
          >
            {status.label}
          </Button>
        ))}
      </div>
      <Text variant="small" tone="muted" style={styles.hint}>
        {hintFor(current)}
      </Text>
    </div>
  );
}
