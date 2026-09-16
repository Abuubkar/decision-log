import * as stylex from "@stylexjs/stylex";
import { colors, space, type } from "../../tokens.stylex";

export const styles = stylex.create({
  field: {
    display: "block",
  },
  label: {
    display: "block",
    marginBottom: space.xs,
    fontFamily: type.sans,
    fontSize: type.small,
    fontWeight: 500,
    color: colors.ink,
  },
  error: {
    margin: 0,
    marginTop: space.xs,
    fontFamily: type.sans,
    fontSize: type.small,
    color: colors.reversed,
  },
  below: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: space.md,
  },
  count: {
    margin: 0,
    marginTop: space.xs,
    marginLeft: "auto",
    // Never squeezed by a long error message sharing the row.
    flexShrink: 0,
    whiteSpace: "nowrap",
    fontFamily: type.sans,
    fontSize: type.small,
    fontVariantNumeric: "tabular-nums",
    color: colors.inkFaint,
  },
  countFull: { color: colors.reversed },
});
