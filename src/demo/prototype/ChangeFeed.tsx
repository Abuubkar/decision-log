// THROWAWAY — variant C. Every change across the whole log, in one place.
import * as stylex from "@stylexjs/stylex";
import { Fragment } from "react";
import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { formatDecidedOn } from "../../domain/decisions";
import type { Decision } from "../../domain/types";
import { StatusDot } from "../StatusDot";
import { newestFirst, describe } from "./changes";
import { protoStyles as styles } from "./protoStyles";

type Props = {
  decisions: Decision[];
  onOpen: (id: string) => void;
};

export function ChangeFeed({ decisions, onOpen }: Props) {
  const byId = new Map(decisions.map((decision) => [decision.id, decision]));
  let month = "";

  return (
    <Box as="section" style={styles.feed}>
      <Box style={styles.feedBox}>
        {newestFirst.map((change) => {
          const decision = byId.get(change.decisionId);
          if (!decision) return null;
          const thisMonth = change.at.slice(0, 7);
          const showMonth = thisMonth !== month;
          month = thisMonth;
          return (
            <Fragment key={change.id}>
              {showMonth && (
                <Box style={styles.day}>
                  <Text variant="small" tone="faint" as="span">
                    {new Date(`${change.at}T00:00:00`).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <span {...stylex.props(styles.dayRule)} />
                </Box>
              )}
              <Box
                as="button"
                type="button"
                onClick={() => onOpen(decision.id)}
                style={styles.feedRow}
              >
                <div>
                  <Text as="span" style={styles.what}>
                    <StatusDot status={decision.status} />
                    {decision.title}
                  </Text>
                  <Text variant="small" tone="muted">
                    {describe(change)}
                  </Text>
                </div>
                <Text variant="small" tone="faint" as="span" style={styles.when}>
                  {formatDecidedOn(change.at)} &middot; {change.by}
                </Text>
              </Box>
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
