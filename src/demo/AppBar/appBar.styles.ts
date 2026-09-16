import * as stylex from "@stylexjs/stylex";
import { colors, space, type } from "../../tokens.stylex";

export const styles = stylex.create({
  bar: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.base,
    maxWidth: "1120px",
    marginInline: "auto",
    paddingBlock: space.md,
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  actions: { display: "flex", alignItems: "center", gap: "8px" },
  mark: {
    fontFamily: type.serif,
    fontSize: "20px",
    fontWeight: 600,
    color: colors.ink,
    textDecorationLine: "none",
  },
});
