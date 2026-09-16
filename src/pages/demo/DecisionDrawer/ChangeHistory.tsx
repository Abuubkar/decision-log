import * as stylex from "@stylexjs/stylex";
import { Text } from "@/components/Text";
import { historyRows } from "@/domain/changes";
import type { Change } from "@/domain/changes";
import { formatDecidedOn } from "@/domain/decisions";
import { styles } from "./decisionDrawer.styles";

/** Why runs to 700 characters, and two of those on one line is unreadable. */
const LONGEST = 52;

function short(value: string) {
  return value.length > LONGEST ? `${value.slice(0, LONGEST).trimEnd()}…` : value;
}

/**
 * What happened to this decision after it was written down. The date and the
 * person sit on their own line so the fields that moved get the full width.
 */
export function ChangeHistory({ history }: { history: Change[] }) {
  return (
    <div {...stylex.props(styles.section)}>
      <Text variant="label">History</Text>
      <div {...stylex.props(styles.history)}>
        {history.map((change) => (
          <div key={change.id} {...stylex.props(styles.event)}>
            <Text variant="small" tone="faint" style={styles.when}>
              {formatDecidedOn(change.at)} &middot; {change.by}
            </Text>
            {historyRows(change).map((row) => (
              <Text key={row.key} variant="small" style={styles.move}>
                {row.label}
                {row.from !== undefined && (
                  <span {...stylex.props(styles.detail)}>
                    {" "}
                    {short(row.from)} <span {...stylex.props(styles.arrow)}>&rarr;</span>{" "}
                    {short(row.to ?? "")}
                  </span>
                )}
              </Text>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
