import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import type { Status } from "../domain/types";

const styles = stylex.create({
  dot: {
    width: "8px",
    height: "8px",
    flex: "none",
    borderRadius: "50%",
    borderWidth: "1.5px",
    borderStyle: "solid",
  },
  active: { backgroundColor: colors.active, borderColor: colors.active },
  // A decision that stopped holding keeps its place and loses its fill.
  superseded: { backgroundColor: "transparent", borderColor: colors.superseded },
  reversed: { backgroundColor: "transparent", borderColor: colors.reversed },
});

export function StatusDot({ status }: { status: Status }) {
  return <span aria-hidden="true" {...stylex.props(styles.dot, styles[status])} />;
}
