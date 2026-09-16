import * as stylex from "@stylexjs/stylex";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { StatusDot } from "@/pages/demo/StatusDot";
import { historyFor, historyRows } from "@/domain/changes";
import { formatDecidedOn } from "@/domain/decisions";
import { SEED } from "@/domain/seed";
import { SEED_CHANGES } from "@/domain/seedChanges";
import type { Decision } from "@/domain/types";
import { styles } from "../landing.styles";

export const byId = (id: string) => SEED.find((decision) => decision.id === id)!;

/**
 * One real decision from the seed, rendered as live HTML rather than a picture
 * of one. A reader can select the text, and the page shows the product doing
 * the job it claims rather than describing it.
 */
export function Specimen({ decision, caption }: { decision: Decision; caption: string }) {
  const history = historyFor(SEED_CHANGES, decision.id);
  return (
    <Box
      as="article"
      style={styles.card}
      aria-label={`${decision.title}, as it appears in the log`}
    >
      <Box style={styles.cardHead}>
        <Text variant="small" tone="muted">
          {caption}
        </Text>
        <Text variant="small" tone="faint">
          {decision.owner} &middot; {decision.area}
        </Text>
      </Box>

      <Box style={styles.cardBody}>
        <Text as="h2" variant="heading" style={styles.cardTitle}>
          <StatusDot status={decision.status} />
          {decision.title}
        </Text>
        <Box style={styles.field}>
          <Text variant="label">What we decided</Text>
          <Text style={styles.fieldValue}>{decision.statement}</Text>
        </Box>
        <Box style={styles.field}>
          <Text variant="label">Why</Text>
          <Text style={styles.fieldValue}>{decision.rationale}</Text>
        </Box>
        <Box style={styles.cardMeta}>
          <span>Decided {formatDecidedOn(decision.decidedOn)}</span>
          <span {...stylex.props(styles.cardStatus, styles[decision.status])}>
            {decision.status}
          </span>
        </Box>
      </Box>

      <Box style={styles.cardHistory}>
        {history.map((change) =>
          historyRows(change).map((row) => (
            <Box key={row.key} style={styles.cardEvent}>
              <Text variant="small" tone="faint">
                {formatDecidedOn(change.at)} &middot; {change.by}
              </Text>
              <Text variant="small">
                {row.label}
                {row.from !== undefined && (
                  <span {...stylex.props(styles.arrow)}>
                    {" "}
                    {row.from} &rarr; {row.to}
                  </span>
                )}
              </Text>
            </Box>
          )),
        )}
      </Box>
    </Box>
  );
}
