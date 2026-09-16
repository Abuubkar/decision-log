import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "../tokens.stylex";

/**
 * Input, Textarea and Select are one visual control wearing three tags, so the
 * shared block lives here rather than in whichever of them was written first.
 */
export const controlStyles = stylex.create({
  base: {
    width: "100%",
    backgroundColor: colors.card,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: colors.ruleStrong, ":focus": colors.ink },
    borderRadius: radii.md,
    paddingBlock: space.sm,
    paddingInline: space.md,
    fontFamily: type.sans,
    fontSize: type.body,
    color: colors.ink,
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "1px",
  },
  invalid: {
    borderColor: colors.reversed,
  },
  textarea: {
    minHeight: "88px",
    resize: "vertical",
    lineHeight: 1.55,
  },
});
