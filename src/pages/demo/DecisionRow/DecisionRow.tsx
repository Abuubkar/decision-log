import * as stylex from "@stylexjs/stylex";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { formatDecidedOn } from "@/domain/decisions";
import { StatusDot } from "../StatusDot";
import { styles } from "./decisionRow.styles";
import type { DecisionRowProps } from "./decisionRow.types";

export function DecisionRow({ decision, status, onOpen }: DecisionRowProps) {
  const past = !status.holds;
  return (
    <Box
      as="button"
      type="button"
      onClick={() => onOpen(decision.id)}
      style={styles.row}
      aria-label={`${decision.title}, ${status.label}`}
    >
      <div>
        <Text
          as="h3"
          variant="heading"
          tone={past ? "faint" : "default"}
          style={[styles.title, past && styles.quiet]}
        >
          <StatusDot status={status} />
          {decision.title}
        </Text>
        <Text tone={past ? "faint" : "default"}>{decision.statement}</Text>
        <Text variant="small" tone={past ? "faint" : "muted"} style={styles.clamp}>
          {decision.rationale}
        </Text>
      </div>
      <div {...stylex.props(styles.side)}>
        <span {...stylex.props(styles.date)}>{formatDecidedOn(decision.decidedOn)}</span>
        <span>
          {decision.owner} &middot; {decision.area}
        </span>
        <span {...stylex.props(styles.status, styles[status.tone])}>{status.label}</span>
      </div>
    </Box>
  );
}
