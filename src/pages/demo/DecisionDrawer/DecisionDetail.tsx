import * as stylex from "@stylexjs/stylex";
import { Fragment } from "react";
import { Text } from "@/components/Text";
import { formatDecidedOn } from "@/domain/decisions";
import type { Change } from "@/domain/changes";
import type { Decision, Status, StatusId } from "@/domain/types";
import { ChangeHistory } from "./ChangeHistory";
import { DeleteControl } from "./DeleteControl";
import { StatusControl } from "./StatusControl";
import { styles } from "./decisionDrawer.styles";

type Props = {
  decision: Decision;
  statuses: Status[];
  history: Change[];
  onChangeStatus: (id: string, status: StatusId) => void;
  onDelete: (id: string) => void;
  onUndo: () => void;
};

export function DecisionDetail({
  decision,
  statuses,
  history,
  onChangeStatus,
  onDelete,
  onUndo,
}: Props) {
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
      <StatusControl
        decision={decision}
        statuses={statuses}
        onChangeStatus={onChangeStatus}
        onUndo={onUndo}
      />
      <ChangeHistory history={history} statuses={statuses} />
      <DeleteControl decision={decision} onDelete={onDelete} onUndo={onUndo} />
    </>
  );
}
