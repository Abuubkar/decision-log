// THROWAWAY — variant B. History as a timeline filling the drawer body.
import * as stylex from "@stylexjs/stylex";
import { Text } from "../../components/Text";
import { formatDecidedOn } from "../../domain/decisions";
import { changesFor, describe } from "./changes";
import { protoStyles as styles } from "./protoStyles";

export function ChangeHistoryTimeline({ decisionId }: { decisionId: string }) {
  const changes = changesFor(decisionId);
  return (
    <div {...stylex.props(styles.spine)}>
      <span {...stylex.props(styles.spineRule)} />
      {changes.map((change, index) => (
        <div key={change.id} {...stylex.props(styles.node)}>
          <span
            {...stylex.props(
              styles.marker,
              index === 0 && styles.markerNow,
              change.kind === "standing" && styles.markerStanding,
            )}
          />
          <Text variant="small" tone="faint" style={styles.when}>
            {formatDecidedOn(change.at)}
          </Text>
          <Text>{describe(change)}</Text>
          <Text variant="small" tone="muted">
            {change.by}
          </Text>
        </div>
      ))}
    </div>
  );
}
