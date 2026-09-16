import * as stylex from "@stylexjs/stylex";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { formatDecidedOn, stillHolds } from "../domain/decisions";
import type { Decision } from "../domain/types";
import { colors, space, type } from "../tokens.stylex";
import { StatusDot } from "./StatusDot";

const styles = stylex.create({
  row: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 180px", "@media (max-width: 780px)": "1fr" },
    gap: { default: space.lg, "@media (max-width: 780px)": space.md },
    width: "100%",
    textAlign: "left",
    backgroundColor: { default: "transparent", ":hover": colors.paperSunk },
    borderWidth: 0,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
    paddingBlock: space.base,
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
    cursor: "pointer",
    outlineOffset: "-2px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
  },
  // A decision that no longer holds keeps its place and loses its weight.
  quiet: { fontWeight: 400 },
  // The list is for scanning. The drawer holds the rationale in full.
  clamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  side: {
    display: { default: "block", "@media (max-width: 780px)": "flex" },
    flexWrap: "wrap",
    gap: space.md,
    alignItems: "baseline",
    fontFamily: type.sans,
    fontSize: type.small,
    lineHeight: 1.7,
    color: colors.inkMuted,
  },
  date: { display: "block", color: colors.ink, fontWeight: 500 },
  status: {
    display: "block",
    marginTop: { default: space.xs, "@media (max-width: 780px)": 0 },
    fontSize: type.label,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  active: { color: colors.active },
  superseded: { color: colors.superseded },
  reversed: { color: colors.reversed },
});

type Props = {
  decision: Decision;
  onOpen: (id: string) => void;
};

export function DecisionRow({ decision, onOpen }: Props) {
  const past = !stillHolds(decision);
  return (
    <Box
      as="button"
      type="button"
      onClick={() => onOpen(decision.id)}
      style={styles.row}
      aria-label={`${decision.title}, ${decision.status}`}
    >
      <div>
        <Text
          as="h3"
          variant="heading"
          tone={past ? "faint" : "default"}
          style={[styles.title, past && styles.quiet]}
        >
          <StatusDot status={decision.status} />
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
        <span {...stylex.props(styles.status, styles[decision.status])}>{decision.status}</span>
      </div>
    </Box>
  );
}
