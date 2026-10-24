import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "@/tokens.stylex";

/**
 * A finger, rather than a narrow window. A touch laptop and a tablet in
 * landscape both want the larger target while a mouse on a small window does
 * not, so this keys off the pointer and not the viewport.
 */
const touch = "@media (pointer: coarse)";

/**
 * The toolbar keeps one row at every width. Below the first the search stops
 * being capped and takes whatever the row has left, because a tablet has no
 * reason to hold the search to a desktop's measure. Below the second the button
 * drops its words for a mark, which is the only way both still fit on a phone.
 */
const fills = "@media (max-width: 900px)";
const markOnly = "@media (max-width: 560px)";

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
  search: {
    flex: 1,
    maxWidth: { default: "340px", [fills]: "none" },
    // Wide enough for its own placeholder, which is what it was a character
    // short of before.
    minWidth: "180px",
  },
  // Only a desktop has room to spare, so only a desktop gives any away.
  spacer: { flex: { default: 1, [fills]: 0 } },
  create: {
    flexShrink: 0,
    // Square once the words are gone, and 44px under a finger.
    paddingInline: { default: space.base, [markOnly]: 0 },
    width: { default: "auto", [markOnly]: "44px" },
    height: { default: "auto", [markOnly]: "44px" },
    justifyContent: "center",
  },
  createMark: { display: { default: "none", [markOnly]: "block" } },
  createWords: { display: { default: "inline", [markOnly]: "none" } },
  body: {
    display: "grid",
    // minmax(0, 1fr) and not 1fr: a grid column defaults to its content's
    // minimum width, and the scrolling filter row has no minimum, so the column
    // grew past the viewport and took the whole page sideways with it.
    gridTemplateColumns: {
      default: "208px minmax(0, 1fr)",
      "@media (max-width: 780px)": "minmax(0, 1fr)",
    },
    alignItems: "start",
  },
  sidebar: {
    alignSelf: "stretch",
    paddingBlock: { default: space.base, "@media (max-width: 780px)": space.md },
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
    marginBottom: { default: space.lg, "@media (max-width: 780px)": space.md },
  },
  groupTitle: { marginBottom: space.sm, paddingInline: space.sm },
  /**
   * A column of rows on a desktop, one scrolling row on a phone. Stacked, the
   * two groups ran about six hundred pixels and pushed every decision off the
   * screen; side by side they only got narrower. A row keeps every filter
   * visible and costs one line each.
   */
  options: {
    display: { default: "block", "@media (max-width: 780px)": "flex" },
    // Same reason as the grid column: without it a flex item refuses to shrink
    // below its content and the row never scrolls, it just overflows.
    minWidth: 0,
    gap: space.xs,
    overflowX: { default: "visible", "@media (max-width: 780px)": "auto" },
    // The scrollbar is the only thing that says there is more to the right, so
    // the row keeps its padding when it overflows.
    paddingBottom: { default: 0, "@media (max-width: 780px)": space.xs },
    scrollbarWidth: "thin",
  },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    gap: space.md,
    width: { default: "100%", "@media (max-width: 780px)": "auto" },
    flexShrink: { default: 1, "@media (max-width: 780px)": 0 },
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
