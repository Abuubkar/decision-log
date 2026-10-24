import * as stylex from "@stylexjs/stylex";
import { colors, space, type } from "@/tokens.stylex";

export const styles = stylex.create({
  heading: { marginTop: space.md, marginBottom: space.sm },
  lede: { marginTop: 0, marginBottom: space.lg },
  add: { display: "flex", gap: space.sm, alignItems: "stretch" },
  taken: { marginTop: space.sm, marginBottom: 0 },
  list: {
    listStyle: "none",
    margin: 0,
    marginTop: space.lg,
    padding: 0,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    gap: space.md,
    paddingBlock: space.md,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  count: {
    color: colors.inkFaint,
    fontSize: type.small,
    fontVariantNumeric: "tabular-nums",
  },
});
