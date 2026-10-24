import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import type { Decision } from "@/domain/types";
import { styles } from "./decisionDrawer.styles";

type Props = {
  decision: Decision;
  onDelete: (id: string) => void;
  onUndo: () => void;
};

/**
 * Deleting is for a decision that should not have been written down. One the
 * team made and later moved away from is superseded or reversed, and stays.
 * There is no confirmation because the undo is the confirmation, and it keeps
 * the history that went with it.
 */
export function DeleteControl({ decision, onDelete, onUndo }: Props) {
  const toast = useToast();

  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">Delete</Text>
      <Text variant="small" tone="muted" style={styles.hint}>
        For something recorded by mistake. A decision the team moved away from belongs in the log,
        marked superseded or reversed.
      </Text>
      <Button
        style={styles.delete}
        onClick={() => {
          onDelete(decision.id);
          toast(`Deleted “${decision.title}”`, { label: "Undo", run: onUndo });
        }}
      >
        Delete this decision
      </Button>
    </div>
  );
}
