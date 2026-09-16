// THROWAWAY — variant A. History as a third section under Standing.
import * as stylex from "@stylexjs/stylex";
import { Text } from "../../components/Text";
import { formatDecidedOn } from "../../domain/decisions";
import { changesFor, describe } from "./changes";
import { protoStyles as styles } from "./protoStyles";

export function ChangeHistorySection({ decisionId }: { decisionId: string }) {
  const changes = changesFor(decisionId);
  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">History</Text>
      <div {...stylex.props(styles.rows)}>
        {changes.map((change) => (
          <div key={change.id} {...stylex.props(styles.row)}>
            <Text variant="small" tone="faint" as="span" style={styles.when}>
              {formatDecidedOn(change.at).replace(/ \d{4}$/, "")}
            </Text>
            <Text variant="small" tone="muted" as="span">
              {describe(change)} &middot; {change.by}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
