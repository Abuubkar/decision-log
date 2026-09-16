import * as stylex from "@stylexjs/stylex";
import { Button } from "../components/Button";
import { Drawer } from "../components/Drawer";
import { Text } from "../components/Text";
import { useToast } from "../components/Toast";
import { formatDecidedOn } from "../domain/decisions";
import { STATUSES } from "../domain/types";
import type { Decision, Status } from "../domain/types";
import { colors, radii, space, type } from "../tokens.stylex";

const styles = stylex.create({
  close: {
    background: "none",
    borderWidth: 0,
    padding: space.xs,
    fontSize: "22px",
    lineHeight: 1,
    color: { default: colors.inkMuted, ":hover": colors.ink },
    cursor: "pointer",
  },
  list: {
    display: "grid",
    gridTemplateColumns: { default: "96px 1fr", "@media (max-width: 780px)": "1fr" },
    columnGap: space.lg,
    rowGap: space.md,
    margin: 0,
    marginTop: space.lg,
  },
  term: {
    paddingTop: "3px",
  },
  definition: { margin: 0 },
  section: {
    marginTop: space.xl,
    paddingTop: space.base,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  segment: {
    display: "inline-flex",
    marginTop: space.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.md,
    overflow: "hidden",
  },
  option: {
    borderWidth: 0,
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: colors.rule,
    borderRadius: 0,
    backgroundColor: { default: "transparent", ":hover": colors.paperSunk },
    color: colors.inkMuted,
    fontWeight: 400,
    ":last-child": { borderRightWidth: 0 },
  },
  chosen: {
    backgroundColor: { default: colors.ink, ":hover": colors.ink },
    color: colors.paper,
    fontWeight: 500,
  },
  hint: { marginTop: space.md },
  heading: { marginTop: space.md },
  standing: {
    fontFamily: type.sans,
    fontSize: type.label,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  active: { color: colors.active },
  superseded: { color: colors.superseded },
  reversed: { color: colors.reversed },
});

const HINTS: Record<Status, string> = {
  active:
    "Mark it superseded if a later decision replaced it, or reversed if the team went back on it.",
  superseded: "Marking it active again puts it back in force.",
  reversed: "Marking it active again puts it back in force.",
};

const label = (status: Status) => status[0]!.toUpperCase() + status.slice(1);

type Props = {
  decision: Decision | null;
  onClose: () => void;
  onChangeStatus: (id: string, status: Status) => void;
};

export function DecisionDrawer({ decision, onClose, onChangeStatus }: Props) {
  const toast = useToast();

  function change(next: Status) {
    if (!decision || decision.status === next) return;
    const previous = decision.status;
    const { id, title } = decision;
    onChangeStatus(id, next);
    toast(`Marked “${title}” ${next}`, {
      label: "Undo",
      run: () => onChangeStatus(id, previous),
    });
  }

  return (
    <Drawer
      open={decision !== null}
      onClose={onClose}
      heading={
        <>
          <Text variant="label">Decision</Text>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            {...stylex.props(styles.close)}
          >
            &times;
          </button>
        </>
      }
    >
      {decision && (
        <>
          <Text as="h2" variant="title" style={styles.heading}>
            {decision.title}
          </Text>
          <dl {...stylex.props(styles.list)}>
            <Text as="dt" variant="label" style={styles.term}>
              Decided
            </Text>
            <Text as="dd" style={styles.definition}>
              {decision.statement}
            </Text>

            <Text as="dt" variant="label" style={styles.term}>
              Because
            </Text>
            <Text as="dd" tone="muted" style={styles.definition}>
              {decision.rationale}
            </Text>

            <Text as="dt" variant="label" style={styles.term}>
              On
            </Text>
            <Text as="dd" style={styles.definition}>
              {formatDecidedOn(decision.decidedOn)}
            </Text>

            <Text as="dt" variant="label" style={styles.term}>
              Owner
            </Text>
            <Text as="dd" style={styles.definition}>
              {decision.owner}
            </Text>

            <Text as="dt" variant="label" style={styles.term}>
              Area
            </Text>
            <Text as="dd" style={styles.definition}>
              {decision.area}
            </Text>
          </dl>

          <div {...stylex.props(styles.section)}>
            <Text variant="label">Standing</Text>
            <div {...stylex.props(styles.segment)} role="group" aria-label="Standing">
              {STATUSES.map((status) => (
                <Button
                  key={status}
                  onClick={() => change(status)}
                  aria-pressed={decision.status === status}
                  style={[styles.option, decision.status === status && styles.chosen]}
                >
                  {label(status)}
                </Button>
              ))}
            </div>
            <Text variant="small" tone="muted" style={styles.hint}>
              {HINTS[decision.status]}
            </Text>
          </div>
        </>
      )}
    </Drawer>
  );
}
