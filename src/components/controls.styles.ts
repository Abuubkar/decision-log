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
    borderColor: { default: colors.ruleStrong, ":focus-visible": colors.accent },
    borderRadius: radii.md,
    paddingBlock: space.sm,
    paddingInline: space.md,
    fontFamily: type.sans,
    fontSize: type.body,
    color: colors.ink,
    // The border becomes the focus ring, thickened by a shadow sitting right on
    // top of it. The browser's own ring is turned off, because an outline draws
    // a second ring around the border rather than over it.
    outlineStyle: "none",
    boxShadow: { default: "none", ":focus-visible": `0 0 0 1px ${colors.accent}` },
  },
  invalid: {
    // Keeps the ring one colour while focused, and keeps it saying "wrong".
    borderColor: colors.reversed,
    boxShadow: { default: "none", ":focus-visible": `0 0 0 1px ${colors.reversed}` },
  },
  textarea: {
    minHeight: "88px",
    resize: "vertical",
    lineHeight: 1.55,
  },
});
