import * as stylex from "@stylexjs/stylex";
import { Fragment } from "react";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import type { Decision } from "@/domain/types";
import { DecisionRow } from "../DecisionRow";
import { styles } from "./log.styles";
import type { LogProps } from "./log.types";

const yearOf = (decision: Decision) => decision.decidedOn.slice(0, 4);

export function LogList({ log }: LogProps) {
  if (log.filtered.length === 0) {
    return (
      <Box as="main">
        <Text tone="muted" style={styles.empty}>
          Nothing matches that. Try a different search, or widen the filters.
        </Text>
      </Box>
    );
  }

  let year = "";
  return (
    <Box as="main">
      {log.filtered.map((decision) => {
        const showYear = yearOf(decision) !== year;
        year = yearOf(decision);
        return (
          <Fragment key={decision.id}>
            {showYear && (
              <Box style={styles.year}>
                <Text variant="small" tone="faint" as="span">
                  {year}
                </Text>
                <span {...stylex.props(styles.rule)} />
              </Box>
            )}
            <DecisionRow decision={decision} onOpen={log.view} />
          </Fragment>
        );
      })}
    </Box>
  );
}
