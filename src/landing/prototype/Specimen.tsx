import * as stylex from "@stylexjs/stylex";
import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { historyFor, historyRows } from "../../domain/changes";
import { formatDecidedOn } from "../../domain/decisions";
import { SEED } from "../../domain/seed";
import { SEED_CHANGES } from "../../domain/seedChanges";
import type { Decision } from "../../domain/types";
import { StatusDot } from "../../demo/StatusDot";
import { p } from "./prototype.styles";

/**
 * PROTOTYPE. One real decision from the seed, rendered as live HTML rather
 * than a screenshot, with its history underneath. The point: a reader can
 * select the text, and the page shows the product doing the job it claims.
 */

export const byId = (id: string) => SEED.find((decision) => decision.id === id)!;

export function Specimen({
  decision,
  showHistory = true,
  caption,
}: {
  decision: Decision;
  showHistory?: boolean;
  caption?: string;
}) {
  const history = historyFor(SEED_CHANGES, decision.id);
  return (
    <Box as="article" style={p.card} aria-label={`${decision.title}, as it appears in the log`}>
      <Box style={p.cardHead}>
        <Text variant="small" tone="muted">
          {caption ?? "Decision Log"}
        </Text>
        <Text variant="small" tone="faint">
          {decision.owner} &middot; {decision.area}
        </Text>
      </Box>
      <Box style={p.cardBody}>
        <Text as="h3" variant="heading" style={p.cardTitle}>
          <StatusDot status={decision.status} />
          {decision.title}
        </Text>
        <Box style={p.field}>
          <Text variant="label">What we decided</Text>
          <Text style={p.fieldValue}>{decision.statement}</Text>
        </Box>
        <Box style={p.field}>
          <Text variant="label">Why</Text>
          <Text style={p.fieldValue}>{decision.rationale}</Text>
        </Box>
        <Box style={p.meta}>
          <span>Decided {formatDecidedOn(decision.decidedOn)}</span>
          <span {...stylex.props(p.status, p[decision.status])}>{decision.status}</span>
        </Box>
      </Box>
      {showHistory && (
        <Box style={p.history}>
          {history.map((change) =>
            historyRows(change).map((row) => (
              <Box key={row.key} style={p.event}>
                <Text variant="small" tone="faint">
                  {formatDecidedOn(change.at)} &middot; {change.by}
                </Text>
                <Text variant="small">
                  {row.label}
                  {row.from !== undefined && (
                    <span {...stylex.props(p.arrow)}>
                      {" "}
                      {row.from} &rarr; {row.to}
                    </span>
                  )}
                </Text>
              </Box>
            )),
          )}
        </Box>
      )}
    </Box>
  );
}
