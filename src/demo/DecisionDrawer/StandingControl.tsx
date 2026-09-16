import * as stylex from "@stylexjs/stylex";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { useToast } from "../../components/Toast";
import { STATUSES } from "../../domain/types";
import type { Decision, Status } from "../../domain/types";
import { HINTS } from "./decisionDrawer.copy";
import { styles } from "./decisionDrawer.styles";

const label = (status: Status) => status[0]!.toUpperCase() + status.slice(1);

type Props = {
  decision: Decision;
  onChangeStatus: (id: string, status: Status) => void;
};

/** Changing a standing confirms itself, and offers the way back. */
export function StandingControl({ decision, onChangeStatus }: Props) {
  const toast = useToast();

  function change(next: Status) {
    if (decision.status === next) return;
    const previous = decision.status;
    const { id, title } = decision;
    onChangeStatus(id, next);
    toast(`Marked “${title}” ${next}`, {
      label: "Undo",
      run: () => onChangeStatus(id, previous),
    });
  }

  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">Standing</Text>
      <div {...stylex.props(styles.segment)} role="group" aria-label="Standing">
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
