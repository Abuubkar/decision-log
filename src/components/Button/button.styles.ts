import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "@/tokens.stylex";

export const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: space.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: radii.md,
    fontFamily: type.sans,
    fontSize: type.body,
    fontWeight: 500,
    cursor: "pointer",
    paddingBlock: space.sm,
    paddingInline: space.base,
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "2px",
  },
  primary: {
    backgroundColor: { default: colors.ink, ":hover": "#000" },
    borderColor: colors.ink,
    color: colors.paper,
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: { default: colors.ruleStrong, ":hover": colors.ink },
    color: { default: colors.inkMuted, ":hover": colors.ink },
  },
  // A control that should read as a link: used for Clear filters.
  quiet: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: { default: colors.inkMuted, ":hover": colors.ink },
    fontSize: type.small,
    paddingInline: space.xs,
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});
