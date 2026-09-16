import * as stylex from "@stylexjs/stylex";
import { Fragment } from "react";
import { Text } from "../../components/Text";
import { formatDecidedOn } from "../../domain/decisions";
import type { Decision, Status } from "../../domain/types";
import { StandingControl } from "./StandingControl";
import { styles } from "./decisionDrawer.styles";

type Props = {
  decision: Decision;
  onChangeStatus: (id: string, status: Status) => void;
};

export function DecisionDetail({ decision, onChangeStatus }: Props) {
  const rows = [
    { term: "Decided", value: decision.statement, muted: false },
    { term: "Because", value: decision.rationale, muted: true },
    { term: "On", value: formatDecidedOn(decision.decidedOn), muted: false },
    { term: "Owner", value: decision.owner, muted: false },
    { term: "Area", value: decision.area, muted: false },
  ];

  return (
    <>
      <Text as="h2" variant="title" style={styles.heading}>
        {decision.title}
      </Text>
      <dl {...stylex.props(styles.list)}>
        {rows.map((row) => (
          <Fragment key={row.term}>
            <Text as="dt" variant="label" style={styles.term}>
              {row.term}
            </Text>
            <Text as="dd" tone={row.muted ? "muted" : "default"} style={styles.definition}>
              {row.value}
            </Text>
          </Fragment>
        ))}
      </dl>
      <StandingControl decision={decision} onChangeStatus={onChangeStatus} />
    </>
  );
}
