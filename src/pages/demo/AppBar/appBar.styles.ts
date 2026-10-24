import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "@/tokens.stylex";

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
  actions: { display: "flex", alignItems: "center", gap: space.sm },
  gear: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // 34px under a mouse, 44px under a finger, matching the log's filters.
    width: { default: "34px", "@media (pointer: coarse)": "44px" },
    height: { default: "34px", "@media (pointer: coarse)": "44px" },
    padding: 0,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: "transparent", ":hover": colors.ruleStrong },
    borderRadius: radii.md,
    backgroundColor: { default: "transparent", ":hover": colors.paperSunk },
    color: { default: colors.inkMuted, ":hover": colors.ink },
    cursor: "pointer",
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "2px",
  },
  mark: {
    fontFamily: type.serif,
    fontSize: "20px",
    fontWeight: 600,
    color: colors.ink,
    textDecorationLine: "none",
  },
});
