import * as stylex from "@stylexjs/stylex";
import { Text } from "../../components/Text";
import { readChange } from "../../domain/changes";
import type { Change } from "../../domain/changes";
import { formatDecidedOn } from "../../domain/decisions";
import { styles } from "./decisionDrawer.styles";

/** What happened to this decision after it was written down. */
export function ChangeHistory({ history }: { history: Change[] }) {
  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">History</Text>
      <div {...stylex.props(styles.history)}>
        {history.map((change) => {
          const { label, detail } = readChange(change);
          return (
            <div key={change.id} {...stylex.props(styles.event)}>
              <Text variant="small" tone="faint" as="span" style={styles.when}>
                {formatDecidedOn(change.at)}
              </Text>
              <Text variant="small" as="span">
                {label}
                {detail && <span {...stylex.props(styles.detail)}>: {detail}</span>}
              </Text>
              <Text variant="small" tone="faint" as="span">
                {change.by}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}
