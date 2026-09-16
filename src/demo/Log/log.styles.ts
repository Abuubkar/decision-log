import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "../../tokens.stylex";

/**
 * A finger, rather than a narrow window. A touch laptop and a tablet in
 * landscape both want the larger target while a mouse on a small window does
 * not, so this keys off the pointer and not the viewport.
 */
const touch = "@media (pointer: coarse)";

export const styles = stylex.create({
  frame: {
    maxWidth: "1120px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
    paddingBlock: space.lg,
  },
  box: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
    flexWrap: "wrap",
    paddingBlock: space.md,
    paddingInline: space.base,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
    backgroundColor: colors.paperSunk,
  },
  // On a phone the search takes its own row. Sharing one with the button left it
  // pinned at its minimum, exactly one character short of its own placeholder.
  search: {
    flex: 1,
    maxWidth: { default: "340px", "@media (max-width: 780px)": "none" },
    minWidth: { default: "140px", "@media (max-width: 780px)": "100%" },
  },
  spacer: { flex: { default: 1, "@media (max-width: 780px)": 0 } },
  body: {
    display: "grid",
    gridTemplateColumns: { default: "208px 1fr", "@media (max-width: 780px)": "1fr" },
    alignItems: "start",
  },
  sidebar: {
    alignSelf: "stretch",
    paddingBlock: space.base,
    paddingInline: space.md,
    backgroundColor: colors.paperSunk,
    borderRightWidth: { default: "1px", "@media (max-width: 780px)": 0 },
    borderRightStyle: "solid",
    borderRightColor: colors.rule,
    borderBottomWidth: { default: 0, "@media (max-width: 780px)": "1px" },
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  group: {
    marginBottom: space.lg,
    display: { default: "block", "@media (max-width: 780px)": "inline-block" },
    verticalAlign: "top",
    marginRight: { default: 0, "@media (max-width: 780px)": space.lg },
  },
  groupTitle: { marginBottom: space.sm, paddingInline: space.sm },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    gap: space.md,
    width: "100%",
    borderWidth: 0,
    borderRadius: radii.md,
    backgroundColor: { default: "transparent", ":hover": colors.card },
    color: colors.inkMuted,
    fontWeight: 400,
    // 32px under a mouse, 44px under a finger.
    paddingBlock: { default: "6px", [touch]: "12px" },
    paddingInline: space.sm,
  },
  chosen: {
    backgroundColor: { default: colors.card, ":hover": colors.card },
    color: colors.ink,
    fontWeight: 500,
    boxShadow: `0 0 0 1px ${colors.rule}`,
  },
  count: { color: colors.inkFaint, fontSize: type.small },
  year: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
    paddingTop: space.base,
    paddingBottom: "6px",
    paddingInline: space.lg,
  },
  rule: { flex: 1, height: "1px", backgroundColor: colors.rule },
  empty: { paddingBlock: space.xl, paddingInline: space.lg },
});
