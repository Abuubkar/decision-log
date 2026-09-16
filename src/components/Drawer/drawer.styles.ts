import * as stylex from "@stylexjs/stylex";
import { colors, space, type } from "@/tokens.stylex";

export const styles = stylex.create({
  // A native dialog gives us the focus trap, the Escape key and the backdrop
  // without a library.
  dialog: {
    width: "min(520px, 100%)",
    maxWidth: "none",
    height: "100dvh",
    maxHeight: "none",
    margin: 0,
    marginLeft: "auto",
    padding: 0,
    borderWidth: 0,
    borderLeftWidth: { default: "1px", "@media (max-width: 780px)": 0 },
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    backgroundColor: colors.card,
    color: colors.ink,
    fontFamily: type.sans,
    "::backdrop": { backgroundColor: "rgba(27, 24, 21, 0.28)" },
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    // The view header carries an Edit button and the form headers do not. Both
    // header controls are the same height, and this floor holds the header
    // still for any mode that has neither.
    minHeight: "66px",
    paddingBlock: space.base,
    paddingInline: space.lg,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: space.lg,
  },
  foot: {
    display: "flex",
    justifyContent: "flex-end",
    gap: space.sm,
    paddingBlock: space.base,
    paddingInline: space.lg,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
});
